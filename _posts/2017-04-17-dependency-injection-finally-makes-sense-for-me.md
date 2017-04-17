---
layout: post
title:  "Dependency Injection Finally Makes Senses For Me (in Angular 1)"
date:   2017-03-22
tags:   
    - Node
---

I started learning Dependency Injection(DI) with Angular 1 and frankly speaking, it was not a very pleasant experiences for me at the start. Angular uses all kinds of jargons in one short [article](https://github.com/angular/angular.js/wiki/Understanding-Dependency-Injection): `service`, `provider`, then `$provider`, `$provider.service()`, `$provider.factory()`, with some actually referring to the one of program paradiams and some are Angular's directives, I was totally confused at that time.

Surly I have no problem understanding it now. To quote from Laravel's offical documents:

> Dependency injection is a fancy phrase that essentially means this: class dependencies are "injected" into the class via the constructor or, in some cases, "setter" methods.

And the more I looked into how Laravel handles DI, the more I see how Angular is truly a MVC framework.

Laravel has two concepts around DI: `service container` and `service provider`. Basically in `service provider` we 'register' (or 'define') a 'service', and use `service container` to do `App::bind` or `App::singleton`, and later Laraval can use type hinting to do DI. Angular follows the same concept here: we use `$provide` to define a bunch of 'service', or use its shorcuts(`module.provider`, `module.service` or `module.factory`); later we inject all these dependency with either an array in the callback
`someModule.controller('MyController', ['$scope', 'dep1', 'dep2', function($scope, dep1, dep2) {...})`, or use `MyController.$inject = ['$scope', 'dep1', 'dep2'];`. One thing to notice is that all 'service' in Angular are singletons.



