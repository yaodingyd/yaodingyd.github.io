---
layout: post
title:  "Security: CSP and CORS"
date:   2017-07-19
tags:   
    - Web Fundamental
---

Today when I was working, I checked console log and saw 146 errors of something like this: 

> [Report Only] Refused to load the stylesheet 'http://example.com' because it violates the following Content Security Policy directive: "default-src https: 'unsafe-inline' 'unsafe-eval'". Note that 'style-src' was not explicitly set, so 'default-src' is used as a fallback.

Then I noticed there is a new item in header: `Content-Security-Policy-Report-Only:default-src https: 'unsafe-inline' 'unsafe-eval'; report-uri https://example.com/reportingEndpoint`. This enables *Content Security Policy*, which in the case, report error only and doesn't really block resources from loading.

## What is Content Security Policy

According to MDN:

> Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware.

To use CSP, we can either enable this in the server side, that means adding a `Content-Security-Policy` HTTP header, or use `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">` meta tags in the HTML.

## What's difference with CORS?

Same Origin Policy is the default policy for all browsers and it limits that a resource makes a cross-origin HTTP request when it requests a resource from a different domain, protocol, or port to its own. Basically when doing `XMLHttpRequest` or `fetch`, you have to enable CORS for different origin, but not loading `script` or `img` tag when document first loads.


