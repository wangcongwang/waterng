const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType, PageNumber, PageBreak
} = require("docx");

const CJK = "Microsoft YaHei"; // 中文字体，缺失时由 Word/Pages 自动替换
const FONT = "Arial";

const border = { style: BorderStyle.SINGLE, size: 1, color: "BFD3DE" };
const borders = { top: border, bottom: border, left: border, right: border };
const headerFill = { fill: "1F4E5F", type: ShadingType.CLEAR };
const zebraFill = { fill: "EEF4F7", type: ShadingType.CLEAR };

function cell(text, opts = {}) {
  const runs = Array.isArray(text)
    ? text.map(t => new TextRun({ text: t, font: CJK, size: opts.size || 20, bold: !!opts.bold, color: opts.color || "222222" }))
    : [new TextRun({ text, font: CJK, size: opts.size || 20, bold: !!opts.bold, color: opts.color || "222222" })];
  return new TableCell({
    borders,
    width: { size: opts.w || 3000, type: WidthType.DXA },
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 70, bottom: 70, left: 120, right: 120 },
    verticalAlign: "center",
    children: [new Paragraph({ children: runs, spacing: { line: 276 } })]
  });
}

function table(headers, rows, colWidths) {
  const total = colWidths.reduce((a, b) => a + b, 0);
  const head = new TableRow({
    children: headers.map((h, i) => cell(h, { bold: true, color: "FFFFFF", fill: "1F4E5F", w: colWidths[i] }))
  });
  const body = rows.map((r, ri) => new TableRow({
    children: r.map((c, i) => cell(c, { w: colWidths[i], fill: ri % 2 === 1 ? "EEF4F7" : undefined }))
  }));
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [head, ...body]
  });
}

function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 280, after: 140 },
    children: [new TextRun({ text, font: CJK, size: 28, bold: true, color: "1F4E5F" })] });
}
function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, font: CJK, size: 24, bold: true, color: "2C6B82" })] });
}
function p(text, opts = {}) {
  const runs = Array.isArray(text)
    ? text.map(t => new TextRun({ text: t, font: CJK, size: opts.size || 21, bold: !!t.bold }))
    : [new TextRun({ text, font: CJK, size: opts.size || 21 })];
  return new Paragraph({ spacing: { after: 80, line: 288 }, children: runs });
}
function bullet(text) {
  return new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 50, line: 288 },
    children: [new TextRun({ text, font: CJK, size: 21 })] });
}
function subBullet(text) {
  return new Paragraph({ numbering: { reference: "bullets", level: 1 }, spacing: { after: 40, line: 276 },
    children: [new TextRun({ text, font: CJK, size: 20 })] });
}
function note(text) {
  return new Paragraph({ spacing: { after: 120, line: 276 },
    children: [new TextRun({ text: "备注：", font: CJK, size: 20, bold: true, color: "B5651D" }),
               new TextRun({ text, font: CJK, size: 20, color: "555555" })] });
}

const children = [];

// ---- 封面标题 ----
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600, after: 120 },
  children: [new TextRun({ text: "WordPress ↔ AE 系统", font: CJK, size: 40, bold: true, color: "1F4E5F" })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
  children: [new TextRun({ text: "集成对接开发点清单（开发评审稿）", font: CJK, size: 28, bold: true, color: "2C6B82" })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
  children: [new TextRun({ text: "AquaLife / water 项目", font: CJK, size: 22, color: "666666" })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 },
  children: [new TextRun({ text: "文档版本 v1.0 ｜ 2026-09-28 ｜ 用途：与开发团队对接", font: FONT, size: 18, color: "999999" })] }));
children.push(new Paragraph({ children: [new PageBreak()] }));

// ---- 一、背景与目标 ----
children.push(h1("一、背景与目标"));
children.push(p("当前站点由两层构成：「WordPress / 营销展示层」（内容、SEO、流量入口，当前以静态页承载）与「AE 应用系统」（登录、购物车、结算、会员、支付等交易链路）。两层目前通过前端跳转与本地存储共享状态，尚未形成完整、可维护的对接规范。"));
children.push(p("本文档梳理 WordPress 营销层需要「链接 / 接入」AE 系统的全部功能开发点，供本次会议与开发逐一确认范围、责任边界与接口约定。"));
children.push(h2("目标"));
bullet("明确哪些入口需要从 WP 跳转到 AE，以及跳转携带的参数（如回跳地址 ?next=）。");
bullet("明确 WP 页面如何感知 AE 的登录态 / 游客态，并据此调整导航与 CTA。");
bullet("明确 AE 需向 WP 暴露的数据与接口（商品、会员、余额、订单）。");
bullet("沉淀统一约定（存储键、跳转协议、页面归属标识），避免各页面各自实现。");

