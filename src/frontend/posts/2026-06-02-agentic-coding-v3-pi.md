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

Here's how Pi works, the extensions and skills that power it, and why switching from
"assistant" to "orchestrator" changed everything for me.

## The philosophy: orchestrator, not assistant

The key insight that changed everything for me was realising I'd been thinking about AI
coding wrong. I'd been treating it like a pair programmer — someone to bounce ideas off,
ask questions, get suggestions from. But pair programmers don't just suggest things.
They also _do things_. They refactor files. They run tests. They fix the thing you just
broke.

So I flipped the model. Instead of a single assistant that chats, Pi is an **orchestrator**
that delegates to specialised subagents, each with a clear role and the right tools for
their job:

- **planner** — turns my vague request ("add a REST endpoint for X") into an ordered,
  parallel-friendly implementation plan. Read-only — it can't touch the code, just
  figure out what needs doing.
- **builder** — implements one scoped change in an isolated git worktree. Has full
  read/write/bash access. Commits before exiting. Changes are merged back automatically.
- **explorer** — read-only navigation of my codebase _and_ the web. Returns paths,
  URLs, line ranges, and compressed summaries. Can't edit or implement.
- **reviewer** — audits recent commits and produces a verdict: Pass, Needs changes, or
  Block. Also read-only.
- **memory-audit** — scans my session for things I should have saved for future context.
  "_You just spent 10 minutes debugging that same error — maybe we should remember the
  fix?_"

The orchestrator (Pi itself) has full tool access but *prefers* to delegate. This keeps
token usage down, enables parallel execution (up to 4 concurrent builders), and gives
each subagent a clean, isolated context. Builders run in temporary git worktrees — they
commit before exiting, and their changes are merged back automatically.

The result? I give Pi a high-level goal ("add a health check endpoint") and it comes
back with a branch, commits, and a reviewer verdict. I review the diff, maybe tweak a
thing or two, and merge. It's not magic — I still need to know what I'm asking for —
but it's shifted my role from "person who writes code" to "person who decides what
code gets written".

## The runtime: `~/.pi/agent`

Pi lives in `~/.pi/agent`, which is the runtime config and state root for the whole
system. Think of it like `~/.claude/` but for a self-hosted agent that actually writes
code. The directory holds:

- `SYSTEM.md` — the orchestrator's system prompt (the "constitution" for how Pi behaves)
- `settings.json` — default provider, model, and thinking level
- `models.json` — registry of available models and providers
- `agents/*.md` — subagent definitions (frontmatter declares tools, skills, worktree mode)
- `extensions/` — tool plugins that extend what Pi can do
- `skills/` — capability packs: procedural playbooks for specific domains
- `prompts/` — slash-command flows (e.g. `/plan-build-review`)
- `sessions/` — per-working-directory state (transcripts, artifacts)

Most of these files are symlinks into my dotfiles repo, so changes are version-controlled.
The sessions directory is ephemeral — safe to nuke if you want to wipe history for a given
project.

I'm running Qwen3.6-35B-A3B via local llama.cpp with a 262k token context. No internet
required, no data leaves my machine, and prefix caching means subsequent generations in
the same session are fast even with large codebases. My puny laptop (no GPU, just the
MacBook Pro M4) handles it fine — inference is maybe 10-15 tokens/s for generation,
which is plenty fast when the agent is doing other work in parallel.

## Extensions: extending Pi's capabilities

Extensions are TypeScript plugins that register new tools. Pi ships with a core set, and
I've added several more. Here are the ones I use most:

### Core workflow extensions

**`subagent`** — the delegation engine. Three modes: single (`{agent, task}`), parallel
(`{tasks: [...]}`, up to 8 tasks with 4 concurrent), and chain (`{chain: [...]}` with
`{previous}` substitution). Agents can declare `refuse:` patterns for hard guardrails
(e.g. "don't paste file contents into tasks") that block the call before it even spawns.

**`read`** — an index-backed file reader that replaces the harness's built-in. Three
modes: verbatim for small files (≤100 lines), outline-only for large files (no
pagination — you pick a symbol or use search), and symbol-sliced for targeted reads.
The outline is tree-sitter generated, showing classes/functions with signatures and
doc-first-lines. Re-reads are deduped per session.

**`search`** — repo-wide search with Ripgrep full-text search and a SQLite definition
index. Literal by default, case-insensitive unless you use uppercase, with a regex mode.
Returns filename matches, definitions, then content matches — each with their own budget.

