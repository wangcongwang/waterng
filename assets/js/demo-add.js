/* ============================================================
   demo-add.js — wires designer-styled pages into the demo shop
   - [data-demo-add] buttons -> ProductCatalog.addToCart (cart/checkout flow)
   - form[data-form="contact"] -> demo success handler (no backend)
   ============================================================ */
(function() {
  'use strict';

  function init() {
    /* ---- Add to cart buttons on designer product/range pages
           (signed-out visitors add to the guest cart; checkout handles guest flow) ---- */
    document.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-demo-add]');
      if (!btn) return;
      var PC = window.ProductCatalog;
      if (!PC || typeof PC.addToCart !== 'function') return;
      var count = PC.addToCart({
        id: btn.dataset.id,
        name: btn.dataset.name || 'Product',
        price: parseInt(btn.dataset.price, 10) || 0,
        img: btn.dataset.img || '',
        category: btn.dataset.category || ''
      }, 1);
      var original = btn.textContent;
      btn.textContent = 'Added to cart \u2713';
      btn.classList.add('is-added');
      btn.disabled = true;
      setTimeout(function() {
        btn.textContent = original;
        btn.classList.remove('is-added');
        btn.disabled = false;
      }, 1600);
      if (typeof window.toast === 'function') {
        window.toast((btn.dataset.name || 'Product') + ' added to cart (' + count + ' items).', 'success');
      }
    });

    /* ---- Contact form (designer markup, demo behaviour) ---- */
    Array.prototype.forEach.call(
      document.querySelectorAll('form[data-form="contact"]'),
      function(form) {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
            form.reportValidity();
            return;
          }
          var status = form.querySelector('[data-form-status]');
          if (status) {
            status.hidden = false;
            status.textContent = 'Thank you. Your message has been received \u2014 we will come back to you shortly.';
          }
          form.reset();
        });
      }
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