// ---- 二、总体架构与边界 ----
children.push(h1("二、总体架构与边界"));
children.push(p("原则：WP 营销层不持有交易状态，只负责「展示、入口、状态感知与跳转」；AE 系统负责「认证、购物车、结算、会员、支付」等所有交易逻辑。两层状态通过浏览器端存储（localStorage / sessionStorage）与 URL 参数衔接。"));
children.push(table(
  ["层级", "职责（WP / 营销层）", "职责（AE 应用层）"],
  [
    ["展示 / 流量", "内容页、SEO、落地页、商品介绍、营销活动", "—"],
    ["认证", "提供「登录 / 注册」入口并回跳；感知登录态隐藏/显示入口", "登录、注册、会话管理、登出"],
    ["商品与购物车", "商品展示；未登录时把加购改为「Buy Now」跳转登录", "商品目录、加购、购物车、库存"],
    ["交易与支付", "跳转进入结算；不处理资金", "结算、订单、支付（卡/银行/余额等）"],
    ["会员", "展示会员权益入口；跳转会员中心与升级流程", "会员等级、复购、自动维护、升级、E-coin 余额"],
  ],
  [1800, 3780, 3780]
));

// ---- 三、对接责任矩阵 ----
children.push(h1("三、对接责任矩阵（速览）"));
children.push(table(
  ["开发点", "WP 侧职责", "AE 侧职责", "对接方式"],
  [
    ["1 认证与会话", "登录/注册入口 + 回跳 ?next=；按登录态显隐入口", "维护 al.auth.user；提供 isLoggedIn()", "localStorage + URL 参数"],
    ["2 页面归属标识", "渲染顶部 env banner（WP/AE 归属）", "—", "前端按登录态判定"],
    ["3 导航门控", "按登录/游客态渲染导航、购物车、Products 菜单", "—", "Auth + sessionStorage"],
    ["4 商品 CTA 门控", "未登录隐藏加购→「Buy Now」→新标签开登录", "登录后回跳商品页", "applyBuyNowGate + ?next="],
    ["5 购物车结算", "提供购物车/结算入口（guest-no-nav）", "购物车、结算、订单", "页面跳转"],
    ["6 支付层", "—", "卡/银行/余额(E-coin) 支付", "payment-methods.js"],
    ["7 会员流程", "会员中心/升级入口", "Welcome/复购/升级/自动维护", "AE 专属页"],
    ["8 复购", "双页入口（会员/游客）", "repeat-purchase 渲染与路由", "URL ?category= / ?guest="],
    ["9 游客态", "携带 ?guest=1 延续精简导航", "识别游客下单流程", "sessionStorage al.guestMode"],
    ["10 展示态", "纯营销页 data-display-only 不读登录态", "—", "isDisplayOnlyPage()"],
    ["11 数据与接口", "消费商品/会员/余额/订单数据", "提供数据层 API", "ProductCatalog 等"],
    ["12 国际化", "文案调用 T.tr，含 {n} 占位", "i18n 字段维护", "strings.js"],
  ],
  [1500, 2760, 2700, 2400]
));

// ---- 四、核心开发点 ----
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(h1("四、核心开发点（详细说明）"));

children.push(h2("1. 认证与会话打通（Auth / SSO）"));
bullet("登录入口：WP 页面右上角「Sign in」→ 新标签打开 login.html?next=<当前页>，登录后回跳。");
bullet("注册入口：营销页「Create your account」→ signup.html（AE 系统页面，恒标记为外部 AE 页）。");
bullet("登录态判定：统一入口为 window.Auth.isLoggedIn()，WP 各页面不得自行实现判定。");
bullet("登录态存储：localStorage 键 al.auth.user（常量 STORAGE.AUTH）。");
bullet("空 profile 默认行为：无订单时播种 demo 会员（NG09246375 / Adaeze Okonkwo），普通页默认「已登录 demo」；验证未登录需清 localStorage 或用隐身窗口。");
bullet("登出：header 与抽屉两处入口，登出后尝试 window.close()，被拦截则回退首页。");
note("若 WP 与 AE 最终部署到不同域名，纯前端 localStorage 共享将失效，需改为服务端 SSO / 共享 cookie 域，请会议确认部署拓扑。");

children.push(h2("2. 页面归属标识（Env Banner）"));
bullet("顶部标识条按登录态区分页面归属：未登录 → “此页面属于Wordpress页面”；已登录 → “此页面属于外部AE页面”。");
bullet("login.html / signup.html 恒标记为“外部AE页面”（无论登录态）。");
bullet("实现：renderEnvBanner()，常量 ENV_BANNER_GUEST / ENV_BANNER_MEMBER；display-only 页永远读为 Wordpress 页。");
note("该 banner 当前用于区分来源与调试/埋点，落地到生产前需确认是否对用户可见，或改为内部标识。");

