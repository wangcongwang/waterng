# DESIGN.md — 三条下单路径与账户奖金落点

> 本文件是 STORY.md 与逐页源文件之间的**契约**。逐页生成时严格对照，不得逐页随机发挥。

---

## 1. 画布与母版（A/B/C 三区）

- **画布**：1280 × 720 px（16:9）
- **页面 padding**：上下 20px、左右 60px
- **内容可用宽度**：1280 − 60×2 = **1160px**
- **内容可用高度**：720 − 20×2 = **680px**

| 母版区 | 垂直位置 | 高度 | 内容规则 |
| :--- | :--- | :--- | :--- |
| **A · 标题块** | y = 20–120 | 100px | 主标题 `34px bold` `#202259`；下方 6px 处 1 行 `16px` 灰色引导句；**禁止**右侧放 200×70 装饰小图 |
| **B · 内容区** | y = 120–660 | **540px 可用** | 一切正文、卡片、图示、表格 |
| **C · 页脚条** | y = 660–700 | 40px | 左侧 L3 角标（10×10 主色方块 + `14px` 灰字 `AQUALIFE · 三条下单路径讲解`）+ 右侧页码 `NN / 31` |

- 封面（P01）、章节过渡（P05/P10/P15/P19）、结束页（P31）**省略 C 区**，采用自定义版式。
- 相邻内容页之间的 A 区标题 x 坐标、C 区页码 x 坐标**逐页一致**。

---

## 2. 颜色系统

> 取自产品设计令牌 `assets/css/elken-tokens.css`，保证 PPT 与界面同一视觉语言。

| 角色 | hex | 令牌来源 | 用途 |
| :--- | :--- | :--- | :--- |
| **主色 ink** | `#202259` | `--ek-blue` | 标题、深色卡片、**路径一（访客）标识色** |
| **辅色 aqua** | `#2AA7CF` | `--ek-aqua` | 流程箭头、图标、**路径二（注册）标识色** |
| **强调色 pink** | `#F287B7` | `--ek-pink` | 焦点元素、关键规则、**路径三（已有账户）标识色** |
| **中性 charcoal** | `#25292C` | `--ek-charcoal` | 正文文本 |
| 中性面（辅助） | `#FFFFFF` / `#F4F6F8` / `#E3E6E8` | `--ek-surface` / `--ek-surface-page` / `--ek-border` | 卡片面、页面底、分割线 |

### 2.1 路径配色约定（全场一致）

| 路径 | 标识色 | 章节页 / 总览页 / 相关标签 |
| :--- | :--- | :--- |
| 路径一 · 没有账号直接下单 | `#202259` 深蓝 | P05 章节页、P06–P09、P03 表第一列 |
| 路径二 · 注册账户去购买 | `#2AA7CF` 青 | P10 章节页、P11–P14、P03 表第二列 |
| 路径三 · 已有账户去购买 | `#F287B7` 粉 | P15 章节页、P16–P18、P03 表第三列 |
| 共用下单界面 | `#202259` 深蓝 | P19 章节页、P20–P24 |
| 账户落点 | `#2AA7CF` 青 | P25–P28 |

### 2.2 色彩面积分配

| 色彩角色 | 常规页 | Hero 页 |
| :--- | :--- | :--- |
| 主色 `#202259` | ≤ 35% | ≤ 55%（封面/章节页可到 90%） |
| 辅色 `#2AA7CF` | ≤ 25% | ≤ 25% |
| 强调色 `#F287B7` | **≤ 10%** | 15–20% |
| 中性色 | 剩余（≥ 35%） | 剩余 |

### 2.3 渐变与半透明策略

| 用法 | 具体值 | 使用位置 |
| :--- | :--- | :--- |
| 主渐变 | `linear-gradient(135deg, #202259 0%, #2AA7CF 100%)` | 卡片头部、章节页大字底纹 |
| 浅蓝底 | `rgba(32,34,89,0.06)` | 表格表头、信息条、清单底 |
| 青色高亮 | `rgba(42,167,207,0.10)` | 结论框、公式条、关键行、路径二标签 |
| 粉色高亮 | `rgba(242,135,183,0.14)` | 注意/缺口标记、路径三标签 |
| 图上蒙版 | `linear-gradient(90deg, rgba(15,16,52,0.95) 0%, rgba(15,16,52,0.84) 46%, rgba(15,16,52,0.38) 76%, rgba(15,16,52,0.74) 100%)` | 封面与章节页压暗底图 |
| 右下压水印 | `linear-gradient(315deg, rgba(8,10,32,1) 0%, rgba(8,10,32,0.9) 24%, rgba(8,10,32,0) 64%)` | 覆盖底图右下角生成水印，560×240 |
| 卡片浮起 | `boxShadow: '0 4px 20px rgba(13,20,23,0.08)'` | 白色卡片 |
| 背景装饰 | `opacity: 0.15–0.3` | 底层大色块、装饰圆 |

