# 项目长期记忆 (water / AquaLife)

## 项目约定

### Member ID 格式（2026-08-26 用户明确要求）
- **格式固定为 `NG` + 8 位随机数字**，例如 `NG12345678`。
- 生成：`assets/js/website.js` 的 `genMemberId()`（挂在 `window.ProductCatalog.genMemberId`），产出 `NG` + 8 位 `Math.random()` 数字。
- 校验：
  - 注册/账户页 `account.html` 用正则 `/^NG\d{8}$/`（`account.html:1884`）。
  - 登录页 `login.html:361` 的 `isMemberId()` 也应收紧为 `/^NG\d{8}$/.test(v.trim().toUpperCase())`（2026-08-26 修正前只是 `length >= 3`，会放过非法 ID）。
- 硬编码 demo/seed ID 一律遵循：`NG09246375`（demo 账户）、`NG27187710`（referrer）、`NG66051653`（reporting center）、`NG48655323`（订单兜底）。
- **Member ID 字段永远不可编辑**（2026-08-26 用户明确要求）：
  - 账户页 Personal information 表单的 `pfMemberId` 输入框：HTML 上加 `disabled` + `class="ek-input input-locked"`，字段下配 `span.hint.member-id-locked-hint`（文案走 i18n `account.profile_member_id_locked`）。
  - `account.html` 的 `setProfileMode()` 循环里要保持 `pfMemberId.disabled = true`（不能被其它字段的 `el.disabled = !editing` 覆盖）：`if (name === 'memberid' || el.id === 'pfMemberId') el.disabled = true;`。
  - ⚠️ `input-locked` 目前是**纯语义类、全站没有任何 CSS 规则**（`pages.css` 里已不存在锁定样式，该文件也已无页面引用）。灰底 + `not-allowed` 光标全靠 kit 的 `.ek-input:disabled, .ek-select:disabled`。不要以为去掉类会掉样式，也不要依赖它做视觉。
- **Country 字段同样永久锁定**（2026-09-15 用户要求「编辑时 Country 不可修改」）：
  - `account.html` `#pfCountry`：`disabled` + `ek-select input-locked`，字段下 `span.hint.country-locked-hint`（`hidden` 默认、仅编辑态显示；文案 `account.profile_country_locked`）。
  - `setProfileMode()` 里 country 与 memberId 一样先拦截；`#profileForm` 的 submit 处理器**再压一次** `countryEl.disabled = true`，并以 storage 中的合法国别码优先（`lockedCountry || 表单值`）——防止旧缓存页面仍可改国别。
  - 业务原因：改国别会让币种 / BV / 运费规则失效。

### 我的账户模块样式（2026-09-09 定稿）
- **单一文件 `assets/css/account-ui.css`** 承载"我的账户"全部 7 个页面的 UI 覆盖（account / order / member-welcome / member-repurchase / member-auto-maintenance / member-upgrade / team-inquiry）。
- **纯 CSS 覆盖、逻辑交互不变**：不修改这些页面的 HTML/JS，靠在 `water-pages.css` 之后插入 `<link ... account-ui.css?v=…>`（加载顺序压过基线）生效。改账户页视觉只动这个文件。
- **CLAUDE.md 硬规则**：新样式必须用 `--ek-` token（设计令牌）；禁止 hex 颜色、禁止 px 字号、禁止 `!important`、禁止新增依赖/Google Fonts、禁止去掉 focus ring。组件本体在 `elken-ui.css`，页面内容以 `.ek-pagehead` 开头。
- 响应式断点：≤767 单栏、按钮满宽、product-list 收列。

### 结算/购物车模块样式（2026-09-09 定稿）
- **`assets/css/checkout.css`** 承载结账页 `checkout.html` 的 UI（步骤条 / 配送与支付方式选择 / 自提点 / USSD / 银行卡 / 订单摘要子项 / 数量控件 / 主按钮）。同样 token-only、纯 CSS 覆盖，链接在 `water-pages.css` 之后（`?v=20260909g`）。
- **根因教训**：结算类只存在于 `pages.css`，而 `pages.css` 用旧令牌（`--ink-*/--brand-*/--paper-*`），且**没有任何页面链接 `pages.css` 或 `design-system.css`**（旧令牌已无定义）。新增结算样式必须写 `--ek-` 版，不能复用 `pages.css`。
- `assets/css/cart.css`（2026-09-09 新增，`?v=20260909a`）：购物车页完整 UI（商品卡片 / 边框式数量步进器 / 红色 Remove / sticky 订单摘要 / 空态卡）。≤840px 摘要不 sticky，≤600px 商品行改 grid。
- 同样遵守 CLAUDE.md 硬规则（--ek- token、无 hex/px/!important）。

