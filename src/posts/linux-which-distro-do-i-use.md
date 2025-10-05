---
title: "Linux: Which distro am I using?"
tags: 
- posts
- linux
date: 2025-10-05T18:05
---

It's a bit awkward, but I often forget it...

Luckily, we can run either of these commands to find out. ([Source](https://www.cyberciti.biz/faq/find-linux-distribution-name-version-number/ ))

- `cat /etc/*-release ` 
- `lsb_release -a`
- `hostnamectl`

Alternatively, we can use a _fetching tool like [fastfetch](https://github.com/fastfetch-cli/fastfetch)
