# Tasks

- [x] Task 1: 项目基础与设计系统
  - [x] SubTask 1.1: 初始化工程(Vanilla HTML/CSS/JS + 设计 Tokens,无需构建)
  - [x] SubTask 1.2: 落地设计 Tokens(颜色 #00875A/#DD6B20/#E53E3E/#3182CE/#D69E2E、字体、栅格、间距 96/64/32、圆角、阴影、动效曲线)
  - [x] SubTask 1.3: 落地 12 列 1440px 栅格容器组件 + 响应式断点(1200/1024/768/375)
  - [x] SubTask 1.4: 落地 i18n 框架与 EN/HA/YO/IG/中文 文案结构
  - [x] SubTask 1.5: 落地状态色组件库 Badge/Alert/Button(Loading + Disabled 锁定机制)

- [x] Task 2: 全局布局与导航
  - [x] SubTask 2.1: Header 组件(Logo / 居中导航 / 多语言下拉 / 登录注册 / WhatsApp 图标)
  - [x] SubTask 2.2: Footer + 服务保障 / 关于我们的轻量入口
  - [x] SubTask 2.3: 移动端汉堡菜单 + 抽屉
  - [x] SubTask 2.4: 全局 Loading/Empty/Error 占位组件

- [x] Task 3: 首页与品牌门面
  - [x] SubTask 3.1: Hero 区域(本地家庭/企业场景图 + 三段式价值主张 + 主 CTA)
  - [x] SubTask 3.2: 卖点支撑区(分期租赁 | 全托管 | 24H 水质保障 | 灵活租期)
  - [x] SubTask 3.3: 信任背书区(36 城市 / 12,400+ 设备 / 98.6% 按时 / 24/7 支持)
  - [x] SubTask 3.4: CTA 引导与底部行动召唤

- [x] Task 4: 产品列表(全量库)
  - [x] SubTask 4.1: 列表页布局(网格卡片 + 筛选侧栏 + 排序)
  - [x] SubTask 4.2: 产品卡片组件(图 / 名称 / 关键参数 / 操作按钮)
  - [x] SubTask 4.3: 筛选/排序/搜索交互与空状态

- [x] Task 5: 租赁商城(核心转化)
  - [x] SubTask 5.1: 租赁列表(突出头期款、BV 值、租期 chip)
  - [x] SubTask 5.2: 详情页(产品主图 / 规格 / 租期切换器 / 动态算价面板)
  - [x] SubTask 5.3: 固定底栏/侧边栏(关键价格 + 立即下单)
  - [x] SubTask 5.4: 租期切换动效与价格重算(≤200ms 刷新)

- [x] Task 6: 下单与支付闭环
  - [x] SubTask 6.1: 结算页(地址、催款联络方式确认、账单/催收联络协议勾选)
  - [x] SubTask 6.2: 支付网关唤起(桌面 H5 优先,移动端尝试 universal link)
  - [x] SubTask 6.3: 支付回调状态机(成功/失败/超时)与重试保护
  - [x] SubTask 6.4: Loading + Disabled 防重复扣款(全局支付按钮规范)

- [x] Task 7: 电子协议
  - [x] SubTask 7.1: 协议模板数据接入(逾期停机、追款等违约责任条款)
  - [x] SubTask 7.2: 阅读 + 滚动到底 + 勾选 + 签署交互
  - [x] SubTask 7.3: PDF 生成与下载(预留接口,以静态占位展示)

- [x] Task 8: 我的账户与订单履约
  - [x] SubTask 8.1: 账户总览(头像 / 资料 / 设备数量 / 累计 BV)
  - [x] SubTask 8.2: 订单列表 + 状态时间轴(下单/支付/签约/发货/在租)
  - [x] SubTask 8.3: 发货状态展示(即将上门安装 + 物流同步占位)

- [x] Task 9: 付款计划与催款体系(风控核心)
  - [x] SubTask 9.1: 付款计划面板(汇总 + 期数明细 + 状态色)
  - [x] SubTask 9.2: 账单提醒(到期前 3 天/1 天)温和提示
  - [x] SubTask 9.3: 催款通知(逾期 1-7 天)橙色横幅 + 强提示
  - [x] SubTask 9.4: 追款通知(7 天+)红色高危 + 功能限制
  - [x] SubTask 9.5: 快捷还款通道与催款链接唤起

- [x] Task 10: 多语言与本地化
  - [x] SubTask 10.1: 关键页面文案全量中英对照
  - [x] SubTask 10.2: HA/YO/IG 文案占位与切换验证
  - [x] SubTask 10.3: 数字、货币 ₦、日期格式本地化

- [x] Task 11: 响应式与弱网容错
  - [x] SubTask 11.1: 1200-1440px 视口自适应与 1200px 以下降级
  - [x] SubTask 11.2: 关键按钮 Loading + Disabled 全量覆盖
  - [x] SubTask 11.3: 账单/催款页 localStorage 缓存 + 离线指示条

- [x] Task 12: 验证与交付
  - [x] SubTask 12.1: 关键路径自测(租赁下单全链路、催款状态切换、离线查看)
  - [x] SubTask 12.2: 设计 Tokens/栅格与品牌色一致性巡检
  - [x] SubTask 12.3: 多语言切换与响应式断点巡检
  - [x] SubTask 12.4: 整理交付物与待办事项

# Task Dependencies
- Task 2 依赖 Task 1 ✓
- Task 3 依赖 Task 1、Task 2 ✓
- Task 4 / Task 5 依赖 Task 1、Task 2 ✓
- Task 6 依赖 Task 5 ✓
- Task 7 依赖 Task 6 ✓
- Task 8 依赖 Task 6、Task 7 ✓
- Task 9 依赖 Task 8 ✓
- Task 10 依赖 Task 1 ~ Task 9 ✓
- Task 11 依赖 Task 1 ~ Task 9 ✓
- Task 12 依赖所有前置任务 ✓
