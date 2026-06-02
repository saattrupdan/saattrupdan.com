---
title: Local AI Coding Assistant in Neovim in 2026 v3
subtitle: Building Pi Because Opencode Wouldn't Let Me
meta: Why I stopped using Opencode and built my own agentic environment with extensible tools, local models, and nvim integration.
tags: llm, ai, coding assistant, agentic, local, pi, neovim, opencode
---

In my [previous post](/posts/2026-03-08-local-ai-coding-assistant-in-nvim-v2), I covered
my improved setup for a local AI coding assistant in Neovim. Just for a brief recap: I
was running Qwen3.5-35B-A3B on llama.cpp for chat and code editing, with Qwen2.5-coder-7b
handling auto-completion via llama.vim. Chat went through Claude Code in the terminal,
which was already a massive upgrade over my old CodeCompanion setup.

But there was still something missing. I'd been eyeing Opencode — it had some features I
really wanted, like proper subagent support and git worktrees for parallel builders. The
problem? Actually changing anything in Opencode was a pain. The codebase wasn't built for
extension; it was built for monolithic development. Want to tweak how agents read files?
Better fork the whole thing. Want to add a new tool? Prepare for a fight with the
architecture.

So I did what any self-respecting programmer would do: I built my own. Over the past few
months, I've been developing **Pi**, a self-hosted agentic environment designed from the
ground up to be extensible. Every feature is a plugin. Every tool can be modified without
touching the core. And the result is something that actually adapts to how I work, not
the other way around.

This post is part of a series on local AI coding assistants:

1. <router-link to="/posts/2026-01-18-local-ai-coding-assistant-in-nvim">Local AI Coding Assistant in Neovim in 2026</router-link>
2. <router-link to="/posts/2026-03-08-local-ai-coding-assistant-in-nvim-v2">Local AI Coding Assistant in Neovim in 2026 v2</router-link>
3. Local AI Coding Assistant in Neovim in 2026 v3

Here's why I built Pi, the extensions that make it worth using, and how the Neovim
integration lets me run multiple agents in parallel without losing my mind.

## Why Pi over Opencode

Opencode is solid — I'll give it that. It has subagents, it has git integration, it has
a lot of what I wanted. But here's the thing: I couldn't change it without rewriting it.
The extension points were limited, and the ones that existed required deep dives into the
core architecture. When I wanted to add a tool that keeps my laptop from sleeping during
long agent runs, I couldn't just… add it. When I wanted builders to automatically merge
their git worktrees, I had to understand the entire agent lifecycle.

Pi is different because it's built around a simple idea: everything is an extension.
Tools are TypeScript plugins. Agents are Markdown files with YAML frontmatter. Skills are
just `SKILL.md` files in a directory. Want to add a new tool? Drop a plugin in
`extensions/`. Want to change how reading works? Edit the `read` extension without
touching the orchestrator. Want to add a subagent that reviews code? Create a new agent
definition and you're done.

The difference is night and day. With Opencode, I was working around its limitations.
With Pi, I'm extending its capabilities. And that's made all the difference.

## The extension ecosystem

Extensions are where Pi really shines. Each one is a TypeScript plugin that registers
new tools or modifies existing behavior. I've built around 20 at this point, and they
range from quality-of-life improvements to fundamental changes in how agents interact
with code. Let me walk through the ones I use every day.

### Subagent: configurable agents with git worktrees

The `subagent` extension is the heart of Pi's delegation system. It supports three modes:
single for one agent-task pair, parallel for up to 8 tasks with 4 running concurrently,
and chain for sequential execution with `{previous}` substitution. But the real magic is
in how agents are defined.

Each subagent is a Markdown file with YAML frontmatter declaring its tools, skills, and
whether it runs in a git worktree. The builder agent, for example, has `worktree: true`
in its frontmatter. When it spawns, the extension automatically creates a fresh git
worktree on a temporary branch, runs the builder there, and on exit (success, failure, or
abort) merges the branch back into the parent worktree's HEAD and cleans up.

This means multiple builders can run in parallel, each in its own worktree, without
stepping on each other's toes. I can ask Pi to "refactor the authentication module" and
it'll spawn one builder for the login logic, another for the token handling, another for
the tests — all running concurrently, all merging cleanly when they're done. The planner
keeps their scopes disjoint to avoid conflicts, but even if they overlap, the worktree
system handles it gracefully.

Agents can also declare `refuse:` patterns for hard guardrails. Want to prevent any agent
from pasting file contents into tasks? Add a pattern that blocks it before the call even
spawns. This is enforced by the harness, not a soft request in the system prompt — useful
for contracts like "don't paste file contents into my tasks" or "I don't implement, I
plan".

### Read: token-efficient file reading

The `read` extension replaces the harness's built-in file reader with something far more
token-efficient. It's backed by a SQLite outline index that tree-sitter generates for
known languages (Python, TypeScript, Vue, Markdown, and a few others). When you read a
file, it operates in three modes: verbatim for small files under 100 lines, outline-only
for large files, and symbol-sliced for targeted reads.

