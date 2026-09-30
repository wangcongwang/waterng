# 项目长期记忆 (water / AquaLife)

## A 结构与运行
- 纯静态 HTML 站点：`*.html` + `assets/`，无后端；WordPress 已移除（2026-09-08）。
- 本地预览：单进程 Node 静态服务（加 no-cache 头）；`workbuddy_cloudstudio_deploy` 当前不可用。
- 内置浏览器访问 `localhost` 需经 shield allow；`index.html`(display-only) 的 `snapshot -i` 可能返 about:blank，截图/设 viewport 正常。

## B 通用编码约定
- 新 CSS 必须全部用 `--ek-*` 设计令牌；禁止裸 hex、px 字号、`!important`、新增依赖/Google Fonts、移除 focus ring。
- 间距令牌仅 `--ek-4/8/12/16/20/24/32/40/48/56/64/80`（无 6/10/14）。校验：
  `comm -23 <(grep -o "var(--ek-[a-z0-9-]*" new.css | sed 's/var(//' | sort -u) <(grep -o -- "--ek-[a-z0-9-]*:" assets/css/elken-tokens.css | sed 's/:$//' | sort -u)`
- 组件基座 `elken-ui.css`；页面内容常以 `.ek-pagehead` / `.sec-banner` 开头；响应式 ≤767px 单栏、按钮满宽、product-list 收列。
- i18n 在 `assets/i18n/strings.js`（仅 `en`）；带 `{n}` 占位符必须 `T.tr(key,{n})`。
- `allProducts` 数组；商品图字段 `img`，路径 `assets/img/products/<category>/<img>`。BV 按登录态显示（未登录/guest 隐藏）。
- **页面级 `<form>` 勿加 `class="ek-form"`**（两栏网格会把整页压成半宽、`.prod-grid` 退化单栏）。AE 流程页统一 `<form id="…" autocomplete="off" novalidate>`，分区靠 `.sec-block + .sec-block` 纵向堆叠。
- 样式排查：对已知正确的兄弟页做同一份 `getComputedStyle` 探针（容器/`.sec-block`/`.prod-grid`/`.prod-card` 的 w/h/display/grid-template-columns）逐项对齐，勿凭截图猜。

## C 认证态
- localStorage 键 `al.auth.user`（`STORAGE.AUTH`）；`Auth.isLoggedIn()` 是唯一入口。
- 播种：`assets/js/app.js` `seedDemoIfEmpty()` 在空 profile 且无订单时写入 demo `NG09246375`（Adaeze Okonkwo）+ profile/地址/`al.memberData`+样例订单 `AQ-UW13CL`。**空 profile 下普通页默认「已登录 demo」**，无 `AUTO_LOGIN_DEMO` 开关。验证未登录：清 localStorage / 隐身窗口 / `data-display-only` 页。
- 个人中心：顶部右侧用户图标；未登录点击新标签开 `login.html?next=account.html`；登录后回跳 `account.html`。
- 导航：`isGuestEntry` 由 sessionStorage `al.guestMode`（`STORAGE.GUEST`）控制。guest 仅留 Products+Cart；已登录隐藏主导航（含 Products）；普通未登录显示完整菜单。购物车按钮普通未登录隐藏，guest/登录态保留。
- env banner：`login/signup` 恒「外部AE页面」；其他未登录「Wordpress页面」，已登录「外部AE页面」。
- 退出：header/drawer 两入口登出后尝试 `window.close()`，被拦截回退首页。

