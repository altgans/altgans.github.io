---
title: Neovim setup
tags: posts
date: 2025-10-27T18:21
---

Not sure why I come back to `nvim` all the time, especially as there are new cool editors in 2025. Code, Zed, kakoune, helix... Maybe it is the config, or the fact that I didn't know how to quit `vim` for a long time 😁 (Tip: `:q` to quit and `:help` for help)

## Goal


- editor for quickly editing config files (--> dotfiles)
- editor for coding
- editor for personal knowledge base with Markdown
  - Zettelkasten, interplay with Obsidian, ...
  - able to sync/ingest markdown from my work laptop
  - able to visualize (`markmap`?)
- editor for writing novels and world-building 

## Batteries included

Lazyvim, cause the maintainer seems like a cool guy. There are some other projects, but they felt too complicated/complex/opinionated.

Note: This means that I assume lazyvim-style config folder

## Useful Markdown keybinds

N = normal mode, V = visual mode, I = insert mode

- `>>` and `<<` :: indent and outdent in N and V mode.
- `C-t` and `C-d` :: indent and outdent in I mode
- `[[` and `]]` :: go to next/prev section (Markdown headings)
- `zj` and `zk` :: jump to next/prev fold
- `<leader>ss` :: symbol picker (jump to markdown heading)
	- `<leader>sr` :: symbol picker across project root
	- `<leader>sb` :: buffer line search (find words/lines)



## Indent lists and text in Markdown files

- smark.nvim :: better list handling
- markdown_indent.nvim :: indent markdown headings  


### Indent/outdent via Tab and S-Tab

In 'keymaps.lua', 

```lua
-- Indent with Tab in normal mode
vim.keymap.set("n", "<Tab>", ">>_", { noremap = true, silent = true, desc = "Indent line" })
-- Unindent with Shift+Tab in normal mode
vim.keymap.set("n", "<S-Tab>", "<<_", { noremap = true, silent = true, desc = "Unindent line" })
-- Indent wjth Tab in visual mode
vim.keymap.set("v", "<Tab>", ">gv", { noremap = true, silent = true, desc = "Indent selected lines" })
-- Unindent with Shift+Tab in visual mode
vim.keymap.set("v", "<S-Tab>", "<gv", { noremap = true, silent = true, desc = "Unindent selected lines" })

```

Check mappings with `:map <Tab>` for potential conflicts

E: Can use `markdown_indent` for this, no need for the keybinds!

## Disable markdown linter

Lazyvim uses _conform.nvim_

## Show outline for Markdown files

Can use the Telescope symbol picker. `<leader>ss` (local) or `<leader>sr` (across project root)

## Other / Advanced

- maybe set up https://github.com/seth-brown/formd as described in https://aliquote.org/post/neovim-markdown/ to collect inline-references at the bottom, instead of in the text.
- auto-translate with `translate-shell`