The outline mode is the key. Reading a 5000-line file doesn't return 5000 lines — it
returns a line-budgeted outline showing module docs, classes, and functions with signatures
and doc-first-lines. You can't paginate through it (there's no offset/limit), but you can
use the outline to pick a symbol, then read that symbol specifically. Re-reads are deduped
per session, so reading the same file twice returns "unchanged since call #N" instead of
the body.

It also handles way more formats than the built-in. PDFs get converted to Markdown via
docling. DOCX, XLSX, PPTX files too. Websites are fetched and converted. Images (JPG,
PNG, GIF, WebP) are passed through to the harness's image reader. The extension intercepts
reads of `SYSTEM.md` files and returns a 300-char preview plus a note that it's the
child's system prompt — useful for avoiding accidental leaks.

### Search: beyond grep and find

The `search` extension is repo-wide search backed by ripgrep for full-text search and a
SQLite definition index for symbols. It matches queries as literal strings by default
(so `foo(` or `a.b` are safe), with a regex mode if you need it. Multi-word queries like
`parse config` are tried as exact phrases first, then fall back to matching lines
containing any of the words, ranked with most-words-matched first.

The result types each have their own budget: filename matches first, then definitions,
then content matches. This means grep-style hits never get crowded out by definition
matches. Matching is case-insensitive unless the query contains an uppercase letter. It's
more general than `grep` because it knows about definitions — searching for a class name
returns the definition, not just every line that mentions it. More general than `find`
because it searches content, not just paths.

### Memory: persistent context across sessions

The `memory` extensions let agents save things that persist across sessions. Memories can
have triggers: `startup` for every session, `tool` for specific tool calls, or `pattern`
for regex matching against messages, tool args pre-call, or tool output post-call. A
pattern match on pre-run arguments blocks that call once with the memory as the reason,
so you can encode rules like "before you install a package, check AGENTS.md" or "if you
see error X, try Y first".

Getting the injections to work properly has been tricky. Memories are auto-injected at
most once per session, and the trigger matching happens at three points: the user message,
a tool's arguments before it runs, and a tool's output after. A pre-run pattern match
blocks the call, which is how you get "before you do X, remember Y" rules. But the system
is still tweaking — I'm refining when memories fire and how they're surfaced to avoid
noise.

The `memory-audit` agent scans my turns for missed save opportunities. If I spent 10
minutes debugging the same error twice, it'll nudge me to save the fix. Tool/SDK errors
get saved with `scope=system`, project errors with `scope=project`, and repeated requests
or validation gotchas get saved as feedback with a rule, why, and how to apply.

### No-repeat: breaking local model loops

This one's specific to local models. Some of them — especially the smaller ones — get
stuck in loops, calling the same tool with the same arguments over and over. The `no-repeat`
extension prevents identical tool calls from being re-issued consecutively. It's a simple
check: if the last tool call matches the current one (same tool, same arguments), block
it and force the model to try something else.

It's not perfect — agents can still get stuck in more complex loops — but it catches the
obvious cases. And for local models that don't have the same RLHF training as Claude or
GPT, it's a necessary guardrail.

### Copy-paste: referencing tool output verbatim

Every tool result is annotated with `[toolCallId: <id>]`. The `copy-paste` extension lets
agents reference tool output verbatim in their final message by writing `{tool: <id>}` —
the harness expands the placeholder before surfacing to the user, avoiding massive output
re-emission through the model. This works for subagents too: tell them to return `{tool:
<id>}` and you pass it through.

For large diffs or long file reads, this is a lifesaver. The model doesn't have to
re-emit thousands of lines; it just references the call. Token usage drops dramatically.

### Notify: desktop notifications when agents need me

Agents don't always run in the foreground. Sometimes I want to send Pi off to refactor
something while I do other work. The `notify` extension sends desktop notifications when
long tasks complete or when an agent needs my assistance (usually via the `question`
tool). I can close my laptop, let the agents run, and get pinged when they're done or
need clarification.

### Caffeinate: keep the laptop awake (but not too awake)

Speaking of closing the laptop: the `caffeinate` extension keeps the system awake during
long operations. No more waking up to find my laptop asleep mid-build. But it also watches
temperature — if the laptop gets too hot (which could happen if I accidentally put it in
my bag), it lets the system sleep to avoid battery damage. As soon as the agents are done,
it stops caffeinating and the laptop can sleep normally.

This one's purely for quality of life, but it's saved me from several "why is my laptop
on fire" moments.

### Double-check: private validation before surfacing

Sometimes agents stop out of the blue. Sometimes they forget to do final checks. The
`double-check` extension asks them privately if they forgot anything, triggering
automatically when they're done. They can simply say that they are, in which case the
user doesn't see any of it. If they did forget something, the extension prompts them to
finish up before surfacing the result.

It's like a linter for agent outputs — most of the time, it's silent. When it's not, it
catches things before I see them.