**`skill`** — loads a named skill's full `SKILL.md` verbatim. Distinct from `read` so it
can be granted independently of filesystem read access, and because skills routinely
exceed the 100-line outline threshold.

### Quality-of-life extensions

**`memory` / `memory-audit`** — persistent context that survives sessions. Memories can
have triggers: `startup` (every session), `tool` (specific tool call), or `pattern`
(regex matched against messages, tool args pre-call, or tool output post-call). A pattern
match on pre-run arguments *blocks* that call once with the memory as the reason — so I
can encode rules like "before you install a package, check AGENTS.md" or "if you see
error X, try Y first". The audit agent scans my turns for missed save opportunities.

**`no-repeat`** — prevents identical tool calls from being re-issued consecutively. Useful
when the agent gets stuck in a loop (which happens more often than I'd like to admit).

**`copy-paste`** — lets agents reference tool output verbatim using `{tool: <id>}`
placeholders. The harness expands these before surfacing to the user, avoiding massive
output re-emission through the model. Lifesaver for large diffs.

**`thinking-status` / `vllm-thinking`** — surface the model's thinking process in real
time, so I can see *how* it's reasoning, not just the final answer.

**`caffeinate`** — keeps the system awake during long operations. No more waking up to
find my laptop asleep mid-build.

**`notify`** — sends desktop notifications when long tasks complete.

### Web and navigation

**`code-tree`** — structural project tree for navigation. Recursive file counts per
directory, depth control, honours `.gitignore`.

**`web-fetch`** — fetch a single URL and convert to Markdown via docling.

**`web-browse`** — headless browser interaction via the `agent-browser` CLI. Click, type,
navigate, take screenshots — full control for interactive flows.

**`web-search`** — DuckDuckGo search, returning titles, URLs, and snippets.

### Special-purpose extensions

**`edit`** — single-file edits with precise text replacement. Tolerant matching (ignores
whitespace, quotes, dashes), unique match wins.

**`question`** — ask the user for clarification. Blocks until answered.

**`double-check`** — validation layer for high-stakes operations.

Why not just use the harness's built-in tools? Two reasons. First, some of these (like
`read` and `search`) are backed by a SQLite outline index that the harness doesn't know
about — they can do structural queries the built-ins can't. Second, splitting them out
lets me grant subagents fine-grained permissions. The explorer can `read` and `search`
but not `write` or `edit`. The planner can't even `read` arbitrary files — it has to
use the index-backed `read` extension, which returns outlines for large files.

## Skills: domain-specific playbooks

Skills are name-addressable capability packs — each is a `SKILL.md` file with procedural
instructions for a specific domain. They're not tools themselves; they tell agents *how*
to use tools in a given context. I've built a large library, but here are the highlights:

### Agent infrastructure

**`agent-browser`** — browser automation CLI for AI agents. Drives Chrome/Chromium via
CDP with accessibility-tree snapshots and compact `@ref-N` element references. Used by
half my other skills for web interaction.

**`pi-extension`** — conventions and gotchas for writing Pi extensions. The key rule:
Pi is changed by extending it, never by editing the installed package.

**`agents-md`** — how to write a good `AGENTS.md` file — the top-level orientation doc
that helps agents work effectively in a repo.

**`commit`** — Conventional Commits specification for structuring git messages.

**`python` / `fastapi` / `sqlmodel` / `vue` / `full-stack`** — domain conventions for
Python code style, FastAPI backends, SQLModel ORM, Vue components, and full-stack apps
with Vue + FastAPI + PostgreSQL + Docker Compose.

### Danish public services (the "dk" skills)

A big chunk of my skills are for Danish public-service portals — these let me query
official APIs directly instead of clicking through web UIs:

**`bolig-dk`** — housing listings from boligportal.dk (rentals) and boligsiden.dk (for-sale).
Search by filters or keyword in descriptions (e.g. "badekar" for bathtub).

**`citizen-dk`** — search across borger.dk (national citizen services), nyidanmark.dk
(immigration), and frederiksberg.dk (municipal). Also factual pages for all 98 municipalities.

**`dmi-dk`** — weather forecasts, radar-satellite imagery, sea conditions, warnings, and
tide tables from Denmark's Meteorological Institute.

**`lex-dk`** — Denmark's national encyclopedia (~245k articles). A drop-in Wikipedia
replacement for Danish encyclopedic knowledge, authored by domain experts with ORCID/ROR
citation backing.

