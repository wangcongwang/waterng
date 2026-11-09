/* ==========================================================================
   AE-side navigation — independent from the WP marketing header.

   The WordPress side renders its chrome from app.js -> renderHeader() into
   #app-header using .ek-* classes. AE pages must NOT use that implementation:
   this file owns #ae-header, .ae-* classes, its own menu model, drawer and
   event wiring. app.js skips renderHeader() entirely on AE pages.

   LOGIN STATE (the part that must not be guessed)
   - Only the SESSION DATA is shared: window.Auth.user (localStorage
     'al.auth.user'). A second copy of the session would desync the two sides.
   - Auth.isLoggedIn() is NOT used: in this demo it is hard-wired to true so
     no login gate ever fires. The real render switch is whether Auth.user
     exists. That is also what renderEnvBanner() uses, so nav + banner agree.
   - AE pages seed a demo login at DOMContentLoaded (app.js), so they normally
     open signed-in. ?demo=guest / Sign out clear it.
   - Auth pages (login/signup) always render the signed-OUT chrome: a visitor
     on the sign-in form must never see "My Account / Sign out".
   - Guest ordering (?guest=1 -> sessionStorage 'al.guestMode') keeps the
     reduced/no-chrome journey on data-guest-no-nav pages. Auth.login() clears
     that flag, so a member in the same flow gets the full AE navigation.
   - Cross-tab changes are picked up through the `storage` event.

   Pages that are deliberately chrome-free are NOT wired to this file:
   welcome.html (email body), order.html (standalone share link), and the
   internal review tools (acceptance-checklist / business-flows / release-plan).
   ========================================================================== */
