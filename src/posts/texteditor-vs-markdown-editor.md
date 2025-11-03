---
title: "Texteditor vs Markdown Editor vs IDEs"
date: 2025-11-03T18:48
tags: [ post, markdown]
---

I gave `helix` a try and didn't like it 
>> [[helix-who-this]].
Why?

Turns out, 
I was not looking for a text editor 
(of which helix is the best in class,
hands down),
but instead a Markdown editor.

Which is a difference I want to explain in this post.

## What is a text editor?

A text editor allows to edit text 
(d'oh),
namely do different forms of text manipulations.
Write,
delete,
cut,
copy,
paste,
change,
move lines,
edit multiple lines at once,
split lines,
increment numbers,
insert dates,
quickly search and replace any word in the current file (the 'buffer').
Do _everything_ you want,
bend _text_ to your will.

Be it `vim`,
`helix`,
`nano`,
...,
they are all really good at this. 
As claimed above, 
Helix is the best,
but even `Notepad` will do.

Why is _Helix_ the best?
Because `hx` uses a more powerful (and more sane) modular editing mode that beats every other text editor out there.
Additionally,
Helix comes with batteries included,
which means that Helix doesn't need any configuration,
has all the bells and whistles you may want
-- including LSP, Treesitter-Grammars and Clippy! --
and is just a joy to get started with.

_Tip: Use `:tutor` in Helix to use their in-built tutorial. Thank me later._

However,
text editors have one weakness.
They are optimized for text,
in all it's shapes and forms.

Here is the catch -- to support text in all its shapes and forms,
text editors can not provide (should not provide) opinionated editing features for _a specific type of text_.
Like Markdown.

Looking at Markdown,
for a Markdown editor it is reasonable to expect that it highlights Markdown headings,
auto-pairs '_' and '**' (italic and bold, respectively),
can show an outline,
...,
and so forth.

Helix supports some of this via LSP,
but not all of it.
Instead,
Helix tries to be as universal as possible.
No language specific features,
only support for text editing in general.

## Markdown editors and IDEs

Looking at Markdown editors,
[Obsidian](https://obsidian.md/) strikes as the most striking example.
Obsidian is optimized for Markdown.
It only ever supports features that are useful for someone writing Markdown.
Insert a pile of Rust code and want to compile it?
Though luck.

I'd even go so far that Obsidian is a Markdown IDE. 
Markdown rendering,
data tables,
graph views,
....
All these are very niche and targeted features if looking at the whole wide world of text editing.
If only ever editing Markdown files, 
why choose something like VS Code or Helix or Vim
if you can just set up Obsidian?

The only reason I can think of is that people prefer the vim/helix type of text editing to the WTSIWYG experience of VS Code and Obsidian.
(I do!)

## Entering Neovim

To hit the sweet spot between Markdown IDE and text editing,
I believe that Neovim is the perfect candidate.

Even though,
from a text editing experience,
it is not as great as Helix,
and it is extremely annoying and time consuming to set up all it's features for Markdown editing,
it is a rewarding editor to work in.

Frameworks like [LazyVim](https://www.lazyvim.org/) provide a great starting point,
and there are crazy people like [this guy](https://linkarzu.com/posts/neovim/markdown-setup-2025/) who make really helpful videos and guides.

Or you can read my guide:
I set out to create my personal perfect Markdown experience.
It is described [[neovim-setup|here]].
My goals are academic writing, 
Zettelkasten-style note-taking and knowledge-sharing,
storytelling,
blogging,
and general ease of use.

