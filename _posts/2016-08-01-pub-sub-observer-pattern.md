---
layout: post
title:  "Pub/Sub and Observer Pattern"
date:   2016-08-01 
---

First of all, read [this](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript).

Main idea: loose coupling. ["It's a somewhat event-based way of thinking, but the "events" aren't tied to a specific object."](http://stackoverflow.com/a/13513771/6901252). So for Pub/Sub, they don't even know if their counterparts exist. For Observer pattern, though observer must subscribe to the subject, observers don't know about each other.

Also, because subscribers are agnostic of publisher, they can implement an event handler published by any one.

