/* ============================================================
   Elken · App shell · i18n · shared interactions
   ============================================================ */
(function () {
  'use strict';

  const STORAGE = {
    LANG: 'al.lang',
    CART: 'al.cart',
    AUTH: 'al.auth.user',
    PROFILE: 'al.profile',
    ADDRESSES: 'al.addresses',
    GUEST: 'al.guestMode',   // 按标签页的 guest 下单标记（sessionStorage）
  };

  /* ---------- Auth state ---------- */
  const Auth = {
    get user() {
      try { return JSON.parse(localStorage.getItem(STORAGE.AUTH) || 'null'); }
      catch { return null; }
    },
    set user(v) {
      if (v == null) localStorage.removeItem(STORAGE.AUTH);
      else localStorage.setItem(STORAGE.AUTH, JSON.stringify(v));
    },
    isLoggedIn() { return !!this.user; },
    login(user) {
      this.user = user;
      try { sessionStorage.removeItem(STORAGE.GUEST); } catch (e) {}
      window.dispatchEvent(new CustomEvent('al:authchange', { detail: { user } }));
    },
    logout() {
      this.user = null;
      // also clear any order/payment/agreement draft that belongs to this session
      // (keeps the logged-out state consistent for next visitor)
      try { sessionStorage.removeItem(STORAGE.GUEST); } catch (e) {}
      window.dispatchEvent(new CustomEvent('al:authchange', { detail: { user: null } }));
    },
  };
  window.Auth = Auth;

  /* ---------- Display-only pages ----------
     纯展示页（首页 index.html）只用于对外展示：既不读取、也不写入任何登录态，
     顶部/抽屉/页脚/归属条始终按「未登录营销版」渲染，也跳过 demo 账号播种。
     由 <body data-display-only="true"> 声明。 */
  function isDisplayOnlyPage() {
    return !!(document.body && document.body.dataset.displayOnly === 'true');
  }
  window.isDisplayOnlyPage = isDisplayOnlyPage;

  /* ---------- WordPress (marketing) pages ----------
     The WordPress marketing site (index.html is display-only; the product /
     category marketing pages carry data-wordpress="true") is public-facing.
     It must never expose AE commerce (add-to-cart) nor the signed-in chrome,
     even when the demo has seeded a login elsewhere. These pages always read
     as the "此页面属于Wordpress页面" (unlogged marketing) surface. */
  function isWordPressPage() {
    return !!(document.body && document.body.dataset.wordpress === 'true');
  }
  window.isWordPressPage = isWordPressPage;

  const Money = {
    format(n) {
      if (n == null) return '—';
      return 'N' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    formatShort(n) {
      if (n >= 1_000_000) return 'N' + (n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1) + 'M';
      if (n >= 1_000) return 'N' + Math.round(n / 1000) + 'K';
      return 'N' + n;
    },
  };

  const T = {
    /** Site is English-only: current language is fixed to 'en'. */
    get current() {
      return 'en';
    },
    set current(code) {
      const ok = code && window.I18N && window.I18N[code];
      if (!ok) return;
      if (this.current === code) return;
      localStorage.setItem(STORAGE.LANG, code);
      document.documentElement.lang = code === 'zh' ? 'zh-CN' : code;
      window.dispatchEvent(new CustomEvent('al:langchange', { detail: { lang: code } }));
    },
    get dict() {
      const cur = this.current;
      return (window.I18N && (window.I18N[cur] || window.I18N.en)) || (window.I18N && window.I18N.en) || {};
    },
    /** tr('hero.title_a') */
    tr(path, params) {
      const dict = this.dict;
      const parts = path.split('.');
      let v = dict;
      for (const p of parts) { if (v == null) return path; v = v[p]; }
      if (v == null) {
        // fallback to English
        const en = (window.I18N && window.I18N.en) || {};
        let f = en; for (const p of parts) { if (f == null) return path; f = f[p]; }
        if (f == null) return path;
        v = f;
      }
      if (typeof v === 'string' && params) for (const [k, val] of Object.entries(params)) v = v.replaceAll(`{${k}}`, val);
      return v;
    },
    /** trArray('hero.items') — returns an array (or null) */
    trArray(path) {
      const dict = this.dict;
      const parts = path.split('.');
      let v = dict;
      for (const p of parts) { if (v == null) return null; v = v[p]; }
      return Array.isArray(v) ? v : null;
    },
    /** t('Home') — auto picks from active lang, falls back to English */
    pick(en) {
      const cur = this.dict;
      const parts = en.split('.');
      let v = cur; for (const p of parts) { if (v == null) { v = null; break; } v = v[p]; }
      if (typeof v === 'string') return v;
      let f = window.I18N.en; for (const p of parts) { if (f == null) return en; f = f[p]; }
      return typeof f === 'string' ? f : en;
    },
    /** 把 root 下所有带 data-i18n / data-i18n-ph / data-i18n-title / data-i18n-aria-label 的节点，按当前 T.dict 替换文案。 */
    applyI18n(root) {
      const host = root || document.body;
      if (!host) return;
      host.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = this.tr(key);
        if (val && val !== key) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
          // select option / select text keep: 若为 <select> 本身不直接覆盖 textContent，改它的 options 单独走下方 attr 方式
          if (el.tagName === 'SELECT') return;
          el.textContent = val;
        }
      });
      host.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        const val = this.tr(key);
        if (val && val !== key) el.setAttribute('placeholder', val);
      });
      host.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        const val = this.tr(key);
        if (val && val !== key) el.setAttribute('title', val);
      });
      host.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria-label');
        const val = this.tr(key);
        if (val && val !== key) el.setAttribute('aria-label', val);
      });
      // select option 支持 data-i18n 用于 language 下拉
      host.querySelectorAll('select[data-i18n-options]').forEach(sel => {
        Array.from(sel.options).forEach(opt => {
          const key = opt.getAttribute('data-i18n');
          if (!key) return;
          const v = this.tr(key);
          if (v && v !== key) opt.textContent = v;
        });
      });
      // 同步 <html lang>
      document.documentElement.lang = this.current === 'zh' ? 'zh-CN' : this.current;
    },
    /** 切换语言：保存到 localStorage + 触发 al:langchange；若语言表没有对应 key 则忽略 */
    switchLang(lang) {
      if (!lang) return;
      if (!window.I18N || !window.I18N[lang]) return;
      this.current = lang;
    },
  };
  window.T = T;
  window.Money = Money;
  document.documentElement.lang = T.current === 'zh' ? 'zh-CN' : T.current;

  /* ---------- Format helpers ---------- */
  function fmtDate(d) {
    if (typeof d === 'string' || typeof d === 'number') d = new Date(d);
    if (!(d instanceof Date) || isNaN(d.getTime())) return '—';
    return d.toLocaleDateString(T.current === 'zh' ? 'zh-CN' : 'en-GB', { year: 'numeric', month: 'short', day: '2-digit' });
  }
  function fmtDateUp(d) {
    // "25 AUG 2026" — uppercase short month for order cards
    if (typeof d === 'string' || typeof d === 'number') d = new Date(d);
    if (!(d instanceof Date) || isNaN(d.getTime())) return '—';
    const day = String(d.getDate()).padStart(2, '0');
    const mon = d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase();
    return `${day} ${mon} ${d.getFullYear()}`;
  }
  function fmtDT(d) {
    if (typeof d === 'string' || typeof d === 'number') d = new Date(d);
    if (!(d instanceof Date) || isNaN(d.getTime())) return '—';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${y}-${m}-${day} ${hh}:${mm}:${ss}`;
  }
  function fmtNum(n) { return new Intl.NumberFormat(T.current === 'zh' ? 'zh-CN' : 'en-GB').format(n); }
  window.fmtDate = fmtDate; window.fmtDateUp = fmtDateUp; window.fmtDT = fmtDT; window.fmtNum = fmtNum;

  /* ---------- Member ID normalization (shared by drawer & any other header surface) ----------
     Project rule: Member ID must be exactly "NG" + 8 digits. Legacy/stale 12-digit
     values get normalized to the first 8 digits (keeps the identity prefix so
     orders stay linkable). The corrected value is persisted back into Auth.user
     and localStorage so subsequent reads are clean. */
  function normalizeMemberId(id) {
    if (!id) return '';
    const s = String(id).trim().toUpperCase();
    const m = s.match(/^NG(\d+)$/);
    if (!m) return '';
    const d = m[1];
    return 'NG' + d.slice(0, 8).padStart(8, '0');
  }
  function healMemberIdForDrawer() {
    const u = Auth.user;
    if (!u) return '';
    const raw = u.memberId || '';
    const norm = normalizeMemberId(raw);
    if (!norm) return '';
    if (norm !== (u.memberId || '').toUpperCase()) {
      Auth.user = { ...u, memberId: norm };
      const md = JSON.parse(localStorage.getItem('al.memberData') || '{}');
      if (md.memberId !== norm) {
        md.memberId = norm;
        localStorage.setItem('al.memberData', JSON.stringify(md));
      }
    }
    return norm;
  }
  window.normalizeMemberId = normalizeMemberId;

  /* ---------- Drawer auth block (sign in / account) ---------- */
  function drawerAuthHTML(user, nextParam) {
    if (user) {
      const first = (user.firstName || user.name || 'M').toString().trim().charAt(0).toUpperCase() || 'M';
      const name = user.name || user.firstName || 'Member';
      const mid = healMemberIdForDrawer();
      return `
        <div class="drawer-auth drawer-auth-in">
          <div class="drawer-user">
            <span class="drawer-avatar" aria-hidden="true">${first}</span>
            <span class="drawer-user-meta">
              <strong>${name}</strong>
              ${mid ? `<small>${mid}</small>` : ''}
            </span>
          </div>
          <a href="account.html" class="btn btn-dark btn-block">${T.tr('nav.account')}</a>
          <button class="btn btn-ghost btn-block" id="drawerLogout" type="button">${T.tr('common.logout')}</button>
        </div>`;
    }
    return `
      <div class="drawer-auth drawer-auth-out">
        <a href="login.html${ACCOUNT_NEXT}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-block">${T.tr('common.sign_in')}</a>
        <a href="signup.html${nextParam}" class="drawer-auth-alt">${T.tr('common.create_account')}</a>
      </div>`;
  }

  /* ---------- Header render ---------- */
  /* ---------- Header: the marketing site's chrome, with the portal's
       Phase 2 utilities (account, cart, bilingual) carried as .ek-util rows.
       Structure and class names follow https://staging.elkenafrica.com/ng/
       (assets/js/elken-chrome.js) so the two stay comparable. ------------- */
  const CHEVRON = '<svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ARROW   = '<svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true"><path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ICON_USER = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="1.6"/></svg>';
  const ICON_LOGOUT = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ICON_CART = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="21" r="1.6" stroke="currentColor" stroke-width="1.6"/><circle cx="18" cy="21" r="1.6" stroke="currentColor" stroke-width="1.6"/><path d="M2.5 3h2l2.2 12.2a1.6 1.6 0 0 0 1.6 1.3h8.7a1.6 1.6 0 0 0 1.6-1.2L21 7H6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* 个人中心入口：未登录时点击导航/抽屉的账户图标，登录后回跳到 account.html。
     用独立常量，避免与其它通用回跳(nextParam=当前页)混淆。 */
  const ACCOUNT_NEXT = '?next=account.html';

  /* The four ranges, in the order the design settled on. Labels must stay in
     step with the home page range cards and the footer column. */
  const RANGES_NAV = [
    { name: 'Health',   href: 'products-health.html', items: [
      { label: 'Elken Calmag', href: 'product-calmag.html' },
      { label: 'Elken Spirulina', href: 'product-spirulina.html' },
      { label: 'LivXtra Yang', href: 'product-livxtra-yang.html' },
    ] },
    { name: 'Wellness', href: 'products-wellness.html', items: [
      { label: 'GenQi Hydrogen Inhaler', href: 'product-genqi.html' },
    ] },
    { name: 'Water',    href: 'products-water-filters.html', items: [
      { label: 'Bio Pure Ultra', href: 'product-bio-pure-ultra.html' },
      { label: 'Bio Pure POE Mini', href: 'product-bio-pure-poe-mini.html' },
      { label: 'Bio Pure POE Ultra', href: 'product-bio-pure-poe-ultra.html' },
      { label: 'Hydromi', href: 'product-hydromi.html' },
    ] },
    { name: 'Beauty',   href: 'products-beauty.html', items: [
      { label: 'El Marino Yang', href: 'product-el-marino-yang.html' },
    ] },
  ];

  const WHO_WE_ARE_NAV = [
    { label: 'About Elken Nigeria',    href: 'about.html' },
    { label: 'Our Global Strength',    href: 'about-global-strength.html' },
    { label: 'Leadership',             href: 'about-leadership.html' },
    { label: 'Our Journey',            href: 'about-journey.html' },
    { label: 'Community',              href: 'about-community.html' },
  ];

  function productsPanelNav() {
    const items = RANGES_NAV.map(r => `
      <div class="ek-nav__sub">
        <a class="ek-nav__sublink" href="${r.href}" data-sub-toggle aria-expanded="false" aria-haspopup="true">
          <span>${r.name}</span>
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden="true"><path d="M1 1l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        ${r.items.length ? `<div class="ek-nav__panel ek-nav__panel--l2">${r.items.map(it => `<a href="${it.href}">${it.label}</a>`).join('')}</div>` : ''}
      </div>`).join('');
    return `<div class="ek-nav__panel ek-nav__panel--products">${items}
      <a class="ek-nav__seeall" href="products.html"><span>See all products</span>${ARROW}</a>
    </div>`;
  }

  function renderHeader(active) {
    /* Display-only pages ignore login/guest state entirely and always render the
       public marketing chrome (full nav, Sign in entry, no cart). */
    const displayOnly = isDisplayOnlyPage();
    const wordpress = isWordPressPage();
    const publicPage = displayOnly || wordpress;
    const user = publicPage ? null : Auth.user;
    const loggedIn = !!user;
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    const nextParam = '?next=' + encodeURIComponent(currentPage);
    const on = name => (active === name ? ' aria-current="page"' : '');
    /* Guest ordering flow: entering from the login page's「不登录」button carries
       ?guest=1; persist it as a per-tab flag so EVERY page in the checkout
       journey (ranges, product pages, cart, checkout…) keeps the reduced nav.
       Display-only pages never participate in the guest flow nor write the flag. */
    let isGuestEntry = false;
    if (!publicPage) {
      try {
        if (new URLSearchParams(location.search).get('guest') === '1') sessionStorage.setItem(STORAGE.GUEST, '1');
        isGuestEntry = sessionStorage.getItem(STORAGE.GUEST) === '1';
      } catch (e) {
        isGuestEntry = new URLSearchParams(location.search).get('guest') === '1';
      }
    }

    /* Guest checkout pages (guest-repeat-purchase / cart / checkout / order) drop the
       top chrome entirely while the tab is in the guest order flow, so the journey
       stays focused end-to-end. Declared with <body data-guest-no-nav="true">.
       The trigger is the per-tab guest flag (al.guestMode), not the login state:
       Auth.login() clears that flag, so a member who signs in normally keeps the
       full header on these same pages. */
    if (!publicPage && isGuestEntry &&
        document.body && document.body.dataset.guestNoNav === 'true') {
      const hostEl = document.getElementById('app-header');
      if (hostEl) hostEl.innerHTML = '';
      return;
    }

    /* Phase 2 utilities: present in the UI, marked, not yet functional. */
    /* Icon-only controls with a P2 corner tag and a tooltip. The labelled
       variants made the actions group ~600px wide, which forced the header's
       1fr/auto/1fr grid off centre; icons keep both end columns equal so the
       navigation sits on the true centre line. Labels live in the tooltips
       and in the mobile drawer. */
    /* Signed in: "My Account" (user icon → account.html) plus Sign out (door
       icon). Keep both as icons so the utility group stays narrow and the
       navigation keeps its position; labels live in the tooltips and the drawer. */
    const accountUtil = loggedIn
      ? `<a class="ek-util ek-util--icon" href="account.html" title="My Account" aria-label="My Account">${ICON_USER}</a>
         <button class="ek-util ek-util--icon" type="button" id="headerLogout" title="Sign out" aria-label="Sign out">${ICON_LOGOUT}</button>`
      : `<a class="ek-util ek-util--icon" href="login.html${ACCOUNT_NEXT}" target="_blank" rel="noopener noreferrer" title="Sign in" aria-label="Sign in">${ICON_USER}</a>`;

    /* 购物车图标：仅登录态或 guest 下单流程（isGuestEntry）显示。
       普通未登录（完整菜单）不显示购物车按钮；未登录走 guest 购物车时
       由 guest 流程保留该入口。购物车页/结算页仍按登录态区分 guest/member 分支。 */
    const cartUtil = (loggedIn || isGuestEntry)
      ? `<a class="ek-util ek-util--icon" href="cart.html" id="headerCart" title="Cart" aria-label="Cart">${ICON_CART}<span class="ek-util__badge" id="cartBadge"></span></a>`
      : '';
    const langUtil = `<button class="ek-lang" type="button" id="headerLang" aria-label="Language">EN ${CHEVRON}</button>`;

    const productsNavItem = `
            <div class="ek-nav__item ek-nav__item--parent">
              <a class="ek-nav__link" href="products.html" data-submenu-toggle aria-expanded="false" aria-haspopup="true"${on('products')}>Products ${CHEVRON}</a>
              ${productsPanelNav()}
            </div>`;

    /* 顶部导航：
       - 未登录、但从登录页「不登录」进入的 guest 下单流程（isGuestEntry）→ 只保留 Products
       - 已登录（非 guest）→ 隐藏 Products 菜单（仅保留右上角 account / cart / lang 图标，主导航交给账户中心）
       - 其余未登录页面 → 完整菜单（Who We Are / Products / Become a Distributor / Contact / FAQ） */
    const loggedOutNavItems = `
            <div class="ek-nav__item ek-nav__item--parent">
              <a class="ek-nav__link" href="about.html" data-submenu-toggle aria-expanded="false" aria-haspopup="true"${on('about')}>Who We Are ${CHEVRON}</a>
              <div class="ek-nav__panel">
                ${WHO_WE_ARE_NAV.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
              </div>
            </div>
            ${productsNavItem}
            <div class="ek-nav__item"><a class="ek-nav__link" href="become-a-distributor.html"${on('distributor')}>Become a Distributor</a></div>
            <div class="ek-nav__item"><a class="ek-nav__link" href="contact.html"${on('contact')}>Contact Us</a></div>
            <div class="ek-nav__item"><a class="ek-nav__link" href="faq.html"${on('faq')}>FAQ</a></div>`;
    /* 已登录：不显示任何主菜单项（Products 也隐藏）；guest 流程保留 Products；普通未登录显示完整菜单 */
    const mainNavItems = isGuestEntry
      ? productsNavItem
      : loggedIn
        ? ''
        : loggedOutNavItems;

    const headerHTML = `
      <header class="ek-header">
        <div class="ek-container--nav">
          <span class="ek-logo" aria-label="Elken">
            <img class="ek-logo__colour"   src="assets/img/brand/elken-logo-colour.svg?v=20260909a" alt="Elken">
            <img class="ek-logo__reversed" src="assets/img/brand/elken-logo-white-v4.svg?v=20260909a" alt="" aria-hidden="true">
          </span>
          <button class="ek-burger" type="button" id="openDrawer" aria-expanded="false" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
          <nav class="ek-nav" data-nav aria-label="Main">
            ${mainNavItems}
            <div class="ek-nav__utils">
              ${accountUtil}
              ${cartUtil}
              ${langUtil}
            </div>
          </nav>
        </div>
      </header>
      <div class="drawer" id="drawer" aria-hidden="true">
        <div class="drawer-panel">
          <div class="drawer-head">
            <a href="index.html" class="brand">
              <span class="mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 C 8 9 6 12 6 15 a6 6 0 0 0 12 0c0-3-2-6-6-12z"/></svg></span>
              <span class="word">Elken<small>Better living</small></span>
            </a>
            <button class="icon-btn" id="closeDrawer" aria-label="Close"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
          </div>
          ${drawerAuthHTML(user, nextParam)}
          <nav class="drawer-nav">
            ${isGuestEntry
              ? `<a href="products.html" class="${active === 'products' ? 'active' : ''}">Products</a>
            <a href="cart.html">Cart</a>`
              : loggedIn
                ? `<a href="cart.html">Cart</a>`
                : `<a href="index.html" class="${active === 'home' ? 'active' : ''}">Home</a>
            <a href="about.html" class="${active === 'about' ? 'active' : ''}">About Us</a>
            <a href="products.html" class="${active === 'products' ? 'active' : ''}">Products</a>
            <a href="become-a-distributor.html" class="${active === 'distributor' ? 'active' : ''}">Become a Distributor</a>
            <a href="team-inquiry.html">Distributor Application</a>
            <a href="contact.html" class="${active === 'contact' ? 'active' : ''}">Contact Us</a>
            <a href="faq.html" class="${active === 'faq' ? 'active' : ''}">FAQ</a>
            <a href="service.html">Service &amp; Support</a>
            <a href="case-studies.html">Case Studies</a>`}
          </nav>
        </div>
      </div>
      <a class="wa-fab" href="https://wa.me/2348000000000" target="_blank" rel="noopener" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2.5C6.8 2.5 2.6 6.7 2.6 12c0 1.7.5 3.4 1.5 4.8L2.5 21.5l4.8-1.6c1.4.8 3 1.2 4.7 1.2 5.2 0 9.4-4.2 9.4-9.4 0-2.5-1-4.9-2.8-6.6-1.7-1.8-4.1-2.8-6.6-2.8z"/></svg>
      </a>
    `;
    const host = document.getElementById('app-header');
    if (host) host.innerHTML = headerHTML;
    wireHeader();
  }

  function wireHeader() {
    const drawer = document.getElementById('drawer');
    document.getElementById('openDrawer')?.addEventListener('click', () => { drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); });
    document.getElementById('closeDrawer')?.addEventListener('click', () => { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); });
    drawer?.addEventListener('click', e => { if (e.target === drawer) { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); } });
    const productToggle = drawer?.querySelector('.drawer-products-toggle');
    const productCategories = drawer?.querySelector('#drawerProductCategories');
    productToggle?.addEventListener('click', () => {
      const expanded = productToggle.getAttribute('aria-expanded') === 'true';
      productToggle.setAttribute('aria-expanded', String(!expanded));
      productCategories.hidden = expanded;
    });

    // Language switch is a Phase 2 feature: the control is present, marked,
    // and explains itself instead of doing nothing.
    document.getElementById('headerLang')?.addEventListener('click', () => {
      window.toast('Bilingual UI (EN / 中文) is coming in Phase 2.', 'info');
    });

    // Header logout (when signed in)
    document.getElementById('headerLogout')?.addEventListener('click', () => {
      Auth.logout();
      window.toast('Signed out. See you soon.', 'success');
      // Close the signed-in tab (opened when signing in). If the browser blocks
      // window.close() (tab wasn't script-opened), fall back to going home.
      setTimeout(() => {
        window.close();
        setTimeout(() => { window.location.href = 'index.html'; }, 200);
      }, 400);
    });

    // Drawer logout (mirrors header logout; closes the drawer first)
    document.getElementById('drawerLogout')?.addEventListener('click', () => {
      drawer?.classList.remove('open');
      drawer?.setAttribute('aria-hidden', 'true');
      Auth.logout();
      window.toast('Signed out. See you soon.', 'success');
      // Same as header logout: close the tab, else fall back to going home.
      setTimeout(() => {
        window.close();
        setTimeout(() => { window.location.href = 'index.html'; }, 200);
      }, 400);
    });

    // Cross-page auth state sync: re-render the header if login state changes
    window.addEventListener('al:authchange', () => {
      renderHeader(document.body.dataset.page);
      renderEnvBanner();
    });

    // Keep the cart badge in sync once the header (with #cartBadge) is in the DOM
    if (window.updateCartBadge) window.updateCartBadge();
  }

  /* ---------- Footer render ---------- */
  /* ---------- Footer render (designer sec-footer) ---------- */
  function renderFooter() {
    const host = document.getElementById('app-footer');
    if (!host) return;
    /* Footer mirrors the marketing site's sec-footer exactly (labels, address,
       legal line, social handles). Only the hrefs are local. */
    const whoLinks = [
      { label: 'About Elken Nigeria', href: 'about.html' },
      { label: 'Our Global Strength', href: 'about-global-strength.html' },
      { label: 'Leadership',          href: 'about-leadership.html' },
      { label: 'Our Journey',         href: 'about-journey.html' },
      { label: 'Community',           href: 'about-community.html' },
    ];

    /* Signed-in / guest flows should not drop back to the marketing (logged-out)
       category pages from the footer. Send them to the repeat-purchase listing
       instead, and keep the page they are on open in the background. */
    /* Display-only pages read no login state: their footer Products column always
       points at the marketing category pages. */
    const displayOnly = isDisplayOnlyPage();
    const wordpress = isWordPressPage();
    const publicPage = displayOnly || wordpress;
    const loggedIn = !publicPage && !!(window.Auth && window.Auth.user);
    let isGuestEntry = false;
    if (!publicPage) { try { isGuestEntry = sessionStorage.getItem(STORAGE.GUEST) === '1'; } catch (e) {} }
    const prodBase = loggedIn
      ? 'repeat-purchase.html'
      : (isGuestEntry ? 'guest-repeat-purchase.html?guest=1' : null);

    function prodHref(cat) {
      const fallback = {
        'health-wellness': 'products-health.html',
        'wellness-devices': 'products-wellness.html',
        'home-appliances': 'products-water-filters.html',
        'beauty-skincare': 'products-beauty.html',
      }[cat] || 'products.html';
      if (!prodBase) return fallback;
      const sep = prodBase.includes('?') ? '&' : '?';
      return `${prodBase}${sep}category=${encodeURIComponent(cat)}`;
    }

    const prodLinks = [
      { label: 'Health',   href: prodHref('health-wellness') },
      { label: 'Wellness', href: prodHref('wellness-devices') },
      { label: 'Water',    href: prodHref('home-appliances') },
      { label: 'Beauty',   href: prodHref('beauty-skincare') },
    ];
    const productLinkAttrs = prodBase ? ' target="_blank" rel="noopener noreferrer"' : '';

    const col = (title, links, linkAttrs = '') => `
        <div class="ek-fcol"><h2>${title}</h2><ul>
          ${links.map(l => `<li><a href="${l.href}"${linkAttrs}>${l.label}</a></li>`).join('')}
        </ul></div>`;
    host.innerHTML = `
      <footer class="sec-footer">
        <div class="ek-container--nav">
          <div class="sec-footer__inner">
            <div><img class="sec-footer__logo" src="assets/img/brand/elken-logo-white-v4.svg?v=20260909a" alt="Elken"></div>
            ${col('Who We Are', whoLinks, ' target="_blank" rel="noopener noreferrer"')}
            ${col('Products', prodLinks, productLinkAttrs)}
            <div class="ek-fcol"><h2>Contact Us</h2>
              <address class="ek-faddr"><strong>NIGERIA</strong><br>HEAD OFFICE<br>
              19A IBM Haruna Street,<br>Utako, Abuja.<br>
              Tel : <a href="tel:+2349131178401">+234 913 117 8401</a><br>
              <a href="mailto:contact@elkenafrica.com">contact@elkenafrica.com</a></address>
            </div>
          </div>
          <div class="sec-footer__bar">
            <p>&copy; 2026 Elken Nigeria. All rights reserved.</p>
            <p>&copy; Copyright 2026, ELKEN SDN. BHD. 199501005790 (334986-W)(AJL 93727) &nbsp;&middot;&nbsp;
              <a href="privacy.html">Privacy</a> | <a href="terms.html">Terms Of Use</a> | <a href="shipping.html">Policies</a> | <a href="service.html">Support</a></p>
            <div class="ek-social">
              <a href="https://www.facebook.com/ElkenNigeria/" target="_blank" rel="noopener" aria-label="Elken Nigeria on Facebook"><svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M8.4 13V7.6h1.8l.3-2.1H8.4V4.2c0-.6.2-1 1-1h1.1V1.3C10.2 1.3 9.6 1.2 9 1.2c-1.7 0-2.9 1-2.9 2.9v1.4H4.3v2.1h1.8V13h2.3z" fill="#F4F5F5"/></svg></a>
              <a href="https://www.instagram.com/elkennigeria/" target="_blank" rel="noopener" aria-label="Elken Nigeria on Instagram"><svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true"><rect x="1.6" y="1.6" width="10.8" height="10.8" rx="3.2" stroke="#F4F5F5" stroke-width="1.2"/><circle cx="7" cy="7" r="2.6" stroke="#F4F5F5" stroke-width="1.2"/><circle cx="10.2" cy="3.8" r=".8" fill="#F4F5F5"/></svg></a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
  /* ---------- Toast — delegates to ElkenUI.toast() (elken-ui.js §15) ---------- */
  function toast(msg, kind) {
    if (!window.ElkenUI) return;
    const type = kind === 'success' ? 'success' : kind === 'danger' ? 'error' : undefined;
    window.ElkenUI.toast(msg, type ? { type } : undefined);
  }
  window.toast = toast;

  /* ---------- Offline indicator ---------- */
  function wireOffline() {
    const bar = document.getElementById('offline-banner');
    if (!bar) return;
    const update = () => bar.classList.toggle('show', !navigator.onLine);
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
  }

  /* ---------- Loading button helper ---------- */
  function bindLoadingBtns() {
    document.querySelectorAll('[data-loading]').forEach(btn => {
      btn.addEventListener('click', e => {
        if (btn.getAttribute('aria-busy') === 'true') return;
        if (btn.dataset.confirm && !window.confirm(btn.dataset.confirm)) { e.preventDefault(); return; }
        btn.setAttribute('aria-busy', 'true');
        const label = btn.querySelector('[data-label]');
        const old = label ? label.innerHTML : btn.innerHTML;
        if (label) label.innerHTML = `<span class="ek-spinner"></span> ${T.tr('common.loading')}`;
        else btn.innerHTML = `<span class="ek-spinner"></span> ${T.tr('common.loading')}`;
        setTimeout(() => { btn.setAttribute('aria-busy', 'false'); if (label) label.innerHTML = old; else btn.innerHTML = old; }, 1600);
      });
    });
  }  /* ---------- Cookie consent (NDPR) ---------- */
  function renderCookieBanner() {
    let host = document.getElementById('cookieBanner');
    const staticHost = !!host;
    if (!host) {
      host = document.createElement('div');
      host.id = 'cookieBanner';
      host.className = 'cookie-banner';
      host.setAttribute('role', 'dialog');
      host.setAttribute('aria-live', 'polite');
      host.setAttribute('aria-label', 'Cookie consent');
      host.innerHTML = `
      <span class="cookie-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10c0-.46-.04-.92-.1-1.36a5.5 5.5 0 0 1-7.78-7.78A9.97 9.97 0 0 0 12 2Z"/><circle cx="9" cy="13" r="1" fill="currentColor"/><circle cx="14" cy="9" r="1" fill="currentColor"/><circle cx="16" cy="14" r="1" fill="currentColor"/></svg>
      </span>
      <div class="cookie-body">
        <strong data-i18n="cookie.title">${T.tr('cookie.title')}</strong>
        <span>${T.tr('cookie.text')} <a href="privacy.html" data-i18n="cookie.learn_more">${T.tr('cookie.learn_more')}</a></span>
      </div>
      <div class="cookie-actions">
        <button type="button" class="cb-btn" data-cookie="customise" data-i18n="cookie.custom">${T.tr('cookie.custom')}</button>
        <button type="button" class="cb-btn" data-cookie="reject" data-i18n="cookie.reject">${T.tr('cookie.reject')}</button>
        <button type="button" class="cb-btn cb-primary" data-cookie="accept" data-i18n="cookie.accept">${T.tr('cookie.accept')}</button>
      </div>
      <div class="cookie-prefs" aria-hidden="true">
        <div class="row">
          <div class="text">
            <strong>${T.tr('cookie.essential')}</strong>
            <small>${T.tr('cookie.essential_desc')}</small>
          </div>
          <div class="toggle on locked" data-cookie-pref="essential" aria-label="Essential cookies (always on)"></div>
        </div>
        <div class="row">
          <div class="text">
            <strong>${T.tr('cookie.analytics')}</strong>
            <small>${T.tr('cookie.analytics_desc')}</small>
          </div>
          <div class="toggle" data-cookie-pref="analytics" role="switch" aria-checked="false" tabindex="0"></div>
        </div>
        <div class="row">
          <div class="text">
            <strong>${T.tr('cookie.marketing')}</strong>
            <small>${T.tr('cookie.marketing_desc')}</small>
          </div>
          <div class="toggle" data-cookie-pref="marketing" role="switch" aria-checked="false" tabindex="0"></div>
        </div>
        <div class="cookie-actions cookie-actions--prefs">
          <button type="button" class="cb-btn cb-primary" data-cookie="save" data-i18n="cookie.save">${T.tr('cookie.save')}</button>
        </div>
      </div>
      `;
      document.body.appendChild(host);
    }

    const STORAGE_KEY = 'al.cookies';
    const hasChoice = () => { try { return !!localStorage.getItem(STORAGE_KEY); } catch { return false; } };
    const save = (prefs) => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prefs, ts: Date.now() })); } catch {}
      host.querySelector('.cookie-prefs')?.setAttribute('aria-hidden', 'true');
      host.classList.remove('show', 'show-prefs');
      document.dispatchEvent(new CustomEvent('al:cookiechange', { detail: prefs }));
    };
    const getPrefs = () => {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch { return null; }
    };

    function syncToggles(prefs) {
      host.querySelectorAll('[data-cookie-pref]').forEach(t => {
        const k = t.dataset.cookiePref;
        const on = !!prefs[k];
        t.classList.toggle('on', on);
        if (t.getAttribute('role') === 'switch') t.setAttribute('aria-checked', on ? 'true' : 'false');
      });
    }

    host.addEventListener('click', (e) => {
      const reopen = e.target.closest('[data-cookie-reopen]');
      if (reopen) { e.preventDefault(); openBanner(true); return; }

      const btn = e.target.closest('[data-cookie]');
      if (btn) {
        const act = btn.dataset.cookie;
        if (act === 'accept') save({ essential: true, analytics: true, marketing: true });
        else if (act === 'reject') save({ essential: true, analytics: false, marketing: false });
        else if (act === 'customise') { host.classList.add('show-prefs'); host.querySelector('.cookie-prefs')?.setAttribute('aria-hidden', 'false'); syncToggles(getPrefs() || { essential: true, analytics: false, marketing: false }); }
        else if (act === 'save') {
          const prefs = { essential: true };
          host.querySelectorAll('[data-cookie-pref]').forEach(t => { if (t.dataset.cookiePref !== 'essential') prefs[t.dataset.cookiePref] = t.classList.contains('on'); });
          save(prefs);
        }
        return;
      }

      const tog = e.target.closest('[data-cookie-pref]');
      if (tog && !tog.classList.contains('locked')) {
        tog.classList.toggle('on');
        if (tog.getAttribute('role') === 'switch') tog.setAttribute('aria-checked', tog.classList.contains('on') ? 'true' : 'false');
      }
    });

    // Keyboard support for toggles
    host.querySelectorAll('[data-cookie-pref][role="switch"]').forEach(t => {
      t.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); t.click(); }
      });
    });

    function openBanner(force) {
      if (!force && hasChoice()) return;
      if (!host.classList.contains('show-prefs')) {
        host.querySelector('.cookie-prefs')?.setAttribute('aria-hidden', 'true');
      }
      host.classList.add('show');
    }

    // Re-render text when language changes
    window.addEventListener('al:langchange', () => {
      const titleEl = host.querySelector('[data-i18n="cookie.title"]');
      if (titleEl) titleEl.textContent = T.tr('cookie.title');
      const learnEl = host.querySelector('[data-i18n="cookie.learn_more"]');
      if (learnEl) learnEl.textContent = T.tr('cookie.learn_more');
      const customiseEl = host.querySelector('[data-cookie="customise"]');
      if (customiseEl) customiseEl.textContent = T.tr('cookie.custom');
      const rejectEl = host.querySelector('[data-cookie="reject"]');
      if (rejectEl) rejectEl.textContent = T.tr('cookie.reject');
      const acceptEl = host.querySelector('[data-cookie="accept"]');
      if (acceptEl) acceptEl.textContent = T.tr('cookie.accept');
      const saveEl = host.querySelector('[data-cookie="save"]');
      if (saveEl) saveEl.textContent = T.tr('cookie.save');
      const body = host.querySelector('.cookie-body > span');
      if (body) {
        body.textContent = T.tr('cookie.text') + ' ';
        const a2 = document.createElement('a');
        a2.href = 'privacy.html';
        a2.textContent = T.tr('cookie.learn_more');
        body.appendChild(a2);
      }
    });

    // Expose for testing / external triggers
    window.ALCookies = { open: () => openBanner(true), get: getPrefs, clear: () => { try { localStorage.removeItem(STORAGE_KEY); } catch {} openBanner(true); } };

    // Show on first visit (delay so it doesn't compete with page paint)
    setTimeout(() => openBanner(false), 600);
  }

  /* ---------- Deterministic demo seed — guarantees identical first-load content on http:// and file:// ---------- */
  const DEMO_MEMBER = {
    memberId: 'NG09246375',
    firstName: 'Adaeze',
    name: 'Adaeze Okonkwo',
    email: 'adaeze@elkenafrica.com',
    phone: '+234 803 123 4567',
    signedInAt: Date.UTC(2026, 5, 3, 8, 52, 21), // 2026-06-03T08:52:21Z = join date
  };

  function seedDemoIfEmpty() {
    try {
      const hasAuth = !!localStorage.getItem(STORAGE.AUTH);
      const hasOrdersRaw = localStorage.getItem('al.orders');
      const hasOrders = hasOrdersRaw && JSON.parse(hasOrdersRaw || '[]').length > 0;
      // Only seed on a truly empty / brand-new profile (not touched by real user yet)
      if (hasAuth || hasOrders) return;

      // 1) Demo account: fixed NG09246375 Adaeze Okonkwo — same on every protocol
      localStorage.setItem(STORAGE.AUTH, JSON.stringify({
        memberId: DEMO_MEMBER.memberId,
        firstName: DEMO_MEMBER.firstName,
        name: DEMO_MEMBER.name,
        email: DEMO_MEMBER.email,
        phone: DEMO_MEMBER.phone,
        signedInAt: DEMO_MEMBER.signedInAt,
        type: 'home',
        state: 'Lagos',
        city: 'Lekki',
        address: '14 Admiralty Way, Lekki Phase 1, Lagos, Nigeria',
      }));

      // 2) Profile mirror (used by address defaults / subviews)
      localStorage.setItem(STORAGE.PROFILE, JSON.stringify({
        firstName: DEMO_MEMBER.firstName,
        name: DEMO_MEMBER.name,
        email: DEMO_MEMBER.email,
        phone: DEMO_MEMBER.phone,
        type: 'home',
        state: 'Lagos',
        city: 'Lekki',
        address: '14 Admiralty Way, Lekki Phase 1, Lagos, Nigeria',
        verified: true,
        signedInAt: DEMO_MEMBER.signedInAt,
        memberSince: DEMO_MEMBER.signedInAt,
      }));

      // 3) Default shipping address (matches demo profile)
      localStorage.setItem(STORAGE.ADDRESSES, JSON.stringify([{
        id: 'a_default',
        label: 'Home',
        recipient: DEMO_MEMBER.name,
        phone: DEMO_MEMBER.phone,
        street: '14 Admiralty Way, Lekki Phase 1',
        city: 'Lekki',
        state: 'Lagos',
        isDefault: true,
      }]));

      // 4) AE XLSX style member data (account overview / basic info bar)
      localStorage.setItem('al.memberData', JSON.stringify({
        memberId: DEMO_MEMBER.memberId,
        memberName: DEMO_MEMBER.name,
        loginStatus: 'Allowed',
        status: 'Active',
        country: 'Nigeria',
        joinDate: '2026-06-03T08:52:21',
        joinPeriod: 172,
        currentLevel: 'Silver',
        levelAdjustDate: null,
        settlementLevel: 'Silver',
        highestMgmtStar: 'None',
        latestMgmtStar: 'None',
        highestElite: 'N/A',
        latestElite: 'N/A',
        referrerId: 'NG27187710',
        referrerName: 'S2',
        actualReferrerId: 'NG27187710',
        actualReferrerName: 'S2',
        reportingCenterId: 'NG66051653',
        isReportingCenter: 'No',
        showChart: 'Yes',
        showRecharge: 'Yes',
        reportingCenterLevel: 'Level 5',
        bankBranch: 'Access Bank - Victoria Island',
        bankName: 'Access Bank Nigeria Plc',
        bankAccount: '36545355225',
        commonAddress: '14, Admiralty Way, Victoria Island, Lagos, Nigeria',
        transferEnabled: 'Enabled',
        email: DEMO_MEMBER.email,
        phone: DEMO_MEMBER.phone,
        _schemaVersion: 2,
      }));

      // 5) One sample order: same AQ-UW13CL on every protocol / first load
      //     Images use relative paths (assets/...) so both http:// and file:// resolve them.
      const placedAt = Date.UTC(2026, 7, 24, 10, 30, 0); // 24 AUG 2026 10:30 UTC
      const items = [{
        id: 'hw3',
        name: 'Elken Spirulina',
        category: 'health-wellness',
        img: 'elken-spirulina.webp',
        image: 'assets/img/products/health-wellness/elken-spirulina.webp',
        price: 52000,
        qty: 3,
        bv: 52,
      }];
      const order = {
        id: 'AQ-UW13CL',
        memberId: DEMO_MEMBER.memberId,
        status: 'paid',
        createdAt: placedAt,
        placedAt,
        paidAt: placedAt,
        currency: 'NGN',
        items,
        subtotal: 156000,
        shipping: 0,
        tax: 0,
        total: 156000,
        bv: 312,
        paymentMethod: 'card',
        payment: 'card',
        paymentLabel: 'Debit Card',
        payStatus: 'Paid',
        deliveryMethod: 'home',
        shippingAddress: {
          recipient: DEMO_MEMBER.name,
          phone: DEMO_MEMBER.phone,
          street: '14 Admiralty Way, Lekki Phase 1',
          city: 'Lekki',
          state: 'Lagos',
          country: 'Nigeria',
        },
        notes: '',
      };
      localStorage.setItem('al.orders', JSON.stringify([order]));

      // 6) Notify: sync header (now shows logged-in demo user) + order listeners
      window.dispatchEvent(new CustomEvent('al:authchange', { detail: { user: JSON.parse(localStorage.getItem(STORAGE.AUTH)) } }));
      window.dispatchEvent(new CustomEvent('al:orderschange'));
    } catch (e) {
      // localStorage disabled / privacy mode: silently skip (non-critical)
    }
  }

  /* ---------- Page ownership banner (env marker) ----------
     贴在页面顶部的标识条，按登录态区分页面归属：
       未登录 → 此页面属于Wordpress页面
       已登录 → 此页面属于外部AE页面
       data-env="ae" 页面（guest 下单/结算流程）→ 此页面属于AE页面
       说明：guest 下单/结算流程属于外部 AE 系统，但不带“外部”二字，
       与 login/signup 的“外部AE页面”在文案上区分。 */
  const ENV_BANNER_GUEST  = '此页面属于Wordpress页面';
  const ENV_BANNER_MEMBER = '此页面属于外部AE页面';
  const ENV_BANNER_AE     = '此页面属于AE页面';
  // login / signup 属于外部 AE 系统（非 Wordpress），无论登录态都归属外部 AE
  function isAuthPage() {
    const path = (location.pathname.split('/').pop() || '').toLowerCase();
    return path === 'login.html' || path === 'signup.html';
  }
  function renderEnvBanner() {
    if (!document.body) return;
    /* Display-only pages never claim member ownership — they always read as the
       public (Wordpress) page, whatever the stored login state is. */
    const displayOnly = isDisplayOnlyPage();
    const wordpress = isWordPressPage();
    const publicPage = displayOnly || wordpress;
    const loggedIn = !publicPage && !!(window.Auth && window.Auth.user);
    const memberBanner = loggedIn || (!publicPage && isAuthPage());
    const aePage = !publicPage && document.body.dataset.env === 'ae';
    let el = document.getElementById('envBanner');
    if (!el) {
      el = document.createElement('div');
      el.id = 'envBanner';
      el.className = 'env-banner';
      el.setAttribute('role', 'note');
      document.body.insertBefore(el, document.body.firstChild);
      document.body.classList.add('has-env-banner');
    }
    el.textContent = aePage ? ENV_BANNER_AE : (memberBanner ? ENV_BANNER_MEMBER : ENV_BANNER_GUEST);
    el.classList.toggle('env-banner--member', memberBanner || aePage);
  }
  window.renderEnvBanner = renderEnvBanner;

  /* ---------- Buy Now gate (unlogged / "Wordpress page" product pages) ----------
     On product pages shown to signed-out visitors (env banner reads "此页面属于Wordpress页面"),
     the "Add to cart" / "Add to Cart" control is hidden and replaced by a "Buy Now" button.
     Clicking "Buy Now" opens login.html in a NEW TAB (carrying ?next= back to this product).
     Logged-in visitors keep the normal add-to-cart flow untouched. */
  const GATE_ADD_SELECTOR = '[data-demo-add], #detailAddToCart, .ek-card-addcart-btn[data-product]';
  function isGateUnlogged() {
    if (window.isDisplayOnlyPage && window.isDisplayOnlyPage()) return true;
    if (window.isWordPressPage && window.isWordPressPage()) return true;
    return !(window.Auth && typeof window.Auth.isLoggedIn === 'function' && window.Auth.isLoggedIn());
  }
  function openLoginNewTab() {
    const file = location.pathname.split('/').pop() || 'index.html';
    const next = '?next=' + encodeURIComponent(file + location.search);
    const w = window.open('login.html' + next, '_blank', 'noopener');
    if (!w) location.href = 'login.html' + next; // popup blocked → same tab fallback
  }
  function applyBuyNowGate() {
    const unlogged = isGateUnlogged();
    const hasDetailBuyNow = !!document.getElementById('detailBuyNow');
    document.querySelectorAll(GATE_ADD_SELECTOR).forEach(function (btn) {
      if (!btn.parentNode) return;
      let buy = btn.parentNode.querySelector(':scope > .ek-buy-now-gate');
      if (unlogged) {
        // product-detail.html already ships a "Buy Now"; don't add a second one.
        if (!buy && !hasDetailBuyNow) {
          buy = document.createElement('button');
          buy.type = 'button';
          buy.className = (btn.className || '') + ' ek-buy-now-gate';
          buy.textContent = 'Buy Now';
          buy.addEventListener('click', openLoginNewTab);
          btn.parentNode.insertBefore(buy, btn.nextSibling);
        }
        btn.hidden = true;
      } else {
        btn.hidden = false;
        if (buy) buy.remove();
      }
    });
    // product-detail.html: intercept its existing Buy Now to open login when unlogged
    // (instead of jumping straight to checkout), and restore it on login.
    const buyNow = document.getElementById('detailBuyNow');
    if (buyNow && !buyNow.dataset.gateWrapped) {
      buyNow.dataset.gateWrapped = '1';
      buyNow.addEventListener('click', function (e) {
        if (isGateUnlogged()) {
          e.stopImmediatePropagation();
          e.preventDefault();
          openLoginNewTab();
        }
      });
    }
  }
  window.applyBuyNowGate = applyBuyNowGate;
  window.openLoginNewTab = openLoginNewTab;

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    // Seed demo account + sample order BEFORE rendering the header so it shows the signed-in state.
    // This guarantees identical first-load content on both http://127.0.0.1:XXXX and file:// protocol.
    // Display-only pages (index.html) never write login state, so they skip seeding.
    if (!isDisplayOnlyPage() && !isWordPressPage()) seedDemoIfEmpty();
    renderHeader(document.body.dataset.page);
    renderFooter();
    renderCookieBanner();
    renderEnvBanner();
    applyBuyNowGate();
    wireOffline();
    bindLoadingBtns();
    // 首次加载：把所有 data-i18n 标记按当前语言填充
    T.applyI18n(document.body);
    // 语言切换：Header/Footer 用 JS 模板重渲，静态文案用 applyI18n，最后 dispatch 事件给页面级脚本（mall/products/等）二次渲染
    window.addEventListener('al:langchange', () => {
      renderHeader(document.body.dataset.page);
      renderFooter();
      T.applyI18n(document.body);
      applyBuyNowGate();
    });
    // Re-evaluate the Buy Now gate whenever login state changes (e.g. checkout flow).
    window.addEventListener('al:authchange', applyBuyNowGate);
  });

  /* ---------- Public helpers ---------- */
  window.AL = {
    Money, T, STORAGE, fmtDate, fmtNum, toast,
    seedDemoIfEmpty,
    loadProfile() {
      try { return JSON.parse(localStorage.getItem(STORAGE.PROFILE) || 'null') || this._profileFromAuth(); }
      catch { return this._profileFromAuth(); }
    },
    saveProfile(p) { localStorage.setItem(STORAGE.PROFILE, JSON.stringify(p)); },
    _profileFromAuth() {
      const u = Auth.user; if (!u) return null;
      return {
        firstName: u.firstName || (u.name || '').split(/\s+/)[0] || '',
        name: u.name || '',
        email: u.email || '',
        phone: u.phone || '',
        type: u.type || 'home',
        state: u.state || '',
        city: u.city || '',
        address: u.address || '',
        verified: true,
        signedInAt: u.signedInAt || Date.now(),
        memberSince: u.signedInAt || Date.now(),
      };
    },
    loadAddresses() {
      try { return JSON.parse(localStorage.getItem(STORAGE.ADDRESSES) || 'null'); }
      catch { return null; }
    },
    saveAddresses(arr) { localStorage.setItem(STORAGE.ADDRESSES, JSON.stringify(arr)); },
    /** Returns a non-empty addresses list, seeded from auth/profile on first use. */
    getAddresses() {
      let arr = this.loadAddresses();
      if (arr) return arr;
      const u = Auth.user;
      if (!u) return [];
      const seed = {
        id: 'a_default',
        label: 'Home',
        recipient: u.name || '',
        phone: u.phone || '',
        street: u.address || '',
        city: u.city || '',
        state: u.state || '',
        isDefault: true,
      };
      arr = [seed];
      this.saveAddresses(arr);
      return arr;
    },
    upsertAddress(a) {
      const arr = this.getAddresses();
      if (a.isDefault) arr.forEach(x => x.isDefault = false);
      const i = arr.findIndex(x => x.id === a.id);
      if (i >= 0) arr[i] = { ...arr[i], ...a };
      else arr.push({ ...a, id: a.id || 'a_' + Date.now() });
      this.saveAddresses(arr);
    },
    removeAddress(id) {
      const arr = this.getAddresses().filter(x => x.id !== id);
      // ensure one default
      if (arr.length && !arr.some(x => x.isDefault)) arr[0].isDefault = true;
      this.saveAddresses(arr);
    },
  };
})();
