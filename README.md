# page-slicer

Minimal pagination class for JS.

```javascript
var PageSlicer = require('page-slicer').PageSlicer;

var items = 'abcdefghijklmnopqrstuvwxyz'.split('');
var pager = new PageSlicer({ itemsOnPage: 5 }, items);

console.log([
  pager.count(), // -> 6
  pager.isValid('5'), // true
  pager.isValid('6'), // false
  pager.isValid('-6'), // true
  pager.isValid('-7'), // false

  pager.state, // -> 0
  pager.slice().join(''), // -> 'abcde'
  pager.goNext(),
  pager.slice().join(''), // -> 'fghij'
  pager.goLast(),
  pager.slice().join(''), // -> 'z'

  pager.go(-1),
  pager.slice().join(''), // -> 'vwxyz'
  pager.goPrev(),
  pager.slice().join(''), // -> 'qrstu'
  pager.goFirst(),
  pager.slice().join(''), // -> 'a'
].filter(function (x) {
  return typeof x !== 'undefined';
}));
```

See [index.html](index.html) and [index.js](index.js) for another example.
