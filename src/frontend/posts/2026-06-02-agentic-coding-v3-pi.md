---
title: Local AI Coding Assistant in Neovim in 2026 v3
subtitle: From Assistant to Orchestrator
meta: How I stopped asking AI to help me code and started having it just write the thing. Local, agentic, and fully autonomous.
tags: llm, ai, coding assistant, agentic, local, pi, neovim, autonomy
---

In my [previous post](/posts/2026-03-08-local-ai-coding-assistant-in-nvim-v2), I covered
my improved setup for a local AI coding assistant in Neovim. Just for a brief recap: I
was running Qwen3.5-35B-A3B on llama.cpp for chat and code editing, with Qwen2.5-coder-7b
handling auto-completion via llama.vim. Chat went through Claude Code in the terminal,
which was already a massive upgrade over my old CodeCompanion setup.

But there was still something missing. Even with a solid local model and a decent
terminal interface, I was stuck in what I now call "copilot mode" — asking questions,
getting suggestions, copying the good bits and fixing the rest. It was useful, sure, but
I kept wondering: what if the AI could just _do the thing_? Not suggest it, not talk
about it, but actually write the code, run the tests, and commit the result?

So I've changed things up again. Over the past few months, I've been building **Pi**, a
self-hosted agentic environment that treats AI as an orchestrator rather than an
assistant. Instead of a single model that chats, Pi delegates to specialised subagents:
one plans the work, others implement it in parallel, one reviews the results. I give it
a high-level goal and it comes back with commits ready to merge. No internet required,
no data leaves my machine, and — here's the kicker — it actually gets stuff done.

This post is part of a series on local AI coding assistants:

1. <router-link to="/posts/2026-01-18-local-ai-coding-assistant-in-nvim">Local AI Coding Assistant in Neovim in 2026</router-link>
2. <router-link to="/posts/2026-03-08-local-ai-coding-assistant-in-nvim-v2">Local AI Coding Assistant in Neovim in 2026 v2</router-link>
3. Local AI Coding Assistant in Neovim in 2026 v3

Here's how Pi works, the extensions that power it, and why switching from "assistant" to
"orchestrator" changed everything for me.

## The philosophy: orchestrator, not assistant

The key insight that changed everything for me was realising I'd been thinking about AI
coding wrong. I'd been treating it like a pair programmer — someone to bounce ideas off,
ask questions, get suggestions from. But pair programmers don't just suggest things.
They also _do things_. They refactor files. They run tests. They fix the thing you just
broke.

So I flipped the model. Instead of a single assistant that chats, Pi is an **orchestrator**
that delegates to specialised subagents, each with a clear role and the right tools for
their job. There's the **planner**, which turns my vague requests like "add a REST endpoint
for user profiles" into an ordered, parallel-friendly implementation plan. It's read-only
— it can't touch the code, just figure out what needs doing. Then there are the **builders**,
each one implementing a scoped change in an isolated git worktree with full read/write/bash
access. They commit before exiting, and their changes get merged back automatically.

When I need to understand something, I send the **explorer** — it navigates my codebase
or the web, returning paths, URLs, line ranges, and compressed summaries, but it can't
edit or implement. Once the builders are done, the **reviewer** audits the commits and
produces a verdict: Pass, Needs changes, or Block. And lurking in the background is the
**memory-audit** agent, scanning my session and reminding me to save the things I'll need
next time — "You just spent 10 minutes debugging that same error — maybe we should remember
the fix?"

The orchestrator (Pi itself) has full tool access but prefers to delegate. This keeps
token usage down, enables parallel execution (up to 4 concurrent builders), and gives
each subagent a clean, isolated context. Builders run in temporary git worktrees — they
commit before exiting, and their changes are merged back automatically. The result? I
give Pi a high-level goal like "add a health check endpoint" and it comes back with a
branch, commits, and a reviewer verdict. I review the diff, maybe tweak a thing or two,
and merge. It's not magic — I still need to know what I'm asking for — but it's shifted
my role from "person who writes code" to "person who decides what code gets written".

## The runtime: `~/.pi/agent`

Pi lives in `~/.pi/agent`, which is the runtime config and state root for the whole
system. Think of it like `~/.claude/` but for a self-hosted agent that actually writes
code. The directory holds the orchestrator's system prompt in `SYSTEM.md` — essentially
the constitution for how Pi behaves — along with `settings.json` for the default provider,
model, and thinking level. There's `models.json` registering available models and providers,
an `agents/` directory with subagent definitions where frontmatter declares tools, skills,
and worktree mode, plus `extensions/` for tool plugins and `skills/` for capability packs
with procedural playbooks for specific domains. The `prompts/` directory holds slash-command
flows like `/plan-build-review`, while `sessions/` stores per-working-directory state
including transcripts and artifacts.

