# STORY.md — AquaLife / Elken 前端系统讲解

## ① 用户意图对齐

**目标受众**：项目负责人（业务方 + 技术负责人）。场合是内部功能讲解会 / 内训，一次讲完，讲完要做现场演示。

**核心目标**：讲完后，负责人要能（1）清楚说出下单、注册、账户奖金三条链路的完整步骤与数据流向；（2）明确当前哪些是"已实现"、哪些是"预留/未接线"，避免对外承诺不存在的功能；（3）能自己打开页面把流程点一遍。

**PPT 长度**：25 页。Hero 页配额 7 页（28%），落在 20–30% 区间内。

**视觉调性**：克制、工程感、数据清晰、与产品界面同源。

**内容边界**：
- **必讲**：下单链路 6 环节、3 步步骤条、5 种支付方式、订单号与状态、BV 归属规则；注册 7 分区与 Member ID 规则；账户 4 个 Tab、奖金双 KPI 计算口径、9 类奖金、资金闭环、五条会员业务线。
- **不讲**：后台管理系统 / 服务端逻辑（本项目无后端）；具体佣金百分比（代码中不存在）；收益承诺。
- **禁碰**：不得把预留文案（Pay now / Track / Urge shipping、OTP 注册、多语言）说成已上线功能。

---

## ② 页面布局骨架

**页面总数与分章**（25 页）
- 开篇（P01–P04）：封面 → 讲解路线图 → 系统全览 → 页面地图
- 第一章 下单流程（P05–P13）：转场 + 6 步流程 + 购物车 + 配送自提 + 支付方式 + 摘要与按钮 + 订单落库 + BV 归属 + 讲解注意
- 第二章 会员注册与登录（P14–P17）：转场 + 注册 7 分区 + Member ID 与推荐人 + 校验与提交后行为
- 第三章 我的账户与奖金后台（P18–P24）：转场 + 4 Tab + 奖金双 KPI + 奖金体系 + 资金闭环 + 五条业务线 + 演示动线
- 收束（P25）：结束页

**Hero 页定位**：P01 封面、P04 页面地图、P09 支付方式、P12 BV 归属、P16 Member ID 规则、P20 奖金双 KPI、P25 结束页 —— 共 7 页。任意两个 Hero 之间至少隔 1 个 Supporting 页；封面与结束页默认 Hero。

**rhythm 曲线**
- peak：P01、P04、P09、P12、P16、P20、P25
- transition：P05、P14、P18
- valley：P02、P03、P06、P07、P08、P10、P11、P13、P15、P17、P19、P21、P22、P23、P24
- 检查：最长连续 valley 为 P21–P24（4 页）→ 在 P24 与 P25（peak）之间由 P25 收束打破；P06–P08 前有 P05 transition、后有 P09 peak，无 ≥3 连续 valley 且无过渡的情况。

**非对称版式预算**：25 页中 20 页使用非对称版式（80%），远超 40% 下限。
**对称版式预算**：仅 P19（四个 Tab）与 P23（五条业务线）使用 `N卡片横排` 这一对称结构，恰好用满 2 页上限；P02 走非对称的 `左标题+右内容`。其余全部非对称。Hero 页不使用 `N卡片横排`。

---

## ③ 页面大纲

