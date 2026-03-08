---
title: Local AI Coding Assistant in Neovim in 2026 v2
meta: A follow-up to my previous post on setting up a local AI coding assistant in Neovim in 2026. Still no internet required!
tags: llm, coding assistant, ai, neovim, local, llama.cpp, claude code
---

In my [previous post](/posts/2026-01-18-local-ai-coding-assistant-in-nvim), I covered my
setup of a local AI coding assistant in Neovim. Just for a brief recap in case you
haven't had a look at that one yet, I ended up going for a two-model strategy, with a
smaller Qwen2.5-coder model for auto-completion, and a larger gpt-oss-20b model for chat
and code editing. These were running using llama.cpp and LM Studio, respectively, with
the nvim plugins llama.vim and codecompanion.nvim. For auto-completion, I used llama.vim,
while for chat and code editing I used CodeCompanion.

Since then, I've changed up several bits to that setup, and wanted to cover that here,
to offer a more up-to-date version of the setup. Because two months is old in this crazy
field that we're in 🙃

This post is part of a series on local AI coding assistants:

1. <router-link to="/posts/2026-01-18-local-ai-coding-assistant-in-nvim">Local AI Coding Assistant in Neovim in 2026</router-link>
2. Local AI Coding Assistant in Neovim in 2026 - v2

### What was wrong with the previous setup?

There were several pain points with the old setup that motivated me to make changes.
CodeCompanion limitations were a primary concern, as it only supported the tool use
format of OpenAI models (such as GPT-OSS), which meant I was locked into using that
specific model family. This was frustrating because the Qwen3.5-35B-A3B model has shown
itself to be excellent for code editing and tool use, but I couldn't use it with
CodeCompanion.

Additionally, I encountered bugs during generation. CodeCompanion kept encountering
minor bugs during generation, particularly around tool calling and file editing. These
weren't critical failures, but they were annoying enough to interrupt my workflow. There
was also a lack of autonomy; CodeCompanion had trouble being autonomous, keeping asking
whether it should do things, like run tests or implement fixes, rather than just doing
them. This constant back-and-forth was frustrating when I just wanted to give a
high-level request and have the AI handle the details.

Finally, LM Studio's missing features impacted performance. LM Studio does not support
prefix caching (also known as prompt caching), which meant that the model had to
reprocess the entire prompt for each generation. This caused generation to be very slow
with large codebases, as the context could easily reach tens of thousands of tokens.

### Inference backend: everything in llama.cpp

A neat change for this new setup is that all LLM inference can run in a single place, a
simple llama.cpp server, as recent updates have transformed it into a much more complete
solution.

Prefix caching means the model can reprocess only the new part of the prompt rather
than the entire prompt. This is a massive performance win when working with large
codebases, as the context (directory structure, file contents, system prompts) remains
largely the same across generations. This has been around for a while in llama.cpp, but
I guess I didn't appreciate how important this was until now.