### 认证页（login / signup）样式约定（2026-09-09 定稿）
- **独立页面**：两页均剥离站点 chrome（`#app-header/#app-footer/#offline-banner`、`elken-chrome.css`），仅加载 kit + `water-pages.css` + `login.css`（signup 额外加载 `signup.css`）。
- **`assets/css/login.css`**：分屏外壳 `.auth-page`（品牌面板 + 表单卡）+ 品牌面板（深蓝渐变/噪点/光晕）+ `.brand-logo-img`（白色 `elken-logo-white-v4.svg` 用于深底、彩色 `elken-logo-colour.svg` 用于白底卡片）+ Toast/Cookie 自包含样式。
- **`assets/css/signup.css`**（链接在 login.css 之后）：`.auth-page--signup`（360px 品牌栏 + 1fr 表单侧）、`.auth-card--wide`(720px)、`.reg-grid` 两列字段网格、`.sec-block` 分区、商品选择/支付四宫格（与 checkout 同语言）。≤900px 单列、≤640px 字段单列。
- 注册/登录 JS 逻辑与所有 id/name 不变；新增 i18n key 走 `strings.js` 的 `window.I18N` 点路径（如 `signup.join_eyebrow`）。

### 支付方式（2026-09-15 按尼日利亚规范重做，细节见当日日志第 5、8 节）
- **5 种渠道**：Debit Card / USSD / Bank Transfer / Pay with Bank / Pay with Visa QR（取值 `card`/`ussd`/`bank`/`paybank`/`visaqr`）；**checkout 额外保留 `balance`（Ecoin 钱包）**。**`cod` 全线移除**（仅旧订单的只读文案里保留字面兜底）。
- **共享层**（5 个下单页都加载）：`assets/js/payment-methods.js`、`assets/js/qr.js`、`assets/css/payment-methods.css`。
  - 高层入口 **`PayMethods.wire(host, opts)`**（推荐用法）：内部 `renderGrid` + 懒挂载 `mount`，返回 `{ select, value, label, reference, isComplete, refresh, grid }`。
  - `opts` 关键项：`name`（radio 名）、`selected`、`panelHost`（面板容器）、`panelClass`、`prefix`（面板内元素 id 前缀）、`amount()`（总价）、`includeBalance`、`balanceAmountId/balanceSubId`、`extraPanels`（页面自渲染的面板，如 checkout 的 `#balancePanel`）、`extraComplete`、`companions`（同一块页面自有标记可被多个渠道共用，如 signup 的 remittance 字段）、`onChange`。
  - 页面标记只留两个空壳：`<div class="pay-method-grid" id="…"></div>` + `<div id="…PayPanels"></div>`；**不要**再在页面里硬写渠道选项或面板内容。新加渠道 = 只改 `CATALOGUE` + `payment.*` i18n。
  - ⚠️ **`onChange` 里不能调 `payMethods.refresh()`** —— 卡片面板的 `refresh()` 会回调用 `onChange`，会无限递归。分工：`onPayMethodChange()`（只更新按钮/摘要）vs `refreshPayPanels()`（仅在总价变化时调）。
  - ⚠️ `signup.html` / `member-welcome.html` **没有 `state` 对象、也没有 `updatePayBtn`**，别在这两页引用。
  - ⚠️ `applyI18nCheckout()` 是**无条件** `textContent = T.tr(key)`，缺 key 会把文案写成 key 字符串本身 —— renderGrid 用到的 `payment.*` key 必须存在于 `strings.js`。
- 订单统一落 `payment` + `paymentLabel`（`PayMethods.label()`）+ `paymentReference` + `payStatus`。`order.html` / `shipping.html` / `account.html` **不加载共享层**，用各自的字面标签表（已含 `paybank`/`visaqr`/`balance`）。
- `PayMethods.label()` 对未知值回退原值；`PayMethods.money()` 输出 `N25,000` 风格。
- ⚠️ `.bank-row` 的布局以前只在已弃用的 `pages.css` 里定义过 → 银行行会“标签值挤在一起”；现由 `payment-methods.css` 的 `.bank-rows .bank-row` 提供。

