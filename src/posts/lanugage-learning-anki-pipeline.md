---
title: "Language learning Anki pipeline"
date: 2025-11-05T20:45
tags: ["posts", "anki"]
---


WIP,
not sure I described this somewhere else.

I like learning languages.
French,
Dutch,
Turkish,
....

I use Anki for remembering vocabulary and grammar.
However,
for some languages,
it is difficult to create the right cards.
For example,
for learning French,
I want to learn the word,
have an example sentence (ideally from a song) that contains the word,
and also be provided with the phonetics (IPA) and a native speaker giving an example.

This is not easily accomplished by hand.

Using an LLM is the next step,
but here,
we quickly face hallucinations and unusable output. 
(I failed to generate an Anki-compatible list of the 500 most common French words including multiple translations and phonetics).

It seems I need to build a solution to my problem from the ground up.

## Idea

- have a script and/or binary 
    - TODO evaluate [Tauri](https://tauri.app/) as application framework; can use this to learn Rust
    - could be the browser for the DB
- create a squlite DB for words
    - sourcing word corpi, dictionaries and pronounciation (wiktionary?)
- create machine-translated voice-overs for each word
- export all of this to Anki

The benefit: I can use this for cross-vocabulary amongst all the languages I know.
For example,
some French words are close to German, 
and others close to English.
Additionally,
looking at Turkish vocabulary, 
we have overlap with French again.

Wouldn't it be cool to have a modular cross-language dictionary and language tool?
Something that can spit out words by theme? (food, doctor visit, body parts, ...)
By opposites? (sweet--sour, thin--thick, small-big)
By similarity? (big, grand, tall)

## Project

WIP,
will take some time

### Date sources

- https://www.datamuse.com/api/
- [tatuylonen/wiktextract: Wiktionary dump file parser and multilingual data extractor](https://github.com/tatuylonen/wiktextract)
- https://github.com/freedict/fd-dictionaries/wiki/Import-Centre
- [dwyl/english-words: A text file containing 479k English words ](https://github.com/dwyl/english-words?tab=readme-ov-file)
### Database
### Binary

### Speech Synthesis

- https://github.com/espeak-ng/espeak-ng
- https://github.com/vndee/local-talking-llm