| # | 文件 | title | type | role | rhythm | layout | visual | visual_role | density | anti_pattern | description |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | slide_01_cover.jsx | 三条链路，一次讲清 | cover | hero | peak | 全幅图+骑线文字 | L1: cover_bg.png（全幅铺底，占 B 区 100%） | atmosphere | 字数约 45 / 图 1 / 留白约 30% | 禁止把标题塞进居中卡片；禁止加 200×70 装饰小图 | 深蓝水波底图 + 左侧大字标题，点明三项内容 |
| 02 | slide_02_agenda.jsx | 今天讲什么 | catalog | supporting | valley | 左标题+右内容 | L3: 品牌角标 + 编号列表 | — | 字数约 190 / 图 0 / 留白约 22% | 禁止四卡片等宽横排；禁止每项少于 25 字 | 三个章节 + 演示动线，每项写清"讲什么、你重点看什么" |
| 03 | slide_03_landscape.jsx | 先看全局：这是一个纯前端系统 | content | supporting | valley | 非对称双栏（65:35） | Diagram(localStorage 键位表) | evidence | 字数约 240 / 图 1 / 留白约 18% | 禁止把存储键画成无标注的方框；禁止 50:50 等分 | 右侧窄栏列 6 个核心 localStorage 键，左侧说明无后端架构与三个数据桶 |
| 04 | slide_04_pagemap.jsx | 页面地图：从商品到订单 | content | hero | peak | 左大图+右侧文字 | Diagram(全链路横向流程图，占左 62%) | anchor | 字数约 150 / 图 1 / 留白约 25% | 禁止用等宽卡片代表页面；禁止流程图里省略 shipping.html | 主流程 6 个页面节点横向贯通，右侧点出两个入口模式（购物车 / 单品直购） |
| 05 | slide_05_section_flow.jsx | 第一章 · 下单流程 | section | transition | transition | 全屏视觉+大标题 | L1: section_flow.png（全幅，占 B 区 70%） | atmosphere | 字数约 32 / 图 1 / 留白约 45% | 禁止四卡片预览；禁止铺满正文段落 | 章节大字 + 一句小标点出本章 6 个环节 |
| 06 | slide_06_flow_steps.jsx | 下单六步：用户实际点了什么 | content | supporting | valley | 非对称双栏（60:40） | Diagram(竖向 6 步流程条) | evidence | 字数约 260 / 图 1 / 留白约 16% | 禁止把 6 步做成 3×2 等宽卡片；禁止省略按钮文案 | 六步每步写清用户动作 + 界面英文按钮原文 |
| 07 | slide_07_cart.jsx | 第 1–2 步：加购与购物车 | content | supporting | valley | 上大图+下方卡片 | Diagram(购物车页结构示意，占上 55%) | evidence | 字数约 230 / 图 1 / 留白约 20% | 禁止把购物车截图缩成缩略图；禁止跳过数量上限 99 | 加购合并规则、数量 1–99、四项汇总口径、两个操作 |
| 08 | slide_08_shipping.jsx | 第 3 步：配送方式与自提点 | content | supporting | valley | 左标题+右内容 | Diagram(配送/自提分支 + 3 自提点表) | evidence | 字数约 250 / 图 1 / 留白约 18% | 禁止只写"支持配送和自提"而不列自提点；禁止自提点用无地址的文字块 | 两种配送方式字段差异 + 三个自提点地址与营业时间 |
| 09 | slide_09_payment.jsx | 第 4 步：五种支付方式 | content | hero | peak | 非对称双栏（62:38） | Diagram(5 支付方式对比矩阵) | anchor | 字数约 280 / 图 1 / 留白约 15% | 禁止把 5 种支付塞进等宽卡片；禁止漏掉 balance 选项 | 五种支付方式全量对比：副标题、要填什么、关键提示 |
| 10 | slide_10_summary.jsx | 第 5 步：订单摘要与下单按钮 | content | supporting | valley | 非对称版式（左摘要右条件） | Diagram(摘要行结构 + 按钮可点条件清单) | evidence | 字数约 240 / 图 1 / 留白约 20% | 禁止把"可点条件"写成一句话概述；禁止漏掉数量联动 | 摘要区每一行逐项说明，右侧列 4 类按钮放行条件 |
| 11 | slide_11_orderdata.jsx | 第 6 步：订单怎么落库 | content | supporting | valley | 左大图+右侧文字 | Diagram(订单对象字段树 + 订单号生成规则) | evidence | 字数约 270 / 图 1 / 留白约 18% | 禁止用纯文本罗列字段；禁止漏掉 operatorId | 订单对象字段分组、订单号字符集规则、状态取值对照 |
| 12 | slide_12_bv.jsx | BV 归谁：一条容易讲错的规则 | content | hero | peak | 巨型数字+洞察 | 大数字 + Diagram(归因分支) | anchor | 字数约 180 / 图 1 / 留白约 32% | 禁止把规则写成小字注解；禁止省略防自荐判断 | 巨型呈现 1 BV / ₦1,000 与 100% 上浮规则 |
| 13 | slide_13_flow_notes.jsx | 下单流程 · 讲解时要注意 | content | supporting | valley | 非对称双栏（40:60） | Diagram(注意事项编号清单) | evidence | 字数约 300 / 图 1 / 留白约 14% | 禁止把缺口写成"小问题"；禁止承诺取消订单等未实现功能 | 5 条实现缺口 + 对外口径建议 |
| 14 | slide_14_section_signup.jsx | 第二章 · 会员注册与登录 | section | transition | transition | 全屏视觉+大标题 | L1: section_signup.png（全幅，占 B 区 70%） | atmosphere | 字数约 30 / 图 1 / 留白约 45% | 禁止四卡片预览；禁止铺满正文段落 | 章节大字 + 一句小标点出注册与登录 |
| 15 | slide_15_signup_form.jsx | 注册：一页七个分区 | content | supporting | valley | 左大图+右侧文字 | Diagram(7 分区纵向结构 + 必填标记) | evidence | 字数约 290 / 图 1 / 留白约 16% | 禁止把 7 分区画成同尺寸方块；禁止不标必填 | 七个分区逐条列出字段与必填/选填，右侧点出真实必填 8 项 |
| 16 | slide_16_memberid.jsx | Member ID：NG + 8 位 | content | hero | peak | 巨型数字+洞察 | 大数字 + Diagram(生成与校验三处落点) | anchor | 字数约 200 / 图 1 / 留白约 30% | 禁止只写"随机生成"而不说字符集；禁止省略三处校验 | 巨型展示 ID 格式，右侧列生成点与三处校验点 |
| 17 | slide_17_submit.jsx | 提交之后：自动登录与推荐关系 | content | supporting | valley | 非对称双栏（58:42） | Diagram(提交后写库路径 + 登录校验链) | evidence | 字数约 280 / 图 1 / 留白约 17% | 禁止把 5 个写入键合并成一句；禁止漏 ?next= 回跳 | 注册提交写入清单 + 登录页校验链与回跳规则 |
| 18 | slide_18_section_account.jsx | 第三章 · 我的账户与奖金后台 | section | transition | transition | 全屏视觉+大标题 | L1: section_account.png（全幅，占 B 区 70%） | atmosphere | 字数约 30 / 图 1 / 留白约 45% | 禁止四卡片预览；禁止铺满正文段落 | 章节大字 + 一句小标点出奖金与团队 |
| 19 | slide_19_tabs.jsx | 我的账户：四个 Tab | content | supporting | valley | N卡片横排（4 卡） | Diagram(4 Tab 卡片 + 每 Tab 关键内容) | evidence | 字数约 420（每卡 ≥ 100）/ 图 0 / 留白约 18% | 禁止卡片高度不齐；禁止每卡文字少于 80 字 | 四个 Tab 各写清包含什么、给谁看 |
| 20 | slide_20_bonus_kpi.jsx | 奖金看板：两个数字怎么算出来 | content | hero | peak | 巨型数字+洞察 | 大数字 + Diagram(计算口径拆解) | anchor | 字数约 200 / 图 1 / 留白约 30% | 禁止把计算式藏进小字；禁止省略 referral BV 的叠加 | 巨型双 KPI，拆解 Member Bonus = 自购 BV + 推荐 BV |
| 21 | slide_21_bonus_system.jsx | 奖金体系：九类 · 周期 · 累计 | content | supporting | valley | 非对称双栏（55:45） | Diagram(9 类奖金列表 + 周期表) | evidence | 字数约 320 / 图 1 / 留白约 15% | 禁止省略任何一个奖金名称；禁止把周期表数值改写成整数 | 九类奖金名全列 + 历史周期 165–161 演示数值对照 |
| 22 | slide_22_funds.jsx | 资金闭环：充值 · 转账 · Ecoin | content | supporting | valley | 上大图+下方卡片 | Diagram(Bonus ↔ Ecoin 流转图) | evidence | 字数约 280 / 图 1 / 留白约 18% | 禁止把转账两种类型混为一谈；禁止漏余额校验 | 两种转账类型 + 充值四字段 + 可用余额取值来源 |
| 23 | slide_23_member_biz.jsx | 五条会员业务线 | content | supporting | valley | N卡片横排（5 卡 → 2+3 错位） | Diagram(五条业务线卡片，含 90 BV 门槛) | evidence | 字数约 500（每卡 ≥ 100）/ 图 0 / 留白约 15% | 禁止把 90 BV 门槛写成可选提示；禁止五卡等宽同高 | Welcome Pack / Repeat Purchase / Auto-Maintenance / Upgrade / Team Inquiry 逐条讲清 |
| 24 | slide_24_demo.jsx | 现场演示动线 | content | supporting | valley | 左标题+右内容 | Diagram(演示步骤时间轴) | evidence | 字数约 300 / 图 1 / 留白约 16% | 禁止写成"打开页面演示"这类空话；禁止漏掉演示前准备 | 从注册到奖金看板的点击顺序 + 演示前必做的两项准备 |
| 25 | slide_25_end.jsx | 记住三件事 | ending | hero | peak | 居中金句/巨型数字 | 大数字 + 极简底纹 | anchor | 字数约 40 / 图 0 / 留白约 45% | 禁止罗列全篇要点；禁止加二维码等无关元素 | 三句收束 + 落款 |

---

## Checklist 自检

- [x] Hero 页 7 个（28%），在 20–30% 区间
- [x] 无连续 ≥ 3 页同为 supporting + valley（章节转场页定期打断）
- [x] `N卡片横排` 出现 2 次（P19、P23），未超 2 次上限
- [x] 非对称版式 20/25 = 80% ≥ 40%
- [x] 无相邻两页版式相同
- [x] `左大图+右侧文字`(P04/P11/P15) + `非对称双栏`(P03/P06/P09/P13/P17/P21) = 9 页 = 36% ≤ 40%
- [x] 每页均含 role / rhythm / visual_role / anti_pattern
