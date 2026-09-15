# STORY.md — 三条下单路径与账户奖金落点

## ① 用户意图对齐

**目标受众**：项目负责人（业务方 + 技术负责人）。内部功能讲解会 + 现场演示。

**核心目标**：讲完后负责人能区分三种下单情形的**入口、订单归属、奖金归属、账户落点**四件事，并明确当前实现里"访客订单不入账户资产"这条边界，避免对外误承诺。

**PPT 长度**：31 页。Hero 页 9 页（29%），落在 20–30% 区间。

**视觉调性**：克制、工程感、三色分区（用颜色区分三条路径）、与产品界面同源。

**内容边界**：
- **必讲**：三条路径的登录守卫差异、访客订单 `memberId` 为 null 的后果、BV 全额上浮规则、注册路径订单的字段形态差异、登录后多出来的可见项、账户里的订单分桶与奖金 KPI 口径。
- **不讲**：佣金比例（代码中不存在）、服务端逻辑（无后端）、具体收益数字。
- **禁碰**：不得说"访客订单会自动并入新账号"（实际是反向的：会被剔除删除）；不得把预留文案说成已上线功能。

---

## ② 页面布局骨架

**色彩分区约定**：路径一（访客）用主色深蓝 `#202259`；路径二（注册）用辅色青 `#2AA7CF`；路径三（已有账户）用强调粉 `#F287B7`。四条路径章节页与总览页沿用该对应色，全场一致。

**页面总数与分章**（31 页）
- 开篇（P01–P04）：封面 → 讲解路线图 → 三条路径总览对比 → 全局前提
- 路径一 · 没有账号直接下单（P05–P09）：章节 → 访客能走多远 → 隐藏与禁用清单 → 订单归谁与 BV 去向 → 三个真相
- 路径二 · 注册账户去购买（P10–P14）：章节 → 注册即首购七分区 → Member ID 与推荐人默认值 → 提交即生成订单 → 注册订单的形态差异
- 路径三 · 已有账户去购买（P15–P18）：章节 → 登录后下单 → 登录才多出来的可见项 → 三条路径落点对比
- 共用下单界面（P19–P24）：章节 → 六步与购物车 → 配送与自提点 → 五种支付 → 摘要与按钮放行 → 订单落库
- 共同的账户落点（P25–P28）：账户四个 Tab → 订单在账户里怎么展示 → 奖金双 KPI → 九类奖金与资金闭环
- 收尾（P29–P31）：演示动线 → 讲解注意 → 结束页

**Hero 页定位**：P01 封面、P03 三条路径总览、P08 访客订单归谁、P12 Member ID 与推荐人、P18 落点对比、P22 五种支付、P25 账户四个 Tab、P27 奖金双 KPI、P31 结束页 —— 共 9 页（29%）。任意两个 Hero 之间至少隔 1 个 Supporting 页。

**rhythm 曲线**
- peak：P01、P03、P08、P12、P18、P22、P25、P27、P31
- transition：P05、P10、P15、P19
- valley：其余 18 页
- 最长连续 valley 为 2 页（P06–P07、P13–P14、P16–P17、P23–P24、P29–P30），均有 peak 或 transition 打断。

**版式预算**：非对称版式 24/31 = 77%；`左大图+右侧文字`(P07/P11/P20/P26) + `非对称双栏`(P03/P09/P14/P17/P21/P28/P30) = 11 页 = 35.5%（≤40% 上限）。`N卡片横排` 未使用。`全屏视觉+大标题` 仅用于 4 个章节过渡页。

---

## ③ 页面大纲

