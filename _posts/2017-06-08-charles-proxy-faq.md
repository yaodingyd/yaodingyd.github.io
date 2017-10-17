---
layout: post
title:  "Charles Proxy FAQ"
date:   2017-06-08
tags:   
    - Tool
---

Some common problems I ran into using Charles Proxy.

### Local mapping is not working

Check your recording. If there is a lot of `unknown` HTTP request, then it's served with HTTPS. After installing SSL certificate, go to *SSL Proxying Settings...* in *Proxy*, and add your host in *SSL Proxying* tab. (Use `*` for add all hosts).


### Mobile proxy

Again, probably with HTTPS proxy. Install SSL certificate first, then follow this [link](https://stackoverflow.com/questions/17823434/ssl-proxy-charles-and-android-trouble).


### Use Charles with livereload

There is one solution listed in [this post](http://www.mikefahy.com/blog/files/configuring-charles-and-livereload-to-work-together.html) but it seems be to outdated for now. Since 3.0, Charles starts to support websockets so I find the following solution working for me:

1. In main menu, go to Proxy > Proxy Setting
2. Enable *SOCKS Proxy* in first "Proxies" tab.
3. Check *Use SOCKS proxy* in "macOS" tab if applicable.

And that's it.