children.push(h2("3. 导航与入口门控"));
bullet("主导航：登录态 / 游客态 / 普通未登录 显示不同菜单（renderHeader 统一处理）。");
bullet("购物车按钮：仅「已登录」或「游客下单流程(isGuestEntry)」显示；普通未登录隐藏。");
bullet("Products 菜单：已登录会员态隐藏主导航（含 Products）；普通未登录显示完整菜单。");
bullet("游客下单流程：由 login 页「不登录」按钮携带 ?guest=1，写入 sessionStorage al.guestMode，贯穿整个 checkout 旅程（商品页/购物车/结算）。");

children.push(h2("4. 商品页 CTA 门控（营销 → 交易）"));
bullet("未登录（“Wordpress 页”）商品页：隐藏「Add to cart」，改为「Buy Now」按钮。");
bullet("点击 Buy Now：新标签打开 login.html?next=<当前商品页>（携带完整 search），登录后回跳；弹窗被拦截则同标签回退。");
bullet("触发条件：!Auth.isLoggedIn()；覆盖静态 data-demo-add、product-detail 的 #detailAddToCart、网格页 .ek-card-addcart-btn[data-product]。");
bullet("网格页 products.html：由 renderProductCards 在未登录时直接渲染 Buy Now。");
bullet("商品详情页：BV 字段仅在 window.Auth.isLoggedIn() 时展示；文案统一英文 “Buy Now”。");

children.push(h2("5. 购物车与结算对接"));
bullet("购物车页 cart.html：采用 guest-no-nav 模式（游客态隐藏顶部导航，聚焦下单）。");
bullet("结算页 checkout.html：guest-no-nav 模式；支付渠道由 AE 提供。");
bullet("订单页 order.html：.odet-* 结构；order-receipt.js 可导出 Word 兼容 .doc。");
bullet("游客订单归属：guest 订单归属固定 Member ID NG000000001。");

children.push(h2("6. 支付层（Payment Methods）"));
bullet("共享层：payment-methods.js + qr.js + payment-methods.css，统一挂载各种支付方式。");
bullet("支付渠道：card / ussd / bank / paybank / visaqr，结算页额外提供 balance（账户余额）。");
bullet("余额支付（E-coin）：mountBalance 读取 ProductCatalog.getEcoinTotal(memberId)；余额 > 0 且 ≥ 订单总额才 isComplete；已注册 balance 方式。");
bullet("wire() 支持 includeBalance + balanceMemberId(fn) + balanceAmountId(选择器)；member-welcome / repurchase / upgrade 已开启余额支付。");

children.push(h2("7. 会员流程（AE 专属页）"));
bullet("页面：member-welcome / member-repurchase / member-auto-maintenance / member-upgrade。");
bullet("统一营销站风格：无 #app-header、隐藏主导航、顶部 sec-banner、内容区 .ek-container.member-container。");
bullet("Member ID 格式：AE/NG + 8 位数字；总部账号 AE000000001 / NG000000001 为特殊 9 位（/^(?:(?:NG|AE)\\d{8}|NG000000001|AE000000001)$/）；Member ID 与 Country 字段永久禁用 + 锁定提示。");
bullet("升级逻辑：等级阈值 LEVEL_BV={Member:0,Silver:300,Gold:900,Platinum:2700,Diamond:8100,Corporate:24300}；补差 BV = 目标阈值 − 当前阈值（≥0）；目标白名单 Silver/Gold，当前级标 (current) 且 disabled；VAT_RATE=0。");
bullet("保存门槛：已检会员 + 目标级 + ≥1 商品 + 商品 BV ≥ 补差 BV + 收货 5 必填 + 支付 isComplete；写 al.memberLevels、事件 al:member-level-changed、订单 source:'member-upgrade'；选余额调 ProductCatalog.debitEcoin。");

children.push(h2("8. 复购（Repeat Purchase）"));
bullet("双页：repeat-purchase.html（会员）/ guest-repeat-purchase.html（游客），共用 repeat-purchase.css + website.js renderRepeatPurchaseCards()。");
bullet("支持 ?category= 过滤；repeat-purchase 本身无支付，支付走 checkout.html。");
bullet("购物车 Continue shopping：guest → guest-repeat-purchase.html?guest=1；会员 → repeat-purchase.html。");

children.push(h2("9. 游客态（Guest Mode）"));
bullet("判定用「游客标记」而非登录态：sessionStorage al.guestMode == '1'。");
bullet("Auth.login() 会清掉 al.guestMode，真实会员登录后导航照常保留。");
bullet("适用 data-guest-no-nav 的页面：guest-repeat-purchase / cart / checkout / order。");