---

## 3. 字体系统

**仅使用 2 套字体家族**：

| 家族 | 字体栈 | 用途 |
| :--- | :--- | :--- |
| **A · 主字体** | `Inter, PingFang SC, Helvetica Neue, sans-serif` | 标题、正文、表格 |
| **B · 等宽字体** | `Menlo, ui-monospace, monospace` | ID、`localStorage` 键名、订单号、字段名、数值 |

### 3.1 字号层级表

| 层级 | 字号 | 字重 | 行高 | 字距 | 用途 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 封面主标题 | **68px** | bold | 1.15 | −1.5px | 仅 P01 |
| 章节大字 | **62px** | bold | 1.1 | −1px | P05 / P10 / P15 / P19 |
| **巨型锚点数字** | **88–96px** | bold | 1.0 | −3px | P08 / P12 / P22 / P25 / P27 / P31 |
| 页面主标题 | **34px** | bold | 1.3 | 0 | 每页 A 区固定 |
| 卡片小标题 | **20–23px** | bold | 1.35 | 0 | 卡片头 |
| 正文（叙事型） | **22px** | normal | 1.55 | 0 | 段落说明 |
| 正文（数据密集） | **16–17px** | normal | 1.5 | 0 | 清单、字段说明 |
| 表格 / 辅助 | **15–17px** | normal | 1.4 | 0 | 表格单元格 |
| 等宽技术字面量 | **15–17px** | normal | 1.4 | 0 | 家族 B |
| 脚注 / 页码 | **14px** | normal | 1.4 | 0.3px | C 区 |

> 本项目为**数据密集型功能讲解**，字段与界面对照内容多，故正文基准取 16–17px；仅纯叙事段落用 22px。巨型数字与正文形成 ≥5 倍字号跳跃。

---

## 4. 信息密度门禁

| 页面类型 | 最少元素 | 正文字数下限 | 图数 | 主视觉占 B 区 |
| :--- | :--- | :--- | :--- | :--- |
| 封面 P01 | 主标题 + 副标 + 主视觉 | 45 | 1 | ≥ 60%（全幅底图） |
| 目录 P02 | 4 板块条目 + 引导句 | 200 | 0–1 | — |
| 章节过渡 P05/P10/P15/P19 | 章节大字 + 一句小标 | 28 | 1 | ≥ 60% |
| 内容页 · 单主题 | 标题 + 正文 + 主视觉 | **240** | 1 | ≥ 30% |
| 内容页 · 卡片组 | 标题 + 引导句 + N 卡 | **每卡 ≥ 100** | 0–N | — |
| 数据页 P03/P18 | 标题 + 表 + 洞察 | 260 | 1 | ≥ 40% |
| 结束页 P31 | 收束 + 落款 | 45 | 0 | — |

- **常规内容页留白 ≤ 30%**。
- **容器填充率 ≥ 85%**：卡片内文字垂直占用 ≥ 卡片高度 85%。
- **底栏锚定**：卡片尾部元素用 `marginTop: 'auto'` 钉底。
- **横向兄弟卡对齐**：同一行卡片的三段（标题 / 正文 / 尾部）y 轴等高，尾部元素 y 差 ≤ 16px。

---

## 5. 配图系统

### 5.1 分级与清单

