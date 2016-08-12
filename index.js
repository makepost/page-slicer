$(document).ready(function () {
  'use strict';

  var AcmePagination = {
    controller: function (props) {
      var itemsOnPage = props.itemsOnPage || 1;
      var pager = new window.pageSlicer.PageSlicer({ itemsOnPage: itemsOnPage }, props.items);

      return {
        pager: pager,
      };
    },

    view: function (ctrl, props) {
      var pager = ctrl.pager;
      var count = pager.count();
      var state = pager.state;

      var btn = 'button.acme-btn.acme-btn--pagination-';
      var formControl = 'input.acme-form-control.acme-form-control--pagination-';

      return (
        m('.acme-pagination', [
          m('p', 'count: ' + count),
          m('p', 'slice: ' + pager.slice()),
          m('p', [
            m(btn + 'first', { disabled: state === -count, onclick: pager.goFirst }, 'goFirst'),
            m(btn + 'prev', { disabled: state === 0 || state === -count, onclick: pager.goPrev }, 'goPrev'),
            m(formControl + 'state', { max: count - 1, min: -count, oninput: handleInput, type: 'number', value: state }),
            m(btn + 'next', { disabled: state === -1 || state === count - 1, onclick: pager.goNext }, 'goNext'),
            m(btn + 'last', { disabled: state === count - 1, onclick: pager.goLast }, 'goLast'),
          ]),
          m('p', [
            m(btn + 'minus-one', { disabled: state === -1, onclick: pager.goMinusOne }, 'goMinusOne'),
            m(btn + 'zero', { disabled: state === 0, onclick: pager.goZero }, 'goZero'),
          ]),
        ])
      );
    },
  };

  function handleInput(ev) {
    var value = ev.target.value;

    if (!pager.isValid(value)) {
      return;
    }

    pager.go(Number(value));
  }

  var array = 'abcdefghijklmnopqrstuvwxyz'.split('');

  var dataSource = {
    length: 1024 * 1024 * 1024 * 1024,

    slice: function (start, end) {
      var result = [];

      if (start < 0 || end <= start) {
        return result;
      }

      if (end > this.length) {
        end = this.length;
      }

      for (var i = start; i < end; i++) {
        result.push(i);
      }

      return result;
    },
  };

  m.mount(document.getElementById('app'), {
    view: function () {
      return m('div', [
        m(AcmePagination, { items: array, itemsOnPage: 5 }),
        m('hr'),
        m(AcmePagination, { items: dataSource }),
      ]);
    },
  });
});
