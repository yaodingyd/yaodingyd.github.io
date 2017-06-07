---
layout: post
title:  "Charles Proxy FAQ"
date:   2017-06-08
tags:   
    - Tool
---

### Local mapping is not working

Check your recording. If there is a lot of `unknown` HTTP request, then it's served with HTTPS. After installing SSL certificate, go to *SSL Proxying Settings...* in *Proxy*, and add your host in *SSL Proxying* tab. (Use `*` for add all hosts).