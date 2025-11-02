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
These are the plugins that Lazy brings by default (including my enabled extras).


Installed plugins + URLs can also be retrieved with the following (fish) script


```fish
cd ~/.local/share/nvim/lazy
for d in */.git
    set -l plugin (path dirname $d | path basename)
    set -l url (git -C (path dirname $d) remote get-url origin 2>/dev/null)
    if test -n "$url"
        echo -e "$plugin\t$url"
    end
end | sort
```

Here the output. Note: I removed the .git endings manually.

```fish
auto-save.nvim	https://github.com/okuuva/auto-save.nvim
blink.cmp	https://github.com/saghen/blink.cmp
bufferline.nvim	https://github.com/akinsho/bufferline.nvim
catppuccin	https://github.com/catppuccin/nvim
conform.nvim	https://github.com/stevearc/conform.nvim
dial.nvim	https://github.com/monaqa/dial.nvim
flash.nvim	https://github.com/folke/flash.nvim
friendly-snippets	https://github.com/rafamadriz/friendly-snippets
gitsigns.nvim	https://github.com/lewis6991/gitsigns.nvim
grug-far.nvim	https://github.com/MagicDuck/grug-far.nvim
lazydev.nvim	https://github.com/folke/lazydev.nvim
lazy.nvim	https://github.com/folke/lazy.nvim
LazyVim	https://github.com/LazyVim/LazyVim
lualine.nvim	https://github.com/nvim-lualine/lualine.nvim
markdown-plus.nvim	https://github.com/yousefhadder/markdown-plus.nvim
markdown-preview.nvim	https://github.com/iamcco/markdown-preview.nvim
mason-lspconfig.nvim	https://github.com/mason-org/mason-lspconfig.nvim
mason.nvim	https://github.com/mason-org/mason.nvim
mini.ai	https://github.com/nvim-mini/mini.ai
mini.hipatterns	https://github.com/nvim-mini/mini.hipatterns
mini.icons	https://github.com/nvim-mini/mini.icons
mini.pairs	https://github.com/nvim-mini/mini.pairs
noice.nvim	https://github.com/folke/noice.nvim
nui.nvim	https://github.com/MunifTanjim/nui.nvim
nvim-lint	https://github.com/mfussenegger/nvim-lint
nvim-lspconfig	https://github.com/neovim/nvim-lspconfig
nvim-treesitter	https://github.com/nvim-treesitter/nvim-treesitter
nvim-treesitter-textobjects	https://github.com/nvim-treesitter/nvim-treesitter-textobjects
nvim-ts-autotag	https://github.com/windwp/nvim-ts-autotag
persistence.nvim	https://github.com/folke/persistence.nvim
plenary.nvim	https://github.com/nvim-lua/plenary.nvim
render-markdown.nvim	https://github.com/MeanderingProgrammer/render-markdown.nvim
snacks.nvim	https://github.com/folke/snacks.nvim
todo-comments.nvim	https://github.com/folke/todo-comments.nvim
tokyonight.nvim	https://github.com/folke/tokyonight.nvim
trouble.nvim	https://github.com/folke/trouble.nvim
ts-comments.nvim	https://github.com/folke/ts-comments.nvim
venv-selector.nvim	https://github.com/linux-cultist/venv-selector.nvim
which-key.nvim	https://github.com/folke/which-key.nvim
yanky.nvim	https://github.com/gbprod/yanky.nvim
```


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

## Markdown One Sentence Per Line

Do I really have to do this manually?

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

