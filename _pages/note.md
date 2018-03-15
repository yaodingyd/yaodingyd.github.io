---
layout: page
title: Note
permalink: /note/
---

# LeetCode 

1. usage of two pointers(one faster, and one slow ): 
- find/remove duplicates in a array 
- check loop/find node in linked list
- one left, one right: sort

2. backtrack

```javascript
function backtrack() {
    if (condition met) {
        return res
    }

    for (var i of pool ) {
        res.push(i)
        var check = backtrack()
        if (check met) {
            break// or return true
        }
        res.pop(i)
    }
}
```
3. greedy: start from end of array to check if there is a matching node 
4. Think recursive and iterative



# DOM cheatsheet

I keep forgetting methods of traversing node in DOM, so here it is:

Traversing in `Nodes`
![node](https://javascript.info/article/dom-navigation/dom-links.png)

Traversing in `Elements`

![element](https://javascript.info/article/dom-navigation/dom-links-elements.png)


Node types
![type](https://javascript.info/article/basic-dom-node-properties/dom-class-hierarchy.png)

All images credit to [https://javascript.info/](https://javascript.info/).


Node parent to manipulate child

1. `appendChild`
2. `removeChild`
3. `replaceChild`
4. `insertBefore(node, referenceChild)`


# A collection of werid CSS, JavaScript and Cross-browser issue I have encountered.

1. In *Firefox* and *IE*, for a flex child, the height and width cannot be set 
as percentage, because somehow the child cannot get its parent's width and  height. Use PX only.
 
2. If you already short-hand background property, then background-size would
be reset to default. You have to add it to short-handed background, as
background position / background size.
 
3. `<meta width="viewport">` would make browser ignore the overflow property 
on html or body tag. So you should have another div wrap your main.

4. In order to prevent css transform flicker in iPhone and Android, use
  ```
  -webkit-perspective: 1000px;
  -webkit-backface-visibility: hidden;
  perspective: 1000px;
  backface-visibility: hidden;
  ```
5. Image loading would trigger a resizeevent on mobile *Chrome*, but does not in Desktop or any other browsers. So if multiply page resizing event happen in mobile, check if there's any lazy-loading.

6. To set width of inner div on scrollable element to 100% of scrollable width,
make the inner div `display: table-row`

7. If children elements are displayed as `inline-block` and get pushed down once there is window resizing, make parent display as `inline-block` too, and add `white-space: nowrap` to parent.

8. In order to display scrollbar on iOS device, use: 
  ```css
  ::-webkit-scrollbar {
     -webkit-appearance: none;
     width: 7px;
     height: 7px;
  }
  ::-webkit-scrollbar:vertical {
     width: 7px;
  }
  ::-webkit-scrollbar:horizontal {
     width: 7px;
  }
  ::-webkit-scrollbar-thumb {
     border-radius: 4px;
     background-color: rgba(0,0,0,.5);
     box-shadow: 0 0 1px rgba(255,255,255,.5);
  }
  ```

9. `line-height` behaves differently in XHTML and HTML5. That would bite you in the ass some day. Pay attention to `line-height` in transitional DOCTYPE.

10. When using `overflow:hidden` to disable scrolling in the background, add `overflow-y:scroll` to body to prevent content shifting. For mobile to prevent body scrolling, use 
  ```css
  overflow: hidden;
  position: fixed;
  right: 0;
  left: 0;
  ```

11. `@media` print a specific div, there are three ways:  
   ```css
   body > * { visibility: hidden;}
   .print { visibility: visible;}
   ```
   ```css
   body > * { display: none;}
   .print { display: block;}
   ```
   ```javascript
   function printContent(el){
    var restorepage = document.body.innerHTML;
    var printcontent = document.getElementById(el).outerHTML;
    document.body.innerHTML = printcontent;
    window.print();
    document.body.innerHTML = restorepage;
  }
  ```
  In Safari, body and print div's `position` must be `static` or `relative`, or it will be blank.

12. SVG, like XML, its node content is modified by `el.textContent` (jQuery.text()), rather than `el.innerHTML`.

13. Flexbox with `margin:0 auto` will work in IE with another `width: 100%`.

14. CSS transition sometime causes flickering in Safari. Add the following to the element or parent:
    ```css
    -webkit-backface-visibility: hidden;
    transform-style: preserve-3d;
    ```

15. iOS scales text when change orientation. Use the following to prevent his behavior
 ```css
 html {
   -webkit-text-size-adjust: 100%;
 }
 ```
 
16. If `overflow:hidden` is not working on pseudo elements, add `position:relative` to their wrapper.
 
17. https://css-tricks.com/full-width-containers-limited-width-parents/.
 
18. For `position:sticky` tow work, its parent must not be `overflow:hidden`.

19. You can register an object with property `handleEvent` on event listener. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventListener)


# Some best practices I have encountered.

1. `<a href='http://example.com' target='_blank' rel='noopener'>` is not only safe(it prevents child window to use window.opener and window.opener.location to get parent window), but also has a performance improvement.

2. You can pass a string to `setTimtout` and `setInterval` to run as a function, but this is usually evil as using `eval()`, because it is run in the global scope, has performance issues, is potentially insecure if you're injecting any parameters.

3. You can use this 404 page to do redirect:

```html
<!DOCTYPE html>
<title>404/301 redirect</title>
<meta http-equiv="refresh" content="0;URL=http://mypage.xy"/>
```


# Don't forget

1. Get/set body scroll position
    `document.documentElement.scrollTop || document.body.scrollTop`

2. Get element offset top (to body)
    `element.offsetTop`




# Fun-stuff-on-web
A collection of interesting web app, sites and APIs.

1. [https://yesno.wtf/](https://yesno.wtf/)
API that could give you a random Yes/No with a hilarious image.


# OS or bash related

1. In OSX, `.bash_profile` is used instead of `.bashrc`. It's located in `~/.bash_profile` (`$HOME/.bash_profile`).
   To add path, add `export PATH=$PATH:~/my/custom/path` in `.bash_profile` and `source ~/.bash_profile`.

2. Several way to show process: `top`, `ps`, `launchctrl list` and `pgrep [process name]`. Use `kill -9 [process id]` to end.

3. `netstat -nlp | grep :8080` Find process running on port 8080
   `ps -e|grep node` find all node processes 
