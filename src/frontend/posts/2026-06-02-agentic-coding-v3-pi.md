---
title: Local AI Coding Assistant in Neovim in 2026 v3
subtitle: Entering Pi
meta:
  How I extended the Pi agent framework with custom extensions for local models, git
  worktrees, and Neovim integration.
tags: llm, ai, coding assistant, agentic, local, pi, neovim
---

In my [previous post](/posts/2026-03-08-local-ai-coding-assistant-in-nvim-v2), I covered
my improved setup for a local AI coding assistant in Neovim. Just for a brief recap: I
was running Qwen3.5-35B-A3B on llama.cpp for chat and code editing, with
Qwen2.5-coder-7B handling auto-completion via llama.vim. Chat went through Claude Code
in the terminal, which was already a big improvement over my old CodeCompanion setup.

But there was still something missing. I tried using Opencode for a bit — it has a solid
plugin system, subagents, git integration, the works. The thing is, I wanted to optimise
for local model workflows: token-efficient file reading, git worktrees for parallel
builders, guardrails for models that get stuck in loops.

That's when I switched to **Pi** (https://pi.dev/) — an agentic framework designed from
the ground up to be extensible. Everything is a plugin. Every tool can be modified
without touching the core. And the result is something that actually adapts to how I
work, not the other way around.

This post is part of a series on local AI coding assistants:

1. <router-link to="/posts/2026-01-18-local-ai-coding-assistant-in-nvim">Local AI Coding
   Assistant in Neovim in 2026</router-link>
2. <router-link to="/posts/2026-03-08-local-ai-coding-assistant-in-nvim-v2">Local AI
   Coding Assistant in Neovim in 2026 v2</router-link>
3. Local AI Coding Assistant in Neovim in 2026 v3

## Why Pi

The key thing that Pi seems to do better than other frameworks is simply customisation.
Pi treats everything as an extension: tools are TypeScript plugins, agents are Markdown
files with YAML frontmatter, skills are just `SKILL.md` files in a directory. Want to
add a new tool? Drop a plugin in `extensions/`. Want to change how reading works? Edit
the `read` extension without touching the orchestrator. Want to add a subagent that
reviews code? Create a new agent definition and you're done.

The difference for me was practical. I wanted builders with git worktrees that merge
automatically. I wanted a `read` extension backed by a tree-sitter index for token
efficiency. I wanted guardrails for models that loop. With Pi, I could build these as
isolated extensions without fighting the core architecture. Pi's model-to-extension
mapping fit my use case well.

## A typical workflow: adding a feature end-to-end

Here's what a typical Pi session looks like. Say I want to add rate limiting to my API
backend:

> Add rate limiting to the FastAPI backend — 100 requests per minute per user, with
> Redis backing.

The **planner** read the codebase and came back with five tasks: (1) add Redis
connection utility, (2) create the rate limiter middleware, (3) wire it into the FastAPI
app, (4) add tests, (5) update the config docs. It handed these off to four **builders**
running in parallel — two of them got singleton tasks (Redis utility, docs), the other
two shared the middleware and wiring since they're closely related.

Each builder spun up its own git worktree. I watched in one Neovim buffer while the
Redis builder called `read` to check the existing database utilities, then `write` to
add the new connection module. In another buffer, the middleware builder was calling
`search` to find where other middleware was registered, then `edit` to add the rate
limiter.

About three minutes in, the memory extension auto-injected a reminder: "Last time you
added Redis, you forgot to update the Docker Compose file. Check before committing." The
builder paused, checked `docker-compose.yml`, added the Redis service, and kept going.

Four minutes total. All four builders committed. The **reviewer** audited the changes,
called `search` to verify the middleware was registered in the right place, ran a quick
`bash` to check the tests passed, and returned "Pass". I reviewed the merged diff,
pushed, and moved on.

That's the flow. I give a high-level goal, Pi breaks it down, builders execute in
parallel, reviewer validates, I merge. No micromanaging, no context switching, no "did I
remember to update the Docker file?"

## Extensions for local model quirks

Local models don't have the same RLHF training as Claude or GPT. They get stuck in
loops, they forget context, they hallucinate tool calls. I've built a handful of
extensions specifically to deal with these quirks.

### No-repeat: breaking local model loops

This one's specific to local models. Some of them — especially the smaller ones — get
stuck in loops, calling the same tool with the same arguments over and over. The
`no-repeat` extension prevents identical tool calls from being re-issued consecutively.
It's a simple check: if the last tool call matches the current one (same tool, same
arguments), block it and force the model to try something else.

It's not perfect — agents can still get stuck in more complex loops — but it catches the
obvious cases. And for local models that don't have the same RLHF training as Claude or
GPT, it's a necessary guardrail.