| 等级 | 文件 | 方式 | 出现页 | 位置 | 真实内容 | 已核对 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| L1 | `resources/images/cover_bg.jpg` | ImageGen | P01 | 全幅 1280×720 | 深蓝水面微距，右侧青色光带，左侧暗部留白 | ✅ |
| L1 | `resources/images/section_flow.jpg` | ImageGen | P05 / P19 | 全幅铺底 | 青色水流穿过抽象渠道，横向流动光带 | ✅ |
| L1 | `resources/images/section_signup.jpg` | ImageGen | P10 | 全幅铺底 | 水滴汇聚成青色发光圆环 | ✅ |
| L1 | `resources/images/section_account.jpg` | ImageGen | P15 | 全幅铺底 | 同心涟漪向外扩散，中心带粉光 | ✅ |
| L2 | 各页内联 `<svg>` 结构图 | SVG | 全部内容页 | 见页面映射表 | 流程图 / 对照表 / 结构示意 —— 结构化低语义元素 | — |
| L3 | 页脚角标（文本 + 小色块） | SVG/Text | 全部内容页 | C 区左侧 x=60 | 主色方块 + `AQUALIFE · 三条下单路径讲解` | — |

### 5.2 统一生图风格（本轮沿用，未新增生图）

**abstract macro water photography, deep navy blue and cyan palette, soft light refraction through water, fine particle highlights, cinematic and clean, high detail, no text, no watermark, no logo, no people, 16:9**

> 四张底图在上一版已生成并逐张核对，本版直接复用。图片已压为 JPEG（`formatOptions 82`），避免云端转换超时。

---

## 6. 页面映射表（逐页契约）

