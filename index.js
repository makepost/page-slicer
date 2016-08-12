$(document).ready(function () {
  'use strict';

  var items = 'abcdefghijklmnopqrstuvwxyz'.split('');
  var pager = new window.pageSlicer.PageSlicer({ itemsOnPage: 5 }, items);

  function handleInput(ev) {
    var value = ev.target.value;

    if (!pager.isValid(value)) {
      return;
    }

    pager.go(Number(value));
  }

  m.mount(document.getElementById('app'), {
    view: function () {
      var count = pager.count();
      var state = pager.state;
      return (
        m('div', [
          m('p', 'items: ' + items.join('')),
          m('p', 'count: ' + count),
          m('p', 'slice: ' + pager.slice().join('')),
          m('p', [
            m('button', { disabled: state === -count, onclick: pager.goFirst }, 'goFirst'),
            m('button', { disabled: state === 0 || state === -count, onclick: pager.goPrev }, 'goPrev'),
            m('input[type="number"]', { max: count - 1, min: -count, oninput: handleInput, value: state }),
            m('button', { disabled: state === -1 || state === count - 1, onclick: pager.goNext }, 'goNext'),
            m('button', { disabled: state === count - 1, onclick: pager.goLast }, 'goLast'),
          ]),
          m('p', [
            m('button', { disabled: state === -1, onclick: pager.goMinusOne }, 'goMinusOne'),
            m('button', { disabled: state === 0, onclick: pager.goZero }, 'goZero'),
          ]),
        ])
      );
    },
  });
});
