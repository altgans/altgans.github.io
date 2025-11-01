---
title: Linux setup
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

RANDOM TODO I like the website style of <https://shinglyu.com/web/2024/09/17/my-wayland-adventure.html>

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

2025-10-19 19:30
looking to set up ssh and gpg, again
goal: unlock the keyring until I lock the screen again (or am idle 15 min)
grok seems more useful for tech support than chatGPT

2025-10-19 20:27
discovered some zsh and bash config files -- should I remove them?
TODO notify my when I run a command for which I have a fish alias/function (like `yazi` instead of `y`)

2025-10-19 20:43
added a shortcut for opening my syncthing localhost url via `fuzzel` (by creating a .desktop file in `/home/jst/.local/share/applications`)
I think this is a good way to remember localhost URLs (syncthing, paperless, synology-gui, gitea, pihole, ...)

```desktop
[Desktop Entry]
Name=Syncthing Web UI
Type=Application
Exec=xdg-open http://127.0.0.1:8384/
Icon=text-html
Terminal=false
```

installed `cliphist`, need to figure out what it does -- just another `wl-copy`? E: requires `wl-clipboard`, so seems to sit 'above'
we can run `cliphist list | fuzzel -d | cliphist decode | wl-copy` to have `fuzzel` show the last pastes
TODO set a hotkey for this, and/or use the quickshell variant
TODO check my screenshot setup and/or maybe set up `grim` and `slurp`
removed `pnpm`
added `keychain` to my fish.conf `eval (keychain --eval --quiet KEY_ID)` :: `gpg --list-secret-keys --keyid-format=long`, it's the part after `sec   rsa4096/`
check agents: `ssh-add -l` (lists SSH keys) and `gpg --list-keys`
TODO look into SSHFS for remote-mounting to/from synology
TODO set up ssh aliases
TODO set up hypralax

