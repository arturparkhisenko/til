# Raspberry Pi 1, Model B

## Steps

1. Download iso [here](https://www.raspberrypi.org/downloads/raspbian/)
2. Install it, [macOS example](https://www.raspberrypi.org/documentation/installation/installing-images/mac.md)
3. Connect trough SSH `ssh -v pi@192.168.1.9` (example, default password: `raspberry`)

## Guide how to write an ISO to the sd-card

- `diskutil list` output disk info with name
- `sudo dd bs=1m if=2018-11-13-raspbian-stretch-lite.img of=/dev/rdisk2 conv=sync` example how to write, where in `rdisk2` a `2` is a sd-card disk number.

## Get ip of the device

- `ifconfig | grep broadcast | arp -a`

## SSH

- [SSH guide](https://www.raspberrypi.org/documentation/remote-access/ssh/)

```shell
cd /Volumes/disk<disk# from diskutil>
touch ssh
```

## Commands

- `sudo raspi-config`
- `cat /proc/cpuinfo`
- `cat /proc/meminfo`
- `cat /proc/partitions`
- `cat /proc/version`
