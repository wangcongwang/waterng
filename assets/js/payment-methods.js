/* ---------------------------------------------------------------------------
   payment-methods.js — shared payment-method layer for every order flow.

   Implements the Nigeria "Online Payment Processing Guide":
     Debit Card · USSD · Bank Transfer · Pay with Bank · Pay with Visa QR
     (+ Account Balance, retained from the existing member wallet)

   Used by: checkout.html, signup.html, member-welcome.html,
            member-repurchase.html, member-auto-maintenance.html

   Public API
     PayMethods.methods(opts)            -> ordered method descriptors
     PayMethods.renderGrid(el, opts)     -> build the method chooser
     PayMethods.mount(el, kind, ctx)     -> build one method panel; returns a handle
                                            { kind, refresh(), isComplete(), reference, value() }
     PayMethods.label(value)             -> display label for a stored value
     PayMethods.reference()              -> new payment/transaction reference
     PayMethods.money(n)                 -> "N25,000"
   --------------------------------------------------------------------------- */
(function (global) {
  'use strict';

  const MERCHANT = 'Elken Nigeria Ltd';
  const CURRENCY = 'NGN';

  /* --- Display labels, keyed by stored order value ---------------------- */
  const LABELS = {
    card: 'Debit Card',
    ussd: 'USSD',
    bank: 'Bank Transfer',
    paybank: 'Pay with Bank',
    visaqr: 'Pay with Visa QR',
    balance: 'Account Balance',
    // legacy values still readable on older stored orders
    cod: 'Cash on delivery',
    transfer: 'Bank Transfer',
    cash: 'Cash',
    account: 'Account Balance'
  };

  /* Verbatim customer-facing messages from the guide. */
  const PHRASES = {
    failed: 'Payment was unsuccessful. Please try again or select another payment method.',
    notCompleted: 'Payment was not completed. Please try again or select another payment method.'
  };

  /* --- Icons ------------------------------------------------------------ */
  const ICONS = {
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
    ussd: '<rect x="6" y="2" width="12" height="20" rx="2"/><circle cx="12" cy="18" r="1"/>',
    bank: '<path d="M3 10l9-6 9 6"/><path d="M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18"/>',
    paybank: '<path d="M12 2l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V5z"/><path d="M9 12l2 2 4-4"/>',
    visaqr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v0M14 21h0M17 21h4v-4"/>',
    balance: '<path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v0"/><rect x="1" y="6" width="22" height="12" rx="2"/><circle cx="16" cy="12" r="2"/>'
  };

  /* --- Payment method catalogue ----------------------------------------
     `value` is what gets persisted on the order; the order below is the
     order the guide lists them in. */
  const CATALOGUE = [
    { value: 'card', key: 'debit_card', name: 'Debit Card', sub: 'Visa · Mastercard · Verve' },
    { value: 'ussd', key: 'ussd', name: 'USSD', sub: 'Dial a code from your phone' },
    { value: 'bank', key: 'bank_transfer', name: 'Bank Transfer', sub: 'Auto-verified · no receipt' },
    { value: 'paybank', key: 'pay_with_bank', name: 'Pay with Bank', sub: 'Authorise in your bank app' },
    { value: 'visaqr', key: 'visa_qr', name: 'Pay with Visa QR', sub: 'Scan with a banking app' }
  ];

  const BALANCE_METHOD = {
    value: 'balance',
    key: 'account_balance',
    name: 'Account Balance',
    sub: 'Pay with your Ecoin balance'
  };

  /* --- USSD channels (banks exposing a USSD payment code) --------------- */
  const USSD_BANKS = [
    { name: 'GTBank', code: '*737#' },
    { name: 'Access Bank', code: '*901#' },
    { name: 'Zenith Bank', code: '*966#' },
    { name: 'First Bank', code: '*894#' },
    { name: 'UBA', code: '*919#' },
    { name: 'Union Bank', code: '*826#' },
    { name: 'Fidelity Bank', code: '*770#' },
    { name: 'FCMB', code: '*329#' },
    { name: 'Stanbic IBTC', code: '*909#' },
    { name: 'Sterling Bank', code: '*822#' },
    { name: 'Wema Bank', code: '*945#' },
    { name: 'Polaris Bank', code: '*833#' },
    { name: 'Keystone Bank', code: '*7111#' },
    { name: 'Unity Bank', code: '*7799#' },
    { name: 'Ecobank', code: '*326#' },
    { name: 'Providus Bank', code: '*6111#' }
  ];

  /* --- Banks reachable through the "Pay with Bank" gateway handoff ------ */
  const PARTICIPATING_BANKS = [
    'Access Bank', 'Citibank', 'Ecobank', 'Fidelity Bank', 'First Bank', 'FCMB',
    'Globus Bank', 'GTBank', 'Heritage Bank', 'Keystone Bank', 'Kuda', 'Moniepoint',
    'OPay', 'PalmPay', 'Parallex Bank', 'Polaris Bank', 'Providus Bank', 'Sparkle',
    'Stanbic IBTC', 'Standard Chartered', 'Sterling Bank', 'Suntrust Bank',
    'Titan Trust Bank', 'UBA', 'Union Bank', 'Unity Bank', 'Wema Bank', 'Zenith Bank'
  ];

  /* --- Settlement accounts offered for a bank transfer ------------------ */
  const SETTLEMENT_ACCOUNTS = [
    { bank: 'GTBank Plc', account: '0123456789' },
    { bank: 'Access Bank Plc', account: '0698745213' },
    { bank: 'Zenith Bank Plc', account: '1013579246' },
    { bank: 'Providus Bank', account: '9904312785' }
  ];

  const TRANSFER_WINDOW_MS = 30 * 60 * 1000;   // guide: "Expiry time, where applicable"
  const QR_WINDOW_MS = 10 * 60 * 1000;

  /* --- Helpers ---------------------------------------------------------- */
  function tr(key, fallback) {
    if (global.T && typeof global.T.tr === 'function') {
      const v = global.T.tr(key);
      if (v && v !== key) return v;
    }
    return fallback;
  }

  function money(n) {
    const value = Number(n) || 0;
    try { return 'N' + value.toLocaleString('en-NG'); }
    catch (e) { return 'N' + value.toLocaleString(); }
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Order/payment reference — the "order/reference number" the guide asks
     the system to generate. Unambiguous alphabet (no O/0, I/1). */
  function reference() {
    const alphabet = 'ACDEFGHJKLMNPQRSTUVWXY23456789';
    let tail = '';
    for (let i = 0; i < 6; i++) tail += alphabet[Math.floor(Math.random() * alphabet.length)];
    return 'AQ-' + tail;
  }

  function pick(list, seed) {
    return list[Math.abs(seed) % list.length];
  }

  function seeded(str) {
    let h = 0;
    const s = String(str);
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100000;
    return h;
  }

  function initials(name) {
    return String(name).split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  }

  /* "GTBank" -> "*737*000*25000*AQA1B2C3#" (amount in naira, no separators) */
  function ussdCode(bank, amount, ref) {
    const base = String(bank.code).replace(/#$/, '');
    const amt = String(Math.round(Number(amount) || 0));
    return base + '*000*' + amt + '*' + String(ref).replace(/-/g, '') + '#';
  }

  function isMobile() {
    return /Android|iPhone|iPad|iPod|Mobile/i.test(global.navigator ? global.navigator.userAgent : '');
  }

  function copy(text, button) {
    const done = () => {
      if (!button) return;
      const original = button.getAttribute('data-label') || button.textContent;
      button.setAttribute('data-label', original);
      button.textContent = 'Copied';
      button.classList.add('is-copied');
      setTimeout(() => {
        button.textContent = original;
        button.classList.remove('is-copied');
      }, 1600);
    };
    if (global.navigator && global.navigator.clipboard && global.navigator.clipboard.writeText) {
      global.navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      done();
    } catch (e) { /* clipboard unavailable — the value stays visible/selectable */ }
  }

  /* --- Method chooser --------------------------------------------------- */
  function methods(opts) {
    const o = opts || {};
    const list = CATALOGUE.slice();
    if (o.includeBalance) {
      list.push(Object.assign({}, BALANCE_METHOD, {
        name: o.balanceName || BALANCE_METHOD.name,
        sub: o.balanceSub || BALANCE_METHOD.sub,
        amountId: o.balanceAmountId || null
      }));
    }
    return list;
  }

  function renderGrid(host, opts) {
    if (!host) return null;
    const o = opts || {};
    const name = o.name || 'payMethod';
    const html = methods(o).map(m => {
      const checked = m.value === o.selected ? ' checked' : '';
      const nameInner = m.amountId
        ? esc(m.name) + ' <span class="pay-method-amount">(NGN <span id="' + esc(m.amountId) + '">0</span>)</span>'
        : esc(m.name);
      const subId = m.value === 'balance' && o.balanceSubId ? ' id="' + esc(o.balanceSubId) + '"' : '';
      const labelId = m.value === 'balance' && o.balanceLabelId ? ' id="' + esc(o.balanceLabelId) + '"' : '';
      return '' +
        '<label class="pay-method"' + labelId + '>' +
        '<input type="radio" name="' + esc(name) + '" value="' + esc(m.value) + '"' + checked + ' />' +
        '<div class="pay-method-icon" aria-hidden="true">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
        'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + ICONS[m.value] + '</svg>' +
        '</div>' +
        '<div class="pay-method-body">' +
        '<div class="pay-method-name" data-i18n="payment.' + esc(m.key) + '">' + nameInner + '</div>' +
        '<div class="pay-method-sub"' + subId + ' data-i18n="payment.' + esc(m.key) + '_sub">' + esc(m.sub) + '</div>' +
        '</div>' +
        '<div class="pay-method-check" aria-hidden="true">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">' +
        '<path d="M5 12l5 5L20 7"/></svg>' +
        '</div>' +
        '</label>';
    }).join('');
    host.innerHTML = html;
    return host;
  }

  /* --- Panel mounters --------------------------------------------------- */
  function bankRows(rows) {
    return '<div class="bank-rows pm-rows">' + rows.map(r =>
      '<div class="bank-row"><span>' + esc(r[0]) + '</span><b' + (r[2] ? ' class="pm-mono"' : '') + '>' + r[1] + '</b></div>'
    ).join('') + '</div>';
  }

  function countdown(deadline) {
    const left = deadline - Date.now();
    if (left <= 0) return { text: 'Expired', expired: true };
    const total = Math.floor(left / 1000);
    const mm = String(Math.floor(total / 60)).padStart(2, '0');
    const ss = String(total % 60).padStart(2, '0');
    return { text: mm + ':' + ss, expired: false };
  }

  /* Shared ticker so several panels can share one interval. */
  const tickers = [];
  function addTicker(fn) {
    tickers.push(fn);
    if (tickers.length === 1) {
      setInterval(() => tickers.forEach(f => { try { f(); } catch (e) { /* keep ticking */ } }), 1000);
    }
  }

  /* --- Debit Card ------------------------------------------------------- */
  function mountCard(el, ctx) {
    el.innerHTML = '' +
      '<h2 class="pm-title" data-i18n="checkout.card_title">Card details</h2>' +
      '<p data-i18n="checkout.secure_note">Secured by Paystack · 256-bit encryption · PCI-DSS Level 1</p>' +
      '<div class="field">' +
      '<label data-i18n="checkout.card_number">Card number</label>' +
      '<div class="card-input-wrap">' +
      '<input class="ek-input" id="' + ctx.prefix + 'CardNumber" placeholder="4242 4242 4242 4242" ' +
      'maxlength="19" inputmode="numeric" autocomplete="cc-number" />' +
      '<div class="card-brand" id="' + ctx.prefix + 'CardBrand" aria-hidden="true"></div>' +
      '</div></div>' +
      '<div class="field">' +
      '<label data-i18n="checkout.card_name">Cardholder name</label>' +
      '<input class="ek-input" id="' + ctx.prefix + 'CardName" autocomplete="cc-name" />' +
      '</div>' +
      '<div class="row">' +
      '<div class="field">' +
      '<label data-i18n="checkout.card_expiry">Expiry (MM/YY)</label>' +
      '<input class="ek-input" id="' + ctx.prefix + 'CardExpiry" placeholder="12/27" maxlength="5" ' +
      'inputmode="numeric" autocomplete="cc-exp" />' +
      '</div>' +
      '<div class="field">' +
      '<label data-i18n="checkout.card_cvv">CVV</label>' +
      '<input class="ek-input" id="' + ctx.prefix + 'CardCvv" placeholder="123" maxlength="4" ' +
      'inputmode="numeric" autocomplete="cc-csc" />' +
      '</div></div>' +
      '<p class="pm-note" data-i18n="payment.card_auth_note">Your bank may ask you to confirm this ' +
      'payment with an OTP, PIN or in-app approval before it is authorised.</p>';

    const num = el.querySelector('#' + ctx.prefix + 'CardNumber');
    const brand = el.querySelector('#' + ctx.prefix + 'CardBrand');
    const name = el.querySelector('#' + ctx.prefix + 'CardName');
    const exp = el.querySelector('#' + ctx.prefix + 'CardExpiry');
    const cvv = el.querySelector('#' + ctx.prefix + 'CardCvv');

    let valid = false;
    const validate = () => {
      valid = num.value.replace(/\s/g, '').length >= 13
        && name.value.trim().length >= 2
        && /^\d{2}\/\d{2}$/.test(exp.value)
        && cvv.value.length >= 3;
      if (ctx.onChange) ctx.onChange();
      return valid;
    };

    num.addEventListener('input', () => {
      const v = num.value.replace(/\D/g, '').slice(0, 16);
      num.value = v.replace(/(.{4})/g, '$1 ').trim();
      brand.className = 'card-brand';
      if (/^4/.test(v)) brand.classList.add('visa');
      else if (/^(5[1-5]|2[2-7])/.test(v)) brand.classList.add('mc');
      else if (/^(506[01]|650)/.test(v)) brand.classList.add('verve');
      else if (/^3[47]/.test(v)) brand.classList.add('amex');
      validate();
    });
    name.addEventListener('input', validate);
    exp.addEventListener('input', () => {
      let v = exp.value.replace(/\D/g, '').slice(0, 4);
      if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
      exp.value = v;
      validate();
    });
    cvv.addEventListener('input', () => {
      cvv.value = cvv.value.replace(/\D/g, '').slice(0, 4);
      validate();
    });

    return {
      kind: 'card',
      reference: ctx.reference,
      isComplete: () => valid,
      value: () => (num.value.replace(/\s/g, '').slice(-4) || null),
      refresh: () => validate()
    };
  }

  /* --- USSD ------------------------------------------------------------- */
  function mountUssd(el, ctx) {
    const selected = { bank: null };
    const listId = ctx.prefix + 'UssdBanks';

    el.innerHTML = '' +
      '<h2 class="pm-title" data-i18n="checkout.ussd_title">Pay via USSD</h2>' +
      '<p data-i18n="payment.ussd_lead">Select your bank. We will show the exact code to dial from ' +
      'the phone number linked to your bank account.</p>' +
      '<div class="pm-bank-list" id="' + listId + '" role="radiogroup" ' +
      'aria-label="Choose your bank"></div>' +
      '<div class="pm-ussd-result" hidden>' +
      '<div class="pm-code-row">' +
      '<div class="ussd-code" data-pm="code">—</div>' +
      '<button type="button" class="ek-btn ek-btn--ghost pm-copy" data-pm="copy">Copy code</button>' +
      '</div>' +
      '<ol class="pm-steps">' +
      '<li>Dial the code above from the phone number registered to your bank account.</li>' +
      '<li>Follow your bank&rsquo;s prompts to confirm the amount and merchant.</li>' +
      '<li>Authorise the transaction with your bank PIN or the authentication your bank requires.</li>' +
      '</ol>' +
      '<p class="pm-note" data-i18n="payment.ussd_note">The payment gateway confirms the transaction ' +
      'automatically — this page updates as soon as your bank reports it as paid.</p>' +
      '</div>';

    const list = el.querySelector('#' + listId);
    const result = el.querySelector('.pm-ussd-result');
    const codeEl = el.querySelector('[data-pm="code"]');
    const copyBtn = el.querySelector('[data-pm="copy"]');

    list.innerHTML = USSD_BANKS.map(b =>
      '<button type="button" class="pm-bank" data-bank="' + esc(b.name) + '">' +
      '<span class="pm-bank-name">' + esc(b.name) + '</span>' +
      '<span class="pm-bank-code">' + esc(b.code) + '</span>' +
      '</button>').join('');

    const painted = () => {
      if (!selected.bank) return;
      codeEl.textContent = ussdCode(selected.bank, ctx.amount(), ctx.reference);
    };

    list.addEventListener('click', (e) => {
      const btn = e.target.closest('.pm-bank');
      if (!btn) return;
      list.querySelectorAll('.pm-bank').forEach(b => b.classList.toggle('is-selected', b === btn));
      selected.bank = USSD_BANKS.find(b => b.name === btn.dataset.bank) || null;
      result.hidden = false;
      painted();
      if (ctx.onChange) ctx.onChange();
    });

    copyBtn.addEventListener('click', () => copy(codeEl.textContent, copyBtn));

    return {
      kind: 'ussd',
      reference: ctx.reference,
      isComplete: () => !!selected.bank,
      value: () => (selected.bank ? selected.bank.name : null),
      refresh: painted
    };
  }

  /* --- Bank Transfer ---------------------------------------------------- */
  function mountBankTransfer(el, ctx) {
    const seed = seeded(ctx.reference);
    const account = pick(SETTLEMENT_ACCOUNTS, seed);
    const deadline = Date.now() + TRANSFER_WINDOW_MS;

    el.innerHTML = '' +
      '<h2 class="pm-title" data-i18n="checkout.bank_title">Bank transfer details</h2>' +
      '<p data-i18n="payment.transfer_lead">Transfer the exact amount below from your bank app or ' +
      'internet banking. Use the reference shown so we can match your payment.</p>' +
      bankRows([
        ['Bank Name', esc(account.bank)],
        ['Account Name', esc(MERCHANT)],
        ['Account Number', '<span class="pm-mono">' + esc(account.account) + '</span>', true],
        ['Amount', '<span class="pm-mono" data-pm="amount">' + esc(money(ctx.amount())) + '</span>', true],
        ['Transaction/Payment Reference', '<span class="pm-mono">' + esc(ctx.reference) + '</span>', true],
        ['Expires in', '<span class="pm-mono" data-pm="expiry">30:00</span>', true]
      ]) +
      '<div class="pm-actions">' +
      '<button type="button" class="ek-btn ek-btn--ghost" data-pm="copy-account">Copy account number</button>' +
      '<button type="button" class="ek-btn ek-btn--ghost" data-pm="copy-ref">Copy reference</button>' +
      '</div>' +
      '<p class="pm-note pm-note--important" data-i18n="payment.transfer_note">' +
      'Important: your transfer is verified automatically by the payment gateway. ' +
      'You do not need to upload a receipt — the order is marked as paid once the funds arrive.</p>' +
      '<p class="pm-status" data-pm="status" hidden></p>';

    const expiryEl = el.querySelector('[data-pm="expiry"]');
    const amountEl = el.querySelector('[data-pm="amount"]');
    const statusEl = el.querySelector('[data-pm="status"]');
    el.querySelector('[data-pm="copy-account"]').addEventListener('click', function () {
      copy(account.account, this);
    });
    el.querySelector('[data-pm="copy-ref"]').addEventListener('click', function () {
      copy(ctx.reference, this);
    });

    let expired = false;
    addTicker(() => {
      const c = countdown(deadline);
      if (c.text === expiryEl.textContent) return;
      expiryEl.textContent = c.text;
      if (c.expired && !expired) {
        expired = true;
        expiryEl.classList.add('is-expired');
        statusEl.hidden = false;
        statusEl.textContent = 'This transfer reference has expired. A fresh reference is issued when you place the order again.';
        statusEl.classList.add('is-warning');
        if (ctx.onChange) ctx.onChange();
      }
    });

    return {
      kind: 'bank',
      reference: ctx.reference,
      isComplete: () => !expired,
      value: () => account.bank,
      refresh: () => { amountEl.textContent = money(ctx.amount()); }
    };
  }

  /* --- Pay with Bank ---------------------------------------------------- */
  function mountPayWithBank(el, ctx) {
    const selected = { bank: null };
    const gridId = ctx.prefix + 'PayBanks';

    el.innerHTML = '' +
      '<h2 class="pm-title" data-i18n="payment.pay_with_bank">Pay with Bank</h2>' +
      '<p data-i18n="payment.paybank_lead">Choose your bank and you will be taken to its secure ' +
      'login to authorise the payment. This is a separate option from a bank transfer.</p>' +
      '<div class="pm-banks" id="' + gridId + '" role="radiogroup" aria-label="Choose your bank"></div>' +
      '<div class="pm-actions">' +
      '<button type="button" class="ek-btn ek-btn--primary" data-pm="continue" disabled>Continue to your bank</button>' +
      '</div>' +
      '<p class="pm-status" data-pm="status" hidden></p>' +
      '<p class="pm-note" data-i18n="payment.paybank_note">You will be returned to this page ' +
      'automatically once your bank confirms the payment.</p>';

    const grid = el.querySelector('#' + gridId);
    const continueBtn = el.querySelector('[data-pm="continue"]');
    const statusEl = el.querySelector('[data-pm="status"]');

    grid.innerHTML = PARTICIPATING_BANKS.map(b =>
      '<button type="button" class="pm-bank pm-bank--card" data-bank="' + esc(b) + '">' +
      '<span class="pm-bank-avatar" aria-hidden="true">' + esc(initials(b)) + '</span>' +
      '<span class="pm-bank-name">' + esc(b) + '</span>' +
      '</button>').join('');

    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('.pm-bank');
      if (!btn) return;
      grid.querySelectorAll('.pm-bank').forEach(b => b.classList.toggle('is-selected', b === btn));
      selected.bank = btn.dataset.bank;
      continueBtn.disabled = false;
      continueBtn.textContent = 'Continue to ' + selected.bank;
      statusEl.hidden = true;
      if (ctx.onChange) ctx.onChange();
    });

    continueBtn.addEventListener('click', () => {
      if (!selected.bank) return;
      statusEl.hidden = false;
      statusEl.classList.remove('is-warning');
      statusEl.textContent = 'Opening ' + selected.bank + ' secure authorisation…';
      continueBtn.setAttribute('aria-busy', 'true');
      setTimeout(() => {
        continueBtn.removeAttribute('aria-busy');
        statusEl.textContent = selected.bank + ' is ready. Complete the authorisation in your bank app, ' +
          'then place the order — we confirm the payment automatically.';
      }, 1500);
    });

    return {
      kind: 'paybank',
      reference: ctx.reference,
      isComplete: () => !!selected.bank,
      value: () => selected.bank,
      refresh: () => { }
    };
  }

  /* --- Pay with Visa QR ------------------------------------------------- */
  function mountVisaQr(el, ctx) {
    let deadline = Date.now() + QR_WINDOW_MS;
    let expired = false;

    el.innerHTML = '' +
      '<h2 class="pm-title" data-i18n="payment.visa_qr">Pay with Visa QR</h2>' +
      '<p data-i18n="payment.visaqr_lead">Scan this code with any banking or payment app that ' +
      'supports Visa QR. The amount and merchant are filled in for you.</p>' +
      '<div class="pm-qr-wrap">' +
      '<div class="pm-qr" data-pm="qr" aria-label="Visa QR payment code"></div>' +
      '<div class="pm-qr-side">' +
      bankRows([
        ['Amount', '<span class="pm-mono" data-pm="amount">' + esc(money(ctx.amount())) + '</span>', true],
        ['Reference', '<span class="pm-mono">' + esc(ctx.reference) + '</span>', true],
        ['Expires in', '<span class="pm-mono" data-pm="expiry">10:00</span>', true]
      ]) +
      '</div></div>' +
      '<ol class="pm-steps">' +
      '<li>Open a banking or payment app that supports Visa QR.</li>' +
      '<li>Scan the code above.</li>' +
      '<li>Check the amount and merchant shown in your app, then confirm and authorise.</li>' +
      '</ol>' +
      '<div class="pm-actions">' +
      '<button type="button" class="ek-btn ek-btn--ghost" data-pm="regen">Regenerate QR code</button>' +
      '</div>' +
      '<p class="pm-status" data-pm="status" hidden></p>' +
      '<p class="pm-note" data-i18n="payment.visaqr_note">If the code expires or is cancelled you can ' +
      'regenerate it here — you do not need to start a new order.</p>';

    const qrEl = el.querySelector('[data-pm="qr"]');
    const expiryEl = el.querySelector('[data-pm="expiry"]');
    const qrAmountEl = el.querySelector('.pm-qr-side [data-pm="amount"]');
    const statusEl = el.querySelector('[data-pm="status"]');
    const regenBtn = el.querySelector('[data-pm="regen"]');

    const payload = () => 'https://checkout.paystack.com/visaqr' +
      '?ref=' + encodeURIComponent(ctx.reference) +
      '&amount=' + Math.round((Number(ctx.amount()) || 0) * 100) +
      '&currency=' + CURRENCY +
      '&merchant=' + encodeURIComponent(MERCHANT) +
      '&ch=visaqr';

    const paint = () => {
      if (!global.QRCode) {
        qrEl.innerHTML = '<p class="pm-note">QR renderer unavailable.</p>';
        return;
      }
      qrEl.innerHTML = global.QRCode.svg(payload(), { size: 208, quiet: 2 });
    };

    const regenerate = (message) => {
      deadline = Date.now() + QR_WINDOW_MS;
      expired = false;
      expiryEl.classList.remove('is-expired');
      paint();
      if (message) {
        statusEl.hidden = false;
        statusEl.textContent = message;
      }
      if (ctx.onChange) ctx.onChange();
    };

    regenBtn.addEventListener('click', () => regenerate('A fresh Visa QR code has been generated.'));

    addTicker(() => {
      if (expired) return;
      const c = countdown(deadline);
      expiryEl.textContent = c.text;
      if (c.expired) {
        expired = true;
        expiryEl.classList.add('is-expired');
        statusEl.hidden = false;
        statusEl.textContent = PHRASES.notCompleted + ' You can regenerate the QR code below.';
        statusEl.classList.add('is-warning');
        if (ctx.onChange) ctx.onChange();
      }
    });

    paint();

    return {
      kind: 'visaqr',
      reference: ctx.reference,
      isComplete: () => !expired,
      value: () => ctx.reference,
      refresh: () => {
        if (qrAmountEl) qrAmountEl.textContent = money(ctx.amount());
        if (!expired) paint();
      }
    };
  }

  /* --- Account Balance -------------------------------------------------- */
  /* Pays the order from the member's Ecoin wallet. The balance is read
     live from ProductCatalog.getEcoinTotal(memberId) so it stays correct
     after a member search / id change. Completeness rule (mirrors checkout):
     balance must be positive and cover the order total. */
  function mountBalance(el, ctx) {
    const getMid = (typeof ctx.getMemberId === 'function')
      ? ctx.getMemberId : function () { return null; };
    const amountId = ctx.balanceAmountId || null;

    el.innerHTML = '' +
      '<h2 class="pm-title" data-i18n="payment.account_balance">Account Balance</h2>' +
      '<p data-i18n="payment.balance_lead">Pay for this order directly from the member&rsquo;s Ecoin account balance.</p>' +
      bankRows([
        ['Available balance', '<span class="pm-mono" data-pm="avail">—</span>', true],
        ['Order total', '<span class="pm-mono" data-pm="total">—</span>', true],
        ['Balance after payment', '<span class="pm-mono" data-pm="after">—</span>', true]
      ]) +
      '<p class="pm-status is-warning" data-pm="warning" hidden data-i18n="payment.balance_insufficient">' +
      'The available balance is not enough to cover this order. Choose another payment method or reduce the quantity.</p>' +
      '<p class="pm-note" data-i18n="payment.balance_note">The balance is deducted automatically when the order is placed.</p>';

    const availEl = el.querySelector('[data-pm="avail"]');
    const totalEl = el.querySelector('[data-pm="total"]');
    const afterEl = el.querySelector('[data-pm="after"]');
    const warnEl = el.querySelector('[data-pm="warning"]');

    let balance = 0;

    function paint() {
      const mid = getMid();
      const pc = global.ProductCatalog || {};
      balance = (mid && pc.getEcoinTotal) ? Math.max(0, Number(pc.getEcoinTotal(mid)) || 0) : 0;
      const total = Number(ctx.amount()) || 0;
      if (availEl) availEl.textContent = money(balance);
      if (totalEl) totalEl.textContent = money(total);
      if (afterEl) afterEl.textContent = money(Math.max(0, balance - total));
      if (warnEl) warnEl.hidden = balance >= total;
      if (amountId) {
        const span = document.getElementById(amountId);
        if (span) span.textContent = (Number(balance) || 0).toLocaleString();
      }
      if (ctx.onChange) ctx.onChange();
    }

    paint();

    return {
      kind: 'balance',
      reference: ctx.reference,
      isComplete: () => balance > 0 && balance >= (Number(ctx.amount()) || 0),
      value: () => 'balance',
      refresh: paint
    };
  }

  const MOUNTERS = {
    card: mountCard,
    ussd: mountUssd,
    bank: mountBankTransfer,
    paybank: mountPayWithBank,
    visaqr: mountVisaQr,
    balance: mountBalance
  };

  /* Mount one panel. `ctx` must provide { prefix, amount, reference, onChange }. */
  function mount(el, kind, context) {
    if (!el) return null;
    const fn = MOUNTERS[kind];
    if (!fn) return null;
    const ctx = Object.assign({
      prefix: 'pm',
      amount: () => 0,
      reference: reference(),
      onChange: null
    }, context || {});
    return fn(el, ctx);
  }

  /* --- High-level wiring ------------------------------------------------
     Builds the chooser + lazily mounted panels for one order page, and
     exposes a tiny state API so the page can drive its own pay-button gate.

     opts:
       name            radio name                    (default 'payMethod')
       selected        initially selected value
       panelHost       element / selector that receives the panels
       panelClass      class(es) for each panel wrapper
       prefix          id prefix handed to the mounters
       amount()        current order total
       includeBalance  add the Account Balance option to the chooser
       balanceAmountId / balanceSubId / balanceLabelId
       extraPanels     { value: element|selector }  page-rendered panels
       extraComplete   { value: () => bool }        completeness for those
       companions      { value: element|selector|[..] } blocks shown alongside
                       a panel (e.g. a page's own remittance fields)
       onChange()      fired on every state change

     returns { select, value, label, reference, isComplete, refresh, grid }
     -------------------------------------------------------------------- */
  function wire(host, opts) {
    const o = opts || {};
    const grid = (typeof host === 'string') ? document.querySelector(host) : host;
    if (!grid) return null;
    const panelHost = (typeof o.panelHost === 'string')
      ? document.querySelector(o.panelHost) : o.panelHost;
    const name = o.name || 'payMethod';
    const prefix = o.prefix || 'pm';
    const ref = o.reference || reference();
    const handles = {};   // value -> { el, handle }  (PayMethods-rendered)
    const extras = {};    // value -> element          (page-rendered)
    const extraDone = o.extraComplete || {};
    let current = null;

    renderGrid(grid, {
      name,
      selected: o.selected,
      includeBalance: !!o.includeBalance,
      balanceName: o.balanceName,
      balanceSub: o.balanceSub,
      balanceAmountId: o.balanceAmountId || null,
      balanceSubId: o.balanceSubId || null,
      balanceLabelId: o.balanceLabelId || null
    });

    const balanceMemberId = o.balanceMemberId || null;

    if (o.extraPanels) {
      Object.keys(o.extraPanels).forEach(k => {
        const el = (typeof o.extraPanels[k] === 'string')
          ? document.querySelector(o.extraPanels[k]) : o.extraPanels[k];
        if (el) { extras[k] = el; el.style.display = 'none'; }
      });
    }

    // Companion blocks (page-owned markup shown together with one method)
    const companions = {};
    if (o.companions) {
      Object.keys(o.companions).forEach(k => {
        const raw = Array.isArray(o.companions[k]) ? o.companions[k] : [o.companions[k]];
        companions[k] = raw
          .map(item => (typeof item === 'string') ? document.querySelector(item) : item)
          .filter(Boolean);
        companions[k].forEach(el => { el.style.display = 'none'; });
      });
    }

    function build(value) {
      if (handles[value] || extras[value] || !panelHost) return;
      const wrap = document.createElement('div');
      wrap.className = o.panelClass || 'method-info-card';
      wrap.setAttribute('data-pm-panel', value);
      wrap.style.display = 'none';
      panelHost.appendChild(wrap);
      const handle = mount(wrap, value, {
        prefix,
        amount: o.amount || function () { return 0; },
        reference: ref,
        getMemberId: balanceMemberId,
        balanceAmountId: (value === 'balance') ? (o.balanceAmountId || null) : null,
        radioName: name,
        onChange: function () { if (o.onChange) o.onChange(); }
      });
      if (handle) handles[value] = { el: wrap, handle: handle };
    }

    function show(value) {
      Object.keys(handles).forEach(k => { handles[k].el.style.display = (k === value) ? '' : 'none'; });
      Object.keys(extras).forEach(k => { extras[k].style.display = (k === value) ? '' : 'none'; });
      // Companions are hidden first and then revealed for the active value, so a
      // single block shared by several methods (e.g. one remittance panel used by
      // both Bank Transfer and Pay with Bank) is not hidden by a later key.
      const allCompanions = [];
      Object.keys(companions).forEach(k => companions[k].forEach(el => {
        if (allCompanions.indexOf(el) === -1) allCompanions.push(el);
      }));
      allCompanions.forEach(el => { el.style.display = 'none'; });
      (companions[value] || []).forEach(el => { el.style.display = ''; });
    }

    function select(value) {
      if (!value) return;
      current = value;
      build(value);
      show(value);
      const h = handles[value];
      if (h && h.handle.refresh) h.handle.refresh();
      if (o.onChange) o.onChange(current);
    }

    function isComplete() {
      if (!current) return false;
      if (handles[current]) return !!handles[current].handle.isComplete();
      if (extras[current]) return extraDone[current] ? !!extraDone[current]() : true;
      return true;
    }

    const radios = Array.prototype.slice.call(grid.querySelectorAll('input[name="' + name + '"]'));
    radios.forEach(r => {
      r.addEventListener('change', () => { if (r.checked) select(r.value); });
    });

    const initial = o.selected
      || ((radios.filter(r => r.checked)[0] || radios[0] || {}).value);
    if (initial) {
      const radio = grid.querySelector('input[name="' + name + '"][value="' + initial + '"]');
      if (radio) radio.checked = true;
      select(initial);
    }

    return {
      reference: ref,
      grid: grid,
      select: select,
      value: () => current,
      label: () => LABELS[current] || current || null,
      isComplete: isComplete,
      refresh: () => { const h = handles[current]; if (h && h.handle.refresh) h.handle.refresh(); }
    };
  }

  global.PayMethods = {
    MERCHANT, CURRENCY, LABELS, PHRASES, CATALOGUE, BALANCE_METHOD,
    USSD_BANKS, PARTICIPATING_BANKS, SETTLEMENT_ACCOUNTS,
    label: (value) => LABELS[value] || value || null,
    methods, renderGrid, mount, wire, reference, money, ussdCode, initials, esc, tr
  };
})(window);