2025-10-19 21:53
installed `nemo`
looks nice, very similar to `pcmanfm`
TODO transform all my niri startups into systemd services, for better support
setup `niriswitcher`, very nice, fills a gap to make `niri` more useful (don't have to scroll across thousands of windows..) -- <https://github.com/isaksamsten/niriswitcher?tab=readme-ov-file>
TODO take a look at `nirius` (<https://sr.ht/~tsdh/nirius/>)
TODO take a look at `stasis` for better idle handling (<https://github.com/saltnpepper97/stasis?tab=readme-ov-file>)

2025-10-19 22:15
I think I am mostly done configuring everything

- niri and noctalia are configured
- ghostty and fish work
- i can switch and applications
- i can search for emojis
- i can enter my ssh password (not perfect yet)

TODO

- neovim config
- obsidian config (same folder as neovim)
- dotfiles backup
- system backup!
- transform this writeup and post it on my website
- wallpapers and theming with mutagen

2025-10-19 22:36
More ricing? Instead of quickshell there is also aylur :)
TODO also, i could check my icons and gtk theme
DONE decrease `fuzzel` font size
removed `google-chrome`
set cool wallpaper
TODO configure standard utils for opening images, pdf, ..
TODO accidentally removed my gtk theme when cleaning unused packages :)
fixed `nemo` not opening a terminal by calling `gsettings set org.cinnamon.desktop.default-applications.terminal exec ghostty`
removed `etcher`
set `nemo` as default file launcher `xdg-mime default nemo.desktop inode/directory application/x-gnome-saved-search`
TODO `xdg-open` vs `gtk-launch`

2025-10-20 20:38
need to change gtk theme and everything... best if there is a way to write this to a config or have a gui?
looking to install the _arc_ theme, but no idea how :)
installed `gtk-tweaks`, but seems useless
installed `gtk-engine-murrine`, `papirus-icon-theme` and `arc-gtk-theme`
DONE how to copy from fish directly into system clipboard when using vim mode? found a script that makes use of the fish_killring. afterwards, just change the hotkeys to make use of this function afterwards (<https://joaocosta.dev/blog/17>>)

```fish
function yank_to_clipboard -d "Insert latest killring entry into the system clipboard"

    printf "%s" "$fish_killring[1]" | fish_clipboard_copy

end
```

2025-10-20 21:18
check that themes are installed in `/usr/share/themes/Arc-Dark` and `/usr/share/icons/Papirus`
it seems that `lxappearance` and `gnome-tweaks` are indeed the way to go.
also check in `~/.config/gtk-3.0/settings.ini`, `~/.config/gtk-4.0/settings.ini`, `~/.config/environment.d/qt.conf`, `~/.config/Kvantum/kvantum.kvconfig` and `~/.config/qt5ct/qt5ct.conf` (5 and 6)
I really like `Juno-Palenight` in combination with `Papirus-Dark`
removed `pcmanfm-gtk3`

2025-10-20 21:47
figure out why `keychain` doesn't work properly -- should only store my auth when I need my ssh keys the first time, and not whenever I open `fish`...
TODO can I see which package installed which?
TODO show news in paru
TODO figure out how to change cursor theme
maybe this works better for `keychain` in my `fish` conf

```fish
if status is-interactive
    # Commands to run in interactive sessions can go here
    keychain --quiet --nogui ~/.ssh/id_ed25519
    if test -f ~/.keychain/$HOSTNAME-fish
        source ~/.keychain/$HOSTNAME-fish
    end
end
```

2025-10-20 22:44
added a desktop icon for fritz.box
TODO look into pihole (+ hardware) >> Desktop Beelink GK35 maybe?
TODO change firefox userchrome css to style the blank loading page to something dark (no more blinding white #fff) -- <https://stackoverflow.com/questions/26680708/customize-firefox-background-color-of-the-browser-between-page-load>

2025-10-21 20:50
figured out that my screenshots are saved in ~/Pictures/Screenshots/
TODO configure image viewer and (maybe) screenshot tool
installing a script engine to block _Login with Google_ prompts.
it seems that tampermonkey is the up-to-date-one
decided against installing tampermonkey, cause too much risk for someone random too update their script maliciously
changed `fish` `keychain` command based on this answer: [how to run ssh-agent in fish shell? - Super User](https://superuser.com/questions/1727591/how-to-run-ssh-agent-in-fish-shell), which also mentions that `fish` support `keychain` since 2017

```fish
# To add new SSH key, use:
set --universal --append SSH_KEYS_TO_AUTOLOAD ~/.ssh/id_ed25519
# To remove a key, remove it from the list using its index:
# set --universal --erase SSH_KEYS_TO_AUTOLOAD[index_of_key]
# https://superuser.com/questions/1727591/how-to-run-ssh-agent-in-fish-shell
if status is-login
    and status is-interactive
    keychain --eval $SSH_KEYS_TO_AUTOLOAD | source
end
```

2025-10-21 21:14
also added `AddKeysToAgent yes` to my `.ssh/config`
TODO take a look at the `.XCompose` file
removed `okular`
installed `lightningview`, `okulante`. `viewskater` also looks good, but not on _aur_
set niri to `prefer-no-csd`, to remove okulante window decorations
DONE set alias for `fzf` to `ff` (follow omarchy?)
DONE set alias for `zoxide` (follow omarchy to alias `cd`?)
DONE set alias for `eza` (follow omarchy to alias `ls`, `lt`, ..?)
removed `gitui` (`lazygit` is enough)
installed `lazydocker`, `btop`, `fastfetch`, `impala` (and `iwd`)
removed `impala` and `iwd`, as they cause problems with my wireless..
NOTE when in doubt about packages that mess with internet, disable and restart before deleting, in case they are required to make the internet work on your machine ... :)
installed `marktext` (for markdown writing; but could also configure nvim or Obsidian to do the job)
thinking about `pinta`, but don't see the need (editing images, also have `krita`)
TODO set up PDF viewer/editor (Document Viewer, Xournal, Firefox/Zen)
TODO see if I want to switch to Cascadia font (interstingly also the default font choide of Omarchy.. :))
TODO reinstall arch with disk encryption? :)