I had this happen last week: Qwen3.6-35B called `read` on the same file, then tried to
call it again with the same arguments. `no-repeat` blocked the second call and forced it
to actually _do something_ with what it had read. Without that, it would have looped
until the context window filled up.

### Double-check: private validation before surfacing

Sometimes agents stop out of the blue. Sometimes they forget to do final checks. The
`double-check` extension asks them privately if they forgot anything, triggering
automatically when they're done. They can simply say that they are, in which case the
user doesn't see any of it. If they did forget something, the extension prompts them to
finish up before surfacing the result.

It's like a linter for agent outputs — most of the time, it's silent. When it's not, it
catches things before I see them.

## Token efficiency extensions

Running locally means I'm not paying per token, but I'm still constrained by context
window and inference speed. These extensions help keep token usage down without
sacrificing functionality.

### Read: token-efficient file reading

The `read` extension replaces the harness's built-in file reader with something more
token-efficient. It's backed by a SQLite outline index that tree-sitter generates for
known languages (Python, TypeScript, Vue, Markdown, and a few others). When you read a
file, it operates in three modes: verbatim for small files under 100 lines, outline-only
for large files, and symbol-sliced for targeted reads.

The outline mode is the key. Reading a 5000-line file doesn't return 5000 lines — it
returns a line-budgeted outline showing module docs, classes, and functions with
signatures and doc-first-lines. You can't paginate through it (there's no offset/limit),
but you can use the outline to pick a symbol, then read that symbol specifically.
Re-reads are deduped per session, so reading the same file twice returns "unchanged
since call #N" instead of the body.

