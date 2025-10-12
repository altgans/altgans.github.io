---
title: Linux setup and ricing
tags: posts
date: 2025-10-05T21:40
---

Less of a guide and more of a dumping ground for ideas, todos and links

- Maybe change the shell? I use [kitty](https://sw.kovidgoyal.net/kitty/) (created by the same guy who also created [Calibre ❤️](https://calibre-ebook.com/)), but [ghostty](https://ghostty.org/) also looks promising.
- It may be yet another opportunity to set up [espanso](https://espanso.org/).
- [Fish](https://fishshell.com/)
	- [starhip](https://starship.rs/) shell
	- GPG keyring + SSH keys
- unified password sync, backup and file sharing
	- synology, borg, rsync
	- KeepassXC, bitwarden, 1password?
- better editor setup for blogging
	- nvim, lazynvim
	- Obsidian
- coding setup
	- manage environments with [nvm](https://github.com/nvm-sh/nvm), [mise-en-place](https://mise.jdx.dev/)
	- VS Code, zed, emacs, kakoune, ... ?
- Other
	- [localsend](../localsend)
	- vlc, mpv
	- calibre
	- firefox!
	- Mixxx
	- Krita

## Network

- Tailscale to connect to my Synology NAS and to troubleshoot my family?
- [pihole](https://pi-hole.net/)

## Ricing

> [Yak-shaving](https://en.wiktionary.org/wiki/yak_shaving)? [Motivation!](https://world.hey.com/dhh/beautiful-motivations-6fef7c73)

- Change my wallpaper
- Unify the system GUIs
	- GTK4?
- [Quickshell](https://quickshell.org/)
	- [DankMaterialShell](https://github.com/AvengeMedia/DankMaterialShell)
	- [Noctalia](https://docs.noctalia.dev/) :: has a better name than DankShell, will start with this
- Scrollable WM
	- Hypraland? :: I think this is too much of a _Gentoo uber-rice_ thing. I prefer simplicity and quiet
	- [Niri](../niri)


## Distro hopping 2025-10-12


What i want: 
- Arch-based
- supports my use-cases, doesn't get in the way (Cough, Nixos, cough) 
- stable 
- pretty 

What I cooked up 
- EndeavourOS
	- I use this container: https://hub.docker.com/r/alex5402/endeavouros
	- `distrobox create -n my-endeavouros -i docker.io/alex5402/endeavouros:latest`
	- `distrobox enter my-endeavouros`
- Wayland
- Niri
	- reasoning
	- Alternatives: hyprland, but looks less stable and I don't want too much rice in the system
- Noctalia
	- All in one swaybar replacement
	- Alternatives: DankMaterialShell, but I don't like the name
- GTK4

How to migrate 
- Test everything on distrobox first
	- Need to figure out how to fix `Error: configure storage: kernel does not support overlay fs: 'overlay' is not supported over extfs at "/home/me/.local/share/containers/storage/overlay": backing file system is unsupported for this graph driver` first
	- E: apparently installing `fuse-overlayfs` does the trick ([source](https://unix.stackexchange.com/questions/689181/error-kernel-does-not-support-overlay-fs-overlay-is-not-supported-over-extfs))
- Locally backup everything
	- figure out what needs to remain, then backup to my NAS? Or just to an usb stick. Probably both, to be safe
- Wipe system
	- ext4? btfs? zfs?