2025-10-21 22:31
set a few fish abbrevs and aliases

```fish
function zd
    if test (count $argv) -eq 0
        builtin cd ~
        return
    else if test -d $argv[1]
        builtin cd $argv[1]
    else
        z $argv; and printf "\U000F17A9 "; and pwd; or echo "Error: Directory not found"
    end
end

alias cd='zd'
```

```fish
# opens neovim w/o args
function n
    if test (count $argv) -eq 0
        nvim .
    else
        nvim $argv
    end
end
```

```fish
alias ls='eza -lh --group-directories-first --icons=auto'
alias lsa='ls -a'
alias lt='eza --tree --level=2 --long --icons --git'
alias lta='lt -a'
alias ff="fzf --preview 'bat --style=numbers --color=always {}'"

alias g='git'
abbr --add gcm git commit -m
abbr --add gcam git commit -a -m
abbr --add gcad git commit -a --amend
```

also found out that `fish` provides `open` by default, so no need for `xdg-open`
TODO backup my .dotfiles and version control them (stow?)

2025-10-22 00:07
I found the holy grail of dotfiles management -- [Dotfiles Management - mitxela.com](https://mitxela.com/projects/dotfiles_management)
I created a .dotfiles folder in my home, did an init bare git on it, set to my root / and then add files to it via a helper function. No need for any other dotfiles management software! Universal git!
TODO look into git/exclude

2025-10-24 11:04
set my ublock to follow the recommended filters -- <https://github.com/yokoffing/filterlists>
DONE block youtube recommendations and shorts -- <https://github.com/gijsdev/ublock-hide-yt-shorts>
TODO block 'login with google'
DONE block youtube auto dub
DONE see <https://old.reddit.com/r/uBlockOrigin/wiki/solutions/youtube#wiki_video_annotations> for all the above
TODO highlight todos in markdown/neovim :)
TODO look into fedora for thin client (for pihole)
TODO set auto suspend on linux

2025-10-24 13:11
TODO allow to click on links in neovim
E: works with `gx`, but not mapped in lazyvim
TODO dump this link somewhere -- <https://scrollguard.app/>
TODO get updates on new blogs (RSS)
TODO set up Jujutsu (as git replacement)

2025-10-24 14:00
TODO look into fedora atomic images, they seem like another intersting alternative to `nix` and keeping an immutable system. maybe I could try to get this system working on fedora, and otherwise set up manjaro with file encryption?

