---
layout: post
title:  "All About Servers"
date:   2015-12-11
tags:   
    - Web Fundamental
---

A crash course about server structures.

## Three-tier architecure

According to Wikipedia,
 > Three-tier architecture is a client–server software architecture pattern in which the user interface (presentation), functional process logic ("business rules"), computer data storage and data access are developed and maintained as independent modules, most often on separate platforms.

 Basically, there are three layers in each web application:
 1. Presentation layer (front end server, static server)
 2. Logic layer (back end server, dynamic server)
 3. Data layer (database)

## Front-end server

What is a front end server? A front end server is the first server to receive requests and sending them to other servers. In this way, it improves the scalability of services. You can provide multiple front end servers accessing the same backend server or a single front end server with multiple backend servers. So a front end server acts as a reverse proxy (accepts a request from a client, forwards it to a server that can fulfill it, and returns the server’s response to the client), and a load balancer (distributes incoming client requests among a group of servers, in each case returning the response from the selected server to the appropriate client).

Typical front end servers are apache and ngix.

Sometimes we call it a 'web server', to differentiate from an 'app server', which contains the business logic.


## The need for a front-end server

Basically front end server serves faster with static content and clustering is easy. For other reason, see [this](https://wiki.apache.org/tomcat/FAQ/Connectors#Q3).

## Back-end server

App server, or app container. Depends on the back-end technology stack, it could be a nodejs server, tomcat, or python application.

### Proxy

1. A proxy server that passes unmodified requests and responses is usually called a *gateway*.
2. A forward proxy is an Internet-facing proxy used to retrieve from a wide range of sources.
3. A reverse proxy is usually an internal-facing proxy used as a front-end to control and protect access to a server on a private network. A reverse proxy commonly also performs tasks such as load-balancing, authentication, decryption or caching.





 

