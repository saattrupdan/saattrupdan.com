---
title: Local AI Coding Assistant in Neovim in 2026
meta: Setting up a local AI coding assistant in Neovim in 2026. No internet connection required!
tags: llm, coding assistant, ai, neovim, local
---

### Introduction

I've been using AI coding assistants for a while now, primarily Github Copilot, but I've
been more and more intrigued by the idea of using everything locally. Aside from the
satisfaction of not being reliant on the internet, it also means that I can safely use
all the code assistants when working on sensitive codebases, since nothing will ever be
sent to an external service.

This is complicated further by the fact that I'm using Neovim, which is always a little
bit behind other editors when it comes to AI coding assistants (the prize you pay for
being _blazingly fast_ 🙃). I dug a bit deeper recently and managed to set everything up
locally, but since it was a bit of a hassle, I thought I'd share my thoughts and setup
here, for anyone else who finds themselves in the same situation.

I'm running all of this on a Macbook M4 Max with 64 GB unified memory, so quite a beefy
fella, but the setup should work on smaller devices as well, maybe with slightly smaller
models.

### The two-model strategy

My first naive attempt was believing that I could just run a single model and have a
Neovim plugin that talks to it, and be done with it. That turned out to be a bit more
complicated than I thought, as I had two use cases that turned out to require two
different frameworks and models:

1. **Auto-completion**: This is the real-time code suggestion feature that you get in
   most editors. This should be a fast and lightweight model, as it needs to be able to
   generate completions quickly.
2. **Chat**: This is the more heavy-weight use case, where you can have a conversation
   with the AI, and have it make changes to your code as well. This should be a larger
   model, as it needs to be able to understand and reason about your code.

Let's have a look at these separately.

### Auto-completion setup

Surprisingly, Neovim has very few frameworks that deals with auto-completion. I found
two such projects: HuggingFace's [llm.nvim](https://github.com/huggingface/llm.nvim)
project and Georgi Gerganov's [llama.vim](https://github.com/ggml-org/llama.vim)
project.

The `llm.nvim` project seemed promising, but I kept getting errors when setting it up
with local models. It seemed like local models were second class citizens to the
project, where the priority seemed to be integration with HuggingFace's inference
endpoints, which makes sense I guess.

The `llama.vim` framework on the other hand, built by the same guy who invented the GGML
format and the `llama.cpp` framework, had solely local models in mind. The downside (and
potentially upside) of that framework is that it relies on fill-in-the-middle (FIM)
models; i.e., models that take a prefix and suffix string, and completes the middle bit
between the two. This relies on a specific `/infill` endpoint of your local inference
API, which LM Studio doesn't support, for instance. But `llama.cpp` (of course) supports
it, so I ended up spinning such a server and using that framework.