| # | 文件 | 类型 | 角色 | rhythm | 版式 | 主视觉 | 字数 | 留白% | 色彩分配 | 关键约束 |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | slide_01_cover.jsx | cover | hero | peak | 全幅图+骑线文字 | L1 cover_bg.jpg | 50 | 32% | 主色 75% + 辅色 15% | 无 A/C 区；标题左上骑入白字 |
| 02 | slide_02_agenda.jsx | catalog | supporting | valley | 左标题+右内容 | L3 | 210 | 20% | 主色 30% + 中性 60% | 4 板块各 ≥ 45 字 |
| 03 | slide_03_paths.jsx | content | hero | peak | 非对称双栏 | 三列对比表 | 260 | 16% | 主色 30% + 辅色 20% + 强调 12% | 四行三列；三列用路径标识色 |
| 04 | slide_04_landscape.jsx | content | supporting | valley | 左标题+右内容 | SVG(六个键) | 240 | 17% | 主色 20% + 辅色 12% | 六键等宽呈现；含 al.auth.user |
| 05 | slide_05_section_guest.jsx | section | transition | transition | 全屏视觉+大标题 | L1 section_flow.jpg | 34 | 45% | 主色 60% + 辅色 25% | 无 C 区 |
| 06 | slide_06_guest_reach.jsx | content | supporting | valley | 上大图+下方卡片 | SVG(守卫分布) | 250 | 18% | 主色 25% + 辅色 14% | 只有 account.html 有守卫 |
| 07 | slide_07_guest_hidden.jsx | content | supporting | valley | 左大图+右侧文字 | SVG(四处清单) | 280 | 16% | 主色 22% + 辅色 14% | 四处 + 一处反向不一致 |
| 08 | slide_08_guest_bv.jsx | content | hero | peak | 巨型数字+洞察 | 88px 数字 + SVG | 200 | 30% | 主色 35% + 强调 18% | 强调色爆发；memberId 为 null |
| 09 | slide_09_guest_truth.jsx | content | supporting | valley | 非对称双栏 | SVG(三结论) | 300 | 15% | 主色 24% + 强调 12% | 三结论不得含糊 |
| 10 | slide_10_section_signup.jsx | section | transition | transition | 全屏视觉+大标题 | L1 section_signup.jpg | 32 | 45% | 主色 60% + 辅色 25% | 无 C 区 |
| 11 | slide_11_signup_form.jsx | content | supporting | valley | 左大图+右侧文字 | SVG(七分区) | 300 | 15% | 主色 24% + 辅色 14% | 七分区逐条；标必填 |
| 12 | slide_12_memberid.jsx | content | hero | peak | 巨型数字+洞察 | 92px ID | 210 | 28% | 主色 38% + 强调 16% | 等宽呈现 ID；含默认推荐人 |
| 13 | slide_13_submit.jsx | content | supporting | valley | 左标题+右内容 | SVG(写入路径) | 290 | 16% | 主色 22% + 辅色 14% | 五处写入分开列 |
| 14 | slide_14_signup_order.jsx | content | supporting | valley | 非对称双栏 | SVG(形态差异) | 300 | 15% | 主色 22% + 强调 12% | 地址与付款状态两处后果 |
| 15 | slide_15_section_member.jsx | section | transition | transition | 全屏视觉+大标题 | L1 section_account.jpg | 30 | 45% | 主色 60% + 辅色 25% | 无 C 区 |
| 16 | slide_16_member_flow.jsx | content | supporting | valley | 上大图+下方卡片 | SVG(双列对照) | 280 | 17% | 主色 24% + 辅色 16% | 六项解锁能力 |
| 17 | slide_17_visible_diff.jsx | content | supporting | valley | 非对称双栏 | SVG(六项清单) | 310 | 14% | 主色 22% + 辅色 14% | 六项逐条；含余额支付 |
| 18 | slide_18_outcomes.jsx | content | hero | peak | 图表+洞察 | 四列表 + 洞察框 | 300 | 15% | 主色 28% + 辅色 18% + 强调 12% | 含"是否计入奖金"列 |
| 19 | slide_19_section_common.jsx | section | transition | transition | 全屏视觉+大标题 | L1 section_flow.jpg | 28 | 45% | 主色 60% + 辅色 25% | 无 C 区 |
| 20 | slide_20_flow_steps.jsx | content | supporting | valley | 左大图+右侧文字 | SVG(六步) | 290 | 15% | 主色 22% + 辅色 14% | 含按钮英文原文 |
| 21 | slide_21_shipping.jsx | content | supporting | valley | 非对称双栏 | SVG(分支 + 自提点) | 260 | 16% | 主色 25% + 辅色 15% | 三自提点含地址与营业时间 |
| 22 | slide_22_payment.jsx | content | hero | peak | 巨型数字+洞察 | 88px "5" + SVG | 290 | 15% | 主色 30% + 辅色 20% + 强调 15% | 五种全列；标注访客被禁用项 |
| 23 | slide_23_summary.jsx | content | supporting | valley | 左标题+右内容 | SVG(摘要 + 条件) | 280 | 15% | 主色 20% + 辅色 14% | 四类放行条件 |
| 24 | slide_24_orderdata.jsx | content | supporting | valley | 上大图+下方卡片 | SVG(字段 + 订单号) | 300 | 16% | 主色 24% + 辅色 14% | 含落库顺序缺陷 |
| 25 | slide_25_tabs.jsx | content | hero | peak | 巨型数字+洞察 | 88px "4" + SVG | 240 | 28% | 主色 32% + 强调 16% | 四个 Tab 全覆盖 |
| 26 | slide_26_account_orders.jsx | content | supporting | valley | 左大图+右侧文字 | SVG(订单卡结构) | 300 | 15% | 主色 24% + 辅色 14% | 分桶依据 + 状态标签 |
| 27 | slide_27_bonus_kpi.jsx | content | hero | peak | 巨型数字+洞察 | 88px 双数字 | 210 | 30% | 主色 35% + 强调 18% | 计算式不得藏进小字 |
| 28 | slide_28_bonus_system.jsx | content | supporting | valley | 非对称双栏 | SVG(九类 + 流转) | 340 | 14% | 主色 26% + 辅色 16% | 九类名称全列 |
| 29 | slide_29_demo.jsx | content | supporting | valley | 左标题+右内容 | SVG(三段时间轴) | 320 | 14% | 主色 22% + 辅色 14% | 含演示前两步准备 |
| 30 | slide_30_notes.jsx | content | supporting | valley | 非对称双栏 | SVG(编号清单) | 360 | 13% | 主色 22% + 强调 12% | 10 条缺口，不得弱化 |
| 31 | slide_31_end.jsx | ending | hero | peak | 居中金句/巨型数字 | 96px 数字 | 50 | 45% | 主色 50% + 强调 14% | 四句收束 + 落款 |

### Checklist 自检
- [x] 仅用 4 个彩色 hex：`#202259` / `#2AA7CF` / `#F287B7` / `#25292C`（+ 白与浅灰中性面）
- [x] 仅用 2 套字体家族
- [x] 相邻页版式不重复
- [x] `N卡片横排` 未使用
- [x] Hero 页均配 ≥ 48px 锚点数字或 ≥ 40% B 区主视觉
- [x] 每页留白 ≤ 32%（Hero 页放宽至 45%）