**`media-dk`** — latest headlines and content search across dr.dk (DR) and tv2.dk (TV 2).

**`retsinformation-dk`** — Danish law and regulations, legislation metadata, and
parliamentary documents.

**`skat-dk`** — the Tax Agency's portal. Covers all nine top-level citizen sections,
self-service launchers, and internal APIs.

**`sundhed.dk`** — the national e-health portal. Public content, Min Side dashboards
(MitID login), and clinician flows (MitID Erhverv/SOSI).

**`transport-dk`** — public transport via Rejseplanen's HAFAS API (same backend as the
webapp), plus disruptions from dinoffentligetransport.dk and Metro search.

**`virk-dk`** — the government portal for businesses. Themes, articles, agency tree,
self-service forms, and the GraphQL gateway.

### Productivity and communication

**`email`** — read and send email from the terminal across Gmail (IMAP/SMTP) and Microsoft
365 (Outlook on the web via agent-browser, or Microsoft Graph). **Blocked for cloud
LLMs** — email never flows through a third-party model.

**`linkedin`** — draft, post, and review my LinkedIn posts (handle: saattrupdan) via a CLI
that drives the real LinkedIn UI with agent-browser. No public API exists, so this wraps
the browser steps deterministically.

**`gh`** — GitHub CLI wrapper for managing PRs, issues, repos, Actions, gists, and API
queries. Prefer `gh` over web browsing or raw REST calls.

**`slides`** — create single-file HTML presentations using the noskillish/slides framework.
27+ components (including pure-CSS bar charts and SVG diagrams), embed mode, stepped PDF
export. Ships with templates and storytelling guides (academic vs. casual).

**`mermaid`** — generate and render mermaid diagrams. Outputs `.mmd` files with optional
SVG/PNG export.

### DMZ skills (Alexandra-internal)

These require VPN + credentials and are **blocked for cloud LLMs** — they only work with
local models:

**`alexandra-confluence`** — CLI access to Alexandra's internal Confluence
(confluence.alexandra.dk). Browse spaces, search with CQL, CRUD pages.

**`alexandra-vera`** — hour allocation system at vera.alexandra.dk. List/add/change/remove
allocations, view project budgets, browse by person/project/month.

### Portal stubs

**`kultunaut-dk`** — Danish cultural events (cinema, adult education, calendars).

Why so many Danish skills? Two reasons. First, they're satisfying to build — most of
these portals have undocumented JSON APIs that I can call directly, which is way faster
than clicking through web UIs. Second, they're a good test of the skill system: if I
can make an agent navigate a Danish government portal, I can make it do almost anything.

## The agent definitions

Each subagent is a Markdown file with YAML frontmatter. Here's what a typical one looks
like:

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

Frontmatter fields:

- `tools:` — allow-list of tools the agent can call (omitted = all)
- `skills:` — allow-list of skills (omitted = all, empty array = none)
- `worktree:` — run in a git worktree (merged back on exit)
- `model:` — explicit model override (default = inherit from parent)
- `refuse:` — deterministic guardrails (pattern + message, tested *before* spawn)

The body is appended to the agent's system prompt. No subagent may call `subagent` —
only the orchestrator delegates.

The planner is read-only and can't touch the code. The builder has full access but runs
in a worktree. The reviewer can't edit anything — it just produces a verdict. This
isolation keeps things clean.

## The flow: plan → build → review

My standard workflow for any non-trivial change is:

1. **Plan** — hand the request to `planner`. It reads the codebase, loads relevant
   memories, and returns an ordered list of disjoint builder tasks.

2. **Build** — spawn builders in parallel (up to 4 concurrent, 8 total). Each gets its
   own worktree and scoped tool/skill allow-list. They commit before exiting.

3. **Review** — hand the commits to `reviewer`. It audits for correctness, style, and
   scope. Verdict is Pass / Needs changes / Block.

4. **Memory-save** — if something came up that I'll need next time (a gotcha, a preference,
   a workaround), save it as a memory with appropriate triggers.

The `/plan-build-review` slash command wraps this entire flow, including a memory-audit
at the end. I use `/plan-and-build` when I just want implementation without the review
step.