2025-10-24 16:05
maybe change to rofi for a beautfiul fullscreen app launcher? (seen here -- <https://github.com/kianblakley/niri-land?tab=readme-ov-file>)
TODO look into [Amberol – Apps for GNOME](https://apps.gnome.org/Amberol/) music player
set music keys for niri on via ipc (Mod+Alt+567 inc dec mute; 890 prev next pause)
decided to start 'my' keybinds with `my..` in the comment blocks, to better distinguish them from pre-set keybinds
installed `paru`
TODO improve bluetooth integration to allow to skip music (MPRIS?)
TODO set up `espanso`?

2025-10-26 22:29
installed `logseq`, `treesheets`, `freeplane`
i'd like to set up freeplane with markdown to have a markdown canvas

2025-10-27 18:08
installed `smark.nvim`
looking to set up markdown indent via Tab and S-Tab in nvim (can do `>>` and `<<`)
decided to split `nvim` related config into a dedicated file
TODO neovim find a way to add auto-spacing between lines in markdown (the current file here shows everything inline)

2025-10-27 21:30
installed https://www.soimort.org/translate-shell/

2025-10-28 15:23
could set a shell screensaver (and/or use it as desktop/lockscreen wallpaper) -- https://github.com/attogram/bash-screensavers?tab=readme-ov-file or https://github.com/abishekvashok/cmatrix
it may make sense to use `alacritty` for these types of things, as it is featureless but fast
TODO set up obsidian web clipper (or org-roam-protocol) -- https://addons.mozilla.org/en-US/firefox/addon/web-clipper-obsidian/ or https://github.com/deathau/markdownload

2025-10-28 15:49
think about multi-cursor in nvim

2025-10-28 21:57
DONE send audio alert when battery <10%

```bash
#!/bin/bash

# Battery device (check with: ls /sys/class/power_supply/)
BAT_DEVICE="BAT0"

# Threshold
THRESHOLD=15

# Paths
CAPACITY="/sys/class/power_supply/${BAT_DEVICE}/capacity"
STATUS="/sys/class/power_supply/${BAT_DEVICE}/status"

# Check if files exist
if [[ ! -f "$CAPACITY" || ! -f "$STATUS" ]]; then
	exit 1
fi

# Read values
PERCENT=$(cat "$CAPACITY")
BAT_STATUS=$(cat "$STATUS")

# Trigger if discharging and below threshold
if [[ "$BAT_STATUS" == "Discharging" && "$PERCENT" -lt "$THRESHOLD" ]]; then
	# Play warning sound (adjust path/file if needed)
	canberra-gtk-play --file=/usr/share/sounds/freedesktop/stereo/dialog-warning.ogg
	# Alternative for MP3/WAV: paplay ~/sounds/warning.mp3  (install pulseaudio-utils if missing: sudo pacman -S pulseaudio)
	notify-send -u critical "Low Battery!" "Charge now: ${PERCENT}% remaining!"
fi
```

2025-10-29T19:34
installed `helix` and ran the `:tutor`
may actually be a really cool tool. need snippets though
there is also `kakoune`, which uses the same command paradigm, but is too extensible
[[helix-setup]]
it seems that helix doesn't have a file picker?!
everyone refers to the plugin system, which hasn't been set in place yet.
need to use `yazi` as file picker/browser -- well, maybe this improves my workflows, or otherwise shows me the benefits of `nvim`
alternative to `yazi`: `nnn`, `xplr`
TODO: `yazi` inside of `nvim` -- [mikavilpas/yazi.nvim: A Neovim Plugin for the yazi terminal file manager](https://github.com/mikavilpas/yazi.nvim)
set `helix` as default file editor in `yazi.toml`

2025-10-29T20:53
still configuring helix, set the initial config now
came across this, which seems like yet another benefit of fedora immutable silverblue: https://docs.fedoraproject.org/en-US/fedora-silverblue/toolbox/
want to install `hx-lsp` for helix via `mise`, but first need to install `mise use -g rust`: `mise use -g cargo:hx-lsp`

2025-10-29T21:33
Setting up `helix` with `marksman`, `prettier` and `ltex-ls-plus` (https://github.com/ltex-plus/ltex-ls-plus)
TODO jsut found https://strudel.cc/ to make live music

2025-10-30 13:46
found https://github.com/ShawnMcCool/quickshell-cheatsheet, looks cool
will change back from `hx` to `nvim`. looked at `kakoune`, but nope, seems like a mess.
removed `marksman`, `mpls`, `ltex-ls-plus`, `prettier`, `mise uninstall cargo:hx-lsp@`

2025-10-30 17:41
TODO steal from this: a really cool digital garden -- https://meleu.dev/

2025-10-31 13:27
TODO improve browser search by blacklisting specific websites (pinterest, ...)
TODO have a solution to manage photos on my NAS, sync with my phone, have albums

2025-10-31 16:27
TODO if i ever switch to fedora silverblue and then manage via distrobox, https://flathub.org/en/apps/com.ranfdev.DistroShelf looks useful

2025-11-01 14:56
it's saturday and I should find a strategy to backup my files to my NAS >> [[linux-backup]]

2025-11-01 21:04
took a bit, but I finally managed it!
