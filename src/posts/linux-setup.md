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
  - I use this container: <https://hub.docker.com/r/alex5402/endeavouros>
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
- 'webapps' like in Omarchy that launch a website, ... (<https://learn.omacom.io/2/the-omarchy-manual/63/web-apps>)
- limine bootloader? <https://github.com/limine-bootloader/limine>
- mise :: [Installing Mise | mise-en-place](https://mise.jdx.dev/installing-mise.html)
- gron <https://github.com/adamritter/fastgron?tab=readme-ov-file>
- x command <https://www.x-cmd.com/>
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

TODO: Look at <https://github.com/topgrade-rs/topgrade> aswell

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
there is also `wezterm`
not sure I like `ghostty`, will stay with `kitty`
e: convinced to give `ghostty` a try -- the theming preview convinced me :)

```conf
theme = Solarized Osaka Night
background = 
foreground = 
background-image = 
background-image-opacity = 
background-opacity = 0.9
background-blur = true
#link
link-url = 
link-previews = true
selection-background = 
selection-foreground =
# title =
# class =
window-inherit-working-directory = 
window-decoration = false
bell-features = no-audio
```

2025-10-16 17:32
will replace `ranger` with `yazi` (skipping `lf`)
looks great out of the box
DONE: config `yazi`

2025-10-16 17:38
TODO: configure my `starship` shell prompt
look at Geist font for terminal

2025-10-17 17:16
how to improve `ghostty` startup?
it is way slower than `kitty`
it is slow because of GTK; we can try to run an empty shell at startup, as subsequent `ghostty` windows are faster

```conf
spawn-at-startup  "ghostty --gtk-single-instance=true --quit-after-last-window-closed=false --initial-window=false"
```

2025-10-17 17:27
add a command-not-found hook to explain missing commands
interesting packages: `pay-respects`, `filkoll`, `find-the-command`
decided on `filkoll`, as `pay-respects` looks as if it does too much (and needs more config) and `find-the-command` looks abandoned
enabled `filkoll` update-service: `sudo systemctl enable --now filkoll-update.timer`
enabled `filkoll`: `source /usr/share/doc/filkoll/command-not-found.fish`

2025-10-17 17:46
I have to say I really like how crispy all the fonts look on `ghostty`

2025-10-17 17:58
choosing `starship` over `oh my posh`, as i value my time :)
TODO: choose sane PDF and document viewer (maybe steal from Omarchy)

2025-10-17 20:52
how to list user-installed packages? (so I know which PDF tools I have installed)
TODO: agree on a single git gui (`lazygit`, `gitui`)
TODO: use timeshift for backups (to external drive? stick?)
TODO: vim-keys on zen-browser
TODO: add niri hotkey to turn neovim into 80 chars width terminal (for better readability and line break)
TODO: CLI reminder when not using the most fancy-rust tools (`ls` instead of `lsd`. Best to also add an alias)

2025-10-17 21:52
want to set up autosave for `nvim`
find a plugin
figure out how to install the plugin (auto-save.nvim)
discover there are erros when autosave and autoformat are combined (endless loop)
need to update lazyvin
encounter more errors
need to install luarocks to fix them
install `mise` to set up my dev environments
remove `nvm` in favor of `mise`
`nvm` installed via `fisher` (fish plugin manager)
figure out how to remove `nvm-fish` and `fisher`
`fisher list | fisher remove`
DONE: does `mise` also means I can remove my python install? (no, python is required for many applications..)
activate `mise` in fish: `echo 'mise activate fish | source' >> ~/.config/fish/config.fish`
actually don't need to install luarocks..

2025-10-17 22:43
autosave set up!

```lua
local excluded_filetypes = {
    -- this one is especially useful if you use neovim as a commit message editor
    "gitcommit",
    -- most of these are usually set to non-modifiable, which prevents autosaving
    -- by default, but it doesn't hurt to be extra safe.
    "NvimTree",
    "Outline",
    "TelescopePrompt",
    "alpha",
    "dashboard",
    "lazygit",
    "neo-tree",
    "oil",
    "prompt",
    "toggleterm",
}

local excluded_filenames = {
    -- "do-not-autosave-me.lua",
}

local function save_condition(buf)
    if
        vim.tbl_contains(excluded_filetypes, vim.fn.getbufvar(buf, "&filetype"))
        or vim.tbl_contains(excluded_filenames, vim.fn.expand("%:t"))
        -- don't save for special-buffers
        or vim.fn.getbufvar(buf, "&buftype") ~= ""
    then
        return false
    end
    return true
end

return {
    "okuuva/auto-save.nvim",
    version = "^1.0.0", -- see https://devhints.io/semver, alternatively use '*' to use the latest tagged release
    lazy = false,
    cmd = "ASToggle", -- optional for lazy loading on command
    -- event = { "InsertLeave", "TextChanged" },
    opts = {
        debounce_delay = 1000, -- ms delay before save
        write_all_buffers = false, -- only save the current buffer
        noautocmd = false, -- do not execute autocmds when saving
        condition = save_condition,
    },
    keys = {
        { "<leader>uv", "<cmd>ASToggle<CR>", desc = "Toggle autosave" },
    },
}
```

