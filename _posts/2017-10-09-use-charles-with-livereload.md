---
layout: post
title:  "Use Charles With Livereload"
date:   2017-10-09
tags:   
    - Tools
---

There is one solution listed in [this post](http://www.mikefahy.com/blog/files/configuring-charles-and-livereload-to-work-together.html) but it seems be to outdated for now. Since 3.0, Charles starts to support websockets so I find the following solution working for me:

1. In main menu, go to Proxy > Proxy Setting
2. Enable *SOCKS Proxy* in first "Proxies" tab.
3. Check *Use SOCKS proxy* in "macOS" tab if applicable.

And that's it.