### Splash: vibes matter

The `splash` extension shows a startup banner / ASCII art when Pi starts. Mostly for vibes,
but honestly? It makes the thing feel more like mine. There's something satisfying about
seeing a custom splash screen instead of a bare prompt.

### Thinking-status: real-time reasoning visibility

Akin to Claude Code's thinking indicator, `thinking-status` and `vllm-thinking` surface
the model's thinking process in real time. Different messages show when using different
tools, so I can see *how* it's reasoning, not just the final answer. It's partly
functional (I can catch issues early) and partly just fun to watch.

### Question: multiple-choice clarification

The `question` tool is standard but essential. It asks the user a single question and
waits for their answer. Supports optional multiple-choice answers with an "Other…" entry
appended automatically so the user can still type a freeform answer. To ask several things,
the agent calls it multiple times in sequence.

### Skill: domain-specific playbooks

The `skill` extension loads a named skill's full `SKILL.md` verbatim. Skills are
name-addressable capability packs with procedural instructions for specific domains.
They're not tools themselves; they tell agents *how* to use tools in a given context.
The extension calls `loadSkills` from `pi-coding-agent` to find the matching `SKILL.md`,
then returns the file — no outlining, no truncation, no symbol slicing.

Why not just use `read`? Two reasons: the local `read` extension returns an outline for
any file over 100 lines (skills routinely exceed that), and splitting `skill` from `read`
lets the orchestrator load its own playbooks without granting general filesystem read
access.

### Code-tree: structural navigation

The `code-tree` extension shows a minimal directory tree of the repo (`.gitignore`-honoring).
By default it prints directories only, with a recursive file count per dir, 2 levels deep
from the repo root. You can drill into a subdirectory, adjust depth (1-6), and toggle
whether files are shown at the deepest level. It's essentially the `tree` terminal command,
but consuming fewer tokens and integrated with the agent's tool set.

## Local model quirks and token efficiency

A lot of these extensions are specifically designed to deal with the quirks of local
models and minimize token usage. Local models don't have the same RLHF training as Claude
or GPT — they get stuck in loops, they forget context, they hallucinate tool calls.
Extensions like `no-repeat`, `double-check`, and `memory` are guardrails that make local
models usable for serious work.

Token efficiency matters too. Running locally means I'm not paying per token, but I'm
still constrained by context window and inference speed. Extensions like `read` (with its
outline mode), `copy-paste` (with verbatim references), and `code-tree` (with token-efficient
output) all help keep token usage down without sacrificing functionality.

## Neovim integration

The real game-changer, though, is the Neovim integration. I've built a plugin
([pi-agent.nvim](https://github.com/saattrupdan/pi-agent.nvim)) that splits the screen
to have multiple agents running in a repo simultaneously. One buffer for the orchestrator,
one for each subagent. You can watch the planner work out the implementation plan while
builders are spinning up their worktrees, then jump to the reviewer buffer to see the
verdict come in.

*[Screenshot: Neovim split with orchestrator, planner, and two builders running in parallel]*

The plugin handles the terminal multiplexing, keeps each agent's output isolated, and
lets me jump between them with keybindings. It's like having a war room for my code —
I can see everything happening at once, intervene when needed, and let the agents run
autonomously otherwise.

*[Screenshot: Close-up of a builder agent committing changes in its worktree]*

The integration also surfaces tool calls in real time. When a builder calls `edit` or
`bash`, I see it happen. When the reviewer calls `search` to audit a change, I can watch
the query. It's not just functional — it's _visible_, which builds trust in a way that
a black-box agent never could.

## The code

Pi itself is not yet open source — it's a personal project, and parts of it are pretty
tied to my specific workflow. But the Neovim plugin is open, and the extensions I write
are in my dotfiles repo. If you want to set up something like this yourself, the main
ingredients are a local inference backend (I use llama.cpp with Qwen3.6-35B-A3B), an
orchestrator harness that can call tools and delegate to subagents, extensions for the
tools you need, and agent definitions for your workflow.

The specific implementation details matter less than the architecture: orchestrator plus
specialised agents, extensible tools, and persistent memory. You could build something
similar with Cursor rules, or with Cline's custom modes, or with any other agentic
framework. The key is treating AI as a team, not a tool — and making sure you can actually
change the team when you need to.

## Closing thoughts

I built Pi because Opencode wouldn't let me change it. That frustration turned into a
system where everything is an extension, every tool is modifiable, and every agent is
configurable. The result is something that adapts to how I work, not the other way around.

This is version 3 of my agentic setup. There will be a version 4. The field is moving
fast, and I'm still finding new extensions to write, new agent patterns to encode, and
new ways to make the orchestrator smarter. Next up: better dependency tracking for
parallel builders, smarter memory injection to reduce noise, and probably a few more
quality-of-life extensions I haven't thought of yet.

But for now, it's the best coding setup I've had. And it's mine.

Have fun coding 😊