The [llama.vim
readme](https://github.com/ggml-org/llama.vim/blob/master/README.md#llamacpp-settings)
recommends using these FIM-compatible Qwen-coder models:

- Qwen3-coder-30b if you have more than 64 GB memory available;
- Qwen2.5-coder-7b if you have between 16 GB and 64 GB memory;
- Qwen2.5-coder-3b if you have between 8 GB and 16 GB;
- Qwen2.5-coder-1.5b if you have less than 8 GB.

For this reason I went with the 7b model. Setting up the server was super easy. Install
`llama.cpp` with [Homebrew](https://brew.sh/) using `brew install llama.cpp`, and start
up the server with the command, which also downloads the model:

```bash
llama-server --fim-qwen-7b-default
```

I'm running mine in a [tmux shell](https://tmux.info/docs/getting-started) (`brew
install tmux`), which is convenient as it will always be running, even if I close my
terminal.

Now that the LLM is running, we need to integrate it with out editor. As mentioned
above, this was done using the `llama.vim` plugin, which can be installed in Neovim with
the following [Lazy](https://github.com/folke/lazy.nvim) config:

```lua
return {
  "ggml-org/llama.vim",
  init = function()
    vim.g.llama_config = {
      show_info = false,
      keymap_accept_full = "§",
    }
  end,
}
```

The `show_info = false` just disables extra completion metadata on your current line,
like the number of tokens per second generated, how big the context is and such. The
`keymap_accept_full` just sets the button that triggers the completion, which defaults
to Tab. We don't have to specify or port or anything, as it simply just uses the
`llama.cpp` server on the default port. This can be tweaked by setting the `endpoint` in
the config.

### Chat setup

For the chat setup, there are a couple of different frameworks to choose from, but most
of these only support remote models. This includes
[copilot.vim](https://github.com/github/copilot.vim), maintained by the Vim legend [Tim
Pope](https://github.com/tpope), as well as [gp.nvim](https://github.com/Robitx/gp.nvim)
and [ChatGPT.nvim](https://github.com/jackMort/ChatGPT.nvim). All requiring either an
OpenAI API key or a Github Copilot subscription. Not good enough.

Then I stumbled across
[CodeCompanion.nvim](https://github.com/olimorris/codecompanion.nvim), maintained by
[Oli Morris](https://github.com/olimorris) on his own, which works quite well.
It does seem like local models is not the main priority for the framework though, as it
defaults to using Github Copilot and the main alternative presented is using Claude. It
_is_ possible to use it with a local model though.

I firstly tried setting it up with `llama.cpp` to only use a single framework for the
LLMs (which would've been nice with frameworks like
[llama-swap](https://github.com/mostlygeek/llama-swap), allowing multiple models to be
hosted), but it simply just didn't work, for whatever reason. What _did_ work was
hosting a model through [LM Studio](https://lmstudio.ai/) and integrating that with
CodeCompanion. Which is quite weird, as I thought LM Studio was a thin wrapper around
`llama.cpp`? Anyway, moving on.

CodeCompanion relies a lot on tool calls, which handles reading files, editing files,
calling terminal commands and such. Tool calls are formatted differently for each model,
annoyingly so, meaning that many of the models are not supported by CodeCompanion, such
as the Qwen models. What _does_ work, however, is the GPT-OSS models. I ended up running
the GPT-OSS-20b in 4bit on LM Studio, which worked really well with CodeCompanion. So, a
little bit brittle in terms of model selection, but hopefully that will improve with
time. Remember that CodeCompanion is maintained by one person, so don't expect too much!

The [Lazy](https://github.com/folke/lazy.nvim) configuration for CodeCompanion is a bit
more involved:

```lua
-- Open the chat with <leader>cc
vim.keymap.set('n', '<leader>cc', ':CodeCompanionChat<CR>')

return {
  "olimorris/codecompanion.nvim",
  dependencies = {
    { "nvim-lua/plenary.nvim" },
    { "neoclide/coc.nvim" },
    { "nvim-treesitter/nvim-treesitter", build = ":TSUpdate" },
  },
  opts = {
    display = {
      chat = {
        window = {
          position = "right",
          width = 88,
        },
      },
    },
    rules = {
      python = {
        description = "Python conventions",
        files = {
          "~/gitsky/dotfiles/PYTHON_CONVENTIONS.md",
        },
      },
      opts = {
        chat = {
          autoload = "python",
        },
      },
    },
    adapters = {
      http = {
        ["llama.cpp"] = function()
          return require("codecompanion.adapters").extend("openai_compatible", {
            env = {
              url = "http://localhost:1234",
              model = "openai/gpt-oss-20b",
              api_key = "TERM",
            },
          })
        end,
      },
    },
    interactions = {
      chat = {
        adapter = "llama.cpp",
        tools = {
          opts = {
            auto_submit_errors = true,
            auto_submit_success = true,
            default_tools = {
              "full_stack_dev",
            },
          },
        },
        opts = {
          completion_provider = "coc",
        },
      },
      inline = {
        adapter = "llama.cpp",
      },
      cmd = {
        adapter = "llama.cpp",
      },
      background = {
        adapter = "llama.cpp",
      },
    },
  },
}
```

There are several things going on here, most of which are optional:

- The `opts.display.chat` section controls how the chat window is displayed;
- The `rules` section can point to a Markdown file with all the coding conventions that
  you care about, which will automatically be included in the context when opening a new
  chat.
- The `adapters` section is required, and is where the LLM connection is set up.
  Remember that LM Studio is really just using `llama.cpp`, so we set it up as one such.
- The last `interactions` section determines which adapter we use for the various modes,
  where we just use our LM Studio model for all of them. We also set up some default
  tools that the LLM will always have available - the `full_stack_dev` is a group of a
  bunch of different tools, related to reading and editing files, running terminal
  commands and such. You get to always approve the commands and edits before they're
  run, however.

Further, in LM Studio, you need to up your context length of the model to at least ~8k
tokens, as the system prompt with all the tool calls coupled with the file context can
easily take you to 5k+ tokens. I set it to the maximum ~130k for the model. It doesn't
allocate all of the context, so it's usually not an issue.

### Wrapping up

That's it! Two LLM servers, one using `llama.cpp` in a `tmux` shell, and one using LM
Studio. The LM Studio server is quite memory heavy to run at all times, using ~6GB RAM,
but LM Studio has a just-in-time model loading, which loads the model when using it, and
unloads it afterwards, which is quite handy. The `llama.cpp` server only uses ~1.8GB RAM
for reference, so that's just always running, as I use it all the time anyway. This can
always be manually turned off and on using the `:LlamaDisable` and `:LlamaEnable`
commands, if you don't need it.

Hope it was useful! You can find my full Neovim configuration
[here](https://github.com/saattrupdan/dotfiles), which includes the Markdown file I use
for my Python conventions used in the CodeCompanion config.
