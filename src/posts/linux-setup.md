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
- see if I can remove manjaro-sway-settings, etc

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
	- Actually, this is a too-deeply integrated way to test the distro. Should have used a VM instead.
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

## Switching

Decided to just use my Manjaro, as it is stable :)

I ran the following command 

```shell
sudo pacman -S greetd greetd-tuigreet xdg-desktop-portal xdg-desktop-portal-wlr alacritty swaybg xwayland-satellite udiskie fuzzel xdg-desktop-portal-gtk xdg-desktop-portal-gnome gnome-keyring nautilus kanshi brightnessctl inter-font ttf-roboto
```

After switching, I encountered these problems 

- black screen --> reboot
	- hindsight: never switch your core WM/DMs without backup! very risky!
- niri loads, I see an ugly status bar and randomly click it --> put laptop into flight-mode with no way to enable the internet again --> `rfkill unblock all` (I may have also pushed the wrong button/function-key on my keyboard..)
- wrong terminal (alacritty) --> change in `.conf/niri`
- wrong shell (zsh) --> `chsh` doesn't work --> for some reasone _zsh_ was set as default in `.profile`


## Shoppinglist / todos

 - understand whatever I just installed
	- greetd?
 - customize quickshell
	- change gtk theme
	- change wallpaper
	- autologin
 - customize niri hotkeys, appearance
	- quick jump to window (alt+1 = firefox)
 - improve ssh, keyshell, gpg keys setup
 - go shopping for other cool applications
	- zen browser
		- zen-browser-bin is the binary version, ie. compiled
	- dolphin filebrowser; or nemo? or midnight commander? or pcman fm?
- improve manjaro setup
	- doas
	- pavu, yay, pacman?
	- quick way to see and install software, maybe by opening an app launcher that runs `yay`
	- fingerprint launcher revisited?
	- system stats, disk space usage
- configure obsidian, nvim
- font setup
- password setup
- backup
- 'webapps' like in Omarchy that launch a website, ... (https://learn.omacom.io/2/the-omarchy-manual/63/web-apps)
- limine bootloader? https://github.com/limine-bootloader/limine
- mise :: [Installing Mise | mise-en-place](https://mise.jdx.dev/installing-mise.html)
- gron https://github.com/adamritter/fastgron?tab=readme-ov-file
- ranger tui (or similar)
- paperless or similar
- syncthing
- firefox addons and block list to remove ai slob

## Deciding on an _aur_ helper

`yay`, `paru`, `trizen` or `pikaur`?

- yay :: Go, default in Manjaro
- trizen :: Pearl, has some extra features. Didn't like the search interface
- pikaur :: Python. Asks all the questions _before_ installation
- paru :: Rust. Asks to review packages by default, which is a good approach to AUR package security. May be annoying after some time

I like it when I can see the news/changelogs of packages. E: But it is damn annoying to see all of this on system update! (Pikaur)

TODO: Look at https://github.com/topgrade-rs/topgrade aswell 

`paru -Sua --upgrademenu`

## log

2025-10-15
changed `pacman.conf` to enable

```conf
Color
ParallelDownloads = 5
ILoveCandy
Architecture = auto
CheckSpace
HoldPkg     = pacman glibc <...system packages>
VerbosePkgLists
```


2025-10-15 22:03
changed `paru.conf`
```conf
# Paru conf
# See paru.conf
Include = /etc/paru.conf

[options]
BottomUp
SudoLoop
CleanAfter
NewsOnUpgrade
UpgradeMenu

[bin]
FileManager = lf
#Sudo = doas
```

2025-10-15 22:24
set up `doas` (OpenDoas)
```conf
permit persist setenv {PATH=/usr/local/bin:/usr/local/sbin:/usr/bin:/usr/sbin} :wheel
```
2025-10-15 22:48 
removed opendoas again, as it needs to be rebuilt to support fingerprint/PAM

2025-10-15 23:02
added tidal-hifi and enables scrobble to last.fm and musicbrainz DBs

2025-10-15 23:15
will look into `ghostty` as alternative to `kitty`
