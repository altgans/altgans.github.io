---
title: Neovim setup
tags: posts
date: 2025-10-27T18:21
---

## Intro

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

## Listing all the plugins installed

A list of installed plugins can be retrieved from the `lazy-lock.json` in the _nvim_ folder.

By default (including some extras), Lazy comes with these items installed


## Change which-key description to name the plugin

Example: `<spc>sr` opens serach & replace, which actually is `grug-far.nvim` under the hood. I want understand all of this, to better be able to find help and guidance.

## How to collapse Markdown headings

`zM` close all folds, `zR` open all folds

`za` toggle fold under cursor, `zi` toggle folding

`zv` show cursor line

2025-10-30 17:38 
could set up [kevinhwang91/nvim-ufo: Not UFO in the sky, but an ultra fold in Neovim.](https://github.com/kevinhwang91/nvim-ufo)

## Improve datetime macro and add it to headings (?)



## Multiple cursors

Apparently not supported, as it is not in line with the 'vim philosophy'. We can do `C-v` for visual block mode though, and/or do a regex search and replace.

E: It seems the way to go is TreeSitter text objects manipulation with `mini.ai`?


## Useful Markdown keybinds

N = normal mode, V = visual mode, I = insert mode

- `>>` and `<<` :: indent and outdent in N and V mode.
- `C-t` and `C-d` :: indent and outdent in I mode
- `[[` and `]]` :: go to next/prev section (Markdown headings)
- `zj` and `zk` :: jump to next/prev fold
- `<leader>ss` :: symbol picker (jump to markdown heading)
  - `<leader>sr` :: symbol picker across project root
  - `<leader>sb` :: buffer line search (find words/lines)

- sadf
-
- asf
- asf

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

- 2025-10-28 16:05: Can use `markdown_indent` for this, no need for the keybinds!
- 2025-10-28 16:05: using `markdown-plus`, which necessites to set up the hotkeys again
  - TODO check behaviour of Tab regarding indent and autocomplete; disable list indent in I mode via S-Tab?

## Disable markdown linter

Lazyvim uses _conform.nvim_

## Show outline for Markdown files

Can use the Telescope symbol picker. `<leader>ss` (local) or `<leader>sr` (across project root)

## Disabling a plugin

We can do `enabled=false` in the config.

```lua
return {
  -- disable trouble
  { "folke/trouble.nvim", enabled = false },
}
```

Source: [Plugins | LazyVim](https://www.lazyvim.org/configuration/plugins#-disabling-plugins)

## How to do surround

## How to do soft-wrap

## Display the keymap

Keymaps can be searched with `<spc>sk`.

There is also `spc + ?`

## Advanced keymaps in Telescope picker

TODO I believe that the fuzzy search via Telescope allows more keys beyond just `tab` and `ret`. Which?

## Other / Advanced

- maybe set up https://github.com/seth-brown/formd as described in https://aliquote.org/post/neovim-markdown/ to collect inline-references at the bottom, instead of in the text.
- auto-translate with `translate-shell`
- add `leader m i` to turn item into list item)
  - check emacs orgmode keybinds again!
- change markdown symbols for headings and bullet items (visual)
- a way to visualize my keybinds (including leader-mapped sub menus)
  - https://github.com/jokajak/keyseer.nvim
- paste screenshots (keep them in a folder? link them?)
  - https://github.com/TobinPalmer/pastify.nvim
- wiki-link picker, similar to obsidian.nvim https://github.com/epwalsh/obsidian.nvim?tab=readme-ov-file
- pomodoro timer -- https://github.com/epwalsh/pomo.nvim
  - probably makes more sense to have this system wide >> [[linux-setup|linux]]
- markdown download -- [deathau/markdownload: A Firefox and Google Chrome extension to clip websites and download them into a readable markdown file.](https://github.com/deathau/markdownload)
  - use emacs org-roam-protocol? for download?
- undo history -- https://github.com/y3owk1n/time-machine.nvim
