---
title: "New Linux setup, who this?"
date: 2025-11-06T15:51
tags: ["posts", "linux"]
---

This is a more readable and opinionated version of my [[linux-setup]] logbook.
Where the former describes the journey,
this post only has the results.

# New Linux setup, who this?

When setting up a new _rice_, there are three separate modules that interchangeably sit on top of each other.

- Linux system

- DE/WM and all the graphical elements like GTK-Theme, icons, statusbar, ..

- The terminal emulator and shell tools

## Base Linux

Arch, obviously. Manjaro, to be more specific. Why? Because I prefer the stable updates instead of a rolling package model. Maybe I am too old, but I prefer something that just works, has batteries included and doesn't crash over the _bleeding edge_. #philosophy

Things left to do

- disk encryption setup (LUKS?)

## ## GUI layer

The WM, statusbar, icons, theme and all non-terminal/GUI applications.

### Window Manager (WM)

Niri, where have you been all my life? Imo, the current holy grail of window management on a Linux laptop. Infinite scrolling columns make my 15 Inch laptop appear way bigger than it is.

Things to improve the default `niri` setup with:

- Some way of easy window management, because I get lost in not-yet-closed windows.
  
  - `niriswitcher`, `nirius` 

- I wish for a way to designate tags and then jump to the tagged window, similar how I have designated workspaces on _sway_ that I can jump to

- parallax :)

### Statusbar

Quickshell/Noctalia. Batteries included, easy install. It works, it is responsive, It has IPC to easily set hotkeys, it looks amazing.

Things to improve

- Nothing

### Theme

Juno-Filelight for the theme, and Papirus-Dark for icons. My favorite DotA2 wallpaper (TODO link to wallpaper)

Things to improve

- I wish I knew how to set a system-wide cursor :(

- I'd like to have a more sane way to manage the theme. I edited around 5 config files and then also needed to install `gnome-tweaks`, `lxappearance` and `kvantummanager` to set everything. Hey, at least it works and looks like a unified design now :)

### File Manager

Nemo as file manager. I prefer it over PcManFM, which I used for quite a long time. 

- Needed to run a random command to set the open-with-terminal terminal correctly

### Launcher

Fuzzel. I tried `anyrun` and `walker` aswell, but they were either ugly, didn't run or were diffcult to configure. Or all of them :)

- I combine `fuzzel -d` with `rofimoji` as emoji and unicode selector

- I added `.desktop` files for my internal websites and dashboards, e.g. to directly launch the GUI of Synology, Syncthing, Pi-Hole or router

### Image Viewer

Lightningview as default image viewer. Very fast. Nothing special.

Oculante as featureful image viewer.

- I don't like the UI theme, but no idea how to change it. Maybe disable the window decorations?

### Document Viewer

TODO: PDF `zathura`? `Document Viewer`?

Calibre for ebook management. Self-explanatory for everyone who reads.

- I use a Kobo BW reader with Plato as reader application. I don't recommend the default Kobo, but Plato is amazing.

## Shell layer



### Terminal

### Shell


