(function () {
  var itemZoomerDefaults = {
    padding: 1,
    spacer: null,
  };

  function ItemZoomer(config, items) {
    var _this = this;

    _this.config = Object.assign({}, itemZoomerDefaults, config);
    _this.zoom = zoom;

    function zoom(current) {
      var padding = _this.config.padding;
      var spacer = _this.config.spacer;

      var len = items.length;
      var z = len - 1;

      if (current < 0 || current > z) {
        return [];
      }

      var x = 1 + padding + 1;
      var y = x + padding + 1;

      if (z <= y + 1) {
        return items.slice();
      }

      if (current <= x) {
        return [].concat(items.slice(0, y), spacer, items.slice(z));
      }

      if (current >= z - x) {
        return [].concat(items.slice(0, 1), spacer, items.slice(len - y));
      }

      return [].concat(items.slice(0, 1), spacer, items.slice(current - padding, current + padding + 1), spacer, items.slice(z));
    }
  }

  var pageSlicerDefaults = {
    itemsOnPage: 1,
  };

  function PageSlicer(config, items) {
    var _this = this;

    _this.config = Object.assign({}, pageSlicerDefaults, config);
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
      return Math.ceil(items.length / _this.config.itemsOnPage);
    }

    function slice() {
      var n = _this.state;
      var itemsOnPage = _this.config.itemsOnPage;

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

  function Range(length) {
    return {
      length: length,

      slice: function (start, end) {
        var result = [];

        if (typeof start === 'undefined') {
          start = 0;
        }

        if (typeof end === 'undefined' || end > this.length) {
          end = this.length;
        }

        if (start < 0 || end <= start) {
          return result;
        }

        for (var i = start; i < end; i++) {
          result.push(i);
        }

        return result;
      },
    };
  }

  var pageSlicer = {
    ItemZoomer: ItemZoomer,
    itemZoomerDefaults: itemZoomerDefaults,
    PageSlicer: PageSlicer,
    pageSlicerDefaults: pageSlicerDefaults,
    Range: Range,
  };

  if (typeof module !== 'undefined') {
    module.exports = pageSlicer;
  }

  if (typeof window !== 'undefined') {
    window.pageSlicer = pageSlicer;
  }
})();
