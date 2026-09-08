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
  - 账户页 Personal information 表单的 `pfMemberId` 输入框：HTML 上加 `disabled`，再加 `class="input input-locked"` 提供锁定视觉（灰底 + 锁图标 + "This ID is fixed and cannot be changed." 提示）。
  - `account.html` 的 `setProfileMode('edit')` 循环里要保持 `pfMemberId.disabled = true`（不能被其它字段的 `el.disabled = !editing` 覆盖），现有 line 891 已正确处理：`if (name === 'memberid' || el.id === 'pfMemberId') el.disabled = true;`。
  - 锁定样式集中在 `pages.css` 的 `.profile-form .field .input.input-locked`（含 SVG 锁图标的 data URI）。修改 Member ID 字段时不要去掉 `input-locked` 类或 `disabled` 属性。

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
