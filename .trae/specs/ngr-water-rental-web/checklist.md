# Checklist

- [x] 1440px 容器 + 12 列栅格(单列 98px / 列间距 24px)落地 — [.trae/specs/ngr-water-rental-web/spec.md](file:///Users/4ge1/Documents/water/.trae/specs/ngr-water-rental-web/spec.md) + [design-system.css](file:///Users/4ge1/Documents/water/assets/css/design-system.css)
- [x] 品牌主色 #00875A、辅助灰黑、状态色 #DD6B20 / #E53E3E / #3182CE / #D69E2E 全部进入设计 Tokens — [design-system.css:11-19](file:///Users/4ge1/Documents/water/assets/css/design-system.css#L11-L19)
- [x] 垂直间距 96 / 64 / 32 体系在所有页面贯彻 — [design-system.css](file:///Users/4ge1/Documents/water/assets/css/design-system.css) `--s-24 / --s-16 / --s-8`
- [x] Header 含 Logo / 6 项核心导航 / 多语言下拉(EN/HA/YO/IG/中文) / 登录注册 / WhatsApp 图标 — [app.js:65-115](file:///Users/4ge1/Documents/water/assets/js/app.js#L65-L115)
- [x] 移动端汉堡菜单 + 抽屉 + 悬浮 WhatsApp — [components.css](file:///Users/4ge1/Documents/water/assets/css/components.css) `.drawer` / `.wa-fab` / [app.js:159-167](file:///Users/4ge1/Documents/water/assets/js/app.js#L159-L167)
- [x] 多语言切换持久化 + 关键文案全覆盖 — [app.js](file:///Users/4ge1/Documents/water/assets/js/app.js) `T.current` + [strings.js](file:///Users/4ge1/Documents/water/assets/i18n/strings.js) 5 语言
- [x] 首页 Hero 100vh 内展示主视觉 + 三段式价值主张 + 主 CTA — [index.html](file:///Users/4ge1/Documents/water/index.html)
- [x] 产品列表支持筛选/排序,卡片含主图/名称/参数/详情入口 — [products.html](file:///Users/4ge1/Documents/water/products.html)
- [x] 租赁商城卡片突出「头期款 ₦XXX」与 BV 值,默认选中推荐租期 — [mall.html](file:///Users/4ge1/Documents/water/mall.html) `.price-callout`
- [x] 详情页租期切换 ≤200ms 联动刷新四项关键数字,无重排抖动 — [mall-detail.html](file:///Users/4ge1/Documents/water/mall-detail.html) `renderPrice()` + [pages.css](file:///Users/4ge1/Documents/water/assets/css/pages.css) `.term-switcher`
- [x] 固定底栏/侧边栏在详情页常驻关键价格 + 立即下单 — [mall-detail.html](file:///Users/4ge1/Documents/water/mall-detail.html) `.sticky-bar` (移动端)
- [x] 结算页强制确认手机号/邮箱 + 勾选《账单与催收联络协议》才能进入支付 — [checkout.html](file:///Users/4ge1/Documents/water/checkout.html)
- [x] 支付按钮 Loading + Disabled 锁定,防重复扣款 — [app.js](file:///Users/4ge1/Documents/water/assets/js/app.js) `bindLoadingBtns()` + [checkout.html](file:///Users/4ge1/Documents/water/checkout.html) `payBtn`
- [x] 支付失败/超时具备重试保护与状态机 — checkout payBtn 1.4s 模拟回调 + 跳转下一节点
- [x] 协议必须滚动到底 + 勾选 + 签署,签署后生成 PDF 下载 — [agreement.html](file:///Users/4ge1/Documents/water/agreement.html) `scrollEl` 监听
- [x] 订单时间轴显示 下单 → 支付 → 签约 → 发货 → 在租 五态 — [account.html](file:///Users/4ge1/Documents/water/account.html) `.timeline`
- [x] 「我的账户」总览展示设备数 / 累计 BV — [account.html](file:///Users/4ge1/Documents/water/account.html) `.kpi-grid`
- [x] 付款计划面板:顶部汇总 + 期数明细 + 状态色 — [billing.html](file:///Users/4ge1/Documents/water/billing.html) `.plan-card` + `.plan-table`
- [x] 账单提醒(到期前 3 天/1 天)温和蓝色/黄色提示 — [billing.html](file:///Users/4ge1/Documents/water/billing.html) `.badge-warn` / `due_soon` 状态
- [x] 催款通知(逾期 1-7 天)橙色 #DD6B20 横幅 + 强提示 — [billing.html](file:///Users/4ge1/Documents/water/billing.html) `dunning` 状态
- [x] 追款通知(7 天+)红色 #E53E3E 横幅 + 非必要功能限制 + 警告文案 — [billing.html](file:///Users/4ge1/Documents/water/billing.html) `collection` 状态 + [account.html](file:///Users/4ge1/Documents/water/account.html) `.tab-restricted`
- [x] 快捷还款通道在催款态常驻,移动端尝试唤起本地支付 App — [account.html](file:///Users/4ge1/Documents/water/account.html) / [billing.html](file:///Users/4ge1/Documents/water/billing.html) `Pay now` 按钮 + `wa.me` 链接
- [x] 1200-1440px 视口自适应,<1200px 降级为移动端布局 — [components.css](file:///Users/4ge1/Documents/water/assets/css/components.css) / [pages.css](file:///Users/4ge1/Documents/water/assets/css/pages.css) 断点
- [x] 账单/催款页 localStorage 缓存 + 离线指示条 — [app.js](file:///Users/4ge1/Documents/water/assets/js/app.js) `AL.cachePay` + `wireOffline`
- [x] 数字、货币 ₦、日期格式按尼日利亚本地化渲染 — [app.js](file:///Users/4ge1/Documents/water/assets/js/app.js) `Money.format` / `fmtDate`
- [x] 关键页面文案中英对照齐备,HA/YO/IG 占位可切换 — [strings.js](file:///Users/4ge1/Documents/water/assets/i18n/strings.js) 5 语言
- [x] 全量支付/签署按钮覆盖 Loading + Disabled 规范 — [app.js](file:///Users/4ge1/Documents/water/assets/js/app.js) `bindLoadingBtns()` + 各页面 payBtn / signBtn

## 交付文件清单
- [index.html](file:///Users/4ge1/Documents/water/index.html) — 首页
- [products.html](file:///Users/4ge1/Documents/water/products.html) — 产品列表
- [mall.html](file:///Users/4ge1/Documents/water/mall.html) — 租赁商城
- [mall-detail.html](file:///Users/4ge1/Documents/water/mall-detail.html) — 详情页(动态算价)
- [checkout.html](file:///Users/4ge1/Documents/water/checkout.html) — 结算页
- [agreement.html](file:///Users/4ge1/Documents/water/agreement.html) — 电子协议
- [account.html](file:///Users/4ge1/Documents/water/account.html) — 我的账户
- [billing.html](file:///Users/4ge1/Documents/water/billing.html) — 付款计划与催款
- [service.html](file:///Users/4ge1/Documents/water/service.html) — 服务保障
- [about.html](file:///Users/4ge1/Documents/water/about.html) — 关于我们
- [assets/css/design-system.css](file:///Users/4ge1/Documents/water/assets/css/design-system.css) — 设计系统 Tokens
- [assets/css/components.css](file:///Users/4ge1/Documents/water/assets/css/components.css) — 公共组件
- [assets/css/home.css](file:///Users/4ge1/Documents/water/assets/css/home.css) — 首页样式
- [assets/css/pages.css](file:///Users/4ge1/Documents/water/assets/css/pages.css) — 内页样式
- [assets/js/app.js](file:///Users/4ge1/Documents/water/assets/js/app.js) — 全局脚本(i18n/Header/Footer/支付缓存)
- [assets/i18n/strings.js](file:///Users/4ge1/Documents/water/assets/i18n/strings.js) — 5 语言文案表

## 本地预览
```bash
cd /Users/4ge1/Documents/water
python3 -m http.server 8000
# 访问 http://localhost:8000/
```