2025-10-17 22:44
TODO: ghostty doesn't ready my SSH key for github pushes..
setting up starship
`mkdir -p ~/.config && touch ~/.config/starship.toml`
by default, I prefer text over icons, as I don't know what the icons mean `starship preset plain-text-symbols -o ~/.config/starship.toml`
changed a few icons (mainly OS symbols) to NerfFonts icons
figuring out how to add support for TOML schemas to nvim
thinking about adding yanky.nvim
added `taplo` to `nvim`, but now I get _this file has been excluded_

2025-10-17 23:41
fixed it

```lua
-- File: lua/plugins/lsp-taplo.lua
-- https://old.reddit.com/r/neovim/comments/1fkprp5/how_to_properly_setup_lspconfig_for_toml_files/
return {
    "neovim/nvim-lspconfig",
    opts = {
        servers = {
            taplo = {
                filetypes = { "toml" }, -- ensure it attaches to TOML files
                root_dir = require("lspconfig.util").root_pattern("*.toml", ".git"),
                settings = {
                    evenBetterToml = {
                        schema = {
                            enabled = true,
                        },
                    },
                },
            },
        },
    },
}
```

2025-10-17 23:42
continuing on starship config
how to insert emoji and unicode in linux with my system menu (`drun`?)
DONE figure out which menu I run (fuzzel)
configuring `niri`
I like centering containers, but then I can't edit side-by-side..
DONE change screenlocker to quickshell/noctalia (away from `swaylock`)
niri hotkeys seem like extremely sane defaults. Also, the variable names are sane, too!
DONE change niri logout keybinds to trigger quickshell logout

2025-10-18 00:16
want to change my noctalia profile picture (`~/.face`)
want to copy my profile pictyre via `yazi` as `.face`
added a `yazi` shell wrapper to be able to change the dir

```fish
function y
 set tmp (mktemp -t "yazi-cwd.XXXXXX")
 yazi $argv --cwd-file="$tmp"
 if read -z cwd < "$tmp"; and [ -n "$cwd" ]; and [ "$cwd" != "$PWD" ]
  builtin cd -- "$cwd"
 end
 rm -f -- "$tmp"
end
```

learned that you can press `F1` to display `yazi` keymaps
move files via `x` (cut yank)

2025-10-18 00:27
found out how to quickshell IPC for logout from niri

```toml
Mod+Shift+E { spawn "qs" "-c" "noctalia-shell" "ipc" "call" "sessionMenu" "toggle";}``
```