Llama.cpp could previously only run a single model at a time, meaning that to run
several models you'd have to run (and manage!) several servers at once. If you
furthermore wanted the models to be loaded into memory only when needed, you'd be at a
loss. There were some previous solutions to this like
[Llama-swap](https://github.com/mostlygeek/llama-swap), but the new [router
mode](https://huggingface.co/blog/ggml-org/model-management-in-llamacpp) in llama.cpp
has made this much easier. You simply run the server without specifying a model, and it
automatically acts as a router which can dynamically load models into memory when
needed (if they're already downloaded, that is). They also added a new
`--sleep-idle-seconds` argument which automatically deallocates GPU memory when the
model is not in use. Super neat!

These features are what drew me to LM Studio in the first place, but now we can do it
all with llama.cpp directly.  Here's how I set up the llama.cpp server with multiple
models:

```bash
llama-server \
  --cache-prompt \  # This enables prefix caching
  --models-dir ./ \  # This specifies the directory where the GGUF models are stored
  --models-preset ./config.ini  # Model-specific config, see below
```

The server reads the model configurations from the `config.ini` file:

```ini title="config.ini"
[qwen2.5-coder-7b-q8_0]
model = ./qwen2.5-coder-7b-q8_0.gguf

[Qwen3.5-35B-A3B-Q4_K_M]
model = ./Qwen3.5-35B-A3B-Q4_K_M.gguf
sleep-idle-seconds = 30
```

This defines both models and their paths. The FIM endpoint handles auto-completion,
while the chat endpoint handles regular chat requests. We only enable sleep mode for the
larger model, to make sure that we can nice and snappy auto-completion with the smaller
model.

### Neovim plugin: switching to Claude Code

For the chat and code editing part, I switched from CodeCompanion to
[claude-code.nvim](https://github.com/greggh/claude-code.nvim), which was the biggest
game-changer for my workflow. Claude Code is way more autonomous than CodeCompanion and
doesn't ask whether it should do things like run tests or implement fixes. I can give it
a request like "fix the bug in this function" and it will just do it, using its tool
calling capabilities to read files, run commands, and make edits.

Claude Code's tool calling is also much more reliable. It handles edge cases better
and rarely fails to execute a tool call correctly. It is a bit slower for specific
requests, but it works wonders for more general requests, especially when they're not
super specific. For example, "refactor this module to follow better patterns" gets
much better results than with CodeCompanion, whereas CodeCompanion excels at specific
commands like "fix all grammar mistakes in this file".

Here's the updated Neovim configuration for claude-code.nvim:

```lua
-- This triggers the Claude Code window, as well as the default 'CTRL+,' keymap
vim.keymap.set('n', '<leader>cc', '<cmd>ClaudeCode<CR>')

return {
  "greggh/claude-code.nvim",
  dependencies = {
    "nvim-lua/plenary.nvim"
  },
  config = function()
    require("claude-code").setup({
      -- I use a floating window, but you can use a split window if you prefer
      window = {
        position = "float",
      },
      command = "ANTHROPIC_AUTH_TOKEN=llamacpp ANTHROPIC_BASE_URL=http://127.0.0.1:8080 claude --model Qwen3.5-35B-A3B-Q4_K_M --tools default",
      -- These are defaults to open/close the Claude Code window, but I like to have
      -- them explicitly mentioned in case I forget
      keymaps = {
        toggle = {
          normal = "<C-,>",
          terminal = "<C-,>",
        },
      },
    })
  end
}
```

The configuration is much simpler than CodeCompanion, as we don't need to worry about
tool formats and adapters. The claude-code.nvim plugin handles all of that
automatically.

### Neovim plugin: llama.vim for auto-completion

For auto-completion, I continue to use
[llama.vim](https://github.com/ggml-org/llama.vim). It works seamlessly with the same
llama.cpp server, using the FIM (fill-in-middle) endpoint for completions and the same
Qwen3.5 model for instruction-based code editing directly in the editor.

Here's my configuration for llama.vim:

```lua
return {
  "ggml-org/llama.vim",
  init = function()
    vim.g.llama_config = {
      show_info = false,

      -- Model used for auto-completion
      endpoint_fim = "http://localhost:8080/infill",
      model_fim = "qwen2.5-coder-7b-q8_0",

      -- Model used for instruction-based code editing
      endpoint_inst = "http://localhost:8080/v1/chat/completions",
      model_inst = "Qwen3.5-35B-A3B-Q4_K_M",

      -- My own preference, change to whatever you prefer
      keymap_fim_accept_full = "§",
      keymap_fim_accept_line = "±",
      keymap_inst_trigger = "<leader>i",
      keymap_inst_accept = "<leader>a",

      -- These are the original keymaps. They got changed to a <leader> keymap in a
      -- recent change to llama.vim, which causes an annoying delay every time <leader>
      -- is pressed in insert mode, so we just revert back the original keymaps.
      keymap_fim_trigger = "<C-F>",
      keymap_fim_accept_word = "<C-B>",
    }
  end,
}
```

### Model choice: Qwen3.5-35B-A3B over GPT-OSS-20b

With the new setup, I switched from GPT-OSS-20b to the newly released Qwen3.5-35B-A3B
for the chat and code editing model. This was a natural choice since Qwen3.5-35B-A3B
works great for code editing and tool use. We primarily used GPT-OSS-20b with the
old setup since CodeCompanion required it, but Claude Code doesn't have that
requirement, so we can use Qwen3.5-35B-A3B instead.

In my experience, Qwen3.5-35B-A3B produces higher quality code and better follows
coding conventions than GPT-OSS-20b. It's also better at understanding context and
making appropriate edits. Despite being larger, it actually runs more efficiently on
my M4 Max with 64GB unified memory, thanks to it only having 3B active parameters at a
time. It uses slightly more memory than GPT-OSS-20b but delivering better results.

The auto-completion model remains the same (Qwen2.5-coder-7b), as it still works well
for that use case.

### The results

These changes have led to significant improvements across the board. Prefix caching is
the biggest game changer by far, makes generations >10x faster on the big code bases I'm
working in than the old setup. Claude Code is also super handy, but it was completely
unusably slow without the prefix caching! That llama.cpp incorporated multi-model
orchestration and sleep mode is convenient, but feature-wise it's the same as before,
just easier to manage with a single LLM inference app.

You can find my full Neovim configuration
[here](https://github.com/saattrupdan/dotfiles), which includes the [Markdown file I use
for my Python conventions](https://github.com/saattrupdan/dotfiles/blob/main/AGENTS.md).
