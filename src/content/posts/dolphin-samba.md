---
title: Dolphin 挂载远程 Samba 资源
pubDate: 2026-07-20
description: KDE Dolphin 访问带密码的 Samba 共享时不会弹出认证框的解决方案
tags:
  - Linux
  - KDE
  - Samba
category: 技术
draft: false
---
## 前言

最近把东西迁移到了 NAS，想着把 Obsidian 的笔记也迁移过去

结果发现 KDE 的 Dolphin 对 Samba 的支持不完善，导致我没法读取远端的 Obsidian 笔记

![Dolphin 无法连接](/images/archive/Pasted%20image%2020260720023107.png)

经过搜索，以及各种问 AI

最终发现是 Dolphin 在访问带密码的 smb 连接时，不会弹出认证框，导致无法连接

## 思索

摸索了一下，找到两个解决方案

1. 这是一种临时解决方式，可以在地址栏输入 `smb://用户名:密码@服务器/` 即可访问  

![地址栏输入](/images/archive/Pasted%20image%2020260720023858.png)
需要注意的是，如果用户名或者密码有像是 `@`、`#` 等特殊字符，需要使用 `%` 转译。例如 `@` 需要转译为 `%40`
不过这种方法只能生效一次，每次访问都很麻烦，且无法固定到左侧标签栏  
2. 这种方法更彻底，适合在主力机里使用  

使用你喜欢的编辑器编辑 `/etc/fstab`，这里我使用 `kate`，在末尾加上一行  
```bash
//192.168.1.45/笔记 /mnt/笔记 cifs username=xxx,password=xxx,uid=1000,gid=1000,iocharset=utf8,x-systemd.automount,noauto,x-systemd.idle-timeout=300,x-systemd.device-timeout=10,_netdev,users,uid=1000,gid=1000 0 0
```
   ![fstab 编辑](/images/archive/Pasted%20image%2020260720024418.png)

将配置文件中的路径改成你的实际路径，重启电脑即可  
下次重启后，会自动挂载到 `/mnt/笔记`（或者你自己设定的目录）  
此时在地址栏访问 `/mnt/笔记` 即可。同时也可以固定到侧边栏
![访问成功](/images/archive/Pasted%20image%2020260720024625.png)

## 最后

该方法是我跟 AI 折腾出来的，也许会有更好的方法，欢迎讨论
