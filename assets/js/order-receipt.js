/* =============================================================================
   Order receipt (小票) — shared downloader for every order-detail surface.

   Loaded by order.html, shipping.html and account.html so a single
   implementation produces the receipt everywhere, including for **guest
   orders** (no memberId / no logged-in user) reached through the shareable
   order link.

   Contract:
     window.OrderReceipt.build(order, opts)    -> receipt document HTML string
     window.OrderReceipt.filename(order)       -> suggested file name
     window.OrderReceipt.download(order, opts) -> triggers the download

   opts.showBV  force the BV row on/off. Defaults to "only when signed in",
   matching the site-wide rule that BV is never disclosed to visitors
   (visitor orders credit the referrer instead).

   NOTE: this file exports a downloaded Word-compatible document, so it uses
   literal colours / pt sizes on purpose — the token-only CSS rule applies to
   the site stylesheets, not to this generated artifact.
   ============================================================================= */
(function () {
  'use strict';

  var BRAND = 'Elken Nigeria';
  var BRAND_ACCENT = '#202259';
  var MUTED = '#6b7280';
  var LINE = '#d8dbe6';
  var SOFT = '#f4f5f7';

  var PAY_LABELS = {
    card: 'Debit Card',
    ussd: 'USSD',
    bank: 'Bank Transfer',
    paybank: 'Pay with Bank',
    visaqr: 'Pay with Visa QR',
    balance: 'Account Balance',
    // legacy values kept readable on older stored orders
    cod: 'Cash on delivery',
    transfer: 'Bank Transfer',
    cash: 'Cash',
    account: 'Account Balance'
  };

  var PICKUP_LOCATIONS = {
    lagos: { name: 'Lagos HQ', addr: '12B Admiralty Way, Lekki Phase 1' },
    abuja: { name: 'Abuja branch', addr: 'Plot 24, Wuse Zone 5' },
    ph: { name: 'Port Harcourt branch', addr: '5 Aba Road, GRA Phase 2' }
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function num(v, fb) {
    var n = Number(v);
    return isFinite(n) ? n : (fb || 0);
  }

  function money(n) {
    return num(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function qty(n) {
    return String(num(n, 1)).replace(/\.0+$/, '');
  }

  function symbol(currency) {
    var m = { NGN: 'N', USD: '$', EUR: '€', GBP: '£', CNY: '¥', KES: 'KSh', GHS: 'GH₵' };
    return m[currency] || 'N';
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function stamp(ts) {
    var d = ts ? new Date(ts) : null;
    if (!d || isNaN(d.getTime())) return null;
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
      ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  }

  function dateOnly(ts) {
    var full = stamp(ts);
    return full ? full.slice(0, 10) : null;
  }

  function bvOf(item) {
    if (typeof item.bv === 'number') return item.bv;
    if (item.bvString !== undefined && item.bvString !== null && item.bvString !== '') return num(item.bvString);
    if (typeof item.price === 'number') return Math.round(item.price / 1000) * num(item.qty, 1);
    var derived = (window.ProductCatalog && window.ProductCatalog.getBV);
    if (typeof derived === 'function') { try { return num(derived(item)); } catch (e) {} }
    return 0;
  }

  function taxRateOf(order) {
    if (typeof order.taxRate === 'number') return order.taxRate;
    var first = (order.items && order.items[0]) || {};
    if (typeof first.taxRate === 'number') return first.taxRate;
    return 0.075;
  }

  function codeOf(item) {
    return String(item.code || item.sku || (item.id && String(item.id).length < 12 ? item.id : '') || '').toUpperCase();
  }

  function isSignedIn() {
    return !!(window.Auth && typeof window.Auth.isLoggedIn === 'function' && window.Auth.isLoggedIn());
  }

  /* ---------- Resolve everything the receipt needs, guest-safe ---------- */
  function model(order, opts) {
    order = order || {};
    opts = opts || {};
    var pc = window.ProductCatalog || {};
    var user = (window.Auth && window.Auth.user) || {};
    var memberData = {};
    try { memberData = JSON.parse(localStorage.getItem('al.memberData') || '{}') || {}; } catch (e) { memberData = {}; }
    var profile = {};
    if (window.AL && typeof window.AL.loadProfile === 'function') {
      try { profile = window.AL.loadProfile() || {}; } catch (e) { profile = {}; }
    }

    var cust = order.customer || {};
    var deliv = order.delivery || {};
    var items = (order.items && order.items.length) ? order.items : [];
    var currency = order.currency || 'NGN';
    var sym = symbol(currency);
    var rate = taxRateOf(order);
    var isPickup = deliv.method === 'pickup';

    var memberId = order.memberId || user.memberId || memberData.memberId || '';
    var memberName = order.memberName || cust.name || user.name || user.fullName ||
      memberData.memberName || profile.name || '';

    var address = isPickup
      ? (function () {
        var loc = PICKUP_LOCATIONS[deliv.pickupLoc] || PICKUP_LOCATIONS.lagos;
        return 'Self pick-up · ' + loc.name + ' · ' + loc.addr;
      })()
      : [cust.address, cust.city, cust.state].filter(Boolean).join(', ');

    var lines = [];
    var subtotal = 0;
    var sumBV = 0;
    var totalQty = 0;

    items.forEach(function (it) {
      var q = num(it.qty, 1);
      var price = num(it.price);
      var amount = q * price;
      subtotal += amount;
      totalQty += q;
      sumBV += q * num(bvOf(it));
      lines.push({
        code: codeOf(it),
        name: it.name || 'Product',
        qty: q,
        price: price,
        amount: amount,
        tax: typeof it.taxAmount === 'number' ? it.taxAmount : amount * rate
      });
    });

    var tax = lines.reduce(function (s, l) { return s + l.tax; }, 0);
    var total = subtotal + tax;
    var showBV = (opts.showBV != null) ? !!opts.showBV : isSignedIn();

    var placedTs = order.date || order.createdAt || order.placeTime || null;

    return {
      id: order.id || '',
      currency: currency,
      sym: sym,
      rate: rate,
      ratePct: (rate * 100).toFixed(2).replace(/\.?0+$/, '') + '%',
      lines: lines,
      totalQty: totalQty,
      subtotal: subtotal,
      tax: tax,
      total: total,
      showBV: showBV,
      bv: order.bv != null ? num(order.bv) : sumBV,
      referrerId: order.referrerId || null,
      memberId: memberId,
      memberName: memberName,
      isGuest: !memberId,
      recipient: cust.name || memberName || '',
      phone: cust.phone || user.mobile || memberData.mobile || '',
      email: cust.email || '',
      address: address,
      country: order.country || cust.country || 'Nigeria',
      isPickup: isPickup,
      payMethod: order.paymentLabel || PAY_LABELS[order.payment] || order.payment || '',
      payReference: order.paymentReference || '',
      status: String(order.status || 'pending').toUpperCase(),
      payStatus: String(order.payStatus || order.status || 'pending').toUpperCase(),
      placed: stamp(placedTs),
      paid: stamp(order.paidAt),
      placedDate: dateOnly(placedTs) || dateOnly(Date.now()),
      generated: stamp(Date.now())
    };
  }

  function metaRow(label, value) {
    return '<tr>' +
      '<td style="padding:3pt 0;width:26%;color:' + MUTED + ';font-size:9pt;">' + esc(label) + '</td>' +
      '<td style="padding:3pt 0;font-weight:bold;">' + esc(value || '—') + '</td>' +
      '</tr>';
  }

  function totalsRow(label, value, strong) {
    return '<tr>' +
      '<td style="padding:2pt 0;color:' + (strong ? BRAND_ACCENT : MUTED) + ';font-size:' + (strong ? '13pt' : '10pt') + ';' +
      (strong ? 'font-weight:bold;padding-top:6pt;' : '') + '">' + esc(label) + '</td>' +
      '<td style="padding:2pt 0;text-align:right;font-weight:bold;font-size:' + (strong ? '13pt' : '10pt') + ';' +
      (strong ? 'padding-top:6pt;' : '') + '">' + esc(value) + '</td>' +
      '</tr>';
  }

  function build(order, opts) {
    var m = model(order, opts);

    var itemRows = m.lines.length ? m.lines.map(function (l, i) {
      return '<tr>' +
        '<td style="padding:6pt 4pt;border-bottom:1pt solid ' + LINE + ';color:' + MUTED + ';font-size:9pt;">' + (i + 1) + '</td>' +
        '<td style="padding:6pt 4pt;border-bottom:1pt solid ' + LINE + ';">' +
          (l.code ? '<span style="color:' + MUTED + ';font-size:8.5pt;">' + esc(l.code) + '</span> ' : '') + esc(l.name) +
        '</td>' +
        '<td style="padding:6pt 4pt;border-bottom:1pt solid ' + LINE + ';text-align:center;">' + esc(qty(l.qty)) + '</td>' +
        '<td style="padding:6pt 4pt;border-bottom:1pt solid ' + LINE + ';text-align:right;">' + esc(m.sym + money(l.price)) + '</td>' +
        '<td style="padding:6pt 4pt;border-bottom:1pt solid ' + LINE + ';text-align:right;font-weight:bold;">' + esc(m.sym + money(l.amount)) + '</td>' +
        '</tr>';
    }).join('') : '<tr><td colspan="5" style="padding:8pt 4pt;color:' + MUTED + ';">No line items recorded for this order.</td></tr>';

    var bvRow = m.showBV
      ? totalsRow('BV earned', '+' + m.bv + ' BV')
      : (m.referrerId ? totalsRow('BV credited to', m.referrerId) : '');

    return '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
      'xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">\n' +
      '<head>\n' +
      '  <meta charset="utf-8">\n' +
      '  <title>Order receipt ' + esc(m.id) + '</title>\n' +
      '  <!--[if gte mso 9]>\n' +
      '  <xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom>' +
      '<w:DoNotOptimizeForBrowser/></w:WordDocument></xml>\n' +
      '  <![endif]-->\n' +
      '  <style>\n' +
      '    @page { size: A4; margin: 18mm 16mm; }\n' +
      '    body { font-family: Arial, Helvetica, sans-serif; font-size: 10.5pt; color: ' + BRAND_ACCENT + '; }\n' +
      '    table { border-collapse: collapse; width: 100%; }\n' +
      '    .rule { border-top: 2pt solid ' + BRAND_ACCENT + '; }\n' +
      '    .hair { border-top: 1pt solid ' + LINE + '; }\n' +
      '  </style>\n' +
      '</head>\n<body>\n' +
      '<div>' +

      // ---- Brand header ----
      '<table><tr>' +
        '<td style="vertical-align:top;">' +
          '<div style="font-size:17pt;font-weight:bold;letter-spacing:2pt;">ELKEN</div>' +
          '<div style="font-size:8.5pt;letter-spacing:3pt;color:' + MUTED + ';">NIGERIA</div>' +
          '<div style="margin-top:6pt;font-size:9pt;color:' + MUTED + ';">' + esc(BRAND) +
            ' · Supplements, skincare &amp; water filters</div>' +
        '</td>' +
        '<td style="vertical-align:top;text-align:right;">' +
          '<div style="font-size:15pt;font-weight:bold;letter-spacing:1pt;">ORDER RECEIPT</div>' +
          '<div style="margin-top:6pt;font-size:9pt;color:' + MUTED + ';">Order No. <b>' + esc(m.id || '—') + '</b></div>' +
          '<div style="font-size:9pt;color:' + MUTED + ';">Issued ' + esc(m.generated || m.placedDate || '') + '</div>' +
        '</td>' +
      '</tr></table>' +

      '<div class="rule" style="margin-top:10pt;"></div>' +

      // ---- Order meta ----
      '<table style="margin-top:10pt;"><tr>' +
        '<td style="vertical-align:top;padding-right:12pt;width:50%;">' +
          '<table>' +
            metaRow('Order No.', m.id) +
            metaRow('Placed', m.placed || m.placedDate) +
            metaRow('Paid', m.paid || 'Not yet paid') +
            metaRow('Order status', m.status) +
          '</table>' +
        '</td>' +
        '<td style="vertical-align:top;width:50%;">' +
          '<table>' +
            metaRow('Payment method', m.payMethod) +
            metaRow('Payment status', m.payStatus) +
            metaRow('Reference', m.payReference || '—') +
            metaRow('Currency', m.currency) +
          '</table>' +
        '</td>' +
      '</tr></table>' +

      '<div class="hair" style="margin-top:12pt;"></div>' +

      // ---- Customer / member ----
      '<table style="margin-top:10pt;"><tr>' +
        '<td style="vertical-align:top;padding-right:12pt;width:50%;">' +
          '<div style="font-size:8.5pt;letter-spacing:1pt;color:' + MUTED + ';font-weight:bold;">' +
            (m.isPickup ? 'COLLECTED BY' : 'DELIVER TO') + '</div>' +
          '<div style="margin-top:4pt;font-weight:bold;">' + esc(m.recipient || 'Guest') + '</div>' +
          '<div style="font-size:9.5pt;color:' + MUTED + ';">' + esc(m.phone || 'No phone on file') + '</div>' +
          '<div style="font-size:9.5pt;color:' + MUTED + ';">' + esc(m.address || 'No address provided') + '</div>' +
          '<div style="font-size:9.5pt;color:' + MUTED + ';">' + esc(m.country) + '</div>' +
        '</td>' +
        '<td style="vertical-align:top;width:50%;">' +
          '<div style="font-size:8.5pt;letter-spacing:1pt;color:' + MUTED + ';font-weight:bold;">MEMBER</div>' +
          '<div style="margin-top:4pt;font-weight:bold;">' + esc(m.memberId || 'Not registered (guest order)') + '</div>' +
          '<div style="font-size:9.5pt;color:' + MUTED + ';">' + esc(m.memberName || 'Guest') + '</div>' +
          (m.email ? '<div style="font-size:9.5pt;color:' + MUTED + ';">' + esc(m.email) + '</div>' : '') +
        '</td>' +
      '</tr></table>' +

      // ---- Items ----
      '<div style="margin-top:14pt;font-size:8.5pt;letter-spacing:1pt;color:' + MUTED + ';font-weight:bold;">ITEMS</div>' +
      '<table style="margin-top:4pt;">' +
        '<tr style="background:' + SOFT + ';">' +
          '<td style="padding:6pt 4pt;font-size:8.5pt;letter-spacing:1pt;color:' + MUTED + ';font-weight:bold;width:6%;">#</td>' +
          '<td style="padding:6pt 4pt;font-size:8.5pt;letter-spacing:1pt;color:' + MUTED + ';font-weight:bold;">PRODUCT</td>' +
          '<td style="padding:6pt 4pt;font-size:8.5pt;letter-spacing:1pt;color:' + MUTED + ';font-weight:bold;text-align:center;width:10%;">QTY</td>' +
          '<td style="padding:6pt 4pt;font-size:8.5pt;letter-spacing:1pt;color:' + MUTED + ';font-weight:bold;text-align:right;width:18%;">UNIT PRICE</td>' +
          '<td style="padding:6pt 4pt;font-size:8.5pt;letter-spacing:1pt;color:' + MUTED + ';font-weight:bold;text-align:right;width:20%;">AMOUNT</td>' +
        '</tr>' +
        itemRows +
      '</table>' +

      // ---- Totals ----
      '<table style="margin-top:8pt;"><tr>' +
        '<td style="width:55%;"></td>' +
        '<td style="vertical-align:top;">' +
          '<table>' +
            totalsRow('Subtotal (' + m.totalQty + ' item' + (m.totalQty === 1 ? '' : 's') + ')', m.sym + money(m.subtotal)) +
            totalsRow('Tax (' + m.ratePct + ')', m.sym + money(m.tax)) +
            bvRow +
            totalsRow('TOTAL', m.sym + money(m.total), true) +
          '</table>' +
        '</td>' +
      '</tr></table>' +

      '<div class="rule" style="margin-top:12pt;"></div>' +

      // ---- Footer ----
      '<p style="margin-top:10pt;font-size:8.5pt;color:' + MUTED + ';">' +
        'This receipt is generated from your browser copy of the order record. ' +
        'Keep it for warranty and bonus (BV) enquiries — quote Order No. <b>' + esc(m.id || '—') + '</b>.' +
      '</p>' +
      '<p style="font-size:8.5pt;color:' + MUTED + ';">' +
        esc(BRAND) + ' · hello@elkenafrica.com · Lagos HQ, 12B Admiralty Way, Lekki Phase 1' +
      '</p>' +

      '</div>\n</body>\n</html>';
  }

  function filename(order) {
    var id = String((order && order.id) || '').replace(/[^A-Za-z0-9_-]/g, '_') || 'order';
    return 'receipt_' + id + '.doc';
  }

  function download(order, opts) {
    if (!order) return false;
    var html = build(order, opts);
    var name = filename(order);
    var blob = new Blob(['\ufeff' + html], { type: 'application/msword;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { try { URL.revokeObjectURL(url); } catch (e) {} }, 3000);
    if (window.toast) window.toast('Receipt downloaded · ' + name, 'success');
    return true;
  }

  window.OrderReceipt = {
    build: build,
    model: model,
    filename: filename,
    download: download,
    PAY_LABELS: PAY_LABELS
  };
})();