Here's a concrete example. Yesterday I asked Pi to "add a health check endpoint to the
backend". The planner came back with three tasks: (1) add the endpoint, (2) add a test,
(3) update the docs. Two builders ran in parallel — one for the endpoint, one for the
test. The reviewer passed them both. Total time: maybe 3-4 minutes, most of which was
inference. I reviewed the diff, merged, and moved on.

## What makes this different

I've tried a lot of AI coding setups: Copilot, Cursor, Cline, Claude Code, and various
local setups. Pi stands out for a few reasons:

**Full autonomy within scope.** Builders don't ask permission — they implement, commit,
and exit. The planner gives them disjoint scopes to avoid merge conflicts. I'm still
in the loop (I review before merging), but I'm not micromanaging.

**No cloud dependency.** Everything runs locally. Models, extensions, skills — none of it
phones home. I can work on sensitive codebases without data leakage concerns. And I'm
not at the mercy of API rate limits, pricing changes, or service outages.

**Extensibility.** Want a new tool? Write a TypeScript extension. Want a new domain
capability? Drop in a `SKILL.md`. The system is designed to grow. I started with maybe
5 extensions; now I have 20+. Same with skills — I add them as I need them.

**Memory that matters.** Not just "remember this preference" — memories can block tool
calls *before* they run, based on patterns in the arguments. This lets me encode rules
like "before you install a package, check AGENTS.md" or "if you see error X, try Y
first". It's like training wheels, but for AI.

**Parallel execution.** Four concurrent builders means a refactor that would take one
agent 20 minutes takes five. The orchestrator keeps them coordinated.

There's also something psychological that's shifted for me. When I'm using an assistant,
I'm constantly second-guessing: "Is this suggestion right? Should I trust this? Do I
need to verify?" When I'm using Pi, I'm making decisions: "Is this the right goal? Are
these the right constraints?" It's shifted my cognitive load from verification to
direction. And that, for me, has been the real win.

## Things I'm still iterating on

No system is perfect. Here are the rough edges I'm still working through:

**Worktree merging** — mostly solid, but overlapping scopes can still cause conflicts.
The planner is responsible for keeping task groups disjoint, but it doesn't always get
it right. I'm experimenting with better dependency tracking.

**Memory bloat** — it's easy to over-save. I've got maybe 50 memories at this point,
and some are probably redundant. I'm refining my heuristics for what's worth
remembering vs. what's trivially re-derivable (or already in git blame).

**Tool call loops** — even with `no-repeat`, agents can get stuck. I'm experimenting
with better deadlock detection and automatic escalation ("this isn't working, let me
ask the user").

**Skill discoverability** — with 30+ skills, remembering what exists is hard. I'm
looking at better indexing and retrieval — maybe a skill that searches other skills.

**Model choice** — Qwen3.6-35B-A3B is great, but I'm curious about MoEs with higher
sparsity. Also, the field is moving fast — there's probably a better model out there
that I haven't tried yet.

## The code

Pi itself is not (yet) open source — it's a personal project, and parts of it are pretty
tied to my specific workflow. But the skills and extensions I write are in my dotfiles
repo, and I'm happy to chat with anyone building something similar.

If you want to set up something like this yourself, the main ingredients are:

1. A local inference backend (I use llama.cpp with Qwen3.6-35B-A3B)
2. An orchestrator harness that can call tools and delegate to subagents
3. Extensions for the tools you need (read, write, edit, bash, search, etc.)
4. Skills for the domains you work in
5. Agent definitions for your workflow (planner, builder, reviewer, etc.)

The specific implementation details matter less than the architecture: orchestrator +
specialised agents + extensible tools + domain skills + persistent memory. You could
build something similar with Cursor rules, or with Cline's custom modes, or with any
other agentic framework. The key is treating AI as a team, not a tool.

## Closing thoughts

Agentic coding isn't about replacing myself — it's about amplifying my capacity. Pi
handles the mechanical work (reading files, running commands, writing boilerplate,
checking tests) while I focus on the actual design and decision-making. And because it's
all local, I'm not at the mercy of API rate limits, pricing changes, or service outages.

This is version 3 of my agentic setup. There will be a version 4. The field is moving
fast, and I'm still finding new patterns to encode, new skills to write, and new ways to
make the orchestrator smarter. Next up: I want to experiment with a dedicated "refactor"
agent that can handle cross-file changes more gracefully, and maybe a "product manager"
agent that can help me break down vague features into implementable tasks.

But for now, it's the best coding setup I've had. And it's mine.

Have fun coding 😊
