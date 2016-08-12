window.pageSlicer = (function () {
  function PageSlicer(config, items) {
    var _this = this;
    _this.listeners = [];
    _this.state = 0;

    _this.count = count;
    _this.go = go;
    _this.goFirst = goFirst;
    _this.goLast = goLast;
    _this.goMinusOne = goMinusOne;
    _this.goNext = goNext;
    _this.goPrev = goPrev;
    _this.goZero = goZero;
    _this.isValid = isValid;
    _this.move = move;
    _this.slice = slice;
    _this.subscribe = subscribe;
    _this.unsubscribe = unsubscribe;

    function count() {
      return Math.ceil(items.length / config.itemsOnPage);
    }

    function slice() {
      var n = _this.state;
      var itemsOnPage = config.itemsOnPage;

      if (n < 0) {
        var start = items.length + n * itemsOnPage;
        var end = items.length + (n + 1) * itemsOnPage;
        return end > 0 ? items.slice(start < 0 ? 0 : start, end) : [];
      }

      return items.slice(n * itemsOnPage, (n + 1) * itemsOnPage);
    }

    function move(diff) {
      _this.state += diff;
      publish();
    }

    function goPrev() {
      _this.move(-1);
    }

    function goNext() {
      _this.move(1);
    }

    function go(n) {
      _this.state = n;
      publish();
    }

    function goFirst() {
      _this.go(-_this.count());
    }

    function goLast() {
      _this.go(_this.count() - 1);
    }

    function goMinusOne() {
      _this.go(-1);
    }

    function goZero() {
      _this.go(0);
    }

    function subscribe(listener) {
      _this.listeners.push(listener);
    }

    function publish(message) {
      for (var i = 0, len = _this.listeners.length; i < len; i++) {
        _this.listeners[i](message);
      }
    }

    function unsubscribe(listener) {
      for (var i = 0, len = _this.listeners.length; i < len; i++) {
        if (_this.listeners[i] === listener) {
          _this.listeners.splice(i, 1);
          return;
        }
      }
    }

    function isValid(value) {
      if (typeof value !== 'string') {
        return false;
      }

      if (value !== '0' && !/^-?[1-9][0-9]*$/.test(value)) {
        return false;
      }

      var x = Number(value);
      var count = _this.count();

      if (x < -count || x > count - 1) {
        return false;
      }

      return true;
    }
  }

  return {
    PageSlicer: PageSlicer,
  };
})();
