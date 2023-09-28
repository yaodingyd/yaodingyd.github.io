---
layout: "../../layouts/BlogPost.astro"
title:  "Dependency Injection Finally Makes Senses For Me (in Angular 1)"
pubDate: "April 17 2017"
---

I started learning about Dependency Injection(DI) with Angular 1 and frankly speaking, it was not a very pleasant experiences for me at the start. 

Angular uses all kinds of jargons in one short [article](https://github.com/angular/angular.js/wiki/Understanding-Dependency-Injection): `service`, `provider`, then `$provider`, `$provider.service()`, `$provider.factory()`, with some actually referring to the one of program paradigms and some are Angular's directives, I was totally confused at that time.

Now it slows makes sense to me, and to quote from Laravel's official documents:

> Dependency injection is a fancy phrase that essentially means this: class dependencies are "injected" into the class via the constructor or, in some cases, "setter" methods.

And the more I looked into how Laravel handles DI, the more I see how Angular is truly a MVC framework.

Laravel has two concepts around DI: `service container` and `service provider`. Basically in `service provider` we 'register' (or 'define') a 'service', and use `service container` to do `App::bind` or `App::singleton`, and later Laraval can use type hinting to do DI. 

Angular follows the same concept here: we use `$provide` to define a bunch of 'service', or use its shortcuts(`module.provider`, `module.service` or `module.factory`); later we inject all these dependency with either an array in the callback:

```javascript
`someModule.controller('MyController', ['$scope', 'dep1', 'dep2', function($scope, dep1, dep2) {...})` 
```

or use 

```javascript
`MyController.$inject = ['$scope', 'dep1', 'dep2'];`. 
```

One thing to notice is that all 'service' in Angular are singletons.

Similarly, in Spring, the IoC container handles dependencies for beans. In Spring's official documents, it describes IoC, or *Inversion of Control*, as Dependency Injection, as an inversion of Service locator. This confuses me for a little bit, until I saw the following:

>Service Locator is a kind of dependency injection pattern. The Service Locator pattern does not describe how to instantiate the services. It describes a way to register services and locate them. A Service Locator should be able to locate a service without knowing its concrete type. For example, it might use a string key. This allows you to replace the concrete implementation of the dependency without modifying the classes. [source](https://github.com/dimik/service-locator#description)

So for Spring, the inversion is that instead of bean(or module) using Service Locator to do 'dependency injection', there is a container, in this case called `IoC container`, as `service container` in Laravel, to do DI.