children.push(h2("10. 展示态 / 纯营销页（Display-only）"));
bullet("<body data-display-only=\"true\"> + app.js isDisplayOnlyPage()：真 → 不读不写登录态、跳过播种、header 强制未登录营销版。");
bullet("footer Products 固定为营销分类页；env banner 恒为 “Wordpress页面”。");
bullet("当前仅 index.html 使用；用于纯展示、不需交易能力的页面。");

children.push(h2("11. 数据接口 / 共享数据层（AE 需向 WP 提供）"));
bullet("商品目录：allProducts 数组；商品图字段 img，路径 assets/img/products/<category>/<img>。");
bullet("会员数据：al.memberData；会员等级 al.memberLevels。");
bullet("E-coin 余额：ProductCatalog.getEcoinTotal(memberId) / debitEcoin(memberId, amount)。");
bullet("订单：create / query，来源标记（如 'member-upgrade'），订单回执导出。");

children.push(h2("12. 国际化（i18n）"));
bullet("当前 i18n 在 assets/i18n/strings.js（仅 en）。");
bullet("带 {n} 占位符的文案必须 T.tr(key, { n }) 调用，禁止硬编码拼接。");
bullet("若 WP 与 AE 需扩展到多语言，需统一语言包加载与切换（当前 header 仅有 EN 切换占位）。");

// ---- 五、关键约定 ----
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(h1("五、关键约定（建议开发统一遵循）"));
children.push(h2("跳转协议"));
bullet("回跳地址统一用 ?next=<encodeURIComponent(相对路径+search)>；AE 登录/注册完成后读取并回跳。");
bullet("游客流程用 ?guest=1 透传，进入 checkout 旅程后写入 sessionStorage 持久化到该标签页。");
bullet("商品分类过滤用 ?category=<key>。");
children.push(h2("存储键约定"));
table(
  ["键", "类型", "含义"],
  [
    ["al.auth.user", "localStorage", "登录态用户对象（STORAGE.AUTH）"],
    ["al.guestMode", "sessionStorage", "按标签页的游客下单标记（STORAGE.GUEST）"],
    ["al.memberData", "localStorage", "会员资料与地址"],
    ["al.memberLevels", "localStorage", "会员等级记录"],
  ],
  [2600, 2200, 4560]
);
children.push(h2("状态判定入口"));
bullet("是否登录：window.Auth.isLoggedIn()。");
bullet("是否游客：sessionStorage.getItem('al.guestMode') === '1'。");
bullet("是否展示态：window.isDisplayOnlyPage()。");
bullet("是否需 Buy Now 门控：!Auth.isLoggedIn()（展示态恒门控）。");

// ---- 六、待确认事项与风险 ----
children.push(h1("六、待确认事项与风险"));
bullet("【部署拓扑】WP 与 AE 是否同域？不同域将导致 localStorage 共享失效，需服务端 SSO 方案。");
bullet("【技术栈】WP 营销层当前以静态页承载，是否最终仍用 WordPress？若用 WP，前端跳转/状态读取需以 WP 主题或插件方式落地。");
bullet("【登录态安全】纯前端 localStorage 登录态不具备安全性，是否需服务端会话 / token 校验？");
bullet("【env banner】顶部归属标识是否仅内部调试用，生产是否对外可见？");
bullet("【i18n 范围】是否需要在本次会议确定多语言（至少 en + 中文）的落地方式？");
bullet("【支付合规】card/ussd/bank/visaqr/balance 各渠道的对接方与回调，是否由 AE 统一封装供 WP 调用？");

children.push(new Paragraph({ spacing: { before: 300 },
  children: [new TextRun({ text: "— 文档结束 —", font: CJK, size: 20, color: "999999", italics: true })] }));

const doc = new Document({
  styles: {
    default: { document: { run: { font: FONT, size: 21 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal",
        run: { size: 28, bold: true, font: CJK }, paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal",
        run: { size: 24, bold: true, font: CJK }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [
        { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 540, hanging: 280 } } } },
        { level: 1, format: LevelFormat.BULLET, text: "◦", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 900, hanging: 280 } } } },
      ] },
    ]
  },
  sections: [{
    properties: {
      page: { size: { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1300, bottom: 1300, left: 1300 } }
    },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT,
      children: [new TextRun({ text: "WordPress ↔ AE 集成对接开发点清单", font: FONT, size: 16, color: "AAAAAA" })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "第 ", font: FONT, size: 16, color: "999999" }),
                 new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: "999999" }),
                 new TextRun({ text: " 页", font: FONT, size: 16, color: "999999" })] })] }) },
    children
  }]
});

const out = "/Users/wang/Documents/trae_projects/water/outputs/WP-AE-集成开发对接清单.docx";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(out, buf);
  console.log("WROTE", out, buf.length);
});
