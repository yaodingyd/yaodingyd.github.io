---
layout: post
title:  "HTTP and Session"
date:   2016-04-08
tags:   
    - Web Fundamental
---

A collection of knowledge on HTTP and a sad story about a web dev who didn't have the basic knowledge with http and session when doing a job interview somewhat at early 2016.

### HTTP

HTTP is a TCP/IP based communication protocol, that is used to deliver data (HTML files, image files, query results, etc.) on the World Wide Web. By default, web traffic uses TCP port 80. The basic structure is like this:
1. HTTP  *Application layer*  
2. TCP(Transmission Control Protocol) *Transport layer*  
3. IP (Internet Protocol) *Internet layer*

HTTP is connectionless(HTTP/1.0), stateless and media independent.

HTTP/1.1 introduced persistent connections(keep-alive), long-lived connections that stay open until the client closes them. Persistent connections are default in HTTP/1.1, and making a single transaction connection requires the client to set the `Connection: close` request header. This tells the server to close the connection after sending the response.

In addition to persistent connections, browsers/clients also employ a technique, called parallel connections, to minimize network delays. 

The primary or most-commonly-used HTTP verbs (or methods) are POST(create), GET(read), PUT(replace), PATCH(modify), and DELETE.

##### Protocals using or similar to HTTP 

HTTP Long-polling is a technique used to push updates to a web client. A connection is held open between the web client and the web server so that when the server has new information it can push it to the client. That connection is then closed.

Server-sent events (SSE) is a technology where a browser receives automatic updates from a server via HTTP connection.

WebSocket is a protocol providing full-duplex communication channels over a single TCP connection. 

### Common HTTP Headers

1. *Pragma*: include implementation-specific headers. The most commonly used pragma-directive is `Pragma: no-cache`, which really is `Cache-Control: no-cache` under `HTTP/1.1`.
2. *Date*: timestamp the request/response message.
3. *Content-* prefixed headers provide information about the structure, encoding and size of the message body.
4. *Expires*: (HTTP/1.0) indicates a timestamp of when the entity expires.
    Expires is an older HTTP/1.0 response header that specifies the value as an absolute date. Generally this is a bad assumption. This header is less useful compared to the newer `Cache-Control: max-age=<s>` header introduced in `HTTP/1.1`. Here, `max-age` is a relative age, specified in seconds, from the time the response was created.  
5. *Last-Modified*: indicates the last modification timestamp for the entity..
6. *ETag*: the MD5 hash of the entity and used to check for modifications.
    Server re-validation step can be accomplished with two kinds of request-headers: `If-Modified-Since` and `If-None-Match`. The former is for date-based validation while the latter uses Entity-Tags (ETags), a hash of the content. These headers use `Last-Modified` or `ETag` values obtained from a previous server response. In case of `If-Modified-Since`, the `Last-Modified` response header is used; for `If-None-Match`, it is the `ETag` response header.
7. *Cache-Control: no-cache*: the client is allowed to store the document; however, it must revalidate with the server on every request. There is a HTTP/1.0 compatibility header called Pragma: no-cache, which works the same way.
    *Cache-Control: no-store*: this is a stronger directive to the client to not store the document at all.
    *Cache-Control: must-revalidate*: this tells the client to bypass its freshness calculation and always revalidate with the server. It is not allowed to serve the cached response in case the server is unavailable.
    *Cache-Control: max-age*: this sets a relative expiration time (in seconds) from the time the response is generated.
8. *X-Frame-Options*: indicate whether or not a browser should be allowed to render a page in a<frame>, <iframe> or <object> .
9. *DNT(Do Not Track)*: indicate whether or not a browser should be allowed to user tracking(cookies, Internet address, browser fingerprinting).

### Security and Authentication
HTTPS is a secure version of HTTP, inserting an additional layer between HTTP and TCP called TLS or SSL (Transport Layer Security or Secure Sockets Layer, respectively). HTTPS communicates over port 443 by default.

#### How HTTPS works

1. Client sent request to server, server sends back with *public key* and *certificate*.
2. CLient checks *certificate*'s *digital signiture* with preinstalled *Certificate Authorities(CA)*.
3. *Certificate* is trusted; client use *public key* to generate a *session key*.
4. Client sends data with *session key* to server; server decrypts using *Private key* to get *session key*
5. Client and server talks with encrypted messages in *session key*
6. *Private key* is always kept protected in server, *public key* is distrubited freely; any message encryted with *public key* can only be decrypted with *private key* --- this is asymmetric key
7. Once server and client establish connection, they use *session key* to send data --- this is symmetric key

HTTPS could be achieved by proxy - that's one of the benefits of reverse proxy too: we have one layer of SSL on reverse proxy (equipped with SSL acceleration hardware), and app servers doesn't have to deal with encryption any more.


Cross-Origin Resource Sharing (CORS) gives web servers cross-domain access controls, which enable secure cross-domain data transfers. Modern browsers use CORS in an API container - such as XMLHttpRequest - to mitigate risks of cross-origin HTTP requests.
The response header adds a Access-Control-Allow-Origin header to specifies a URI that may access the resource.

A Cross-site scripting (XSS) hole is when an attacker can inject client-side scripts into a page viewed by other users. Browsers treat these injected scripts like any other script in the page. It can steal cookie or manipulate session in some ways. We can exclude or escape HTML input to deal with this.
A Cross-site request forgery hole is when a malicious site can cause a visitor's browser to make a request to server that causes a change on the server. The server thinks that because the request comes with the user's cookies, the user wanted to submit that form. CSRF attacks usually involve JavaScript to submit the cross-site form automatically. It is possible for a malicious site to make a user submit a form to another site even without JavaScript, however: form fields can be hidden and buttons can be disguised as links or scrollbars.The most common method to prevent Cross-Site Request Forgery (CSRF) attacks is to append unpredictable challenge tokens to each request and associate them with the user’s session. Such tokens should at a minimum be unique per user session, but can also be unique per request. By including a challenge token with each request, the developer can ensure that the request is valid and not coming from another source other than the user.
 
### Session

A session can be defined as a server-side storage of information that is desired to persist throughout the user's interaction with the web site or web application. Intuitively, I treat session as a specific time span, for example, the time browser window keeps open, that client and server communiate with each other. 

So, in order to keep persistent info with stateless HTTP, here are a few different ways a server can collect client info:
1. Request headers: From, Referer, User-Agent 
2. Client-IP - the IP address of the client
3. Fat Urls(rewrite URLs) - storing state of the current user by modifying the URL and redirecting to a different URL on each click; each click essentially accumulates state.
4. Cookies - Cookies allow the server to attach arbitrary information for outgoing responses via the Set-Cookie response header. A cookie is set with key/value pairs separated by semicolon (;), as in Set-Cookie: session-id=12345ABC; username=nettuts. A server can also restrict the cookies to a specific domain and path, and it can make them persistent with an expires value. Cookies are automatically sent by the browser for each request made to a server, and the browser ensures that only the domain- and path-specific cookies are sent in the request. In cookies we can set SessionID, or a session token, which is an unique identifier that is generated and sent from a server to a client to identify the current interaction session. This is called *session tracking*. There are other techniques use other to keep tracking of session, like OAuth uses access tokens.
