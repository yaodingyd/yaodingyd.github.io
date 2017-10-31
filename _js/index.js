// import Barba from 'barba.js'
// import { TweenLite } from 'gsap'

// // page transition using barba
// document.addEventListener('DOMContentLoaded', function () {
//   var lastElementClicked;

//   Barba.Pjax.init();
//   Barba.Prefetch.init();

//   Barba.Dispatcher.on('linkClicked', function(el) {
//     lastElementClicked = el;
//   });

//   Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
//     var script = container.querySelector("script");
//     // create a new script tag and append to container to invode Disqus script
//     // append old script node just won't work
//     if (script) {
//       container.removeChild(script);
//       var newScriptTag = document.createElement('script');
//       newScriptTag.innerHTML = script.innerHTML;
//       container.appendChild(newScriptTag);
//     }
//   }); 

//   var MovePage = Barba.BaseTransition.extend({
//     start: function() {
//       this.originalThumb = lastElementClicked;

//       Promise
//         .all([this.newContainerLoading, this.scrollTop()])
//         .then(this.movePages.bind(this));
//     },

//     scrollTop: function() {
//       var deferred = Barba.Utils.deferred();
//       var obj = { y: window.pageYOffset };

//       TweenLite.to(obj, 0.4, {
//         y: 0,
//         onUpdate: function() {
//           if (obj.y === 0) {
//             deferred.resolve();
//           }

//           window.scroll(0, obj.y);
//         },
//         onComplete: function() {
//           deferred.resolve();
//         }
//       });

//       return deferred.promise;
//     },

//     movePages: function() {
//       var footer = document.getElementById('barba-footer');
//       footer.style.opacity = 0;

//       var _this = this;
//       var goingForward = true;

//       // TODO: find a way to check if user is going back
//       if (this.getNewPageFile() === this.oldContainer.dataset.prev) {
//         goingForward = false;
//       }

//       this.newContainer.dataset.prev = this.getPreviousHistory();

//       TweenLite.set(this.newContainer, {
//         visibility: 'visible',
//         xPercent: goingForward ? 100 : -100,
//         position: 'fixed',
//         left: 0,
//         top: document.querySelector('.site-header').offsetHeight + 30,
//         right: 0
//       });

//       TweenLite.to(this.oldContainer, 0.6, { xPercent: goingForward ? -100 : 100, opacity: 0 });
//       TweenLite.to(this.newContainer, 0.6, { xPercent: 0, onComplete: function() {
//         TweenLite.set(_this.newContainer, { clearProps: 'all' });
//         TweenLite.to(footer, 0.5, { opacity: 1 });
//         _this.done();
//       }});
//     },

//     getNewPageFile: function() {
//       return Barba.HistoryManager.currentStatus().url;
//     },

//     getPreviousHistory: function() {
//       return Barba.HistoryManager.prevStatus().url;
//     }
//   });

//   Barba.Pjax.getTransition = function() {
//     return MovePage;
//   };
// });

// // menu toggling
// document.addEventListener('DOMContentLoaded', function () {
//   var nav = document.getElementById('nav')
//   nav.addEventListener('click', function(){
//     toggleClass(nav, 'is-expanded');
//   })
// })

// // utility
// function toggleClass(el, _class) {
//   if (el && el.className && el.className.indexOf(_class) >= 0) {
//     var pattern = new RegExp('\\s*' + _class + '\\s*');
//     el.className = el.className.replace(pattern, ' ');
//   }
//   else if (el){
//     el.className = el.className + ' ' + _class;
//   }
//   else {
//     console.log("Element not found");
//   }
// }