## D 关键页面状态
- `signup.html`：营销站风格，加载 `elken-chrome.css`+`#app-footer`，顶部 banner `Create your account.`，表单区 `ek-container signup-container`(max 880px)，不渲染主导航。产品区 `.prod-grid` `.prod-card`，选中态 `.is-added`（✓ badge+步进器），汇总条实时 Subtotal/BV。样式 `signup.css`，i18n `signup.products_hint`。
- 产品页 CTA 门控（2026-09-25）：未登录（「Wordpress页面」banner）时，营销产品页的「加购」隐藏、改为「Buy Now」，点击新标签开 `login.html?next=<当前产品页>`。`app.js` 的 `applyBuyNowGate()` 处理静态 `data-demo-add` 与 `product-detail` 的 `#detailAddToCart`/`#detailBuyNow`；网格页（`products.html`）由 `website.js` `renderProductCards` 在未登录时直接渲染 Buy Now。触发条件 `!Auth.isLoggedIn()`。文案用英文 "Buy Now"。
- Wordpress 营销页门控（2026-09-30 修正）：`product-*.html` 与 `products-*.html` 营销页 `<body>` 加 `data-wordpress="true"`（共 13 个；`product-detail.html` 属 AE 不动）。`isWordPressPage()` 为 true 时 `applyBuyNowGate()` 恒隐藏加购改 Buy Now、`renderHeader/Footer/renderEnvBanner` 按未登录营销版渲染、跳过 `seedDemoIfEmpty()`，演示自动播种的登录态不再让 Wordpress 页显示加购。
- `account.html`：样式 `account-ui.css`；Products 为 `#dashTabs` 唯一标签；`currentView()` 固定 `'products'`。
- Repeat Purchase 双页：`repeat-purchase.html`(会员) / `guest-repeat-purchase.html`(游客)，用 `repeat-purchase.css`+`website.js` `renderRepeatPurchaseCards()`（支持 `?category=` 过滤）。购物车 Continue shopping：guest→`guest-repeat-purchase.html?guest=1`，会员→`repeat-purchase.html`。**repeat-purchase 本身无支付，支付走 checkout.html**。
- `product-detail.html`：BV 用 `window.Auth.isLoggedIn()`；样式 `product-detail.css`。
- 购物车 UI `cart.css`；结账 UI `checkout.css`；guest 订单归属 `NG00000001`。
- `order.html`：`.odet-*` 结构，`order-receipt.js` 输出 Word 兼容 `.doc`。

## E Member 流程页（Welcome / Repurchase / Auto-Maintenance / Upgrade）
- 2026-09-23 起统一营销站风格：删 `#app-header`、隐藏主导航；顶部 `sec-banner` 面包屑+大标题；内容区 `.ek-container.member-container`(max 1040px)；分区块 `.ek-card.sec-block`+`.sec-title`。
- 产品区统一 `.prod-grid` `.prod-card`（沿用 signup 卡片语言：sunken 图片面板、名称/SKU、DP/BV chip、RP/Stock、底部蓝色 Add，选中 `.is-added`）。
- Member ID 格式 `NG`+8位数字（`/^NG\d{8}$/`）；Member ID 与 Country 字段永久禁用+锁定提示。
- Upgrade：等级 `LEVEL_BV={Member:0,Silver:300,Gold:900,Platinum:2700,Diamond:8100,Corporate:24300}`；补差 BV=目标阈值−当前阈值（≥0）；目标白名单 Silver/Gold，当前级标 `(current)` 且 disabled。VAT_RATE=0。保存门槛：已检会员+目标级+≥1商品+商品BV≥补差BV+收货5必填+支付 `isComplete()`；写 `al.memberLevels`、事件 `al:member-level-changed`、订单 `source:'member-upgrade'`+`upgrade{...}`+`remarks`；选余额调 `ProductCatalog.debitEcoin`。
- 三流程页共同 bug 已修：`<div id="summaryList">` 加 `class="summary-list"`（否则 `.sm-row` 48px 缩略图失效、商品图被放大）。
- 页面保留 `assets/js/app.js`（渲染 `#app-footer` 与 env banner），但不渲染顶部主导航。

## F 支付方式
- 渠道 `card/ussd/bank/paybank/visaqr`，checkout 额外 `balance`。
- 共享层 `payment-methods.js`+`qr.js`+`payment-methods.css`；`mountBalance` 读 `ProductCatalog.getEcoinTotal(memberId)`，余额>0 且≥订单总额才 `isComplete`，已注册 `balance`。
- `PayMethods.wire()` 支持 `includeBalance`+`balanceMemberId`(fn)+`balanceAmountId`(选择器)。member-welcome/repurchase/upgrade 已开余额支付。

## G 展示/游客态机制
- display-only：`<body data-display-only="true">` + `app.js` `isDisplayOnlyPage()`。真→不读不写登录态、跳过播种、header 强制未登录营销版、footer Products 固定营销分类页、env banner「Wordpress页面」。现仅 `index.html`。
- guest-no-nav：`<body data-guest-no-nav="true">`，游客态（sessionStorage `al.guestMode==='1'`）清空 `#app-header` 提前 return；会员态保留导航。适用 `guest-repeat-purchase.html`/`cart.html`/`checkout.html`/`order.html`。判定用「游客标记」非登录态——`Auth.login()` 会清 `al.guestMode`，真实会员登录后导航照常。

## H 环境坑
- 本地静态服务须单进程 Node 脚本内建 + no-cache；后台进程易被沙箱回收。
- `osascript delete` 无权限；废纸篓用 `/usr/bin/trash` 或 `mv ~/.Trash/`。
- Chrome 路径 `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`（puppeteer-core 验证用）。
