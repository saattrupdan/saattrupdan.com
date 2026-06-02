---
title: Local AI Coding Assistant in Neovim in 2026 v3
meta: Follow-up to my posts on local AI coding in Neovim. Still no internet required — but now with agents that actually write the code themselves.
tags: llm, ai, coding assistant, agentic, local, pi, neovim, autonomy
---

In my [previous post](/posts/2026-03-08-local-ai-coding-assistant-in-nvim-v2), I covered
an improved setup for a local AI coding assistant in Neovim. Quick recap: I was running
Qwen3.5-35B-A3B on llama.cpp for chat and code editing, with Qwen2.5-coder-7b for
auto-completion via llama.vim. Chat went through Claude Code in Neovim, which was a
significant upgrade over the old CodeCompanion setup.

That was already a solid workflow, but there was still something missing. Even with a
great local model, I was still in "copilot mode" — asking questions, getting suggestions,
copy-pasting the good bits and fixing the rest. Useful, sure, but I kept wondering: what
if the AI could just _do the thing_? Not suggest it, not talk about it, but actually
write the code, run the tests, and commit the result.

So I've changed things up again. I'm now using **Pi**, a self-hosted agentic environment
that I've been building over the past few months. Instead of a single model that chats,
Pi is an orchestrator that delegates to specialised subagents: one plans the work, others
implement it in parallel, one reviews the results. I give it a high-level goal and it
comes back with commits ready to merge.

This post is part of a series on local AI coding assistants:

1. <router-link to="/posts/2026-01-18-local-ai-coding-assistant-in-nvim">Local AI Coding Assistant in Neovim in 2026</router-link>
2. <router-link to="/posts/2026-03-08-local-ai-coding-assistant-in-nvim-v2">Local AI Coding Assistant in Neovim in 2026 v2</router-link>
3. Local AI Coding Assistant in Neovim in 2026 v3

Here's how Pi works, the extensions and skills that power it, and why switching from
"assistant" to "orchestrator" changed everything for me. Pi isn't just a chat interface or a code completion
engine. It's an orchestrator for a growing ecosystem of specialised subagents, extensions,
and skills — a toolkit that lets me delegate real work to AI and have it actually get
done.

## The philosophy: orchestrator, not assistant

The key insight that changed everything for me was switching from an "assistant" model to
an "orchestrator" model. Instead of asking a single model to "help me write code", I now
delegate tasks to specialised subagents, each with a clear role and the right tools for
their job:

- **planner** — turns a vague request into an ordered, parallel-friendly implementation plan
- **builder** — implements one scoped change in an isolated git worktree, commits, and merges back
- **explorer** — read-only navigation of my codebase and the web, returning paths, summaries, and line ranges
- **reviewer** — audits recent commits and produces a verdict (Pass / Needs changes / Block)
- **memory-audit** — scans my session for things I should have saved for future context

The orchestrator (Pi itself) has full tool access but *prefers* to delegate. This keeps
token usage down, enables parallel execution (up to 4 concurrent builders), and gives
each subagent a clean, isolated context. Builders run in temporary git worktrees — they
commit before exiting, and their changes are merged back automatically.

*[Screenshot: Pi terminal session showing a planner → parallel builders → reviewer flow]*

## The runtime: `~/.pi/agent`

Pi lives in `~/.pi/agent`, which is the runtime config and state root for the whole
system. Think of it like `~/.claude/` but for a self-hosted agent. The directory holds:

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
the same session are fast even with large codebases.

*[Screenshot: directory tree of ~/.pi/agent]*

## Extensions: extending Pi's capabilities

Extensions are TypeScript plugins that register new tools. Pi ships with a core set, and
I've added several more. Here are the ones I use most:

### Core workflow extensions

**`subagent`** — the delegation engine. Three modes: single (`{agent, task}`), parallel
(`{tasks: [...]}`, up to 8 tasks with 4 concurrent), and chain (`{chain: [...]}` with
`{previous}` substitution). Agents can declare `refuse:` patterns for hard guardrails
(e.g. "don't paste file contents") that block the call before it even spawns.

**`read`** — an index-backed file reader that replaces the harness's built-in. Three
modes: verbatim for small files, outline-only for large files (no pagination!), and
symbol-sliced for targeted reads. The outline is tree-sitter generated, showing
classes/functions with signatures and doc-first-lines. Re-reads are deduped per session.