Most of these files are symlinks into my dotfiles repo, so changes are version-controlled.
The sessions directory is ephemeral — safe to nuke if you want to wipe history for a given
project. I'm running Qwen3.6-35B-A3B via local llama.cpp with a 262k token context. No
internet required, no data leaves my machine, and prefix caching means subsequent
generations in the same session are fast even with large codebases. My puny laptop (no
GPU, just the MacBook Pro M4) handles it fine — inference is maybe 10-15 tokens/s for
generation, which is plenty fast when the agent is doing other work in parallel.

## The extension ecosystem

Extensions are TypeScript plugins that register new tools. Pi ships with a core set, and
I've added several more. The heart of the system is the `subagent` extension — the
delegation engine that supports three modes: single for one agent-task pair, parallel
for up to 8 tasks with 4 running concurrently, and chain for sequential execution with
`{previous}` substitution. Agents can declare `refuse:` patterns for hard guardrails
like "don't paste file contents into tasks" that block the call before it even spawns.

For reading code, I use a custom `read` extension backed by a SQLite outline index. It
operates in three modes: verbatim for small files under 100 lines, outline-only for large
files with no pagination (you pick a symbol or use search), and symbol-sliced for targeted
reads. The outline is tree-sitter generated, showing classes and functions with signatures
and doc-first-lines, and re-reads are deduped per session. Paired with this is `search`,
which does repo-wide search with Ripgrep full-text search and the same SQLite definition
index. It's literal by default, case-insensitive unless you use uppercase, with a regex
mode, and returns filename matches, definitions, then content matches — each with their
own budget.

The `skill` extension loads a named skill's full `SKILL.md` verbatim. This is distinct
from `read` so it can be granted independently of filesystem read access, and because
skills routinely exceed the 100-line outline threshold. For persistent context, there's
`memory` and `memory-audit` — memories can have triggers like `startup` for every session,
`tool` for specific tool calls, or `pattern` for regex matching against messages, tool
args pre-call, or tool output post-call. A pattern match on pre-run arguments blocks that
call once with the memory as the reason, so I can encode rules like "before you install
a package, check AGENTS.md" or "if you see error X, try Y first". The audit agent scans
my turns for missed save opportunities.

