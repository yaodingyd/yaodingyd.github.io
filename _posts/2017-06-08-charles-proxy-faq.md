---
layout: post
title:  "Charles Proxy FAQ"
date:   2017-06-08
tags:   
    - Tool
---

### Local mapping is not working

Check your recording. If there is a lot of `unknown` HTTP request, then it's served with HTTPS. After installing SSL certificate, go to *SSL Proxying Settings...* in *Proxy*, and add your host in *SSL Proxying* tab. (Use `*` for add all hosts).


### Mobile proxy

Again, probably with HTTPS proxy. Install SSL certificate first, then follow this [link](https://stackoverflow.com/questions/17823434/ssl-proxy-charles-and-android-trouble).