(function () {
  'use strict';

  var GUEST_KEY = 'al.guestMode';
  var ACCOUNT_NEXT = '?next=repeat-purchase.html';

  /* ---------- Icons / bits (local copies, no app.js dependency) ---------- */
  var CHEVRON = '<svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ARROW = '<svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true"><path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var NEXT_ARROW = '<svg width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden="true"><path d="M1 1l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_USER = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="1.6"/></svg>';
  var ICON_LOGOUT = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2.5C6.8 2.5 2.6 6.7 2.6 12c0 1.7.5 3.4 1.5 4.8L2.5 21.5l4.8-1.6c1.4.8 3 1.2 4.7 1.2 5.2 0 9.4-4.2 9.4-9.4 0-2.5-1-4.9-2.8-6.6-1.7-1.8-4.1-2.8-6.6-2.8z"/></svg>';

  /* ---------- AE menu model ----------------------------------------------
     Links into the WordPress marketing layer open in a new tab (same AE-side
     convention as renderFooter()). Local filenames are used so the demo stays
     clickable offline. Signed-in visitors get an AE-only Member Centre group;
     signed-out visitors see the same five marketing groups as the WP header. */
  var WP_EXT = ' target="_blank" rel="noopener noreferrer"';

  var WHO_WE_ARE = [
    { label: 'About Elken Nigeria', href: 'about.html' },
    { label: 'Our Global Strength', href: 'about-global-strength.html' },
    { label: 'Leadership', href: 'about-leadership.html' },
    { label: 'Our Journey', href: 'about-journey.html' },
    { label: 'Community', href: 'about-community.html' }
  ];
  var RANGES = [
    { name: 'Health', href: 'products-health.html', items: [
      { label: 'Elken Calmag', href: 'product-calmag.html' },
      { label: 'Elken Spirulina', href: 'product-spirulina.html' },
      { label: 'LivXtra Yang', href: 'product-livxtra-yang.html' }
    ] },
    { name: 'Wellness', href: 'products-wellness.html', items: [
      { label: 'GenQi Hydrogen Inhaler', href: 'product-genqi.html' }
    ] },
    { name: 'Water', href: 'products-water-filters.html', items: [
      { label: 'Bio Pure Ultra', href: 'product-bio-pure-ultra.html' },
      { label: 'Bio Pure POE Mini', href: 'product-bio-pure-poe-mini.html' },
      { label: 'Bio Pure POE Ultra', href: 'product-bio-pure-poe-ultra.html' },
      { label: 'Hydromi', href: 'product-hydromi.html' }
    ] },
    { name: 'Beauty', href: 'products-beauty.html', items: [
      { label: 'El Marino Yang', href: 'product-el-marino-yang.html' }
    ] }
  ];
  /* AE-only destinations — these live in the application layer, never in WP. */
  var MEMBER_LINKS = [
    { label: 'My Account', href: 'account.html' },
    { label: 'Repeat Purchase', href: 'repeat-purchase.html' },
    { label: 'Member Welcome', href: 'member-welcome.html' },
    { label: 'Member Upgrade', href: 'member-upgrade.html' },
    { label: 'Member Repurchase', href: 'member-repurchase.html' },
    { label: 'Auto Maintenance', href: 'member-auto-maintenance.html' }
  ];
  var SUPPORT_LINKS = [
    { label: 'Contact Us', href: 'contact.html' },
    { label: 'FAQ', href: 'faq.html' },
    { label: 'Service &amp; Support', href: 'service.html' },
    { label: 'Policies', href: 'shipping.html' }
  ];

  /* ---------- State helpers ---------------------------------------------- */
  function currentFile() { return (location.pathname.split('/').pop() || '').toLowerCase(); }
  function isAuthPage() { var f = currentFile(); return f === 'login.html' || f === 'signup.html'; }
  function aeUser() { try { return (window.Auth && window.Auth.user) || null; } catch (e) { return null; } }
  function guestMode() {
    try {
      if (new URLSearchParams(location.search).get('guest') === '1') sessionStorage.setItem(GUEST_KEY, '1');
      return sessionStorage.getItem(GUEST_KEY) === '1';
    } catch (e) { return new URLSearchParams(location.search).get('guest') === '1'; }
  }
  function signedIn() {
    /* Auth pages deliberately render the signed-out chrome (see file header). */
    return !isAuthPage() && !!aeUser();
  }
  function notify(msg, kind) { if (window.toast) window.toast(msg, kind || 'info'); }

  /* ---------- Menu fragments --------------------------------------------- */
  function panel(links, extraClass, ext) {
    var a = ext || ''; /* AE-internal links stay in this tab; WP links open a new one. */
    return '<div class="ae-nav__panel ' + (extraClass || '') + '">' +
      links.map(function (l) { return '<a href="' + l.href + '"' + a + '>' + l.label + '</a>'; }).join('') +
      '</div>';
  }
  function productsPanel() {
    return '<div class="ae-nav__panel ae-nav__panel--products ae-nav__panel--right">' +
      RANGES.map(function (r) {
        return '<div class="ae-nav__sub">' +
          '<a class="ae-nav__sublink" href="' + r.href + '"' + WP_EXT + ' data-ae-sub-toggle aria-expanded="false" aria-haspopup="true">' +
            '<span>' + r.name + '</span>' + NEXT_ARROW + '</a>' +
          (r.items.length ? '<div class="ae-nav__panel ae-nav__panel--l2">' +
            r.items.map(function (it) { return '<a href="' + it.href + '"' + WP_EXT + '>' + it.label + '</a>'; }).join('') +
            '</div>' : '') +
        '</div>';
      }).join('') +
      '<a class="ae-nav__seeall" href="products.html"' + WP_EXT + '><span>See all products</span>' + ARROW + '</a>' +
      '</div>';
  }
  function navGroup(label, dropdown) {
    return '<div class="ae-nav__item ae-nav__item--parent">' +
      '<a class="ae-nav__link" href="#" data-ae-toggle aria-expanded="false" aria-haspopup="true">' + label + ' ' + CHEVRON + '</a>' +
      (dropdown || '') +
      '</div>';
  }

  function mainNavItems(active) {
    var on = function (name) { return active === name ? ' aria-current="page"' : ''; };
    if (signedIn()) {
      /* AE's own navigation: member operations first, marketing content is
         still reachable but lives in the WP layer (new tab). */
      return navGroup('Member Centre', panel(MEMBER_LINKS, 'ae-nav__panel--right')) +
        navGroup('Products', productsPanel()) +
        navGroup('Support', panel(SUPPORT_LINKS, 'ae-nav__panel--right', WP_EXT));
    }
    /* Signed out / auth pages: identical group structure to the WP header. */
    return '<div class="ae-nav__item ae-nav__item--parent">' +
        '<a class="ae-nav__link" href="about.html"' + WP_EXT + ' data-ae-toggle aria-expanded="false" aria-haspopup="true"' + on('about') + '>Who We Are ' + CHEVRON + '</a>' +
        panel(WHO_WE_ARE, '', WP_EXT) +
      '</div>' +
      '<div class="ae-nav__item ae-nav__item--parent">' +
        '<a class="ae-nav__link" href="products.html"' + WP_EXT + ' data-ae-toggle aria-expanded="false" aria-haspopup="true"' + on('products') + '>Products ' + CHEVRON + '</a>' +
        productsPanel() +
      '</div>' +
      '<div class="ae-nav__item"><a class="ae-nav__link" href="become-a-distributor.html"' + WP_EXT + on('distributor') + '>Become a Distributor</a></div>' +
      '<div class="ae-nav__item"><a class="ae-nav__link" href="contact.html"' + WP_EXT + on('contact') + '>Contact Us</a></div>' +
      '<div class="ae-nav__item"><a class="ae-nav__link" href="faq.html"' + WP_EXT + on('faq') + '>FAQ</a></div>';
  }

  function utils() {
    /* The WP header hides this pill on account.html. AE keeps it on every
       page so the two headers read identically and the AE chrome is
       self-consistent — an independent implementation, not WP's exceptions. */
    var lang = '<button class="ae-lang" type="button" id="headerLang" data-ae-lang aria-label="Language">EN ' + CHEVRON + '</button>';
    if (isAuthPage()) {
      /* Never show a signed-in identity on the sign-in / sign-up screens.
         Offer the complementary action instead of a self-link. */
      var other = currentFile() === 'login.html'
        ? '<a class="ae-util" href="signup.html' + ACCOUNT_NEXT + '">Create account</a>'
        : '<a class="ae-util" href="login.html' + ACCOUNT_NEXT + '">Sign in</a>';
      return other + lang;
    }
    if (signedIn()) {
      return '<a class="ae-util ae-util--icon" href="account.html" title="My Account" aria-label="My Account">' + ICON_USER + '</a>' +
        '<button class="ae-util ae-util--icon" type="button" id="headerLogout" data-ae-logout title="Sign out" aria-label="Sign out">' + ICON_LOGOUT + '</button>' + lang;
    }
    return '<a class="ae-util ae-util--icon" href="login.html' + ACCOUNT_NEXT + '" title="Sign in" aria-label="Sign in">' + ICON_USER + '</a>' + lang;
  }

  function drawerAuth() {
    var next = '?next=' + encodeURIComponent(currentFile() + location.search);
    if (isAuthPage()) {
      return '<div class="ae-drawer__stack">' +
        (currentFile() === 'login.html'
          ? '<a class="ae-btn" href="signup.html' + next + '">Create account</a>'
          : '<a class="ae-btn" href="login.html' + next + '">Sign in</a>') +
        '</div>';
    }
    if (signedIn()) {
      var u = aeUser() || {};
      var name = u.name || ((u.firstName || '') + ' ' + (u.lastName || '')).trim() || 'Elken Member';
      var mid = u.memberId || u.id || '';
      var initial = (name.charAt(0) || 'E').toUpperCase();
      return '<div class="ae-member">' +
          '<span class="ae-member__avatar">' + initial + '</span>' +
          '<span><span class="ae-member__name">' + name + '</span>' +
          (mid ? '<span class="ae-member__id">Member ID: ' + mid + '</span>' : '') + '</span>' +
        '</div>' +
        '<div class="ae-drawer__stack" style="margin-top:var(--ek-16)">' +
          '<a class="ae-btn" href="account.html">My Account</a>' +
          '<button class="ae-btn ae-btn--ghost" type="button" id="drawerLogout" data-ae-logout>Sign out</button>' +
        '</div>';
    }
    return '<div class="ae-drawer__stack">' +
      '<a class="ae-btn" href="login.html' + ACCOUNT_NEXT + '">Sign in</a>' +
      '<a class="ae-drawer__alt" href="signup.html' + next + '">Create your account</a>' +
      '</div>';
  }

  function drawerNav(active) {
    var links;
    if (signedIn()) {
      links = MEMBER_LINKS.slice(0, 2).map(function (l) {
        return '<a class="' + (active === 'account' && l.href === 'account.html' ? 'active' : '') + '" href="' + l.href + '">' + l.label + '</a>';
      }).concat(RANGES.map(function (r) {
        return '<a href="' + r.href + '"' + WP_EXT + '>' + r.name + ' (WP)</a>';
      })).concat([
        '<a href="contact.html"' + WP_EXT + '>Contact Us</a>',
        '<a href="faq.html"' + WP_EXT + '>FAQ</a>'
      ]);
    } else {
      links = [
        '<a href="about.html"' + WP_EXT + '>About Us</a>',
        '<a href="products.html"' + WP_EXT + '>Products</a>',
        '<a href="become-a-distributor.html"' + WP_EXT + '>Become a Distributor</a>',
        '<a href="contact.html"' + WP_EXT + '>Contact Us</a>',
        '<a href="faq.html"' + WP_EXT + '>FAQ</a>',
        '<a href="service.html"' + WP_EXT + '>Service &amp; Support</a>'
      ];
    }
    return '<div class="ae-drawer__section"><p class="ae-drawer__label">' +
      (signedIn() ? 'Member &amp; catalogue' : 'Explore') +
      '</p><nav class="ae-drawer__nav" aria-label="AE navigation">' + links.join('') + '</nav></div>';
  }

  /* ---------- Render ------------------------------------------------------ */
  function render() {
    if (!document.body || document.body.dataset.aeNav !== 'true') return;
    var host = document.getElementById('ae-header');
    if (!host) return;

    /* The guest ordering journey stays chrome-free on its declared pages.
       A signed-in member has no guest flag (Auth.login clears it), so they
       still get the full AE navigation on those same pages. */
    var hide = (document.body.dataset.standalone === 'true') ||
      (guestMode() && document.body.dataset.guestNoNav === 'true');
    if (hide) {
      host.innerHTML = '';
      return;
    }

    var active = document.body.dataset.page || '';
    var home = signedIn() ? 'account.html' : 'index.html';
    var logoTarget = signedIn() ? '' : WP_EXT;

    host.innerHTML =
      '<header class="ae-header">' +
        '<div class="ae-container">' +
          '<a class="ae-logo" href="' + home + '"' + logoTarget + ' aria-label="Elken">' +
            '<img src="assets/img/brand/elken-logo-colour.svg?v=20260909a" alt="Elken">' +
          '</a>' +
          '<span class="ae-header__spacer" aria-hidden="true"></span>' +
          '<button class="ae-burger" type="button" id="openDrawer" data-ae-burger aria-expanded="false" aria-label="Menu">' +
            '<span></span><span></span><span></span></button>' +
          '<nav class="ae-nav" aria-label="AE main navigation">' +
            mainNavItems(active) +
            '<div class="ae-nav__utils">' + utils() + '</div>' +
          '</nav>' +
        '</div>' +
      '</header>' +
      '<div class="ae-drawer" id="drawer" aria-hidden="true">' +
        '<button class="ae-drawer__scrim" type="button" data-ae-close aria-label="Close menu"></button>' +
        '<div class="ae-drawer__panel">' +
          '<div class="ae-drawer__head">' +
            '<a class="ae-drawer__brand" href="' + home + '"' + logoTarget + '>' +
              '<img src="assets/img/brand/elken-logo-colour.svg?v=20260909a" alt="">Elken</a>' +
            '<button class="ae-drawer__close" type="button" id="closeDrawer" data-ae-close aria-label="Close">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
          '</div>' +
          drawerAuth() +
          drawerNav(active) +
        '</div>' +
      '</div>' +
      '<a class="wa-fab" href="https://wa.me/2349131178401" target="_blank" rel="noopener" aria-label="WhatsApp">' + WA_ICON + '</a>';

    /* app.js owns these two shared renderers; AE re-renders them here because
       its header no longer goes through wireHeader(). */
    if (window.renderEnvBanner) window.renderEnvBanner();
    if (window.updateCartBadge) window.updateCartBadge();
  }

  /* ---------- Wiring (one set of delegated listeners) -------------------- */
  function closeDrawer() {
    var d = document.getElementById('drawer');
    if (d) { d.classList.remove('open'); d.setAttribute('aria-hidden', 'true'); }
    var b = document.getElementById('openDrawer');
    if (b) b.setAttribute('aria-expanded', 'false');
  }
  function openDrawer() {
    var d = document.getElementById('drawer');
    if (d) { d.classList.add('open'); d.setAttribute('aria-hidden', 'false'); }
    var b = document.getElementById('openDrawer');
    if (b) b.setAttribute('aria-expanded', 'true');
  }
  function closePanels() {
    var host = document.getElementById('ae-header');
    if (!host) return;
    host.querySelectorAll('.ae-nav__item.is-open, .ae-nav__sub.is-open').forEach(function (el) { el.classList.remove('is-open'); });
    host.querySelectorAll('[data-ae-toggle][aria-expanded="true"]').forEach(function (el) { el.setAttribute('aria-expanded', 'false'); });
  }
  function logout() {
    closeDrawer();
    if (window.Auth && window.Auth.logout) window.Auth.logout();
    notify('Signed out. See you soon.', 'success');
    /* Same behaviour as the shared header: close the tab opened at sign-in,
       or fall back to the marketing home when the browser blocks it. */
    setTimeout(function () {
      window.close();
      setTimeout(function () { window.location.href = 'index.html'; }, 200);
    }, 400);
  }
  function onClick(e) {
    var t = e.target && e.target.closest ? e.target.closest('[data-ae-burger],[data-ae-close],[data-ae-toggle],[data-ae-sub-toggle],[data-ae-logout],[data-ae-lang]') : null;
    if (!t) { closePanels(); return; }
    if (t.hasAttribute('data-ae-burger')) { e.preventDefault(); openDrawer(); return; }
    if (t.hasAttribute('data-ae-close')) { e.preventDefault(); closeDrawer(); return; }
    if (t.hasAttribute('data-ae-logout')) { e.preventDefault(); logout(); return; }
    if (t.hasAttribute('data-ae-lang')) {
      e.preventDefault();
      notify('Bilingual UI (EN / 中文) is coming in Phase 2.', 'info');
      return;
    }
    if (t.hasAttribute('data-ae-toggle')) {
      e.preventDefault();
      var item = t.closest('.ae-nav__item');
      var wasOpen = item && item.classList.contains('is-open');
      closePanels();
      if (!wasOpen && item) { item.classList.add('is-open'); t.setAttribute('aria-expanded', 'true'); }
      return;
    }
    if (t.hasAttribute('data-ae-sub-toggle')) {
      /* Desktop hover handles this; the click keeps it usable on touch. */
      var sub = t.closest('.ae-nav__sub');
      if (sub && !sub.classList.contains('is-open')) {
        e.preventDefault();
        sub.classList.add('is-open');
        t.setAttribute('aria-expanded', 'true');
      }
    }
  }
  function onKey(e) { if (e.key === 'Escape') { closeDrawer(); closePanels(); } }

  function init() {
    if (!document.body || document.body.dataset.aeNav !== 'true') return;
    /* The WP-side container is left empty on purpose — no double header. */
    var wpHost = document.getElementById('app-header');
    if (wpHost) wpHost.innerHTML = '';
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    window.addEventListener('al:authchange', render);
    window.addEventListener('al:langchange', render);
    window.addEventListener('storage', function (e) { if (!e.key || e.key === 'al.auth.user') render(); });
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  /* Small public surface for page scripts / manual demo control. */
  window.AENav = { render: render, signedIn: signedIn, isAuthPage: isAuthPage };
})();