### 账户页 Overview 版式（2026-09-15）
- **`.dash-head` 是唯一的头部卡片**，子元素顺序：`ek-avatar` → `dash-head-id` → `dash-actions`(Sign out) → `basic-info-bar`(5 项) → **`dash-referral`**（各段用 hairline 分隔）。它在 `.dash-view` 之外 → **所有标签页都可见**。
- **Referral 分享区在头部卡内**（用户要求「和头部那块合并在一块儿」）：左 = `INVITE & EARN` + 标题 + 说明，中 = 只读 `#referralLink`，右 = **Share link（primary）** + Copy link（secondary）。样式在 `account-ui.css` **§3b**（`.dash-referral*`，含 ≤767px 规则）；内容宽由 `flex: 1 1 100%` 撑满一行。
  - 历史：曾短暂做过独立的 `.ref-spotlight` 全宽 band（在 KPI 行下方），已删除，**不要再复活这个类**。
  - `#referralLink` / `#referralCopy` / `#referralShare` 三个 id 是 `wireReferralLink()` 的锚点，改名等于断掉分享逻辑。Share 用 `navigator.share`，失败（非 `AbortError`）自动回退剪贴板。
- **Overview 视图（`data-view="overview"`）子元素只有 3 个**：`.kpi-grid` → `#hubGrid`（9 格）→ `.overview-grid`（内含**唯一一个 `<section>`**：`Quick actions` 卡 + `Referrals` 卡）。⚠️ `.overview-grid` 在 ≥1024px 是**两列** grid，但只有一个 section 子项 → 右列本来是空的（历史如此，不是 bug）。
- **`Product catalog` 模块已删除**（2026-09-15 用户要求「Product catalog 模块去除吧」）：原来在 Quick actions 与 Referrals 之间那张「💧 / Quality products for your health… / Browse all products」卡，纯 HTML 删除、0 CSS、0 JS。**不要再加回来**；「逛商品」入口已有 Quick actions 的 `Browse products` + 九宫格 `Repeat Purchase` + Orders 页按钮覆盖。

### 账户页两处固定结构（2026-09-15）
- **Basic Information 常驻顶部卡**：`#profileBasicInfoBar`（5 项：系统时间/结算周期/会员等级/最高荣耀/Elite）**在 `.dash-head` 内**，不是 Profile 标签页的独立卡（那张已删除）。`renderProfileBasicBar()` 必须在 `DOMContentLoaded` 里 `showView()` **之前**调一次，否则首屏 Overview 是空的。布局由 `account-ui.css` §3 的 `.dash-head > .basic-info-bar` 负责（内容自适应 flex + `space-between` + 上方 hairline；≤767px 转 grid）。**不要**改回等宽 grid——系统时间值会折行并把该列顶歪。
- **两个账户内弹窗**（Historical Cumulative Bonus / Recharge and Transfer）内部类 `.hc-bonus-*`、`.rt-*` 全站样式在 `account-ui.css` **§18**；它们是 JS 动态 innerHTML，只加 CSS、别动 JS。

### 订单详情页（order.html）版式（2026-09-15 重做）
- **用户明确不喜欢「表单式」排布**：不要再把信息放成「标签在上、值在下」的字段网格，也不要用多列财务表格。现在整页是**凭据式**结构，类名统一 `.odet-*`，样式集中在 `account-ui.css` **§14**（旧的 `.order-grid/.order-side/.order-status/.order-meta-*/.order-sub` 已删除，别再用）。
- 结构：`.odet-hero`（状态徽标 + `Order <ID>` + placed 行 + 右侧总额）→ `.odet-grid`（左 `.odet-main` Items 卡：商品行 `.odet-item` + 金额块 `.odet-money`；右 `.odet-side` 五张卡：**Receipt** / Delivery / Payment / Member / 分享链接）。
- 状态色：`.odet-badge` + `.is-paid` / `.is-pending` / `.is-fail` / `.is-neutral`。
- ⚠️ `.odet-grid` 是 `minmax(0,1fr) 320px`：**grid/flex 子项默认 `min-width:auto`**，侧栏里那条只读分享 URL `<input>` 与长按钮会把 320px 轨道撑成 374px、文字被裁。已用 `min-width:0` 修好；往侧栏加长内容时记得保持这个约束。
- `.sign-side` 与 `.order-link-*` 仍被 `shipping.html` 共用，**不要删**。