still need to figure out how to insert unicode via my `fuzzel`
DONE decide on `fuzzel`, `rofi`, `dmenu`, ... (bemenu, wofi, wmenu, ilia, ...) and configure them
TODO save my dotfiles (don't want to lose them...)
TODO research yubikey for auth

2025-10-18 00:48
decided on `fuzzel`
looking for unicode pickers, but this doesn't seem to be available. Closest is `bemoji` and `rofimoji` -- no unicode though?
DONE remove `rofi`
can also use `unipicker` and then add it to `fuzzel`

2025-10-18 01:06
removed `sway`, `manjaro-sway-settings`, ..
check if the following are needed/useful

```text
## The following packages are installed but not required (anymore):
argagg
bc
bluetuith
btop
calcurse
foot
gdb
grimshot
gtklock
idlehack
kvantum-theme-matcha
libappimage
manjaro-base-skel
matcha-gtk-theme
nwg-wrapper
papirus-maia-icon-theme
pyalpm
rofimoji
smartmontools
swappy
swayidle
swayr
wf-recorder
wl-clip-persist
wlroots0.19
wob
xcursor-breeze
xdg-terminal-exec

```

2025-10-18 01:11
Added my preferred terminal char `↳`!

2025-10-18 13:30
`anyrun` seems as if it would do the perfect job for launching apps and searching for unicdoe <https://github.com/anyrun-org/anyrun?tab=readme-ov-file>
`walker` is also a good contender
THOUGHT a new file format that splits all TODO into separate 'threads', as these represent a decision-making fork; I can only do one thing at a time, and every additional TODO needs to be queued and done later. Having a journal that supports this mental model, where I select branches of TODO and journal down on them may also represent a true Zettelkasten approach

2025-10-18 13:52
Installed all of `walker`, `rofi`, `fuzzel` and `anyrun`
don't like the `anyrun` symbols browser
`walker` is the fastest, but needs to configure `elephant`
decided to set up walker
`elephant service enable` and `systemctl --user start elephant.service`
TODO why is there not auto complete for `elephant` in `fish`?

2025-10-18 14:28
seems there is an OOO bug with walker
trying to set a systemd service that restarts when hitting 500mb

```systemd
[Unit]
Description=Walker GApplication Service
After=graphical-session.target

[Service]
ExecStart=/usr/bin/walker --gapplication-service
Restart=always
RestartSec=5
MemoryMax=500M
Environment=WAYLAND_DISPLAY=%EWAYLAND_DISPLAY%
Environment=XDG_CURRENT_DESKTOP=niri
Environment=GDK_BACKEND=wayland

[Install]
WantedBy=default.target
```

2025-10-18 14:37
cleaning up old packages
removed `emacs`, `alacritty`, `autotiling`, `pamac`, `yay`
`walker` starts slow, is the service not running properly?

2025-10-18 22:50
how to copy to clipboard in wayland? `wl-copy`
fixed `walker` service with the help of _grok_

```systemd
[Unit]
Description=Walker GApplication Service
PartOf=graphical-session.target
After=graphical-session.target
Wants=graphical-session.target

[Service]
Type=simple
ExecStart=/usr/bin/walker --gapplication-service
Restart=always
RestartSec=5
MemoryMax=500M
Environment=WAYLAND_DISPLAY=wayland-1

[Install]
WantedBy=graphical-session.target
```

will change my `niri` conf to use `walker` now (but still keep `fuzzel` as backup :)
DONE configure `walker`
DONE use the faster launch command `nc -U /run/user/1000/walker/walker.sock` in my niri conf
DONE walker directly closes and doesn't do anything..
Not sure I want to continue struggling with `walker`...

2025-10-19 00:05
some more attempts at fixing walker, but it didn't work
removed `walker` and `elephant`, waste of time

2025-10-19 01:01
played around with `anyrun`, but I don't like the visual style. it is very annoying to style, and the gtk4 css doesn't work as expected

2025-10-19 14:35
snooping around `anyrun` directory but gave up styling it
let's just stick with `fuzzel`
DONE investigate how to open dedicated emoji/unicode picker (maybe via ghostty?)
set up `tidal-hifi`
looking around neovim plugin management and zen-mode. I don't want to open a terminal and then navigate to specific dotfiles over again, I just want to navigate to a saved folder location from within my terminal.
THOUGHT maybe make my _.dirinfo_ spec come true? Place a .dirinfo into targeted dirs, which serves as readme and description. It can also be used with a picker to directly jump into that dir
DONE set up lazy snacks zen for nvim
actually, it's already set up by default :)
DONE set up MPRIS keybinds to skip a song (can be done via quickshell)

2025-10-19 15:36
installed `dolphin`
notice that all it's styling is broken (black white, invisible fonts, ..)
removed `dolphin`
fixed `yazi` change-directory-on-exit wrapper

2025-10-19 16:53
reading up on `bemoji`, don't like that they don't include full unicode
configured `fuzzel` defaults, really like the man-page
removed `bemoji`, `rofi`
settled on `rofimoji`, which can also use `fuzzel`
DONE figure out why rofimoji-fuzzel shows weird emoji chars (maybe because of the font?)

2025-10-19 18:53
fixed `rofimoji --selector fuzzel` showing outline-only emojis by adding `font=Hack:weight=medium:size=20,Noto Emoji:size=22` into my `fuzzel` config
removed `swaylock`
figured out that I can lock my screen by calling this quickshell IPC `qs -c noctalia-shell ipc call sessionMenu lockAndSuspend`
TODO mediakyes for quickshell `qs -c noctalia-shell ipc call media next`
