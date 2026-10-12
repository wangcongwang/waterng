/* ============================================================
   cart-fab.js — floating cart entry (bottom-right, desktop + mobile)
   Loaded only on pages that actually have cart functions
   (product-*, products-*, repeat-purchase, guest-repeat-purchase).
   Visibility mirrors the header cart icon: signed-in members or
   guest-flow tabs (al.guestMode). The badge is kept in sync by
   ProductCatalog.updateCartBadge (id: cartFabBadge).
   ============================================================ */
(function () {
  var SVG_CART = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">'
    + '<circle cx="9" cy="21" r="1.6" stroke="currentColor" stroke-width="1.6"/>'
    + '<circle cx="18" cy="21" r="1.6" stroke="currentColor" stroke-width="1.6"/>'
    + '<path d="M2.5 3h2l2.2 12.2a1.6 1.6 0 0 0 1.6 1.3h8.7a1.6 1.6 0 0 0 1.6-1.2L21 7H6" '
    + 'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function isGuestFlow() {
    try { return sessionStorage.getItem('al.guestMode') === '1'; } catch (e) { return false; }
  }
  // Pages that drop the top header (guest checkout / guest shop) carry this
  // body attribute and MUST always surface the cart, even before the
  // sessionStorage guest flag is set.
  function isGuestNoNav() {
    try { return document.body && document.body.getAttribute('data-guest-no-nav') === 'true'; } catch (e) { return false; }
  }
  function cartVisible() {
    return isGuestNoNav()
      || !!(window.Auth && window.Auth.isLoggedIn && window.Auth.isLoggedIn())
      || isGuestFlow();
  }

  function mount() {
    if (document.getElementById('cartFab')) { sync(); return; }
    var fab = document.createElement('a');
    fab.id = 'cartFab';
    fab.className = 'cart-fab';
    fab.href = 'cart.html';
    fab.title = 'Cart';
    fab.setAttribute('aria-label', 'Cart');
    fab.innerHTML = SVG_CART + '<span class="cart-fab__badge" id="cartFabBadge" style="display:none"></span>';
    document.body.appendChild(fab);
    sync();
    // Re-evaluate when the auth state or guest flag changes elsewhere
    window.addEventListener('al:authchange', sync);
    window.addEventListener('al:guestchange', sync);
  }

  // The site also floats a WhatsApp button (.wa-fab) at bottom-right on most
  // pages. When it is visible we lift the cart fab ABOVE it so the two never
  // overlap; when the WA button is hidden (e.g. on phones) the cart fab drops
  // back to its default bottom corner. Measured live so it tracks whatever
  // .wa-fab size / position the active stylesheet resolves to.
  function liftAboveWa() {
    var fab = document.getElementById('cartFab');
    if (!fab) return;
    var wa = document.querySelector('.wa-fab');
    var lifted = false;
    if (wa) {
      var wacs = getComputedStyle(wa);
      if (wacs.display !== 'none') {
        var rect = wa.getBoundingClientRect();
        if (rect.height > 0) {
          var gap = 12;
          var waBottomFromViewportBottom = window.innerHeight - rect.bottom;
          var cartBottomPx = waBottomFromViewportBottom + rect.height + gap;
          fab.style.bottom = 'calc(' + cartBottomPx + 'px + env(safe-area-inset-bottom, 0px))';
          lifted = true;
        }
      }
    }
    if (!lifted) fab.style.bottom = ''; // fall back to the CSS default corner
  }

  function sync() {
    var fab = document.getElementById('cartFab');
    if (!fab) return;
    fab.style.display = cartVisible() ? '' : 'none';
    // Push the current count into the badge (website.js may have loaded after us)
    if (window.updateCartBadge) window.updateCartBadge();
    liftAboveWa();
  }

  function init() {
    mount();
    // website.js dispatches al:cartchange once it initialises — keep the
    // badge fresh even when cart-fab runs before it.
    window.addEventListener('al:cartchange', function () {
      if (window.updateCartBadge) window.updateCartBadge();
    });
    // Keep the cart fab clear of the WA button across resize / orientation
    // changes (the WA button can appear or hide at breakpoints).
    var rafScheduled = false;
    window.addEventListener('resize', function () {
      if (rafScheduled) return;
      rafScheduled = true;
      requestAnimationFrame(function () { rafScheduled = false; liftAboveWa(); });
    });
    window.addEventListener('load', liftAboveWa);
    // The header (and its .wa-fab) may finish rendering a tick after we mount.
    requestAnimationFrame(liftAboveWa);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  // Expose for pages that toggle guest mode manually
  window.__cartFabSync = sync;
})();
