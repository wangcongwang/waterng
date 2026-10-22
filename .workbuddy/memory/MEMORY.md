# 项目记忆 (water / demo)

## 模式
- 纯演示 demo：本地静态站 `*.html` + `assets/`，**无后端**。目标只有"点击→跳转→交互"，不做真实业务、登录、支付。
- 本地预览：Node 静态服务 + no-cache。Chrome=`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`。

## 改动原则（demo 模式，最高优先级）
- 直接改、直接测、直接交付。**不要**播种 demo 数据、**不要**登录态门控、**不要**支付/会员/订单重逻辑、**不要**部署/冒烟脚本。
- 不维护重型记忆与约束墙；改完即交付，不做复杂验证。
- 用户明确要"快"，遇到含糊以"可跑的 demo"为准，少问多做。

## 部署/仓库现状（2026-10-21 排查）
- 本地 origin = `wangcongwang/waterng.git`（公开），Pages 在 `wangcongwang.github.io/waterng/`；用户访问的 `/water/` 路径匿名 404，疑似另一个私有仓库，部署源未确认。
- 远端 main 有外部工具推的快照提交（"Update AquaLife demo site"，多台副本并行），与本地历史**已分叉**；推送前必须先解决合并策略并经用户确认。
- 用户验收习惯看线上站，本地改完不推送就"看不到"——每次改完需主动说明改动在哪个页面/哪条链路可见，并给出精确 URL（含 query 参数，如 `checkout.html?cart=1&mode=member`）。
- 复购会员链路：member-repurchase.html（搜会员+加购）→ cart.html?mode=member → checkout.html?cart=1&mode=member（收货信息）；页面本身无表单，别在入口页找。