It also handles way more formats than the built-in. PDFs get converted to Markdown via
[docling](https://github.com/DS4SD/docling) — IBM Research's open-source document
conversion toolkit. DOCX, XLSX, PPTX files too. Websites are fetched and converted.
Images (JPG, PNG, GIF, WebP) are passed through to the harness's image reader.

Here's a concrete example. I asked the planner to "add MathJax support to PostView". It
called `read` on `src/frontend/views/PostView.vue` — a 280-line file. Instead of dumping
all 280 lines into context, it got an outline showing the component structure:

```vue
<script setup>
props: { id: string }
computed: title, subtitle, date, notFound, showDate
asyncComponent: PostContent
function enhance(): void
function loadMathJax(): void
</script>

<template>
  div.centered-box h1.title p.subtitle p.post-date Suspense PostContent
</template>

<style scoped>
.title { ... }
.subtitle { ... }
.margin { ... }
.post-date { ... }
.hide-overflow { ... }
</style>
```

The planner then called `read` with `symbol=loadMathJax` to get just that function's 25
lines. Two calls, maybe 150 tokens total. Without the outline, it would have been a
280-line read.

This matters more than just saving tokens. When running models locally for coding,
prompt processing — reading all the required files — takes ages, often far longer than
the actual generation. Cutting down what gets read speeds up the whole loop.

### Code-tree: structural navigation

The `code-tree` extension shows a minimal directory tree of the repo (`.gitignore`-
honoring). By default it prints directories only, with a recursive file count per dir, 2
levels deep from the repo root. You can drill into a subdirectory, adjust depth (1-6),
and toggle whether files are shown at the deepest level. It's essentially the `tree`
terminal command, but consuming fewer tokens and integrated with the agent's tool set.

Here's what it outputs for this repo:

```
# tree src/frontend (262 files, depth 2)
assets/  (144)
  img/  (142)
  css-variables.yaml
  main.css
components/  (11)
  DarkModeButton.vue
  HamburgerMenu.vue
  NavMenu.vue
  NotFound.vue
  PaperAbstract.vue
  PostSnippet.vue
  ProjectBox.vue
  TalkBox.vue
  TheFooter.vue
  TheGreeting.vue
  TheHeader.vue
directives/  (1)
  index.ts
posts/  (90)
  2016-10-05-genericity-iterations-i.md
  2016-10-19-genericity-iterations-ii.md
  ...
router/  (1)
  routes.ts
seo/  (1)
  site.ts
stores/  (1)
  hamburger-active.ts
views/  (6)
  AboutView.vue
  BlogView.vue
  PapersView.vue
  PostView.vue
  ProjectsView.vue
  TalksView.vue
App.vue
about.md
main.ts
papers.yaml
projects.yaml
talks.yaml
vite-env.d.ts
```

That output is 47 lines. The full `tree -a --gitignore` equivalent? Hundreds. For an
agent just orienting itself, that's a fair bit of token savings before it's even read a
file.

### Copy-paste: referencing tool output verbatim

Every tool result is annotated with `[toolCallId: <id>]`. The `copy-paste` extension
lets agents reference tool output verbatim in their final message by writing
`{tool: <id>}` — the harness expands the placeholder before surfacing to the user,
avoiding re-emitting large outputs through the model. This works for subagents too: tell
them to return `{tool: <id>}` and you pass it through.

For large diffs or long file reads, this helps a lot. The model doesn't have to re-emit
thousands of lines; it just references the call, which cuts token usage significantly.

When the reviewer audits a large refactor, it'll return something like "Passed all
checks {tool: call_abc123}" — the harness expands that to show the full audit log
without the model needing to regenerate it. For a 50-file refactor, that's tens of
thousands of tokens saved per review.

## Core workflow extensions

These are the extensions I use for the basic agentic workflow: planning, building, and
reviewing.

### Subagent: configurable agents with git worktrees

The `subagent` extension is central to how I delegate work. It supports three modes:
single for one agent-task pair, parallel for up to 8 tasks with 4 running concurrently,
and chain for sequential execution with `{previous}` substitution. But the useful bit is
how agents are defined.

Each subagent is a Markdown file with YAML frontmatter declaring its tools, skills, and
whether it runs in a git worktree. The builder agent, for example, has `worktree: true`
in its frontmatter. When it spawns, the extension automatically creates a fresh git
worktree on a temporary branch, runs the builder there, and on exit (success, failure,
or abort) merges the branch back into the parent worktree's HEAD and cleans up.

This means multiple builders can run in parallel, each in its own worktree, without
stepping on each other's toes. I can ask Pi to "refactor the authentication module" and
it'll spawn one builder for the login logic, another for the token handling, another for
the tests — all running concurrently, all merging cleanly when they're done. The planner
keeps their scopes disjoint to avoid conflicts, but even if they overlap, the worktree
system handles it gracefully.

Agents can also declare `refuse:` patterns for hard guardrails. Want to prevent any
agent from pasting file contents into tasks? Add a pattern that blocks it before the
call even spawns. This is enforced by the harness, not a soft request in the system
prompt — useful for contracts like "don't paste file contents into my tasks" or "I don't
implement, I plan".

### Search: beyond grep and find

The `search` extension is repo-wide search backed by ripgrep for full-text search and a
SQLite definition index for symbols. It matches queries as literal strings by default
(so `foo(` or `a.b` are safe), with a regex mode if you need it. Multi-word queries like
`parse config` are tried as exact phrases first, then fall back to matching lines
containing any of the words, ranked with most-words-matched first.

The result types each have their own budget: filename matches first, then definitions,
then content matches. This means grep-style hits never get crowded out by definition
matches. Matching is case-insensitive unless the query contains an uppercase letter.
It's more general than `grep` because it knows about definitions — searching for a class
name returns the definition, not just every line that mentions it. More general than
`find` because it searches content, not just paths.

### Skill: domain-specific playbooks

The `skill` extension loads a named skill's full `SKILL.md` verbatim. People generally
know what skills are, so I'll keep this brief: having a dedicated `skill` tool means I
can allow agents to load skills without granting them general filesystem `read` access.
It also means the model doesn't need to know where skills are located — it just asks for
a skill by name.

### Memory: persistent context across sessions

The `memory` extensions let agents save things that persist across sessions. This isn't
specific to local models — even Claude Code and Codex have built-in memory features.
It's just a useful pattern for any agentic workflow.

Memories can have triggers: `startup` for every session, `tool` for specific tool calls,
or `pattern` for regex matching against messages, tool args pre-call, or tool output
post-call. A pattern match on pre-run arguments blocks that call once with the memory as
the reason, so you can encode rules like "before you install a package, check AGENTS.md"
or "if you see error X, try Y first".

Getting the injections to work properly has been tricky. Memories are auto-injected at
most once per session, and the trigger matching happens at three points: the user
message, a tool's arguments before it runs, and a tool's output after. A pre-run pattern
match blocks the call, which is how you get "before you do X, remember Y" rules. But the
system is still tweaking — I'm refining when memories fire and how they're surfaced to
avoid noise.

The `memory-audit` agent scans my turns for missed save opportunities. If I spent 10
minutes debugging the same error twice, it'll nudge me to save the fix. Tool/SDK errors
get saved with `scope=system`, project errors with `scope=project`, and repeated
requests or validation gotchas get saved as feedback with a rule, why, and how to apply.

One of my saved memories fires on the pattern `(npm|pnpm|yarn) (add|install)` — before
any package install, it blocks the call and reminds the agent to check if the package is
already a dev dependency, or if there's a local alternative. Another fires on
`git commit` and reminds the agent to run `lint-staged` first. Small things, but they
catch mistakes before they happen.

## Quality-of-life extensions

These make the day-to-day experience smoother.

### Notify: desktop notifications when agents need me

Agents don't always run in the foreground. Sometimes I want to send Pi off to refactor
something while I do other work. The `notify` extension sends desktop notifications when
long tasks complete or when an agent needs my assistance (usually via the `question`
tool).

### Caffeinate: keep the laptop awake (but not too awake)

The `caffeinate` extension keeps the system awake during long agent runs. I can start a
task, close my laptop, and come back to find it finished — then the laptop went to sleep
afterwards. It also watches temperature: if I forget it's running and put the laptop in
my bag, it'll sleep if things get too hot, protecting the battery.

### Splash: vibes matter

The `splash` extension shows a startup banner when Pi starts.

<!-- TODO: Add splash screen screenshot -->

Mostly for vibes, but honestly? It makes the thing feel more like mine. There's
something satisfying about seeing a custom splash screen instead of a bare prompt.

### Thinking-status: seeing what the model is doing

Pi defaults to showing "Working..." in the loading text above the input field. The
`thinking-status` extension changes that based on what the model is actually doing —
"Writing...", "Thinking...", "Bashing..." and so on. It's a small thing, but it's nice
to see _what_ the model is up to rather than a generic status.

### vLLM-thinking: limiting reasoning tokens

The `vllm-thinking` extension enables a vLLM flag that limits token usage on reasoning.
Once the model hits the limit, generation stops, completes with a phrase like "... Let's
answer the request now.", and then proceeds to writing the actual response.

### Web-browse: controlled browser access

The `web-browse` extension is a wrapper around
[agent-browser](https://github.com/saattrupdan/agent-browser) — the browser automation
CLI. The point of having a separate tool is that I can allow `web-browse` without
granting full `bash` access. It's also optimised for low token usage when browsing,
which matters more for local models.

### Web-search: compact search results

The `web-search` extension wraps DuckDuckGo search and returns results in a compact
format. Again, useful for local models where context window efficiency matters.

### Non-interactive: run without me

The `non-interactive` extension is a small quality-of-life thing. When I'm about to
start a long-running job and head out, it injects a prompt telling the model to proceed
without asking questions, and disables the `question` tool entirely. That way the agent
won't get stuck waiting for input I can't give it.

### Question: multiple-choice clarification

The `question` tool is standard but essential. It asks the user a single question and
waits for their answer. Supports optional multiple-choice answers with an "Other…" entry
appended automatically so the user can still type a freeform answer. To ask several
things, the agent calls it multiple times in sequence.

## Neovim integration

The Neovim integration lets me use Pi directly from my editor. I've built a plugin
([pi-agent.nvim](https://github.com/saattrupdan/pi-agent.nvim)) that opens Pi sessions
inside Neovim buffers.

<!-- TODO: Add Neovim integration screenshot -->

Beyond the normal Pi terminal experience, it adds a few things. I can split the chat
indefinitely to run multiple agent sessions concurrently. I'm also working on running Pi
sessions in virtual micro VMs, which should prevent any destructive actions from
affecting my main system.

## The setup

I'm running Pi with Qwen3.6-35B-A3B via local llama.cpp with a 262k token context. For
code autocompletion, I use Qwen2.5-coder-3B (the int8 version) through llama.vim. I
previously used the 7B model, but didn't see any significant difference with the 3B.

No internet required, no data leaves my machine, and prefix caching means subsequent
generations in the same session are fast even with large codebases. My MacBook Pro M4
(no discrete GPU) handles it fine — inference is maybe 10-15 tokens/s for generation,
which is plenty fast when the agent is doing other work in parallel.

The extensions live in my dotfiles repo as TypeScript plugins. The Neovim plugin is open
at [github.com/saattrupdan/pi-agent.nvim](https://github.com/saattrupdan/
pi-agent.nvim). If you want to set up something similar with Pi yourself, the main
ingredients are a local inference backend, the Pi framework, and whatever extensions you
need for your workflow.

## Closing thoughts

I switched to Pi because its extension model fit my local-model-optimised workflows
better. Pi's extensible architecture means I can add tools for local model quirks,
optimise for token efficiency, and integrate with Neovim in ways that work for me. The
result is something that adapts to how I work, not the other way around.

This is version 3 of my agentic setup. There will be a version 4. The field is moving
fast, and I'm still finding new extensions to write, new agent patterns to encode, and
new ways to make the orchestrator smarter. Next up: better dependency tracking for
parallel builders, smarter memory injection to reduce noise, and probably a few more
quality-of-life extensions I haven't thought of yet.

But for now, it's the best coding setup I've had. And it's mine.

Have fun coding 😊
