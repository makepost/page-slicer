$(document).ready(function () {
  'use strict';

  var AcmePages = {
    controller: function (props) {
      var pager = new window.pageSlicer.PageSlicer(typeof props.itemsOnPage === 'undefined' ? {} : {
        itemsOnPage: props.itemsOnPage,
      }, props.items);

      var zoomer = new window.pageSlicer.ItemZoomer({}, window.pageSlicer.Range(pager.count()));
      window.zoomer = zoomer;

      function handleInput(ev) {
        var value = ev.target.value;

        if (!pager.isValid(value)) {
          return;
        }

        pager.go(Number(value));
      }

      return {
        handleInput: handleInput,
        pager: pager,
        zoomer: zoomer,
      };
    },

    view: function (ctrl, props) {
      var pager = ctrl.pager;
      var count = pager.count();
      var state = pager.state;

      var btn = 'button.acme-btn.acme-btn--pages-';
      var formControl = 'input.acme-form-control.acme-form-control--pages.acme-form-control--pages-';

      return (
        m('.acme-pages', [
          m('p', 'count: ' + count),
          m('p', 'slice: ' + pager.slice()),
          m('p', [
            m(btn + 'first', { disabled: state === -count, onclick: pager.goFirst }, 'goFirst'),
            m(btn + 'prev', { disabled: state === 0 || state === -count, onclick: pager.goPrev }, 'goPrev'),
            m(formControl + 'state', { max: count - 1, min: -count, oninput: ctrl.handleInput, type: 'number', value: state }),
            m(btn + 'next', { disabled: state === -1 || state === count - 1, onclick: pager.goNext }, 'goNext'),
            m(btn + 'last', { disabled: state === count - 1, onclick: pager.goLast }, 'goLast'),
          ]),
          m('p', [
            m(btn + 'minus-one', { disabled: state === -1, onclick: pager.goMinusOne }, 'goMinusOne'),
            m(btn + 'zero', { disabled: state === 0, onclick: pager.goZero }, 'goZero'),
          ]),
          m('p', [
            ctrl.zoomer.zoom(state >= 0 ? state : count + state).map(function (x) {
              if (x === null) return m(btn + 'spacer', '...');
              if (state < 0) x -= count;
              return m(btn + x, { disabled: state === x, onclick: pager.go.bind(null, x) }, x);
            }),
          ]),
        ])
      );
    },
  };

  var array = 'abcdefghijklmnopqrstuvwxyz'.split('');
  var dataSource = window.pageSlicer.Range(1024 * 1024 * 1024 * 1024);

  m.mount(document.getElementById('app'), {
    view: function () {
      return m('div', [
        m(AcmePages, { items: array, itemsOnPage: 5 }),
        m('hr'),
        m(AcmePages, { items: dataSource }),
      ]);
    },
  });
});