| # | 文件 | title | type | role | rhythm | layout | visual | visual_role | density | anti_pattern | description |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | slide_01_cover.jsx | 三种下单路径，一个账户落点 | cover | hero | peak | 全幅图+骑线文字 | L1: cover_bg.jpg（全幅） | atmosphere | 字数约 50 / 图 1 / 留白 32% | 禁止标题塞进居中卡片；禁止 200×70 装饰小图 | 深蓝水面底图 + 左侧大字，点明三条路径 |
| 02 | slide_02_agenda.jsx | 今天的讲解路线 | catalog | supporting | valley | 左标题+右内容 | L3 角标 + 编号列表 | — | 字数约 210 / 图 0 / 留白 20% | 禁止四卡片等宽横排；禁止每项少于 40 字 | 四个板块 + 一句话说明每块要解决什么疑问 |
| 03 | slide_03_paths.jsx | 三条路径，差在四个地方 | content | hero | peak | 非对称双栏 | 大表格（三列对比） | anchor | 字数约 260 / 图 1 / 留白 16% | 禁止把三条路径画成等宽三卡片；禁止省略"订单归属"行 | 入口 / 订单归属 / 奖金归属 / 账户落点四行三列对比 |
| 04 | slide_04_landscape.jsx | 前提：这是一个纯前端系统 | content | supporting | valley | 左标题+右内容 | Diagram(六个存储键) | evidence | 字数约 240 / 图 1 / 留白 17% | 禁止把存储键画成无标注方框；禁止漏 al.auth.user | 无后端架构 + 六个 localStorage 键 |
| 05 | slide_05_section_guest.jsx | 路径一 · 没有账号直接下单 | section | transition | transition | 全屏视觉+大标题 | L1: section_flow.jpg | atmosphere | 字数约 34 / 图 1 / 留白 45% | 禁止四卡片预览；禁止铺满正文段落 | 章节大字 + 小标点出访客路径四个待解问题 |
| 06 | slide_06_guest_reach.jsx | 访客能走多远 | content | supporting | valley | 上大图+下方卡片 | Diagram(全站登录守卫分布) | evidence | 字数约 250 / 图 1 / 留白 18% | 禁止说"访客下单受限"；禁止漏 account.html 是唯一守卫 | 全站只有账户页有登录守卫，访客可完整下单 |
| 07 | slide_07_guest_hidden.jsx | 访客态下看不到什么 | content | supporting | valley | 左大图+右侧文字 | Diagram(四处隐藏/禁用清单) | evidence | 字数约 280 / 图 1 / 留白 16% | 禁止只写"部分功能隐藏"；禁止漏余额选项被禁用 | 四处隐藏禁用 + 一处反向不一致 |
| 08 | slide_08_guest_bv.jsx | 访客订单归谁 | content | hero | peak | 巨型数字+洞察 | 大数字 + Diagram(归属判断) | anchor | 字数约 200 / 图 1 / 留白 30% | 禁止把小字注解当结论；禁止省略 memberId 为 null | 巨型呈现 memberId 为 null 与 BV 100% 上浮 |
| 09 | slide_09_guest_truth.jsx | 访客下单后的三个真相 | content | supporting | valley | 非对称双栏 | Diagram(三个结论卡) | evidence | 字数约 300 / 图 1 / 留白 15% | 禁止含糊说"订单会保留"；禁止承诺访客单会并入新账号 | 订单可查但入不了账户、会被删除、BV 归分享者 |
| 10 | slide_10_section_signup.jsx | 路径二 · 注册账户去购买 | section | transition | transition | 全屏视觉+大标题 | L1: section_signup.jpg | atmosphere | 字数约 32 / 图 1 / 留白 45% | 禁止四卡片预览；禁止铺满正文段落 | 章节大字 + 小标点出"注册即首购" |
| 11 | slide_11_signup_form.jsx | 注册即首购：一页七个分区 | content | supporting | valley | 左大图+右侧文字 | Diagram(七分区纵向结构) | evidence | 字数约 300 / 图 1 / 留白 15% | 禁止把七分区画成同尺寸方块；禁止不标必填 | 七个分区逐条 + 真实必填八项 |
| 12 | slide_12_memberid.jsx | Member ID 与推荐人默认值 | content | hero | peak | 巨型数字+洞察 | 92px ID 字面量 + Diagram(两处默认值) | anchor | 字数约 210 / 图 1 / 留白 28% | 禁止只讲 ID 不讲默认推荐人；禁止省略三处校验 | ID 规则 + 推荐人字段默认 NG00000001 这件事 |
| 13 | slide_13_submit.jsx | 提交即下单并自动登录 | content | supporting | valley | 左标题+右内容 | Diagram(提交后写入路径) | evidence | 字数约 290 / 图 1 / 留白 16% | 禁止把五处写入合并成一句；禁止漏倒计时跳转 | 注册提交同时生成订单、写购物车、记账、自动登录 |
| 14 | slide_14_signup_order.jsx | 注册订单在账户里的样子 | content | supporting | valley | 非对称双栏 | Diagram(字段形态差异对照) | evidence | 字数约 300 / 图 1 / 留白 15% | 禁止把差异写成"小瑕疵"；禁止漏地址与付款状态两处 | 与结算下单的单字段形态差异及可见后果 |
| 15 | slide_15_section_member.jsx | 路径三 · 已有账户去购买 | section | transition | transition | 全屏视觉+大标题 | L1: section_account.jpg | atmosphere | 字数约 30 / 图 1 / 留白 45% | 禁止四卡片预览；禁止铺满正文段落 | 章节大字 + 小标点出登录态带来的差异 |
| 16 | slide_16_member_flow.jsx | 登录后下单：多出来的能力 | content | supporting | valley | 上大图+下方卡片 | Diagram(登录/未登录双列对照) | evidence | 字数约 280 / 图 1 / 留白 17% | 禁止只列"能保存地址"；禁止漏余额支付被解锁 | 登录解锁的六项能力 + 下单后的账户可见结果 |
| 17 | slide_17_visible_diff.jsx | 登录才看得见的六处 | content | supporting | valley | 非对称双栏 | Diagram(六项差异清单) | evidence | 字数约 310 / 图 1 / 留白 14% | 禁止漏掉余额支付解锁；禁止把顶栏变化当作无关细节 | 商品 BV 徽标、摘要 BV 行、已保存地址、余额支付、地址回写、顶栏与抽屉 |
| 18 | slide_18_outcomes.jsx | 三条路径的落点对比 | content | hero | peak | 图表+洞察 | 大表格 + 洞察框 | anchor | 字数约 300 / 图 1 / 留白 15% | 禁止用等宽三卡片替代对比表；禁止漏"是否计入奖金"列 | 订单桶 / 账户可见性 / 是否计入奖金 / 单状态 |
| 19 | slide_19_section_common.jsx | 三条路径共用的下单界面 | section | transition | transition | 全屏视觉+大标题 | L1: section_flow.jpg | atmosphere | 字数约 28 / 图 1 / 留白 45% | 禁止四卡片预览；禁止铺满正文段落 | 章节大字 + 小标点出"操作动作三条路径一致" |
| 20 | slide_20_flow_steps.jsx | 下单六步与购物车 | content | supporting | valley | 左大图+右侧文字 | Diagram(竖向六步) | evidence | 字数约 290 / 图 1 / 留白 15% | 禁止省略界面按钮英文原文；禁止漏数量上限 99 | 六步动线 + 购物车四条规则 |
| 21 | slide_21_shipping.jsx | 配送方式与自提点 | content | supporting | valley | 非对称双栏 | Diagram(两种配送分支 + 三自提点) | evidence | 字数约 260 / 图 1 / 留白 16% | 禁止只写"支持配送和自提"；禁止自提点缺地址 | 两种配送方式 + 三个自提点地址与营业时间 |
| 22 | slide_22_payment.jsx | 五种支付方式 | content | hero | peak | 巨型数字+洞察 | 大数字 + Diagram(五方式矩阵) | anchor | 字数约 290 / 图 1 / 留白 15% | 禁止把五种支付塞进等宽卡片；禁止漏余额支付 | 五种方式全列，含访客态下单被禁用的那一项 |
| 23 | slide_23_summary.jsx | 订单摘要与下单按钮 | content | supporting | valley | 左标题+右内容 | Diagram(摘要五行 + 放行条件) | evidence | 字数约 280 / 图 1 / 留白 15% | 禁止把放行条件写成一句概述；禁止漏邮箱格式校验 | 摘要逐行 + 四类放行条件 |
| 24 | slide_24_orderdata.jsx | 订单落库与订单号 | content | supporting | valley | 上大图+下方卡片 | Diagram(字段分组 + 订单号规则) | evidence | 字数约 300 / 图 1 / 留白 16% | 禁止用纯文本罗列字段；禁止漏落库顺序缺陷 | 字段六组、订单号规则、状态取值、写入顺序问题 |
| 25 | slide_25_tabs.jsx | 我的账户：四个 Tab | content | hero | peak | 巨型数字+洞察 | 大数字 + Diagram(四 Tab 摘要) | anchor | 字数约 240 / 图 1 / 留白 28% | 禁止把四个 Tab 做成等宽卡片；禁止漏 Sponsor Network | 巨型呈现四个 Tab 与各自承载的信息 |
| 26 | slide_26_account_orders.jsx | 订单在账户里怎么展示 | content | supporting | valley | 左大图+右侧文字 | Diagram(订单卡结构 + 分桶依据) | evidence | 字数约 300 / 图 1 / 留白 15% | 禁止只写"能看到订单"；禁止漏导出与状态标签 | 分桶依据、表格列、状态标签、导出、地址列表现 |
| 27 | slide_27_bonus_kpi.jsx | 奖金看板：两个数字怎么算 | content | hero | peak | 巨型数字+洞察 | 大数字 + Diagram(口径拆解) | anchor | 字数约 210 / 图 1 / 留白 30% | 禁止把计算式藏进小字；禁止漏推荐 BV 叠加 | Bonus = 自购 BV + 推荐 BV；Ecoin 独立台账 |
| 28 | slide_28_bonus_system.jsx | 九类奖金与资金闭环 | content | supporting | valley | 非对称双栏 | Diagram(九类名称 + 流转图) | evidence | 字数约 340 / 图 1 / 留白 14% | 禁止省略任一奖金名称；禁止把余额校验说成自动 | 九类奖金名全列 + 充值转账四条流转路径 |
| 29 | slide_29_demo.jsx | 演示动线：三条路径各走一遍 | content | supporting | valley | 左标题+右内容 | Diagram(三段演示时间轴) | evidence | 字数约 320 / 图 1 / 留白 14% | 禁止写"打开页面演示"这类空话；禁止漏演示前准备 | 演示前两步准备 + 三条路径的点击顺序 |
| 30 | slide_30_notes.jsx | 讲解注意：需要对齐的十点 | content | supporting | valley | 非对称双栏 | Diagram(编号清单) | evidence | 字数约 360 / 图 1 / 留白 13% | 禁止把缺口写成"小问题"；禁止承诺未实现功能 | 10 条实现缺口与对外口径建议 |
| 31 | slide_31_end.jsx | 记住四件事 | ending | hero | peak | 居中金句/巨型数字 | 大数字 + 极简底纹 | anchor | 字数约 50 / 图 0 / 留白 45% | 禁止罗列全篇要点；禁止加二维码等无关元素 | 四句收束 + 落款 |

---

## Checklist 自检

- [x] Hero 页 9 个（29%），在 20–30% 区间
- [x] 无连续 ≥ 3 页同为 valley（P23–P24 后由 P25 打断，P29–P30 后由 P31 打断）
- [x] `N卡片横排` 未使用（0 ≤ 2）
- [x] 非对称版式 24/31 = 77% ≥ 40%
- [x] 无相邻两页版式相同
- [x] `左大图+右侧文字` + `非对称双栏` = 11 页 = 35.5% ≤ 40%
- [x] 每页均含 role / rhythm / visual_role / anti_pattern
