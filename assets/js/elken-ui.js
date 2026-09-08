/* ==========================================================================
   Elken UI — behaviour / 交互脚本
   v1.1.1

   No dependencies, no build step. Everything is driven by data- attributes,
   so you can drop this into a plain page, a PHP template, a Vue app or a
   React app without changing the markup.
   零依赖、免打包。全部用 data- 属性驱动，原生页面 / PHP / Vue / React 都能直接用。

   Everything self-registers on DOMContentLoaded, and again whenever you call
   ElkenUI.init(root) after injecting HTML — important for SPA / AJAX pages.
   页面加载后自动初始化；动态插入 HTML 后再调一次 ElkenUI.init(容器) 即可。
   ========================================================================== */
(function (global) {
  "use strict";

  var ElkenUI = {};

  /* --- helpers ---------------------------------------------------------- */
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  /* --- 1. Tabs / 选项卡 --------------------------------------------------
     <div class="ek-tabs" role="tablist" data-ek-tabs>
       <button class="ek-tab" role="tab" aria-controls="p1" aria-selected="true">概览</button>
       <button class="ek-tab" role="tab" aria-controls="p2" aria-selected="false">订单</button>
     </div>
     <div class="ek-tabpanel" id="p1" role="tabpanel">…</div>
     <div class="ek-tabpanel" id="p2" role="tabpanel" hidden>…</div>

     Arrow keys move between tabs, as the ARIA pattern requires.
     方向键可切换，符合 ARIA 规范。
  ------------------------------------------------------------------------ */
  function Tabs(root) {
    var tabs = $$('[role="tab"]', root);
    if (!tabs.length) { return; }

    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) { panel.hidden = !on; }
      });
      root.dispatchEvent(new CustomEvent("ek:tabchange", {
        bubbles: true, detail: { id: tab.getAttribute("aria-controls") }
      }));
    }

    tabs.forEach(function (tab, i) {
      tab.tabIndex = tab.getAttribute("aria-selected") === "true" ? 0 : -1;
      tab.addEventListener("click", function () { select(tab); });
      tab.addEventListener("keydown", function (e) {
        var step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!step) { return; }
        e.preventDefault();
        var next = tabs[(i + step + tabs.length) % tabs.length];
        next.focus();
        select(next);
      });
    });
  }

  /* --- 2. Modal / 弹窗 ---------------------------------------------------
     <button data-ek-open="my-dialog">打开</button>
     <dialog class="ek-modal" id="my-dialog">
       … <button data-ek-close>取消</button>
     </dialog>

     Native <dialog>: the browser gives us the backdrop, Esc-to-close and
     focus trapping. Do not reimplement those.
     用原生 dialog，遮罩 / Esc 关闭 / 焦点锁定都是浏览器提供的。
  ------------------------------------------------------------------------ */
  function Modals(root) {
    $$("[data-ek-open]", root).forEach(function (btn) {
      if (btn.__ekBound) { return; }
      btn.__ekBound = true;
      btn.addEventListener("click", function () {
        var d = document.getElementById(btn.getAttribute("data-ek-open"));
        if (d && typeof d.showModal === "function") { d.showModal(); }
      });
    });
    $$("[data-ek-close]", root).forEach(function (btn) {
      if (btn.__ekBound) { return; }
      btn.__ekBound = true;
      btn.addEventListener("click", function () {
        var d = btn.closest("dialog");
        if (d) { d.close(); }
      });
    });
  }

  /* --- 3. Toast / 轻提示 -------------------------------------------------
     ElkenUI.toast("已保存");
     ElkenUI.toast("网络错误", { type: "error", duration: 5000 });

     role="status" so a screen reader announces it without stealing focus.
     用 role="status"，屏幕阅读器会播报但不抢焦点。
  ------------------------------------------------------------------------ */
  ElkenUI.toast = function (message, opts) {
    opts = opts || {};
    var box = document.querySelector(".ek-toasts");
    if (!box) {
      box = document.createElement("div");
      box.className = "ek-toasts";
      box.setAttribute("role", "status");
      box.setAttribute("aria-live", "polite");
      document.body.appendChild(box);
    }
    var el = document.createElement("div");
    el.className = "ek-toast" + (opts.type ? " ek-toast--" + opts.type : "");
    el.textContent = message;
    box.appendChild(el);
    setTimeout(function () { el.remove(); }, opts.duration || 3200);
    return el;
  };

  /* --- 4. Copy to clipboard / 复制 --------------------------------------
     <button data-ek-copy="#referral-input" data-ek-copy-done="已复制">复制</button>

     Falls back to the old execCommand path, because navigator.clipboard is
     only available over HTTPS or on localhost — a very common cause of
     "it works locally but not on the test server".
     没有 HTTPS 时 navigator.clipboard 不可用，这里有兜底方案 ——
     否则会出现「本地好用、测试服不好用」的经典问题。
  ------------------------------------------------------------------------ */
  function Copy(root) {
    $$("[data-ek-copy]", root).forEach(function (btn) {
      if (btn.__ekBound) { return; }
      btn.__ekBound = true;
      btn.addEventListener("click", function () {
        var target = document.querySelector(btn.getAttribute("data-ek-copy"));
        var text = !target ? btn.getAttribute("data-ek-copy")
                 : ("value" in target ? target.value : target.textContent);
        var done = btn.getAttribute("data-ek-copy-done") || "Copied";

        function ok() { ElkenUI.toast(done, { type: "success" }); }

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(ok).catch(legacy);
        } else { legacy(); }

        function legacy() {
          var ta = document.createElement("textarea");
          ta.value = text;
          ta.style.cssText = "position:fixed;opacity:0";
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand("copy"); ok(); } catch (e) { /* ignore */ }
          ta.remove();
        }
      });
    });
  }

  /* --- 5. Dismiss / 关闭提示条 ------------------------------------------
     <div class="ek-alert">… <button data-ek-dismiss>×</button></div>
  ------------------------------------------------------------------------ */
  function Dismiss(root) {
    $$("[data-ek-dismiss]", root).forEach(function (btn) {
      if (btn.__ekBound) { return; }
      btn.__ekBound = true;
      btn.addEventListener("click", function () {
        var t = btn.getAttribute("data-ek-dismiss");
        var el = t ? document.querySelector(t) : btn.closest(".ek-alert, .ek-card");
        if (el) { el.remove(); }
      });
    });
  }

  /* --- 6. Sidebar drawer / 侧边栏抽屉 ------------------------------------
     <button class="ek-btn ek-btn--ghost ek-btn--icon ek-side__toggle"
             data-ek-side aria-label="菜单">…</button>
  ------------------------------------------------------------------------ */
  function Drawer(root) {
    $$("[data-ek-side]", root).forEach(function (btn) {
      if (btn.__ekBound) { return; }
      btn.__ekBound = true;
      btn.addEventListener("click", function () {
        var app = document.querySelector(".ek-app");
        if (!app) { return; }
        if (app.hasAttribute("data-side-open")) { app.removeAttribute("data-side-open"); }
        else { app.setAttribute("data-side-open", ""); }
      });
    });
    // Tapping the scrim closes it. / 点击遮罩关闭。
    if (!document.__ekDrawerBound) {
      document.__ekDrawerBound = true;
      document.addEventListener("click", function (e) {
        var app = document.querySelector(".ek-app[data-side-open]");
        if (app && !e.target.closest(".ek-side") && !e.target.closest("[data-ek-side]")) {
          app.removeAttribute("data-side-open");
        }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key !== "Escape") { return; }
        var app = document.querySelector(".ek-app[data-side-open]");
        if (app) { app.removeAttribute("data-side-open"); }
      });
    }
  }

  /* --- 7. Progress / 进度条 ---------------------------------------------
     <div class="ek-progress"><div class="ek-progress__bar" data-ek-progress="62"></div></div>
     Reads the number and sets the width, so the value can come from the
     server without inline styles. / 数值可由后端输出，不必写内联样式。
  ------------------------------------------------------------------------ */
  function Progress(root) {
    $$("[data-ek-progress]", root).forEach(function (bar) {
      var pct = Math.max(0, Math.min(100, parseFloat(bar.getAttribute("data-ek-progress")) || 0));
      bar.style.width = pct + "%";
      var wrap = bar.closest(".ek-progress");
      if (wrap && !wrap.hasAttribute("role")) {
        wrap.setAttribute("role", "progressbar");
        wrap.setAttribute("aria-valuenow", String(pct));
        wrap.setAttribute("aria-valuemin", "0");
        wrap.setAttribute("aria-valuemax", "100");
      }
    });
  }

  /* --- init ------------------------------------------------------------- */
  ElkenUI.init = function (root) {
    root = root || document;
    $$("[data-ek-tabs]", root).forEach(Tabs);
    Modals(root);
    Copy(root);
    Dismiss(root);
    Drawer(root);
    Progress(root);
    return ElkenUI;
  };

  ElkenUI.version = "1.1.1";

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { ElkenUI.init(); });
  } else {
    ElkenUI.init();
  }

  global.ElkenUI = ElkenUI;
})(window);
