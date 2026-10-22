/* ============================================================
   Product catalog data & rendering for products.html
   ============================================================ */
(function() {
  'use strict';

  /* ---------- Product catalog (12 selected) ----------
     price  = DP  (distributor price, what members pay on repeat-purchase)
     rp     = retail price (RRP, listed as comparison)
     bv     = bonus volume per unit (used for MLM commissions)
     stock  = units currently in the warehouse
     sku    = product code
  */
  const allProducts = [
    // Health & Wellness (3)
    { id: 'hw2', name: 'Calmag', category: 'health-wellness', tag: 'Calms Restful Sleep', price: 38000, rp: 45600, bv: 35, stock: 42, sku: 'CALMAG02', img: 'calmag.webp', desc: 'Calming magnesium for restful sleep and relaxation.' },
    { id: 'hw3', name: 'Elken Spirulina', category: 'health-wellness', tag: 'Daily Nutrition', price: 52000, rp: 62400, bv: 48, stock: 28, sku: 'ELSP03', img: 'elken-spirulina.webp', desc: 'Premium spirulina for daily energy and immunity.' },
    { id: 'hw1', name: 'C-Joie Flex', category: 'health-wellness', tag: 'Joint Support', price: 45000, rp: 54000, bv: 42, stock: 35, sku: 'CJF01', img: 'c-joie-flex.webp', desc: 'Flexible joint support for active lifestyles.' },

    // Beauty & Skincare (2)
    { id: 'bs1', name: 'Advanced Age Recovery', category: 'beauty-skincare', tag: 'Anti-Aging', price: 68000, rp: 81600, bv: 62, stock: 0, sku: 'AAR01', img: 'advanced-age-recovery.webp', desc: 'Advanced anti-aging formula for youthful skin.', comingSoon: true, comingSoonDesc: 'Register your interest and we will contact you if and when it becomes available in Nigeria.' },
    { id: 'bs5', name: 'Naru Hydra', category: 'beauty-skincare', tag: 'Deep Hydration', price: 48000, rp: 57600, bv: 44, stock: 22, sku: 'NARU05', img: 'naru-hydra.webp', desc: 'Intense hydration for dry, thirsty skin.' },

    // Home Appliances (3)
    { id: 'ha2', name: 'Bio Pure N200', category: 'home-appliances', tag: '200 GPD UV', price: 560000, rp: 672000, bv: 420, stock: 5, sku: 'BPN200', img: 'bio-pure-n200.webp', desc: 'UV sterilization with alkaline boost.' },
    { id: 'ha3', name: 'Bio Pure N300', category: 'home-appliances', tag: '300 GPD Hot/Cold', price: 1240000, rp: 1488000, bv: 850, stock: 3, sku: 'BPN300', img: 'bio-pure-n300.webp', desc: 'Hot and cold drinking water for offices.' },
    { id: 'ha6', name: 'Hydromi NH101', category: 'home-appliances', tag: '101 GPD Coin', price: 720000, rp: 864000, bv: 520, stock: 4, sku: 'HNH101', img: 'hydromi-nh101.webp', desc: 'Coin-operated public water dispenser.' },

    // Food & Beverage (1)
    { id: 'fb1', name: 'Elcafe', category: 'food-beverage', tag: 'Coffee', price: 25000, rp: 30000, bv: 22, stock: 60, sku: 'ELCAFE01', img: 'elcafe.webp', desc: 'Premium instant coffee blend.' },

    // Personal & Home Care (2)
    { id: 'ph1', name: 'Body Basics', category: 'personal-home-care', tag: 'Daily Care', price: 15000, rp: 18000, bv: 13, stock: 80, sku: 'BB01', img: 'body-basics.webp', desc: 'Gentle body wash for everyday freshness.' },
    { id: 'ph6', name: 'Tricho Pro', category: 'personal-home-care', tag: 'Hair Care', price: 16000, rp: 19200, bv: 14, stock: 70, sku: 'TRICHO06', img: 'tricho-pro.webp', desc: 'Professional hair care treatment.' },

    // Wellness Devices (1)
    { id: 'wd1', name: 'Bes Massage Device', category: 'wellness-devices', tag: 'Massage', price: 95000, rp: 114000, bv: 78, stock: 12, sku: 'BES01', img: 'bes-massage-device.webp', desc: 'Portable massage device for muscle relief.' },
  ];

  /* ---------- UAE product catalog ----------
     The UAE market carries a different assortment, priced in AED (dirhams;
     fils shown with 2 decimals) instead of NGN. IDs use an "ae-" prefix so
     UAE items never collide with Nigerian ones inside shared carts. */
  const uaeProducts = [
    // Home Appliances (6)
    { id: 'ae-bpn100', name: 'Bio Pure N100', category: 'home-appliances', tag: '100 GPD', price: 899, rp: 1079, bv: 300, stock: 15, sku: 'BPN100', img: 'bio-pure-n100.webp', desc: 'Compact alkaline water purifier for apartments.' },
    { id: 'ae-bpn200', name: 'Bio Pure N200', category: 'home-appliances', tag: '200 GPD UV', price: 1299, rp: 1559, bv: 420, stock: 8, sku: 'BPN200', img: 'bio-pure-n200.webp', desc: 'UV sterilization with alkaline boost.' },
    { id: 'ae-bpn300', name: 'Bio Pure N300', category: 'home-appliances', tag: '300 GPD Hot/Cold', price: 2880, rp: 3456, bv: 850, stock: 4, sku: 'BPN300', img: 'bio-pure-n300.webp', desc: 'Hot and cold drinking water for offices.' },
    { id: 'ae-bpn400', name: 'Bio Pure N400', category: 'home-appliances', tag: '400 GPD Premium', price: 4150, rp: 4980, bv: 1200, stock: 2, sku: 'BPN400', img: 'bio-pure-n400.webp', desc: 'Flagship purifier with full-spectrum filtration.' },
    { id: 'ae-hnh101', name: 'Hydromi NH101', category: 'home-appliances', tag: '101 GPD Coin', price: 1670, rp: 2004, bv: 520, stock: 6, sku: 'HNH101', img: 'hydromi-nh101.webp', desc: 'Coin-operated public water dispenser.' },
    { id: 'ae-hnh500', name: 'Hydromi NH500', category: 'home-appliances', tag: '500 GPD Commercial', price: 3250, rp: 3900, bv: 900, stock: 3, sku: 'HNH500', img: 'hydromi-nh500.webp', desc: 'High-capacity commercial water dispenser.' },

    // Health & Wellness (2)
    { id: 'ae-calmag', name: 'Calmag', category: 'health-wellness', tag: 'Calms Restful Sleep', price: 88, rp: 106, bv: 35, stock: 42, sku: 'CALMAG02', img: 'calmag.webp', desc: 'Calming magnesium for restful sleep and relaxation.' },
    { id: 'ae-spirulina', name: 'Elken Spirulina', category: 'health-wellness', tag: 'Daily Nutrition', price: 121, rp: 145, bv: 48, stock: 28, sku: 'ELSP03', img: 'elken-spirulina.webp', desc: 'Premium spirulina for daily energy and immunity.' },

    // Beauty & Skincare (1)
    { id: 'ae-naru', name: 'Naru Hydra', category: 'beauty-skincare', tag: 'Deep Hydration', price: 112, rp: 134, bv: 44, stock: 22, sku: 'NARU05', img: 'naru-hydra.webp', desc: 'Intense hydration for dry, thirsty skin.' },

    // Food & Beverage (1)
    { id: 'ae-puerh', name: 'Pu-erh Tea', category: 'food-beverage', tag: 'Fermented Tea', price: 58, rp: 70, bv: 20, stock: 60, sku: 'PUERH01', img: 'pu-erh-tea.webp', desc: 'Aged Pu-erh tea for digestion and daily wellness.' },

    // Wellness Devices (2)
    { id: 'ae-guasa', name: 'Guasa Board', category: 'wellness-devices', tag: 'Body Sculpting', price: 150, rp: 180, bv: 60, stock: 25, sku: 'GUASA01', img: 'guasa-board.webp', desc: 'Gua sha board for myofascial relief and glow.' },
    { id: 'ae-bes', name: 'Bes Massage Device', category: 'wellness-devices', tag: 'Massage', price: 220, rp: 264, bv: 78, stock: 12, sku: 'BES01', img: 'bes-massage-device.webp', desc: 'Portable massage device for muscle relief.' },
  ];

  /* ---------- Country configuration ----------
     Elken runs several markets. Each market has its own product catalog,
     currency/unit, phone dial code, address regions, member-ID prefix,
     default reporting center and VAT rate. Pages with a country selector
     (signup.html) switch the whole experience through this map. */
  const COUNTRY_CONFIG = {
    Nigeria: {
      code: 'NG',
      currency: 'NGN',
      dial: '+234',
      memberIdPrefix: 'NG',
      centerId: 'NG000000001',
      taxRate: 0.075, // 7.5% VAT
      regions: ['Lagos', 'Abuja FCT', 'Rivers', 'Kano', 'Oyo', 'Edo', 'Delta', 'Enugu', 'Kaduna', 'Ogun', 'Anambra', 'Imo', 'Other'],
      catalog: allProducts,
    },
    UAE: {
      code: 'AE',
      currency: 'AED',
      dial: '+971',
      memberIdPrefix: 'AE',
      centerId: 'AE000000001',
      taxRate: 0.05, // 5% VAT
      regions: ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah', 'Other'],
      catalog: uaeProducts,
    },
  };
  const DEFAULT_COUNTRY = 'Nigeria';

  function getCountryConfig(country) {
    return COUNTRY_CONFIG[country] || COUNTRY_CONFIG[DEFAULT_COUNTRY];
  }
  function getProductsByCountry(country) {
    return getCountryConfig(country).catalog;
  }
  // Market-aware money formatting: NGN in whole naira, AED with 2-decimal fils.
  // An explicit dp overrides the default decimals (used for tax breakdowns).
  function formatMoney(amount, country, dp) {
    const cfg = getCountryConfig(country);
    const n = Number(amount) || 0;
    const d = typeof dp === 'number' ? dp : (cfg.currency === 'AED' ? 2 : 0);
    return cfg.currency + ' ' + n.toLocaleString('en-US', {
      minimumFractionDigits: d, maximumFractionDigits: d
    });
  }

  /* ---------- Category metadata ---------- */
  const categories = {
    'health-wellness': { label: 'Health & Wellness', eyebrow: 'Health & Nutrition', color: '#202259' },
    'beauty-skincare': { label: 'Beauty & Skincare', eyebrow: 'Beauty & Skincare', color: '#202259' },
    'home-appliances': { label: 'Home Appliances', eyebrow: 'Home Appliances', color: '#202259' },
    'food-beverage': { label: 'Food & Beverage', eyebrow: 'Food & Beverage', color: '#202259' },
    'personal-home-care': { label: 'Personal & Home Care', eyebrow: 'Personal & Home Care', color: '#202259' },
    'wellness-devices': { label: 'Wellness Devices', eyebrow: 'Wellness Devices', color: '#202259' },
  };

  /* ---------- Cart & Order (web checkout) ---------- */
  /* ---------- Market-aware shopper cart ----------
     The two markets keep INDEPENDENT carts: Nigeria → al.cart (legacy key),
     UAE → al.cart.ae. Their catalogues are different, so items must never
     mix. The active market comes from the guest chooser (sessionStorage
     al.guestCountry) or the signed-in member's own market. */
  const CART_KEY = 'al.cart';
  const CART_KEY_AE = 'al.cart.ae';
  function currentMarket() {
    try {
      const g = normalizeCountryName(sessionStorage.getItem('al.guestCountry'));
      if (g) return g;
    } catch (e) {}
    const u = (window.Auth && window.Auth.user) || {};
    let md = {};
    try { md = JSON.parse(localStorage.getItem('al.memberData') || '{}'); } catch (e) {}
    const mid = (u && u.memberId) || md.memberId || '';
    if (mid) {
      for (const c of [md.country, md._defaultCountry, u && u.country]) {
        const n = normalizeCountryName(c);
        if (n) return n;
      }
      const fromId = countryFromMemberId(mid);
      if (fromId) return fromId;
    }
    return DEFAULT_COUNTRY;
  }
  function cartKey() {
    const cfg = getCountryConfig(currentMarket());
    return (cfg && cfg.code === 'AE') ? CART_KEY_AE : CART_KEY;
  }
  // Which market's catalogue a product id belongs to ('' = unknown / custom).
  function productMarket(id) {
    if (!id) return '';
    const s = String(id);
    if (getProductsByCountry('UAE').some(p => p.id === s)) return 'UAE';
    if (getProductsByCountry('Nigeria').some(p => p.id === s)) return 'Nigeria';
    return '';
  }
  function getCart() {
    try { return JSON.parse(localStorage.getItem(cartKey()) || '[]'); }
    catch { return []; }
  }
  function saveCart(cart) {
    localStorage.setItem(cartKey(), JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('al:cartchange'));
  }
  // Total number of items (sum of qtys) in the cart.
  function getCartCount() {
    return getCart().reduce((s, c) => s + (c.qty || 0), 0);
  }
  // Add a product to the cart, merging by id (increments qty, capped at 99).
  // `product` must carry { id, name, price, img, category }.
  function addToCart(product, qty) {
    qty = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));
    if (!product || !product.id) return getCartCount();
    // Market guard: the two markets' carts are separate stores — a product
    // from the other market can never be added (their catalogues differ).
    const pm = productMarket(product.id);
    if (pm && pm !== currentMarket()) {
      if (window.toast) window.toast(product.name + ' belongs to the ' + pm + ' store — switch your market to add it.', 'error');
      return getCartCount();
    }
    const cart = getCart();
    const existing = cart.find(c => c.id === product.id);
    if (existing) {
      existing.qty = Math.max(1, Math.min(99, (existing.qty || 1) + qty));
      if (product.name) existing.name = product.name;
      if (typeof product.price === 'number') existing.price = product.price;
      if (product.img) existing.img = product.img;
      if (product.category) existing.category = product.category;
    } else {
      cart.push({
        id: product.id,
        name: product.name || 'Product',
        price: Number(product.price) || 0,
        img: product.img || '',
        category: product.category || '',
        qty: qty,
      });
    }
    saveCart(cart); // dispatches al:cartchange → badge updates
    return getCartCount();
  }
  function updateCartQty(id, qty) {
    const cart = getCart();
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.qty = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));
    saveCart(cart);
  }
  function removeFromCart(id) {
    saveCart(getCart().filter(c => c.id !== id));
  }
  function clearCart() {
    saveCart([]);
  }

  /* ---------- Member repeat-purchase cart (independent of the main cart) ----------
     Items added on member-repurchase.html go into al.memberCart so they never
     mix with a shopper's own al.cart. The two stores are fully separate. */
  function getMemberCart() {
    try { return JSON.parse(localStorage.getItem('al.memberCart') || '[]'); }
    catch { return []; }
  }
  function saveMemberCart(cart) { localStorage.setItem('al.memberCart', JSON.stringify(cart)); window.dispatchEvent(new CustomEvent('al:cartchange')); }
  // Total number of items (sum of qtys) in the member cart.
  function getMemberCartCount() {
    return getMemberCart().reduce((s, c) => s + (c.qty || 0), 0);
  }
  // Same merge-by-id semantics as addToCart, but targets the member cart.
  function addToMemberCart(product, qty) {
    qty = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));
    if (!product || !product.id) return getMemberCartCount();
    const cart = getMemberCart();
    const existing = cart.find(c => c.id === product.id);
    if (existing) {
      existing.qty = Math.max(1, Math.min(99, (existing.qty || 1) + qty));
      if (product.name) existing.name = product.name;
      if (typeof product.price === 'number') existing.price = product.price;
      if (product.img) existing.img = product.img;
      if (product.category) existing.category = product.category;
    } else {
      cart.push({
        id: product.id,
        name: product.name || 'Product',
        price: Number(product.price) || 0,
        img: product.img || '',
        category: product.category || '',
        qty: qty,
      });
    }
    saveMemberCart(cart); // dispatches al:cartchange → badge updates
    return getMemberCartCount();
  }
  function updateMemberCartQty(id, qty) {
    const cart = getMemberCart();
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.qty = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));
    saveMemberCart(cart);
  }
  function removeFromMemberCart(id) {
    saveMemberCart(getMemberCart().filter(c => c.id !== id));
  }
  function clearMemberCart() {
    saveMemberCart([]);
  }

  /* ---------- Country dial codes ---------- */
  const COUNTRY_CODES = [
    { code: '+234', label: 'Nigeria (+234)' },
    { code: '+971', label: 'United Arab Emirates (+971)' },
    { code: '+60', label: 'Malaysia (+60)' },
    { code: '+65', label: 'Singapore (+65)' },
    { code: '+62', label: 'Indonesia (+62)' },
    { code: '+66', label: 'Thailand (+66)' },
    { code: '+63', label: 'Philippines (+63)' },
    { code: '+86', label: 'China (+86)' },
    { code: '+91', label: 'India (+91)' },
    { code: '+1', label: 'USA / Canada (+1)' },
    { code: '+44', label: 'United Kingdom (+44)' },
  ];
  const DEFAULT_DIAL = '+234';
  // Reusable "dial code + number" phone field
  function phoneFieldHTML(selected, name) {
    const opts = COUNTRY_CODES.map(c =>
      `<option value="${c.code}"${c.code === selected ? ' selected' : ''}>${c.label}</option>`
    ).join('');
    return `
      <div class="phone-input-wrap">
        <select class="ek-select phone-dial" name="${name}_dial" aria-label="Country code">${opts}</select>
        <input class="ek-input phone-number" name="${name}" type="tel" required inputmode="tel" placeholder="123 456 789" />
      </div>`;
  }
  function readPhone(form, baseName) {
    const dial = (form.querySelector(`[name="${baseName}_dial"]`) || {}).value || DEFAULT_DIAL;
    const num = ((form.querySelector(`[name="${baseName}"]`) || {}).value || '').trim().replace(/[^\d]/g, '');
    if (!num) return '';
    return dial + ' ' + num;
  }
  // Show a stored phone (+60 123456789) in a dial+number pair, e.g. when editing
  function fillPhoneFields(host, value) {
    if (!host) return;
    const dial = host.querySelector('.phone-dial');
    const num = host.querySelector('.phone-number');
    if (!dial || !num) return;
    const m = String(value || '').match(/^(\+\d{1,4})?\s*(.*)$/);
    const code = m && m[1] ? m[1] : DEFAULT_DIAL;
    const digits = m ? m[2].trim() : String(value || '');
    if (dial.value !== code) {
      const opt = Array.from(dial.options).find(o => o.value === code);
      if (opt) dial.value = code;
    }
    num.value = digits;
  }

  /* ---------- BV rewards ---------- */
  // 1 BV per N1,000 of product value (round down to whole BV)
  function getBV(product) {
    if (!product) return 0;
    if (typeof product.bv === 'number') return Math.max(0, Math.round(product.bv));
    return Math.max(0, Math.round((product.price || 0) / 1000));
  }
  function getBVTotal() {
    return getMyOrders().reduce((s, o) => s + (o.bv || 0), 0);
  }

  /* ---------- Referral (share link) binding & BV credit ----------
     A member shares a link carrying ?ref=<their NG member ID>. When a visitor
     arrives through that link we bind the referrer relationship (first-touch)
     and persist it. If the visitor later places an order WITHOUT logging in
     (guest checkout), the order's BV flows to the sharer's member ID via a
     BV-credit ledger — the guest never keeps the BV themselves. */
  const REFERRAL_KEY = 'al.referrer';      // { id, name, ts }
  const BV_CREDITS_KEY = 'al.bvCredits';   // [{ id, referrerId, referrerName, bv, orderId, customerName, date }]
  const ECOIN_KEY = 'al.ecoin';            // [{ id, memberId, amount, type, orderId, remark, date }]

  function captureReferral() {
    try {
      const raw = new URLSearchParams(location.search).get('ref');
      if (!raw) return;
      // Both markets: NG… and AE… member IDs are valid referrers. Note this
      // must NOT go through normalizeMemberId() — that helper is NG-only
      // (it exists to heal legacy 12-digit drawer IDs) and would silently
      // drop every UAE referrer.
      const id = String(raw).trim().toUpperCase();
      if (!id || !/^(?:(?:NG|AE)\d{8}|NG000000001|AE000000001)$/.test(id)) return; // only valid NG/AE + 8-digit member IDs (or a house account)
      // First-touch attribution: keep the earliest bound referrer.
      if (getReferral()) return;
      localStorage.setItem(REFERRAL_KEY, JSON.stringify({ id, name: '', ts: Date.now() }));
    } catch (e) {}
  }
  function getReferral() {
    try { return JSON.parse(localStorage.getItem(REFERRAL_KEY) || 'null'); }
    catch { return null; }
  }
  function clearReferral() {
    try { localStorage.removeItem(REFERRAL_KEY); } catch (e) {}
  }
  function getBVCredits() {
    try { return JSON.parse(localStorage.getItem(BV_CREDITS_KEY) || '[]'); }
    catch { return []; }
  }
  // Credit a guest order's BV to the captured referrer (the sharer).
  function creditReferralBV({ referrerId, referrerName, bv, orderId, customerName }) {
    if (!referrerId || !bv) return 0;
    const list = getBVCredits();
    list.unshift({
      id: 'RC-' + Math.random().toString(36).slice(2, 10).toUpperCase(),
      referrerId,
      referrerName: referrerName || '',
      bv: Number(bv) || 0,
      orderId: orderId || '',
      customerName: customerName || '',
      date: Date.now(),
    });
    localStorage.setItem(BV_CREDITS_KEY, JSON.stringify(list));
    return Number(bv) || 0;
  }
  // Credit BV to a member's own ledger (e.g. manual recharge).
  function creditBonus({ memberId, bv, orderId, customerName, remark }) {
    if (!memberId || !bv) return 0;
    const list = getBVCredits();
    list.unshift({
      id: 'RC-' + Math.random().toString(36).slice(2, 10).toUpperCase(),
      referrerId: memberId,
      referrerName: '',
      bv: Math.abs(Number(bv) || 0),
      orderId: orderId || '',
      customerName: customerName || '',
      remark: remark || 'Bonus recharge',
      date: Date.now(),
    });
    localStorage.setItem(BV_CREDITS_KEY, JSON.stringify(list));
    return Number(bv) || 0;
  }
  // Debit BV from a member's ledger (e.g. Bonus To Ecoin transfer).
  function debitBonus({ memberId, bv, remark }) {
    if (!memberId || !bv) return 0;
    const list = getBVCredits();
    list.unshift({
      id: 'RC-' + Math.random().toString(36).slice(2, 10).toUpperCase(),
      referrerId: memberId,
      referrerName: '',
      bv: -Math.abs(Number(bv) || 0),
      orderId: '',
      customerName: '',
      remark: remark || 'Bonus transfer to Ecoin',
      date: Date.now(),
    });
    localStorage.setItem(BV_CREDITS_KEY, JSON.stringify(list));
    return -Math.abs(Number(bv) || 0);
  }
  // Total BV credited to a given referrer (member ID).
  function getReferralBVTotal(memberId) {
    if (!memberId) return 0;
    return getBVCredits()
      .filter(c => c.referrerId === memberId)
      .reduce((s, c) => s + (c.bv || 0), 0);
  }
  // Referred orders for a given referrer.
  function getReferralList(memberId) {
    if (!memberId) return [];
    return getBVCredits().filter(c => c.referrerId === memberId);
  }
  // Build a sorted BV trading record list for the given member ID.
  // Combines: own-order credits (type='credit', amount=owned BV),
  //           referral credits (type='credit', amount=referral BV),
  //           with a running balance computed cumulatively.
  function getMemberBVRecords(memberId) {
    if (!memberId) return [];
    const now = Date.now();
    const fmt = d => d.toLocaleDateString('en-GB') + ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    // Collect raw events
    const events = [];
    // Own orders
    const myOrders = getMyOrders();
    myOrders.forEach(o => {
      if (o.bv > 0) events.push({
        type: 'credit',
        date: new Date(o.date || now),
        amount: Number(o.bv),
        preBalance: 0,  // computed later
        postBalance: 0, // computed later
        remark: `Order ${o.id} — ${fmt(new Date(o.date || now))}`,
        sortKey: o.date ? new Date(o.date).getTime() : now,
      });
    });
    // Referral / BV credits & debits (negative bv = debit)
    getBVCredits()
      .filter(c => c.referrerId === memberId)
      .forEach(c => {
        const amt = Number(c.bv) || 0;
        events.push({
          type: amt >= 0 ? 'credit' : 'debit',
          date: new Date(c.date || now),
          amount: amt,
          preBalance: 0,
          postBalance: 0,
          remark: c.remark || (amt >= 0
            ? `Referral bonus — ${c.customerName || ''} (${c.orderId || ''})`
            : `BV debit — ${c.customerName || ''} (${c.orderId || ''})`),
          sortKey: c.date || now,
        });
      });

    // Sort chronologically
    events.sort((a, b) => a.sortKey - b.sortKey);

    // Compute running balance
    let bal = 0;
    return events.map(e => {
      bal += e.amount;
      return {
        date: fmt(e.date),
        type: e.type,
        preBalance: bal - e.amount,
        postBalance: bal,
        amount: e.amount,
        remark: e.remark,
      };
    });
  }
  // Ecoin credit / debit ledger: al.ecoin = [{ id, memberId, amount, type, orderId, remark, date }]
  function getEcoinCredits() {
    try { return JSON.parse(localStorage.getItem(ECOIN_KEY) || '[]'); }
    catch { return []; }
  }
  function creditEcoin({ memberId, amount, type, orderId, remark }) {
    if (!memberId) return 0;
    const list = getEcoinCredits();
    list.unshift({
      id: 'EC-' + Math.random().toString(36).slice(2, 10).toUpperCase(),
      memberId,
      amount: Number(amount) || 0,
      type: type || 'credit',
      orderId: orderId || '',
      remark: remark || '',
      date: Date.now(),
    });
    localStorage.setItem(ECOIN_KEY, JSON.stringify(list));
    return Number(amount) || 0;
  }
  function debitEcoin({ memberId, amount, type, orderId, remark }) {
    if (!memberId) return 0;
    const list = getEcoinCredits();
    list.unshift({
      id: 'EC-' + Math.random().toString(36).slice(2, 10).toUpperCase(),
      memberId,
      amount: -(Number(amount) || 0),
      type: type || 'debit',
      orderId: orderId || '',
      remark: remark || '',
      date: Date.now(),
    });
    localStorage.setItem(ECOIN_KEY, JSON.stringify(list));
    return Number(amount) || 0;
  }
  function getEcoinTotal(memberId) {
    if (!memberId) return 0;
    return getEcoinCredits()
      .filter(e => e.memberId === memberId)
      .reduce((s, e) => s + (e.amount || 0), 0);
  }
  // Build a sorted Ecoin trading record list for the given member ID.
  function getMemberEcoinRecords(memberId) {
    if (!memberId) return [];
    const now = Date.now();
    const fmt = d => d.toLocaleDateString('en-GB') + ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const events = getEcoinCredits()
      .filter(e => e.memberId === memberId)
      .map(e => ({
        type: e.type || 'credit',
        date: new Date(e.date || now),
        amount: Number(e.amount) * (e.type === 'debit' ? -1 : 1),
        remark: e.remark || '',
        sortKey: e.date || now,
      }))
      .sort((a, b) => a.sortKey - b.sortKey);

    let bal = 0;
    return events.map(e => {
      bal += e.amount;
      return {
        date: fmt(e.date),
        type: e.type,
        preBalance: bal - e.amount,
        postBalance: bal,
        amount: e.amount,
        remark: e.remark,
      };
    });
  }

  /* ---------- Member ID & account-bound orders ---------- */
  // Member ID: "<market prefix>" + 8 random digits, e.g. NG12345678 / AE12345678
  // (house accounts NG000000001 / AE000000001 are the only 9-digit IDs)
  function genMemberId(country) {
    const prefix = getCountryConfig(country).memberIdPrefix;
    let digits = '';
    for (let i = 0; i < 8; i++) digits += Math.floor(Math.random() * 10);
    return prefix + digits;
  }
  function getCurrentMemberId() {
    const u = window.Auth && window.Auth.user;
    if (u && u.memberId) return u.memberId;
    // fall back to email-based stable id, else generate one
    if (u) {
      const id = genMemberId();
      u.memberId = id;
      window.Auth.user = u;
      return id;
    }
    return null;
  }

  function getOrders() {
    try { return JSON.parse(localStorage.getItem('al.orders') || '[]'); }
    catch { return []; }
  }
  // Orders belonging to the signed-in account only.
  // Legacy orders without a memberId are excluded ("clear existing data").
  function getMyOrders() {
    const mid = getCurrentMemberId();
    if (!mid) return [];
    return getOrders().filter(o => o.memberId === mid);
  }
  // Split orders relevant to the signed-in account into two buckets:
  //   self   — orders the viewer is the target of (their own purchases, including
  //            legacy self-orders that pre-date the operatorId field).
  //   member — orders the viewer PLACED on behalf of a different member
  //            (Member Repeat Purchase / Auto-Maintenance flow).
  // Both groups are already filtered to orders the viewer can see.
  function getOrdersForViewer() {
    const mid = getCurrentMemberId();
    if (!mid) return { self: [], member: [] };
    const all = getOrders().filter(o => o.memberId === mid || o.operatorId === mid);
    const self = all.filter(o => o.memberId === mid);
    const member = all.filter(o => o.memberId !== mid && o.operatorId === mid);
    return { self, member };
  }
  // Physically remove orders not tied to any account (pre-binding leftovers).
  function pruneOrphanOrders() {
    const orders = getOrders().filter(o => !!o.memberId);
    localStorage.setItem('al.orders', JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent('al:orderschange'));
  }
  // House account that owns guest (signed-out) orders, per market:
  // Nigeria → NG000000001, UAE → AE000000001 (the market's centerId).
  function guestHouseMemberId(country) {
    return getCountryConfig(country || DEFAULT_COUNTRY).centerId;
  }
  // Is this tab in the guest ordering flow (login page's "Shop now")? The
  // market choice itself also implies guest intent (direct ?country= links).
  function isGuestFlow() {
    try {
      return sessionStorage.getItem('al.guestMode') === '1' || !!sessionStorage.getItem('al.guestCountry');
    } catch (e) { return false; }
  }
  function addOrder(order) {
    const orders = getOrders();
    // memberId = the TARGET member (whose account "owns" the order benefits — BV, etc.)
    // operatorId = the ACCOUNT that actually placed the order (may differ from memberId
    //              when a member uses the Member Repeat Purchase / Auto-Maintenance flow
    //              to place an order on behalf of another member).
    // Guest flow: the order belongs to the market's house account — never to the
    // seeded/signed-in session (the demo seed would otherwise hijack it).
    const me = isGuestFlow() ? null : getCurrentMemberId();
    // Signed-out (guest) orders are attributed to the market's house account —
    // the country picked on the login page's guest-market chooser.
    order.country = order.country || DEFAULT_COUNTRY;
    const houseId = guestHouseMemberId(order.country);
    order.memberId = order.memberId || me || houseId;
    order.operatorId = order.operatorId || me || houseId;
    order.currency = order.currency || getCountryConfig(order.country).currency;
    orders.unshift(order);
    localStorage.setItem('al.orders', JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent('al:orderschange'));
    return order;
  }
  // Read a single order by id from the full list (works for guest orders too —
  // these are attributed to the house account GUEST_MEMBER_ID, so other members
  // won't see them via getMyOrders()).
  function getOrderById(id) {
    if (!id) return null;
    return getOrders().find(o => o.id === id) || null;
  }
  function genOrderId() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let s = '';
    for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return 'AQ-' + s;
  }

  /* ---------- Render products page ---------- */
  function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');

    const listing = document.getElementById('productListing');
    const chooser = document.getElementById('categoryChooser');

    if (cat && categories[cat]) {
      chooser.hidden = true;
      listing.hidden = false;
      document.title = `${categories[cat].label} · Elken`;

      const catTitle = document.getElementById('categoryTitle');
      const catIntro = document.getElementById('categoryIntro');
      if (catTitle) catTitle.textContent = categories[cat].label;
      if (catIntro) catIntro.textContent = categories[cat].eyebrow;

      const filtered = allProducts.filter(p => p.category === cat);
      renderProductCards(grid, filtered);
    } else {
      // No category selected: show the designer-style ranges overview,
      // hide the product grid (revealed only when a range is chosen).
      chooser.hidden = false;
      listing.hidden = true;
      document.title = 'Products · Elken';
    }
  }

  function renderProductCards(container, products) {
    if (!container) return;
    const loggedIn = !!(window.Auth && window.Auth.isLoggedIn());
    const isGuest = (() => { try { return sessionStorage.getItem('al.guestMode') === '1'; } catch (e) { return false; } })();
    container.innerHTML = products.map(p => {
      const detailUrl = `product-detail.html?name=${encodeURIComponent(p.name)}&category=${p.category}`;
      return `
      <div class="demo-product-card" data-detail="${detailUrl}">
        <div class="pic">
          <img src="assets/img/products/${p.category}/${p.img}" alt="${p.name}" loading="lazy" />
          ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}
        </div>
        <div class="body">
          <h3>${p.name}</h3>
          <p class="desc">${p.desc}</p>
          <div class="price-row">
            <span class="price">N${p.price.toLocaleString()}</span>
            ${(!isGuest && loggedIn) ? `<span class="bv-chip" title="Rewards you earn with this purchase">${getBV(p)} BV</span>` : ''}
          </div>
          <div class="card-actions">
            ${loggedIn
              ? `<button type="button" class="ek-btn ek-btn--primary ek-btn--sm ek-card-addcart-btn" data-product="${p.id}">Add to Cart</button>`
              : `<button type="button" class="ek-btn ek-btn--primary ek-btn--sm ek-buy-now-gate" data-buy-now>Buy Now</button>`}
            <a href="${detailUrl}" class="btn btn-outline btn-sm card-detail-btn">Details</a>
          </div>
        </div>
      </div>
    `;
    }).join('');

    // Wire "Add to Cart" buttons → add to cart store + toast
    container.querySelectorAll('.ek-card-addcart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.product;
        const product = allProducts.find(x => x.id === id);
        if (product && window.ProductCatalog) {
          const n = window.ProductCatalog.addToCart(product, 1);
          if (window.toast) window.toast(`${product.name} added to cart · ${n} item${n === 1 ? '' : 's'}`, 'success');
        }
      });
    });

    // Wire "Buy Now" (unlogged visitors) → open login in a new tab
    container.querySelectorAll('[data-buy-now]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.openLoginNewTab) window.openLoginNewTab();
      });
    });

    // Make the whole product card (image/title area) navigate to detail, except the action buttons
    container.querySelectorAll('.demo-product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('button, a')) return;
        const url = card.dataset.detail;
        if (url) location.href = url;
      });
    });
  }

  /* ---------- Repeat-purchase cards (standalone repeat-purchase.html /
     guest-repeat-purchase.html)
     Visual style: the product image sits inside a framed card, above a white
     body with price (+BV for members) and a full-width bottom action.
  */
  function renderRepeatPurchaseCards(container, products, opts) {
    if (!container) return;
    // opts.cartMode === 'member' → add to the independent member cart
    // (al.memberCart) instead of the shopper's main al.cart.
    const memberMode = !!(opts && opts.cartMode === 'member');
    // opts.country → format prices in that market's currency (guest flow picks
    // the market on the login page). Defaults to the legacy "N" prefix.
    const priceCountry = (opts && opts.country) || '';
    const money = n => (priceCountry && formatMoney)
      ? formatMoney(n, priceCountry)
      : ('N' + Number(n || 0).toLocaleString());
    // Optional category filter from the URL (used by member/guest footer links).
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    let list = products || [];
    if (cat) {
      const filtered = list.filter(p => p.category === cat);
      if (filtered.length) {
        list = filtered;
        const meta = categories[cat];
        if (meta) {
          document.title = `${meta.label} · Elken`;
          const secTitle = document.querySelector('.rp-sechead__title');
          if (secTitle) secTitle.textContent = meta.label;
          const secSub = document.querySelector('.rp-sechead__sub');
          if (secSub) secSub.textContent = meta.eyebrow || '';
        }
      }
    }
    // BV is a member benefit — only surface it when signed in (and never for guests).
    const loggedIn = !!(window.Auth && window.Auth.isLoggedIn && window.Auth.isLoggedIn());
    const isGuest = (() => { try { return sessionStorage.getItem('al.guestMode') === '1'; } catch (e) { return false; } })();
    container.innerHTML = list.map(p => {
      const detailUrl = `product-detail.html?name=${encodeURIComponent(p.name)}&category=${p.category}`;
      const bv = getBV(p);
      return `
      <article class="rp-product-card">
        <div class="rp-product-card__media">
          <img src="assets/img/products/${p.category}/${p.img}" alt="${p.name}" loading="lazy" />
        </div>
        <div class="rp-product-card__body">
          <h3>${p.name}</h3>
          <p class="rp-product-card__desc">${p.desc}</p>
          <div class="rp-product-card__price-row">
            <span class="rp-product-card__price">${money(p.price)}</span>
            ${!isGuest && bv > 0 ? `<span class="rp-product-card__bv" title="Bonus volume earned with this purchase">${bv} BV</span>` : ''}
          </div>
          <a href="${detailUrl}" class="rp-product-card__view">View product</a>
        </div>
        <div class="rp-product-card__foot">
          <button type="button" class="rp-product-card__add" data-rp-add="${p.id}">Add to cart</button>
        </div>
      </article>
    `;
    }).join('');

    // Wire "Add to Cart" buttons — member mode routes to al.memberCart
    container.querySelectorAll('[data-rp-add]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.rpAdd;
        // Look the product up in the list actually rendered (the passed-in
        // catalogue), not the global allProducts — a market-specific list
        // (e.g. the UAE catalogue) contains IDs the global one doesn't.
        const product = list.find(x => x.id === id);
        if (product && window.ProductCatalog) {
          const n = memberMode
            ? window.ProductCatalog.addToMemberCart(product, 1)
            : window.ProductCatalog.addToCart(product, 1);
          if (window.toast) window.toast(`${product.name} added to cart · ${n} item${n === 1 ? '' : 's'}`, 'success');
        }
      });
    });
  }

  /* ---------- Home popular tiles: category-tile style, links to detail, no order button ---------- */
  function renderPopularTiles(container, products) {
    if (!container) return;
    container.innerHTML = (products || []).map(p => {
      const detailUrl = `product-detail.html?name=${encodeURIComponent(p.name)}&category=${p.category}`;
      const price = `N${Number(p.price || 0).toLocaleString()}`;
      return `
      <a class="category-tile popular-tile" href="${detailUrl}">
        <img src="assets/img/products/${p.category}/${p.img}" alt="${p.name}" loading="lazy" />
        <span><strong>${p.name}</strong><small>${price}</small></span>
      </a>`;
    }).join('');
  }

  /* ---------- Cart badge ---------- */
  function updateCartBadge() {
    // On member-repurchase.html (body[data-cart-mode="member"]) the badge
    // reflects the independent member cart, never the shopper's main cart.
    const memberMode = (document.body && document.body.getAttribute('data-cart-mode') === 'member');
    const cart = memberMode ? getMemberCart() : getCart();
    const total = cart.reduce((s, c) => s + c.qty, 0);
    document.querySelectorAll('[id="cartFabBadge"]').forEach(badge => {
      badge.textContent = total || '';
      if (badge.classList.contains('hub-badge')) {
        badge.hidden = total === 0;
      } else {
        badge.style.display = total ? '' : 'none';
      }
    });
  }
  window.addEventListener('al:cartchange', updateCartBadge);
  window.updateCartBadge = updateCartBadge;

  /* ---------- Checkout redirect helper (guest checkout allowed) ---------- */
  function goCheckout(product) {
    const url = 'checkout.html?id=' + encodeURIComponent(product.id) + '&qty=1';
    location.href = url;
  }
  window.goCheckout = goCheckout;


  /* ---------- Member directory & referrer lookup ----------
     注册采用推荐制：新会员的国家属性由推荐人继承，用户不可手工填写。
     本模块是这条规则的共享「会员接口」——把会员 ID 解析成记录（姓名 + 国家），
     数据来源（本地演示环境）：
       1. al.members     —— 每次注册成功后写入的注册表（此后本人可作推荐人）
       2. 内置目录       —— Elken HQ 户头 + 演示会员
       3. al.memberData  —— 当前登录会员本人
       4. al.orders      —— 下过单的客户快照
     真实部署时这里对应 GET /members/{id}；查不到即推荐人无效。 */
  const MEMBERS_KEY = 'al.members';
  const MEMBER_ID_RE = /^(?:(?:NG|AE)\d{8}|NG000000001|AE000000001)$/;
  const HOUSE_ACCOUNTS = {
    'NG000000001': { name: 'Elken HQ', country: 'Nigeria' },
    'AE000000001': { name: 'Elken HQ (UAE)', country: 'UAE' },
  };
  const DEMO_MEMBERS = {
    'NG09246375': { name: 'Amara Okafor', country: 'Nigeria' },
    'NG23374876': { name: 'Fauzia Yunus Shehu', country: 'Nigeria' },
    'NG27187710': { name: 'S2 (Referrer)', country: 'Nigeria' },
    'NG66051653': { name: 'Reporting Center', country: 'Nigeria' },
    'NG48655323': { name: 'Default Order Demo', country: 'Nigeria' },
  };
  function getMemberRegistry() {
    let list = [];
    try { list = JSON.parse(localStorage.getItem(MEMBERS_KEY) || '[]'); } catch { return []; }
    if (!Array.isArray(list)) return [];
    // Self-heal: blank out junk names (e.g. a phone number typed into the name
    // field) the first time they are read, so they never surface anywhere.
    let healed = false;
    list.forEach(m => {
      if (m && m.name && !saneMemberName(m.name)) { m.name = ''; healed = true; }
    });
    if (healed) { try { localStorage.setItem(MEMBERS_KEY, JSON.stringify(list)); } catch (e) {} }
    return list;
  }
  // Persist a newly registered member so later registrations can use them as
  // a referrer (and resolve their inherited country).
  function registerMember(rec) {
    if (!rec || !rec.id) return null;
    const list = getMemberRegistry();
    const entry = {
      id: String(rec.id).trim().toUpperCase(),
      name: rec.name || '',
      country: rec.country || '',
      referrerId: rec.referrerId || '',
      joinDate: rec.joinDate || new Date().toISOString(),
    };
    const idx = list.findIndex(m => m && m.id === entry.id);
    if (idx >= 0) list[idx] = { ...list[idx], ...entry };
    else list.unshift(entry);
    try { localStorage.setItem(MEMBERS_KEY, JSON.stringify(list.slice(0, 500))); } catch (e) {}
    return entry;
  }
  // Resolve any locally-known country value ("Nigeria" / "ng" / "NG" ...) to a
  // COUNTRY_CONFIG key. Returns '' when unknown.
  function normalizeCountryName(v) {
    if (!v) return '';
    const s = String(v).trim();
    if (COUNTRY_CONFIG[s]) return s;
    const lo = s.toLowerCase();
    const hit = Object.keys(COUNTRY_CONFIG).find(k => k.toLowerCase() === lo);
    if (hit) return hit;
    const alias = { ng: 'Nigeria', nigeria: 'Nigeria', naijiria: 'Nigeria', ae: 'UAE', uae: 'UAE', 'united arab emirates': 'UAE' };
    return alias[lo] || '';
  }
  // A stored "name" that contains no letters at all is junk data — e.g. a test
  // registration that typed a phone number into the name field. Never surface
  // it as a person's name; callers fall back to the member ID instead.
  function saneMemberName(name) {
    const s = String(name || '').trim();
    if (!s) return '';
    // Must contain at least one letter (Latin / accented / CJK) to be a name.
    return /[a-zA-Z\u00C0-\u024F\u4E00-\u9FFF]/.test(s) ? s : '';
  }
  // Country implied by a member ID's market prefix (NG → Nigeria, AE → UAE).
  function countryFromMemberId(id) {
    const m = String(id || '').trim().toUpperCase().match(/^(NG|AE)/);
    if (!m) return '';
    const hit = Object.keys(COUNTRY_CONFIG).find(k => COUNTRY_CONFIG[k].memberIdPrefix === m[1]);
    return hit || '';
  }
  // Look up a member by ID → { id, name, country, source } | null.
  // This is the referrer-validity check used by the registration page.
  function lookupMember(raw) {
    const id = String(raw || '').trim().toUpperCase();
    if (!MEMBER_ID_RE.test(id)) return null;
    const reg = getMemberRegistry().find(m => m && m.id === id);
    if (reg) {
      const c = normalizeCountryName(reg.country) || countryFromMemberId(id);
      if (c) return { id, name: saneMemberName(reg.name), country: c, source: 'registry' };
    }
    const known = HOUSE_ACCOUNTS[id] || DEMO_MEMBERS[id];
    if (known) return { id, name: saneMemberName(known.name), country: normalizeCountryName(known.country), source: 'directory' };
    try {
      const md = JSON.parse(localStorage.getItem('al.memberData') || '{}');
      if (md && md.memberId === id) {
        const c = normalizeCountryName(md.country) || countryFromMemberId(id);
        if (c) return { id, name: saneMemberName(md.memberName || md.name), country: c, source: 'self' };
      }
    } catch (e) {}
    try {
      const orders = JSON.parse(localStorage.getItem('al.orders') || '[]');
      const o = orders.find(o => o && o.memberId === id);
      if (o) {
        const c = normalizeCountryName(o.country) || (o.customer && normalizeCountryName(o.customer.country)) || countryFromMemberId(id);
        if (c) return { id, name: saneMemberName(o.customer && o.customer.name), country: c, source: 'order' };
      }
    } catch (e) {}
    return null;
  }

  /* ---------- Expose globally ---------- */
  window.ProductCatalog = {
    allProducts,
    uaeProducts,
    COUNTRY_CONFIG,
    DEFAULT_COUNTRY,
    categories,
    getCountryConfig,
    getProductsByCountry,
    formatMoney,
    render: renderProducts,
    renderCards: renderProductCards,
    renderRepeatCards: renderRepeatPurchaseCards,
    renderPopularTiles,
    getOrders,
    getMyOrders,
    getOrdersForViewer,
    getOrderById,
    pruneOrphanOrders,
    addOrder,
    // Cart (market-aware: Nigeria → al.cart, UAE → al.cart.ae)
    getCart,
    getCartCount,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    currentMarket,
    cartKey,
    productMarket,
    // Member repeat-purchase cart (independent store)
    getMemberCart,
    getMemberCartCount,
    addToMemberCart,
    updateMemberCartQty,
    removeFromMemberCart,
    clearMemberCart,
    getBV,
    getBVTotal,
    genMemberId,
    genOrderId,
    getCurrentMemberId,
    // Referral / share-link binding & BV credit
    captureReferral,
    getReferral,
    clearReferral,
    getBVCredits,
    creditReferralBV,
    creditBonus,
    debitBonus,
    getReferralBVTotal,
    getReferralList,
    getMemberBVRecords,
    getEcoinCredits,
    creditEcoin,
    debitEcoin,
    getEcoinTotal,
    getMemberEcoinRecords,
    COUNTRY_CODES,
    DEFAULT_DIAL,
    phoneFieldHTML,
    readPhone,
    fillPhoneFields,
    // Member directory / referrer lookup (country inheritance)
    MEMBER_ID_RE,
    HOUSE_ACCOUNTS,
    DEMO_MEMBERS,
    getMemberRegistry,
    registerMember,
    lookupMember,
    saneMemberName,
    normalizeCountryName,
    countryFromMemberId,
    guestHouseMemberId,
    isGuestFlow,
  };

  /* ---------- Init on DOM ready ---------- */
  captureReferral();
  updateCartBadge();
  if (document.body.dataset.page === 'products') {
    document.addEventListener('DOMContentLoaded', renderProducts);
  }

  /* ---------- Listen for language changes & auth changes ---------- */
  window.addEventListener('al:langchange', renderProducts);
  window.addEventListener('al:authchange', renderProducts);

})();
