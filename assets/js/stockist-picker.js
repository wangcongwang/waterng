/* ------------------------------------------------------------------
   Searchable Stockist picker.
   Replaces the manual Stockist ID text fields on distributor
   registration (signup / member-welcome) and checkout (shopper /
   member repeat purchase) with a dropdown of the five official
   stockists, showing both the shop name and its ID.

   The original <input> is KEPT as the value holder: same id, same name,
   same .value (the selected ID). Existing validation, form serialization
   and order creation therefore keep working untouched. Choosing an
   option also dispatches input/change on that field so the checkout
   "Place order" gate re-evaluates immediately.
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  var STOCKISTS = [
    { name: 'Elken Onyx Shop',            id: 'NG576513886' },
    { name: 'Shalom Shop',                id: 'NG538666436' },
    { name: 'Elken Great Achievers',      id: 'NG662021398' },
    { name: 'De Wellness Centre',         id: 'NG87440247'  },
    { name: 'Elken JC Solution Centre',   id: 'NG92944313'  }
  ];

  var registry = new Map();

  function label(s) { return s.name + ' (' + s.id + ')'; }
  function byId(id) {
    var v = String(id || '').trim().toUpperCase();
    return STOCKISTS.filter(function (s) { return s.id === v; })[0] || null;
  }
  function fire(input, type) {
    try { input.dispatchEvent(new Event(type, { bubbles: true })); } catch (e) {}
  }

  function renderOptions(ui, query) {
    var q = String(query || '').trim().toLowerCase();
    var items = STOCKISTS.filter(function (s) {
      return !q || (s.name + ' ' + s.id).toLowerCase().indexOf(q) !== -1;
    });
    ui.list.innerHTML = '';
    if (!items.length) {
      var empty = document.createElement('div');
      empty.className = 'stockist-picker__empty';
      empty.textContent = 'No matching stockist. Please choose from the list.';
      ui.list.appendChild(empty);
    }
    items.forEach(function (s) {
      var opt = document.createElement('button');
      opt.type = 'button';
      opt.className = 'stockist-picker__option';
      opt.setAttribute('role', 'option');
      opt.setAttribute('aria-selected', s.id === String(ui.input.value || '').trim() ? 'true' : 'false');
      opt.dataset.stockistId = s.id;
      var nameEl = document.createElement('span');
      nameEl.className = 'stockist-picker__name';
      nameEl.textContent = s.name;
      var idEl = document.createElement('span');
      idEl.className = 'stockist-picker__id';
      idEl.textContent = s.id;
      opt.appendChild(nameEl);
      opt.appendChild(idEl);
      // Keep focus in the search box so the blur handler cannot close the
      // list before the click lands.
      opt.addEventListener('mousedown', function (e) { e.preventDefault(); });
      opt.addEventListener('click', function () { select(ui, s); });
      ui.list.appendChild(opt);
    });
    ui.activeIndex = -1;
  }

  function close(ui) {
    if (!ui || ui.list.hidden) return;
    ui.list.hidden = true;
    ui.search.setAttribute('aria-expanded', 'false');
    ui.wrap.classList.remove('is-open');
    ui.activeIndex = -1;
    sync(ui.input); // restore the selected label (or the locked ID)
  }

  function open(ui) {
    if (!ui || ui.locked) return;
    sync(ui.input);
    renderOptions(ui, '');
    ui.list.hidden = false;
    ui.search.setAttribute('aria-expanded', 'true');
    ui.wrap.classList.add('is-open');
    try { ui.search.select(); } catch (e) {}
  }

  function select(ui, s) {
    ui.input.value = s.id;
    ui.input.removeAttribute('aria-invalid');
    ui.search.classList.remove('is-invalid');
    fire(ui.input, 'input');
    fire(ui.input, 'change');
    close(ui);
    ui.search.value = label(s);
  }

  function moveActive(ui, delta) {
    var opts = ui.list.querySelectorAll('.stockist-picker__option');
    if (!opts.length) return;
    ui.activeIndex = (ui.activeIndex + delta + opts.length) % opts.length;
    opts.forEach(function (o, i) { o.classList.toggle('is-active', i === ui.activeIndex); });
    if (opts[ui.activeIndex].scrollIntoView) opts[ui.activeIndex].scrollIntoView({ block: 'nearest' });
  }

  function sync(input) {
    var ui = registry.get(input);
    if (!ui) return;
    var value = String(input.value || '').trim();
    var s = byId(value);
    ui.search.value = s ? label(s) : value; // unknown pre-filled IDs stay visible
    var locked = !!input.readOnly ||
      input.classList.contains('is-locked') ||
      input.classList.contains('input-locked');
    ui.locked = locked;
    ui.search.readOnly = locked;
    ui.toggle.disabled = locked;
    ui.wrap.classList.toggle('is-locked', locked);
    ui.search.classList.toggle('is-locked', locked);
    if (locked && !ui.list.hidden) {
      ui.list.hidden = true;
      ui.search.setAttribute('aria-expanded', 'false');
      ui.wrap.classList.remove('is-open');
    }
    ui.search.classList.toggle('is-invalid', input.getAttribute('aria-invalid') === 'true');
  }

  function setValue(input, value) {
    if (!input) return;
    input.value = value || '';
    fire(input, 'input');
    fire(input, 'change');
    sync(input);
  }

  function enhance(input) {
    if (!input || registry.has(input)) return;
    var wasRequired = input.hasAttribute('required');
    input.removeAttribute('required'); // hidden value holder, JS validation still applies
    input.classList.add('stockist-picker__value');
    input.setAttribute('aria-hidden', 'true');
    input.tabIndex = -1;

    var wrap = document.createElement('div');
    wrap.className = 'stockist-picker';
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);

    var search = document.createElement('input');
    search.type = 'text';
    search.className = 'ek-input stockist-picker__search';
    search.placeholder = 'Search stockist name or ID';
    search.setAttribute('role', 'combobox');
    search.setAttribute('aria-autocomplete', 'list');
    search.setAttribute('aria-expanded', 'false');
    search.setAttribute('aria-label', 'Stockist');
    if (wasRequired) search.setAttribute('aria-required', 'true');
    search.autocomplete = 'off';

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'stockist-picker__toggle';
    toggle.setAttribute('aria-label', 'Show all stockists');
    toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    var list = document.createElement('div');
    list.className = 'stockist-picker__list';
    list.setAttribute('role', 'listbox');
    list.hidden = true;

    wrap.appendChild(search);
    wrap.appendChild(toggle);
    wrap.appendChild(list);

    var ui = { input: input, wrap: wrap, search: search, toggle: toggle, list: list, activeIndex: -1, locked: false };
    registry.set(input, ui);

    // pointerdown is the most reliable open trigger (it fires before focus
    // in every browser, including headless/webviews where focus() alone
    // does not dispatch a focus event).
    search.addEventListener('pointerdown', function () { if (ui.list.hidden) open(ui); });
    search.addEventListener('focus', function () { open(ui); });
    search.addEventListener('click', function () { if (ui.list.hidden) open(ui); });
    search.addEventListener('input', function () {
      if (ui.locked) return;
      if (ui.list.hidden) { ui.list.hidden = false; ui.search.setAttribute('aria-expanded', 'true'); ui.wrap.classList.add('is-open'); }
      renderOptions(ui, search.value);
    });
    search.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (ui.list.hidden) open(ui); moveActive(ui, 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (ui.list.hidden) open(ui); moveActive(ui, -1); }
      else if (e.key === 'Enter') {
        if (ui.list.hidden) return;
        e.preventDefault();
        var opts = ui.list.querySelectorAll('.stockist-picker__option');
        var chosen = ui.activeIndex >= 0 ? opts[ui.activeIndex] : (opts.length === 1 ? opts[0] : null);
        if (chosen) { var s = byId(chosen.dataset.stockistId); if (s) select(ui, s); }
      } else if (e.key === 'Escape') { close(ui); search.blur(); }
    });
    search.addEventListener('blur', function () {
      // Clicking the toggle or an option briefly blurs the search box; do
      // not close the list while focus is still somewhere inside the widget.
      setTimeout(function () {
        if (ui.wrap.contains(document.activeElement)) return;
        close(ui);
      }, 120);
    });
    toggle.addEventListener('click', function () {
      if (ui.list.hidden) { open(ui); search.focus(); } else { close(ui); }
    });

    // Registration pages add .is-locked / readonly / aria-invalid to the
    // original input. Mirror those changes onto the visible combobox.
    if (window.MutationObserver) {
      var mo = new MutationObserver(function () { sync(input); });
      mo.observe(input, { attributes: true, attributeFilter: ['class', 'readonly', 'aria-invalid'] });
    }

    sync(input);
  }

  function init() {
    document.querySelectorAll('input[data-stockist-picker]').forEach(enhance);
  }

  document.addEventListener('pointerdown', function (e) {
    registry.forEach(function (ui) {
      if (!ui.wrap.contains(e.target)) close(ui);
    });
  }, true);

  window.StockistPicker = {
    list: STOCKISTS.map(function (s) { return { name: s.name, id: s.id }; }),
    enhance: enhance,
    sync: sync,
    setValue: setValue,
    refreshAll: function () { registry.forEach(function (ui) { sync(ui.input); }); }
  };

  // defer scripts run with the DOM parsed but before DOMContentLoaded, so
  // the fields are enhanced before page scripts pre-fill / lock them.
  init();
  document.addEventListener('DOMContentLoaded', init);
})();
