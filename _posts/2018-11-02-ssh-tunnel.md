---
layout: post
title:  "SSH Tunnel"
date:   2018-11-02
---

SSH Tunnel is port forwarding.

There are two kinds of port forwarding: local and remote.

The best explaination is from [stack overflow](https://unix.stackexchange.com/questions/115897/whats-ssh-port-forwarding-and-whats-the-difference-between-ssh-local-and-remot):

![local](https://i.stack.imgur.com/a28N8.png)

![remote](https://i.stack.imgur.com/4iK3b.png)


Just in case picture go down:

> ssh -L localport:localhost/farawayhost-in-remotehost:remoteport remotehost