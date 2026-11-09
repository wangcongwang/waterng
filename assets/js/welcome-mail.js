/* ============================================================================
   Welcome Mail — automatic post-registration welcome message
   ----------------------------------------------------------------------------
   DEMO MODE / 演示模式
   This site is a static demo with no backend. "Sending" composes the welcome
   message and delivers it into the site's local outbox (localStorage), which
   the welcome page reads back. The whole flow — register → email sent → read
   the email → sign in — is clickable end to end.

   PRODUCTION HOOK / 真实发送接入点
   Replace the body of send() with one POST to your mail service (SMTP relay,
   cloud function, or ESP), e.g.:
       return fetch('/api/welcome-mail', {
         method: 'POST', headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(mail)
       }).then(() => { ...store the local copy for the UI...; return mail; });
   Nothing else in the UI needs to change: get(), resend() and the welcome
   page all consume the same payload shape.

   SECURITY / 安全
   Plaintext login / payment passwords are deliberately NOT included in the
   payload. The mail only states that credentials were set, and the member ID
   is the login account. Never email passwords.
   ============================================================================ */
(function () {
  'use strict';

  var KEY = 'al.welcomeMail';
  var EVENT = 'al:welcomemail';

  function levelLabel(v) {
    var s = String(v || '').toLowerCase();
    if (s === 'gold') return 'Gold Card';
    if (s === 'silver') return 'Silver Card';
    return v || '—';
  }

  function moneyLabel(order) {
    if (order && order.totalLabel) return order.totalLabel;
    var n = Number(order && order.total) || 0;
    return ((order && order.currency) ? order.currency + ' ' : '') + n.toLocaleString('en-US');
  }

  function messageId(memberId) {
    var tail = String(memberId || '').replace(/[^A-Z0-9]/gi, '').slice(-6) || 'NEW';
    return 'WM-' + tail + '-' + Date.now().toString(36).toUpperCase();
  }

  /* Compose the full welcome message from the registration + first order.
     `user` is the signup form payload, `order` the newly created order. */
  function build(user, order) {
    user = user || {};
    order = order || {};
    var now = Date.now();
    var memberId = user.memberId || '';

    return {
      messageId: messageId(memberId),
      to: user.email || '',
      from: 'Elken Member Care <no-reply@elken.com>',
      subject: 'Welcome to Elken — your member account is ready',
      sentAt: now,
      status: 'delivered',
      channel: 'Registration auto-send',
      member: {
        id: memberId,
        name: user.name || '',
        firstName: user.firstName || String(user.name || '').split(/\s+/)[0] || '',
        email: user.email || '',
        phone: user.phone || '',
        country: user.country || '',
        language: user.language === 'zh' ? '中文' : 'English',
        level: levelLabel(user.orderLevel),
        referrerId: user.referrerId || '',
        centerId: user.centerId || '',
        registeredAt: now
      },
      account: {
        loginId: memberId,
        loginUrl: 'login.html' + (memberId ? '?mid=' + encodeURIComponent(memberId) : ''),
        passwordSet: !!user.loginPassword,
        paymentPasswordSet: !!user.paymentPassword,
        accountUrl: 'account.html'
      },
      order: {
        id: order.id || '',
        total: moneyLabel(order),
        itemCount: Number(order.itemCount) || 0,
        paymentLabel: order.paymentLabel || order.paymentMethod || '—'
      }
    };
  }

  /* "Send" — persists the delivered message and notifies the UI. */
  function send(user, order) {
    var mail = build(user, order);
    try { localStorage.setItem(KEY, JSON.stringify(mail)); } catch (e) {}
    try { window.dispatchEvent(new CustomEvent(EVENT, { detail: mail })); } catch (e) {}
    return mail;
  }

  function get() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; }
  }

  /* Resend the same welcome message with a fresh delivery timestamp. */
  function resend() {
    var mail = get();
    if (!mail) return null;
    mail.sentAt = Date.now();
    mail.status = 'delivered';
    try { localStorage.setItem(KEY, JSON.stringify(mail)); } catch (e) {}
    try { window.dispatchEvent(new CustomEvent(EVENT, { detail: mail })); } catch (e) {}
    return mail;
  }

  function clear() {
    try { localStorage.removeItem(KEY); } catch (e) {}
  }

  window.WelcomeMail = {
    build: build,
    send: send,
    get: get,
    resend: resend,
    clear: clear,
    EVENT: EVENT
  };
})();
