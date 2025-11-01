---
title: Helix setup
tags: posts
date: 2025-10-29T19:41
---

# Helix, who this?

Helix is a cool text editor, although I am not convinced that it's lack of plugins is a user benefit. Well, at least the choices I need to make are simplified, in comparison to [neovim-setup|nvim] :)

## Other

One interesting idea is to use `hx` in a fullscreen terminal inside VSC, to have all the cool VSC project features available.

## Goal

- I want to set up helix as text editor
  - autosave
- Set up Markdown editing
  - list formatting & indenting
  - wikilinks
  - heading increase/decrease
  - markdown preview/rendering

## File browsing

Not supported out of the box :+

Will use the file picker `<space>f` and otherwise `yazi`.

## Outdent with S-Tab

Indent works with `Tab`, but outdent doesn't...

```toml
[keys.insert]
S-tab = "unindent"
```

See also [Editor smart-tab](https://docs.helix-editor.com/editor.html#editorsmart-tab-section), as some terminals don't support S-Tab.

## Use system clipboard for pasting

Actually in-built. `<space>Y/P`

## Config

Can edit the config via `:edit-config`. It is located in `~/.config/helix/config.toml`.

## Advanced functionality

It seems the `hx` way is to do configure keybinds to run arbitrary shell commands to achieve things

```toml
[keys.normal]
"C-p" = ":sh glow %<cr>"  # Preview current file (% is filename)
```

## Theme

Change via `:theme <tab>`.

I like

- `flatwhite`
- `rosepine`
- `yo`
- `yellowed`
- `tokyonight`
- `peachpuff`
- `snazzy`
- `voxed`
- `starlight`
- `papercolor-dark`

## LSP Setup and Diagnostics

This requires all of these LSP-Servers to be installed. Ensure with `hx --health markdown`. Enable diagnostics in the config.

```toml
[[language]]
name = "markdown"
language-servers = [ "marksman", "prettier",  "ltex", "hx-lsp", "mpls" ]
file-types = ["md", "txt"]
auto-format = true

[language-server.marksman]
command = "marksman"
args = ["server"]

[language-server.prettier]
command = "prettier"
args = ["--parser", "markdown"]

[language-server.ltex]
command = "ltex-ls-plus"
# config.ltex.dictionary."en-US" = ["custom", "words"]  # Add your dictionary
# config.ltex.language = "en-US"  # Or auto-detect

# https://github.com/erasin/hx-lsp?tab=readme-ov-file
[language-server.hx-lsp]
command = "hx-lsp"

# https://github.com/mhersson/mpls
[language-server.mpls]
command = "mpls"
args = ["--dark-mode", "--enable-emoji"]
```

To see the LSP errors, open the diagnostics search via `<spc>d`.

For Ltex, we can define the language in the markdown file -- [https://ltex-plus.github.io/ltex-plus/advanced-usage.html#set-language-in-markdown-with-yaml-front-matter](https://ltex-plus.github.io/ltex-plus/advanced-usage.html#set-language-in-markdown-with-yaml-front-matter)

## Toggle Markdown checklists

## Follow weblink under cursor

## Markdown snippets

## Buffer Autocomplete

Should suggest words from the existing buffer. Should auto-complete and surround Markdown syntax, e.g. **bold**.

## Colored Markdown headings by indention (h1-h6)

## Accept LSP commands

hello

## Markdown conceal

## Not the holy grail (yet)

2025-10-30 12:58
I give up.

Helix is cool.

Helix is fast.

Helix is too annoying to configure.

Well, 'configure' is the wrong word.

There are some QOL features missing that I'd love to have for Markdown writing. And I can't set them up, because they need to be added via LSPs. I now need to set up 5-6 LSPs which all do things in parallel. Some of the LSPs even require client-side support, which `hx` is not willing to provide. Additionally, most of discussions from three (!) years ago are still open, or closed as _won't do_.

It's a shame. I wish there was an editor that combines `helix` modal editing with vim's configurability. Something with batteries, not `kakoune`.

Last words: Helix is awesome for quick editing, but everything that goes across the vision quickly turns into a fight against the system.

Goto [[neovim-setup]]

(This exercise was still beneficial, as it showed me a new editing paradigm, tought me some new editing modes that I will now add to nvim (surround), and also got me to play around with LSPs)

E: Maybe my mental model is not correct; a lot of things (Toggle Todos, lists, ..) could also be done via macros and set as keyboard icon.
