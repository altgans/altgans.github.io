---
title: "Quickly test fonts on any website"
tags: posts
date: 2025-10-08
---

I love fonts, and I spent way too much time finding the perfect font pair. One of my biggest annoyances and time wasters is the fact that I can't preview the fonts on a live website. But this is in the past!

Paste below into the browser console and watch your font-stack magically change.

```js

let l=document.createElement('link');
l.href='https://fonts.googleapis.com/css2?family=Inter&display=swap';
l.rel='stylesheet';
document.head.appendChild(l);
document.body.style.fontFamily="'Victor Mono', sans-serif";
```

## Improved version (thanks, LLM!)

- Write (or find) a snippet that toggles between a pre-defined font stack
- Find a way to only style paragraphs and/or headers (likely using CSS selectors)
- stop font switching on key press
- Output current font into console

```js

const fonts = [
  'Roboto',
  'Lato',
  'Montserrat',
  'Oswald',
  'Merriweather'
];

const targetSelector = 'h1,h2,h3,h4,h5,h6,p,a';
let current = 0;
let intervalId;

function loadFont(font) {
  const id = 'dynamic-google-font';
  let link = document.getElementById(id);
  if (link) link.remove();
  link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g,'+')}&display=swap`;
  document.head.appendChild(link);
}

function applyFont(font) {
  document.querySelectorAll(targetSelector).forEach(el => {
    el.style.fontFamily = `'${font}', sans-serif`;
  });
  console.log('Current font:', font);
}

// Start cycling fonts
intervalId = setInterval(() => {
  const font = fonts[current];
  loadFont(font);
  applyFont(font);
  current = (current + 1) % fonts.length;
}, 2000);

// Stop cycling on any key press
window.addEventListener('keydown', () => {
  clearInterval(intervalId);
  console.log('Font cycling stopped');
});
```

Pretty magical that I was able to vibe-code this in 5 minutes, whereas I would have spent hours fine-tuning this before.
