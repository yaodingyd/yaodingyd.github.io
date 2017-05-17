document.addEventListener("DOMContentLoaded", function() {
  var lastElementClicked;

  Barba.Pjax.init();
  Barba.Prefetch.init();

  Barba.Dispatcher.on('linkClicked', function(el) {
    lastElementClicked = el;
  });

  var MovePage = Barba.BaseTransition.extend({
    start: function() {
      this.originalThumb = lastElementClicked;

      Promise
        .all([this.newContainerLoading, this.scrollTop()])
        .then(this.movePages.bind(this));
    },

    scrollTop: function() {
      var deferred = Barba.Utils.deferred();
      var obj = { y: window.pageYOffset };

      TweenLite.to(obj, 0.4, {
        y: 0,
        onUpdate: function() {
          if (obj.y === 0) {
            deferred.resolve();
          }

          window.scroll(0, obj.y);
        },
        onComplete: function() {
          deferred.resolve();
        }
      });

      return deferred.promise;
    },

    movePages: function() {
      var footer = document.querySelector('.site-footer');
      footer.style.opacity = 0;

      var _this = this;
      var goingForward = true;

      // TODO: find a way to check if user is going back
      if (this.getNewPageFile() === this.oldContainer.dataset.prev) {
        goingForward = false;
      }

      this.newContainer.dataset.prev = this.getPreviousHistory();

      TweenLite.set(this.newContainer, {
        visibility: 'visible',
        xPercent: goingForward ? 100 : -100,
        position: 'fixed',
        left: 0,
        top: document.querySelector('.site-header').offsetHeight + 30,
        right: 0
      });

      TweenLite.to(this.oldContainer, 0.6, { xPercent: goingForward ? -100 : 100, opacity: 0 });
      TweenLite.to(this.newContainer, 0.6, { xPercent: 0, onComplete: function() {
        TweenLite.set(_this.newContainer, { clearProps: 'all' });
        TweenLite.to(footer, 0.5, { opacity: 1 });
        _this.done();
      }});
    },

    getNewPageFile: function() {
      return Barba.HistoryManager.currentStatus().url;
    },

    getPreviousHistory: function() {
      return Barba.HistoryManager.prevStatus().url;
    }
  });

  Barba.Pjax.getTransition = function() {
    return MovePage;
  };
});