Rounding out the quality-of-life extensions are `no-repeat` to prevent identical tool
calls from being re-issued consecutively (which happens more often than I'd like to admit),
`copy-paste` to let agents reference tool output verbatim using `{tool: <id>}` placeholders
— a lifesaver for large diffs — and `thinking-status` or `vllm-thinking` to surface the
model's thinking process in real time. There's also `caffeinate` to keep the system awake
during long operations (no more waking up to find my laptop asleep mid-build) and `notify`
to send desktop notifications when long tasks complete.

For navigation and web work, I have `code-tree` for structural project trees with recursive
file counts per directory and depth control that honours `.gitignore`, plus `web-fetch`
to convert URLs to Markdown via docling, `web-browse` for headless browser interaction
through the agent-browser CLI (click, type, navigate, take screenshots — full control for
interactive flows), and `web-search` for DuckDuckGo results with titles, URLs, and snippets.
Special-purpose extensions include `edit` for single-file edits with precise text
replacement using tolerant matching, `question` to ask me for clarification (blocks until
answered), and `double-check` as a validation layer for high-stakes operations.

Why not just use the harness's built-in tools? Two reasons. First, some of these like `read`
and `search` are backed by a SQLite outline index that the harness doesn't know about —
they can do structural queries the built-ins can't. Second, splitting them out lets me
grant subagents fine-grained permissions. The explorer can read and search but not write
or edit. The planner can't even read arbitrary files — it has to use the index-backed read
extension, which returns outlines for large files.

## The agent definitions

Each subagent is a Markdown file with YAML frontmatter declaring its tools, skills, and
whether it runs in a worktree. The body gets appended to the agent's system prompt. A
typical builder looks something like this:

```yaml
---
name: builder
description: Implements one scoped change. Full read/write/bash.
tools: search, read, write, edit, bash, memory_index, memory_read, question
worktree: true
skills: [commit, python, fastapi, vue]
---

You are a builder agent. Implement the assigned change in scope.
Commit your changes before finishing. Merges happen automatically.
```

The frontmatter fields control what the agent can do: `tools:` is an allow-list (omitted
means all), `skills:` similarly (empty array means none), `worktree:` runs it in a git
worktree that gets merged back on exit, `model:` can override the inherited model, and
`refuse:` declares deterministic guardrails tested before spawn. The body is the actual
instructions. No subagent may call `subagent` — only the orchestrator delegates. The
planner is read-only and can't touch the code. The builder has full access but runs in a
worktree. The reviewer can't edit anything — it just produces a verdict. This isolation
keeps things clean.

## The flow: plan → build → review

My standard workflow for any non-trivial change follows a simple pattern. First, I hand
the request to the planner. It reads the codebase, loads relevant memories, and returns
an ordered list of disjoint builder tasks. Then I spawn builders in parallel — up to 4
concurrent, 8 total — each getting its own worktree and scoped tool and skill allow-list.
They commit before exiting. Once they're done, I hand the commits to the reviewer, which
audits for correctness, style, and scope, producing a verdict of Pass, Needs changes, or
Block. Finally, if something came up that I'll need next time — a gotcha, a preference,
a workaround — I save it as a memory with appropriate triggers.

The `/plan-build-review` slash command wraps this entire flow, including a memory-audit
at the end. I use `/plan-and-build` when I just want implementation without the review
step. Yesterday I asked Pi to "add a health check endpoint to the backend" and the planner
came back with three tasks: add the endpoint, add a test, update the docs. Two builders
ran in parallel — one for the endpoint, one for the test. The reviewer passed them both.
Total time was maybe 3-4 minutes, most of which was inference. I reviewed the diff, merged,
and moved on.

## What makes this different

I've tried a lot of AI coding setups: Copilot, Cursor, Cline, Claude Code, and various
local setups. Pi stands out for a few reasons. Full autonomy within scope means builders
don't ask permission — they implement, commit, and exit. The planner gives them disjoint
scopes to avoid merge conflicts. I'm still in the loop since I review before merging, but
I'm not micromanaging. No cloud dependency means everything runs locally. Models, extensions,
skills — none of it phones home. I can work on sensitive codebases without data leakage
concerns, and I'm not at the mercy of API rate limits, pricing changes, or service outages.

Extensibility is another big one. Want a new tool? Write a TypeScript extension. The system
is designed to grow. I started with maybe 5 extensions; now I have 20+. Memory that matters
goes beyond simple preferences — memories can block tool calls before they run based on
patterns in the arguments. This lets me encode rules like "before you install a package,
check AGENTS.md" or "if you see error X, try Y first". It's like training wheels, but for
AI. Parallel execution means four concurrent builders can knock out a refactor that would
take one agent 20 minutes in about five. The orchestrator keeps them coordinated.

There's also something psychological that's shifted for me. When I'm using an assistant,
I'm constantly second-guessing: "Is this suggestion right? Should I trust this? Do I need
to verify?" When I'm using Pi, I'm making decisions: "Is this the right goal? Are these
the right constraints?" It's shifted my cognitive load from verification to direction.
And that, for me, has been the real win.

## Things I'm still iterating on

No system is perfect, and there are rough edges I'm still working through. Worktree merging
is mostly solid, but overlapping scopes can still cause conflicts. The planner is responsible
for keeping task groups disjoint, but it doesn't always get it right — I'm experimenting
with better dependency tracking. Memory bloat is real; it's easy to over-save. I've got
maybe 50 memories at this point, and some are probably redundant. I'm refining my heuristics
for what's worth remembering versus what's trivially re-derivable or already in git blame.

Tool call loops still happen even with no-repeat, so I'm experimenting with better deadlock
detection and automatic escalation — "this isn't working, let me ask the user". Model choice
is an ongoing question. Qwen3.6-35B-A3B is great, but I'm curious about MoEs with higher
sparsity. The field is moving fast — there's probably a better model out there that I haven't
tried yet.

## The code

Pi itself is not yet open source — it's a personal project, and parts of it are pretty tied
to my specific workflow. But the extensions I write are in my dotfiles repo, and I'm happy
to chat with anyone building something similar. If you want to set up something like this
yourself, the main ingredients are a local inference backend (I use llama.cpp with
Qwen3.6-35B-A3B), an orchestrator harness that can call tools and delegate to subagents,
extensions for the tools you need like read, write, edit, bash, and search, and agent
definitions for your workflow like planner, builder, and reviewer.

The specific implementation details matter less than the architecture: orchestrator plus
specialised agents, extensible tools, and persistent memory. You could build something
similar with Cursor rules, or with Cline's custom modes, or with any other agentic
framework. The key is treating AI as a team, not a tool.

## Closing thoughts

Agentic coding isn't about replacing myself — it's about amplifying my capacity. Pi handles
the mechanical work like reading files, running commands, writing boilerplate, and checking
tests, while I focus on the actual design and decision-making. And because it's all local,
I'm not at the mercy of API rate limits, pricing changes, or service outages. This is version
3 of my agentic setup. There will be a version 4. The field is moving fast, and I'm still
finding new patterns to encode, new extensions to write, and new ways to make the orchestrator
smarter. Next up, I want to experiment with a dedicated refactor agent that can handle
cross-file changes more gracefully, and maybe a product manager agent that can help me break
down vague features into implementable tasks.

But for now, it's the best coding setup I've had. And it's mine.

Have fun coding 😊
