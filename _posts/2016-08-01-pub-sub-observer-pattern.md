---
layout: post
title:  "Pub/Sub and Observer Pattern"
date:   2016-08-01
tag:    
    - JavaScript 
    - Programming
---

First of all, read [this](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript).

Main idea: loose coupling. ["It's a somewhat event-based way of thinking, but the "events" aren't tied to a specific object."](http://stackoverflow.com/a/13513771/6901252). So for Pub/Sub, they don't even know if their counterparts exist. For Observer pattern, though observer must subscribe to the subject, observers don't know about each other.

Also, because subscribers are agnostic of publisher, they can implement an event handler published by any one.

In Angular 1, thw Observer Pattern is implemented through digest circle in `$scope`. Angular would add a watcher for each of these:

1.{% raw %}`{{expression}}`{% endraw %} or `ng-model`, implicitly by Angular;
2. `$scope.$watch`, explicitly by you

Too many watchers will lower application performances. For Angular 1, the offcial recommedation is that you should not have more than 2000 watchers in a single page. So either reduce watchers usages or use bind-once. 


In Angular 1, a subscriber ‘subscribes’ to an event using `$on(‘event’, callback)`, and a publisher ‘publishes’ an event using `$emit(‘event’, args)` or `$broadcast(‘event’, args)`.