### 下载小票（receipt）—— 全站唯一实现（2026-09-15）
- **`assets/js/order-receipt.js` → `window.OrderReceipt`**：`build(order,opts)` / `model(order,opts)` / `filename(order)` / `download(order,opts)`。`order.html`、`shipping.html`、`account.html` 都加载它（`?v=20260915a`），**别再写第二份导出逻辑**。
- 输出 = Word 兼容 `.doc`（`application/msword` + BOM），文件名 **`receipt_<orderId>.doc`**。⚠️ 模块内**字面色值 / pt 字号是有意的**（导出产物，不是站点样式表），不受 token-only 规则约束。
- **访客必须可用**：member 缺失 → Member 列 `Not registered (guest order)`、姓名回落 `Guest`；全部数据只取自 `order` 自身字段。
- **BV 行按登录态**（`opts.showBV` 默认 `Auth.isLoggedIn()`）：登录 → `BV earned +N BV`；未登录但有 `order.referrerId` → `BV credited to <id>`；两者皆无 → 不出现该行。
- 接入点：`order.html` `.odet-side` 的 **Receipt 卡**（`#downloadReceipt`）、`shipping.html` Order summary 卡内同 id 按钮、`account.html` 订单列表 `.o-download`（原来 180 行内联 `exportOrderDocument()` 已删，改为薄封装调用本模块）。
- ⚠️ `shipping.html` 的 `renderOrder()` 在 DOMContentLoaded 与 `al:langchange` 都会跑 —— 绑定用 `btn.onclick =`，**不要 addEventListener**（会叠监听）。
- ⚠️ 老坑复现并已修：`!!(window.Auth && window.Auth.isLoggedIn)` 是**函数引用恒为真**，访客会看到 BV。判断登录态**必须调用** `isLoggedIn()`。
- 验证脚本：`.workbuddy/preview/verify-receipt.js`（登录/访客/订单不存在/shipping 两态/account 列表 5 组）。⚠️ 同一 browser 的多个 page **共享同 origin 的 localStorage**，夹具前必须先清 `localStorage`，否则会出现「访客被自动登录」的假失败。

### Member Upgrade 页（member-upgrade.html，2026-09-15）
- **Member Level 只能升到 Silver / Gold**（用户明确要求）：`#memberLevel` 的 `<option>` 只有这两项，脚本常量 `LEVELS = ['Silver','Gold']` **同时是 doSave() 的白名单**。要加档位必须同时改这两处，别只改 HTML。
- 档案级别不在白名单时（历史 Bronze/Platinum/Diamond/Corporate），`loadMember()` 会临时插一条 `Xxx (current)` 选项（`dataset.transient='1'`），只为显示现状、不可作为升级目标；`loadMember()` 与 `clearMember()` 每次都会先清掉所有 `option[data-transient]`，保证列表不越滚越长。
- 该页无登录守卫，独立读 `al.memberLevels` 覆盖值并派发 `al:member-level-changed` / 写 `al.memberLevels:ping` 通知账户页。

### 数据层 API 形态约定（2026-09-09 踩坑）
- **`window.ProductCatalog.allProducts` 是数组，不是函数**（website.js 第 585 行 `allProducts,` 简写导出）。任何按 `pc.allProducts()` 调用或 `typeof === 'function'` 判断的解析器都会失效——必须同时处理「函数」与「数组」两种形态。
- 商品图片字段统一是 **`img`**（如 `calmag.webp`），不是 `image`；目录路径 `assets/img/products/<category>/<img>`。
- 订单项图片解析（`_resolveOrderItemImage`，order.html 与 account.html 各一份）现已按 id 精确 → 名称精确/部分(双向 includes)/忽略大小写 → sku/code 健壮匹配，并兼容 `allProducts` 数组。复购/自动维护等只存 `id` 的订单项也能回查到真实图片。
- **BV 一律按登录态显示**（未登录完全不出现 BV 文案/列）：商品卡、商品详情徽标、购物车摘要、结算摘要、`order.html` 的 Total BV 列（未登录 8 列 / 登录 9 列，grand 行 colspan 同步）、`shipping.html` 的 BV earned。取数用商品真实 `bv` 字段，不用 `price/1000` 近似。

