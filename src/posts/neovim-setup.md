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

Here the output. 
Note: I removed the .git endings manually.

Press `gx` on a link to open it in the browser.

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

Example: `<spc>sr` opens search & replace, which actually is `grug-far.nvim` under the hood. I want understand all of this, to better be able to find help and guidance.

## How to collapse Markdown headings

`zM` close all folds, `zR` open all folds

`za` toggle fold under cursor, `zi` toggle folding

`zv` show cursor line

2025-10-30 17:38 
could set up [kevinhwang91/nvim-ufo: Not UFO in the sky, but an ultra fold in Neovim.](https://github.com/kevinhwang91/nvim-ufo)

## Improve datetime snippet 

LazyVim uses `blink.cmp` for code completions, 
including snippet insertion.
Some snippets are included via `friendly-snippets`, 
but I'd like to define my own,
for example to provide frontmatter and better timestamps.
There is an explanation how to do so in [Snippets | Blink Completion (blink.cmp)](https://cmp.saghen.dev/configuration/snippets)

I defined my custom snippets in `.conf/nvim/lua/snippets/package.json`

```json
{
  "name": "personal-snippets",
  "contributes": {
    "snippets": [
      { "language": "all", "path": "./all.json" }
      { "language": ["markdown", "md", "plaintext", "txt"], "path": "./markdown.json" }
    ]
  }
}
```

To set the frontmatter,
I can do the following in my `markdown.json':

```json
{
	"Insert DateTime": {
		"prefix": ";dt",
		"body": [
			"${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}T${CURRENT_HOUR}:${CURRENT_MINUTE}"
		],
		"description": "Insert current date and time in specific format"
	},
	"YAML Front Matter": {
		"prefix": "yamlFrontMatter",
		"body": [
			"---",
			"title: \"$1\"",
			"date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}T${CURRENT_HOUR}:${CURRENT_MINUTE}",
			"tags: [$2]",
			"---",
			"$0"
		],
		"description": "Insert YAML front matter"
	}
}
```


TODO Additionally,
I'd like to append the datetime snippet to markdown headings.

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

## Show outline / list of Markdown headings and jump to them

One way I found is `<spc>cs`,
which opens the LSP symbols reference.
However,
it doesn't directly jump there,
which is a bit annoying.

_Hint: Switch to the newly opened window with `<spc>ww`._

A better way is to use the Telescope symbol picker,
`<leader>ss` (local) or `<leader>sS` (across project root).

## Disabling a plugin

We can do `enabled=false` in the config.

```lua
return {
  -- disable trouble
  { "folke/trouble.nvim", enabled = false },
}
```

Source: [Plugins | LazyVim](https://www.lazyvim.org/configuration/plugins#-disabling-plugins)

## Text surround


Install `mini.surround`. 
Then select text (`viw`) and surround with `gsa`.

_Hint: Look up more keybinds with `<spc>sk 'surround'`._

## How to autocomplete words from dictionary 
## How to look up words in dictionary
## How to fix word under cursor

Some words are highlighted yellow or red,
for example due to a misspell.
How do I auto-fix them?
And how do I disable this linting?

TODO

## How to disable markdown linter

Lazyvim uses _conform.nvim_

TODO


## How to count words

Words are a terrible metric for writing productivity,
but sometimes I just want to know.
And the wordcount could also be used to calculate the reading time.
FUTURE Maybe I will do this on my blog,
although this may also be something I find annoying fast.

To get the wordcount,
run `:echo wordcount().words`.

## How to do soft-wrap
## Add matching _* in Markdown buffers

It annoys me that `_` (_italic_) and `*` (**bold**))) don't auto-close.

TODO left for the future.
`mini.pairs` doesn't support per-filetype config,
and I didn't feel like setting generic pairing rules and then needing to write autocommands.
See [How do I disable mini.pairs for markdown files? (My autocmd isn't working) · nvim-mini/mini.nvim · Discussion #805](https://github.com/nvim-mini/mini.nvim/discussions/805)

## Display the keymap

Keymaps can be searched with `<spc>sk`.

There is also `spc + ?`

## Advanced keymaps in picker

I believe that the fuzzy search via Telescope allows more keys beyond just `tab` and `ret`. 
Which?
E: It seems that LazyVim doesn't use Telescope anymore,
but `snacks.nvim/picker`.

Either way,
there is a bunch of commands hidden.
We can press `A-w` to switch the focus to the preview/list ('cycle win'),
and then do `?` to show the help.
Or we can simply press `Esc` to switch to _Normal mode_,
and then explore the help from there.

_Tip: Cycle the window in reverse with `C-w`._

The preview can be toggled with `A-p`.
`C-r` can be used to insert something from a register.



## Markdown One Sentence Per Line

Do I really have to do this manually?

No.
 I wrote a function to do so.
 >> [[markdown-one-sentence-per-line]]

## Markdown Rendering

I like to use _>>_ in my writings to refer to things.
However,
I noticed that _>>_ got rendered as ▋ in some cases.
After some digging,
I found [the culprint](https://github.com/MeanderingProgrammer/render-markdown.nvim?tab=readme-ov-file#block-quotes).

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

