---
title: Linux backup
tags: posts
date: 2025-11-01T14:58
---

## Goal

- schedule a system backup to my NAS
- set up git server on my NAS 

## Synology NAS

Synology NAS DS220+. Added a desktop file to quickly open it.

### Git-server on Synology

Synology seems to allow only admins to connect via SSH. Which is stupid and a security risk. And a reason for me to look for alternative NAS providers (OpenNAS), in case I ever need another one.

1. login via existing SSH user
2. become root via `sudo -i`
3. TODO when ssh'ing and then deleting text, the text doesn't get removed visually. find a way to fix that
    a. E: fixed it: `echo $TERM` shows `xterm-ghostty`, which Synology has troubles with the term sequences. Changing the `$TERM` variable to `TERM=xterm-256color ssh admin@your-nas` fixes the problems. This can be finalized in the ssh-config via `SendEnv TERM`. See also [ghostty terminfo help](https://ghostty.org/docs/help/terminfo#ssh)
    b. also put the tic decompiled binary codes into `.terminfo/x/xterm-ghostty`
4. create 'gituser', give it access and permissons on Synology git-server
5. create shared folder ('git'). give 'gituser' access to this folder. Create target git repo there (by logging-in via SSH with admin user..)
6. on desktop, can now clone repo with non-admin user `git clone ssh://gituser@192.168.178.30:223/volume1/git/dotfiles.git`
    1. needs password... >> any way to make this passwordless?
    
### Remove MOTD on SSH

Delete contents of `/etc/MOTD` file, but leave it there! 

## One or multiple SSH keys?

As Synology requires all SSH-connecting accounts to be admin-privileged either way, it does not make sense to set up dedicated accounts. I will therefore stick with one master account that does everything (git, backup, ...) == my host machine. This also simplifies my config, although it may not be the most optimal approach from a devops perspective.

2025-11-01 17:26 deleted git user and backup user

## SSH

Enable ssh via `sudo vim /etc/ssh/sshd_config`

```config
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```

Change permissions of user .ssh folder 

```sh
su – user
mkdir ~/.ssh
chmod 700 ~/.ssh
touch ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

Copy ssh file to authorized_keys `ssh user@ds "/bin/cat >> ./.ssh/authorized_keys" < ~/.ssh/yourKey.pub`


Source: [Passwordless Backup with Synology DiskStation - Improve & Repeat](https://improveandrepeat.com/2016/09/passwordless-backup-with-synology-diskstation/)
## SSH Keychain

Store the SSH password across terminal sessions; only enter my password once

I failed to set this up a few times, but who knows, maybe this time it works flawlessly :)

```fish
# https://superuser.com/questions/1727591/how-to-run-ssh-agent-in-fish-shell
if status is-interactive
    SHELL=/usr/bin/fish keychain --quiet --dir ~/.ssh id_ed25519
    SHELL=/usr/bin/fish keychain --eval --quiet --dir ~/.ssh id_ed25519 | source
end
```

## SSH into Synology to the git folder

Added an abbreviation to my fish.config. Running `synogit` will drop me into the respective folder. This also seems to use `fish` as my remote shell -- no idea how

`abbr --add synogit "ssh -v syno-berlin -t 'cd /volume1/git && ls -la; echo; exec bash -l'"` (note: need to double escape)

I tried to make this work via RemoteCommand in the ssh config, but failed for some reasons.

## Backup script 

To backup

```bash
#!/bin/bash

rsync --recursive --copy-links --times --progress --exclude '.thumbnails' -e "ssh -i ~/.ssh/yourKey" /home/user user@ds:/vol1/_BACKUP/
```


### Fix permissions

On the first dry-run I got the following error. It means that I don't have the correct permissions

```bash
rsync --dry-run -avh --progress --delete --filter='merge /home/jst/rsync-ignore.txt' /home/jst/ syno-berlin:/volume1/backup/berlinbook
sending incremental file list
rsync: change_dir#1 "/volume1/backup/berlinbook" failed: Permission denied (13)
rsync error: errors selecting input/output files, dirs (code 3) at main.c(648) [Receiver=3.1.2]
```

Check the folder permissions and fix them otherwise

```bash
ls -ld /volume1/backup
ls -ld /volume1/backup/berlinbook
sudo chown -R jst:users /volume1/backup/berlinbook
sudo chmod -R 755 /volume1/backup/berlinbook
```

Note the `-R`, which runs these commands recursively. This is because I deleted the previous *backup* user, which messed with the permissions.. :)

### Exclude from rsync

I exclude these files. Not sure about `.local/share`, as 95% of it is trash, but the other 5% are very important

I have a file `.rsync-ignore`, which gets called via `rsync -avh --progress --delete --exclude-from=/home/jst/.rsync-ignore /home/jst/ syno-berlin:/volume1/backup/berlinbook`


```conf
# ========================================
# RSYNC IGNORE LIST FOR HOME DIRECTORY BACKUP
# ========================================

# 1. CACHES & TEMPORARY DATA (safe to skip)
.cache/
.caches/
.npm/_cacache/
.pip/cache/
.gradle/caches/
.yarn/cache/
.cargo/registry/cache/
.vscode/extensions/.obsolete/
**/node_modules/.cache/
**/.cache/
**/*cache*/
**/Cache/
**/Temporary Internet Files/
**/temp/
**/tmp/

# 2. BROWSER & APP CACHES
.mozilla/firefox/*.default*/Cache/
.mozilla/firefox/*.default*/cache2/
.google-chrome/Default/Cache/
.google-chrome/Default/Code Cache/
.google-chrome/Default/GPUCache/
.chromium/Default/Cache/
.brave/Default/Cache/
.vivaldi/Default/Cache/
.opera/Cache/
**/BraveSoftware/Brave-Browser/Default/Cache/
**/Microsoft/Edge/User Data/Default/Cache/

# 3. DOWNLOADS (optional — comment out if you want to back them up)
#Downloads/
#downloads/

# 4. TRASH & RECYCLE BIN
.Trash/
.Trash-*
.trash/
.Recycled/
$RECYCLE.BIN/

# 5. LARGE BUILD/DEV ARTIFACTS
**/node_modules/
**/venv/
**/__pycache__/
**/.venv/
**/.env/
**/.python_history
**/env/
**/build/
**/dist/
**/out/
**/target/           # Rust/Cargo
**/bin/
**/obj/
**/pkg/
**/vendor/          # Go/PHP
**/.git/
**/.svn/
**/.hg/

# 6. MEDIA LIBRARIES & INDEXES (regenerate on restore)
.Spotify/
.spotify/
.Music/*.db
.Music/*.ldb
.Plex/
.plex/
.kodi/
.steam/steamapps/
.steam/steam/steamapps/
.games/
.Wine/
.wine/
.lutris/
.heroic/
.bottles/

# 7. VIRTUAL MACHINES & DISK IMAGES (back up separately!)
*.vdi
*.vmdk
*.vhd
*.vhdx
*.ova
*.ovf
*.img
*.iso
VirtualBox VMs/
.vagrant/
.parallels/
.vmware/
VBoxManage.log*

# 8. SYSTEM & LOCK FILES
.lock
*.lock
*.lck
*.pid
*.sock
*.swp
*.swo
*~
.#*
.#*#
*.bak
*.tmp
*.temp

# 9. LARGE LOG FILES
*.log
*.log.*
**/logs/
**/log/
.nohup.out
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# 10. OS-SPECIFIC & MOUNT POINTS
/lost+found/
/proc/
/sys/
/dev/
/mnt/
/media/
/run/
.snapshots/

# 11. SNAP & FLATPAK RUNTIMES (optional — large, regeneratable)
~/snap/
~/var/lib/snapd/
~/.var/app/
~/.local/share/flatpak/

# 12. THUMBNAILS & PREVIEWS
.thumbnails/
.Thumbnails/
.eog/thumbs/
.gwenview/
.digikam/
.pictures/thumbs/

# 13. IDE & EDITOR TEMP FILES
.idea/
.vscode/
*.code-workspace
*.sublime-workspace
*.sublime-project
*.project
*.classpath
*.settings/
*.metadata/
*.tmproj
*.DS_Store
._*

# 14. CRYPTO & KEYRING (security — don't back up encrypted keys)
.gnupg/random_seed
.gnupg/.#*
.seahorse/
.gnome-keyring*
.kde/share/apps/kwallet/
.wallet/
.ssh

# 15. BACKUP TOOLS & SYNC FOLDERS (avoid loops)
.backup/
.backups/
.rsync/
.sync/
.dropbox/
.dropbox.cache/
.mega/
.nextcloud/
.seafile/
.spideroak/
.insync/
.google-drive/
.one-drive/

# 16. Custom
.local/share/Steam/**
.cargo
.local/share/containers
.local/share/zed
.local/share/nvim/
.mozilla/firefox/*/Cache
```

### Backup as systemd service

I want to backup when I log in, and on idle. After backup a notification should be sent.

Gotchas: Even though I spent a long time above to set up my ssh and passwords, the service complains about wrong credentials. As a solution I could use something like `sshpass`, or a plaintext password. Instead, I created a passwordless key that I will use only for my NAS. 

Here, the terrible security practice of Synology with only-admin-ssh shows, as this means that whoever has access to my device also has root access to my NAS. Luckily my threat vector is small (holiday pictures and backups), so whoever has access to my machine already has all the information.. :)

Service:

```sh
[Unit]
Description=Opportunistic rsync backup to syno-berlin
Wants=network-online.target
After=network-online.target

# Optional: Only run on AC power (laptop)
ConditionACPower=true

[Service]
Type=oneshot

ExecStart=/usr/bin/rsync -e 'ssh -p 223' -avh --delete --exclude-from=/home/jst/.rsync-ignore /home/jst/ syno-berlin-rsync-backup:/volume1/backup/berlinbook
Nice=19
IOSchedulingClass=2
IOSchedulingPriority=7

# Prevent running if destination unreachable
ExecStartPre=/usr/bin/ssh -o BatchMode=yes -o ConnectTimeout=5 syno-berlin-rsync-backup true

# Notify
ExecStartPost=/home/jst/.config/systemd/user/backup-notify.sh

[Install]
WantedBy=default.target
```

Timer

```sh
[Unit]
Description=Run rsync backup after login and periodically
Requires=rsync-backup.service

[Timer]
# Run 5 minutes after user login
OnStartupSec=300

# Then every 6 hours while session is active
OnUnitActiveSec=6h

# If missed (PC was off), run as soon as possible
Persistent=true

Unit=rsync-backup.service

[Install]
WantedBy=timers.target
```

Notification

```bash
#!/bin/bash
export DISPLAY=:0
export DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$(id -u)/bus

/usr/bin/notify-send "Backup" "rsync to syno-berlin completed" --icon=backup
```

Don't forget to restart the service!

```sh
systemctl --user daemon-reload
systemctl --user restart rsync-backup.service
systemctl --user restart rsync-backup.timer
```