### 认证态（调试必读）
- Auth 的 localStorage 键是 **`al.auth.user`**（`assets/js/app.js` 的 `STORAGE.AUTH`），**不是** `al.auth`。
- `seedDemoIfEmpty()`：只要 `al.auth.user` 存在就**不会**自动种入 demo；空 profile 首访会自动登录 `NG09246375`（Adaeze）。
- 想模拟真访客态：`localStorage.setItem('al.auth.user','null')`（字符串 `'null'` 使 `getItem` 为真值从而跳过种子，`JSON.parse` 得到 `null` → `isLoggedIn()` 为假）。

## 项目结构（2026-09-08 定稿）
- **纯 HTML 静态项目**：所有 `*.html` 页面 + `assets/` + `robots.txt` + `sitemap.xml`，无后端。
- **WordPress 已彻底移除（2026-09-08 用户确认）**：`wp-demo/`（329MB）、`wp-migration/`（迁移文档+商品CSV）、`CONTENT_DIFF_REPORT.md` 均已移入 `~/.Trash/`，用户明确不再需要 WordPress。不要再建议任何 WP 相关方案。

## 环境坑（重要）
- **assistant 用 `Bash run_in_background` 起的后台静态服务器会被沙箱回收**（几十秒~数分钟），表现为端口不再 LISTEN、curl 返回 502。不要把"页面加载不出来"当代码回归——先 `curl` + `lsof :8080` 判断服务器是否还在。
- 持久本地服务器的正确做法：让用户在自己终端跑 `cd /Users/wang/Documents/trae_projects/water && python3 -m http.server 8080`。
- 内置浏览器预览会缓存静态资源；开发期间用 `/tmp/no_cache_server.py`（`SimpleHTTPRequestHandler` 注入 no-cache 头）替代 `python -m http.server`。
- CfT 内置浏览器对 `localhost` 是远程沙箱视角，需经白名单（shield allow）才能访问本机服务；home 页 `snapshot -i` 会稳定返回 about:blank（hero 轮播活动导致），`screenshot`/`set viewport` 正常。
- `workbuddy_cloudstudio_deploy` 在 2026-08-26 试 3 次均 `fetch failed`，不可用。
- **Finder 自动化（osascript delete）在本机无权限**（错误 -10004）；移文件进废纸篓用 `/usr/bin/trash` 或直接 `mv ~/.Trash/` 可行。
- **本机视觉/功能验证可行且强烈推荐**：写**单进程** node 脚本（脚本内先 `http.createServer` 起静态服务，再启 puppeteer）→ 避免后台服务被沙箱回收。
  - 命令：`NODE_PATH=/Users/wang/.workbuddy/binaries/node/workspace/node_modules /Users/wang/.workbuddy/binaries/node/versions/22.22.2/bin/node <script>.js`
  - Chrome 路径：`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
  - 预设登录态用 `page.evaluateOnNewDocument` 写 **`al.auth.user`** + `al.memberData` + `al.cart`；**关掉 cookie 横幅要写 `al.cookies`**（`{essential:true,analytics:true,marketing:true,ts}` 的 JSON），写 `al.cookieConsent` 无效（键名不对，横幅照旧显示并挡住截图底部）。
  - 验证要点：监听 `pageerror` / `console` error；**截图要按元素截**（`elementHandle.screenshot()`），整页视口截图会因目标在折叠下方而完全看不出差异（还会出现多个渠道截图字节数相同的假象）。
  - 现成脚本：`.workbuddy/preview/verify-pay.js`（渠道/门控/访客态断言）、`verify-panels.js`（逐渠道元素级截图 + 面板文案去重）、`verify-account-prefs.js`（Profile 标签页结构）、`verify-country-lock.js`（Country 锁定）。
  - ⚠️ **account.html 的 Personal information 表单（`#profileForm`）有 HTML5 校验门槛**：Phone 是 `ProductCatalog.phoneFieldHTML()` 生成的 `required` tel 输入。夹具里 `al.auth.user` 若没有 `phone`，`form.checkValidity()` 为 false → **Chrome 直接不派发 submit**（只在 console 打一条不可聚焦 warning），表现为「点保存没反应」。写自动化前先把 `phone` 塞进夹具；调试表单提交不要用点击，直接 `form.requestSubmit()` / `dispatchEvent(new Event('submit',{cancelable:true,bubbles:true}))`。