**`search`** — repo-wide search with Ripgrep full-text search and a SQLite definition
index. Literal by default, case-insensitive unless you use uppercase, with a regex mode.
Returns filename matches, definitions, then content(matches — each with their own budget.

**`skill`** — loads a named skill's full `SKILL.md` verbatim. Distinct from `read` so it
can be granted independently of filesystem read access, and because skills routinely
exceed the 100-line outline threshold.

### Quality-of-life extensions

**`memory` / `memory-audit`** — persistent context that survives sessions. Memories can
have triggers: `startup` (every session), `tool` (specific tool call), or `pattern` (regex
matched against messages, tool args pre-call, or tool output post-call). A pattern match
on pre-run arguments *blocks* that call once with the memory as the reason. The audit
agent scans my turns for missed save opportunities.

**`no-repeat`** — prevents identical tool calls from being re-issued consecutively. Useful
when the agent gets stuck in a loop.

**`copy-paste`** — lets agents reference tool output verbatim using `{tool: <id>}`
placeholders. The harness expands these before surfacing to the user, avoiding massive
output re-emission through the model.

**`thinking-status` / `vllm-thinking`** — surface the model's thinking process in real
time, so I can see *how* it's reasoning, not just the final answer.

**`caffeinate`** — keeps the system awake during long operations. No more waking up to
find my laptop asleep mid-build.

**`notify`** — sends desktop notifications when long tasks complete.

*[Screenshot: Pi session with memory triggers firing]*

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

**`splash`** — startup banner / ASCII art. Mostly for vibes.

**`double-check`** — validation layer for high-stakes operations.

**`non-interactive`** — mode for scripted / CI runs.

*[Screenshot: web-browse session automating a login flow]*

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

*[Screenshot: bolig CLI searching for listings with "altan"]*

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

*[Screenshot: a slides deck being generated from a markdown outline]*

### DMZ skills (Alexandra-internal)

These require VPN + credentials and are **blocked for cloud LLMs**:

**`alexandra-confluence`** — CLI access to Alexandra's internal Confluence
(confluence.alexandra.dk). Browse spaces, search with CQL, CRUD pages.

**`alexandra-vera`** — hour allocation system at vera.alexandra.dk. List/add/change/remove
allocations, view project budgets, browse by person/project/month.

### Portal stubs

**`kultunaut-dk`** — Danish cultural events (cinema, adult education, calendars).

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

*[Screenshot: parallel builders running in separate worktrees]*

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

## What makes this different

I've tried a lot of AI coding setups: Copilot, Cursor, Cline, Claude Code, and various
local setups. Pi stands out for a few reasons:

**Full autonomy within scope.** Builders don't ask permission — they implement, commit,
and exit. The planner gives them disjoint scopes to avoid merge conflicts.

**No cloud dependency.** Everything runs locally. Models, extensions, skills — none of it
phones home. I can work on sensitive codebases without data leakage concerns.

**Extensibility.** Want a new tool? Write a TypeScript extension. Want a new domain
capability? Drop in a `SKILL.md`. The system is designed to grow.

**Memory that matters.** Not just "remember this preference" — memories can block tool
calls *before* they run, based on patterns in the arguments. This lets me encode rules
like "before you install a package, check AGENTS.md" or "if you see error X, try Y first".

**Parallel execution.** Four concurrent builders means a refactor that would take one
agent 20 minutes takes five. The orchestrator keeps them coordinated.

*[Screenshot: timeline showing parallel builder execution vs. sequential]*

## Things I'm still iterating on

- **Worktree merging** — mostly solid, but overlapping scopes can still cause conflicts.
  The planner is responsible for keeping task groups disjoint.

- **Memory bloat** — it's easy to over-save. I'm refining my heuristics for what's worth
  remembering vs. what's trivially re-derivable.

- **Tool call loops** — even with `no-repeat`, agents can get stuck. I'm experimenting
  with better deadlock detection.

- **Skill discoverability** — with 30+ skills, remembering what exists is hard. I'm
  looking at better indexing and retrieval.

## The code

Pi itself is not (yet) open source, but the skills and extensions I write are in my
dotfiles repo. If you want to set up something similar, the main ingredients are:

1. A local inference backend (I use llama.cpp with Qwen3.6-35B-A3B)
2. An orchestrator harness that can call tools and delegate to subagents
3. Extensions for the tools you need (read, write, edit, bash, search, etc.)
4. Skills for the domains you work in
5. Agent definitions for your workflow (planner, builder, reviewer, etc.)

The specific implementation details matter less than the architecture: orchestrator +
specialised agents + extensible tools + domain skills + persistent memory.

## Closing thoughts

Agentic coding isn't about replacing myself — it's about amplifying my capacity. Pi
handles the mechanical work (reading files, running commands, writing boilerplate,
checking tests) while I focus on the actual design and decision-making. And because it's
all local, I'm not at the mercy of API rate limits, pricing changes, or service outages.

This is version 3 of my agentic setup. There will be a version 4. The field is moving
fast, and I'm still finding new patterns to encode, new skills to write, and new ways to
make the orchestrator smarter.

But for now, it's the best coding setup I've had. And it's mine.
