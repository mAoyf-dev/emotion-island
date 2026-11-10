# 情绪探险岛 · Emotion Island

和森林里的小伙伴一起认识感受，练习应对。暂面向 6—10 岁儿童与陪伴者设计，原生静态网页，无依赖、无账号、不上传儿童选择。

[在线体验](https://maoyf-dev.github.io/emotion-island/) · [项目说明书](docs/项目说明书.md) · [源码仓库](https://github.com/mAoyf-dev/emotion-island)

**心理教育原型，非诊断或治疗服务。** 已有方法研究不能证明本产品有效。尚未完成有资质人员的逐句审核、儿童可用性试用和临床验证。年龄与体验时长不是确证适用范围。

## 已实现
- 三个完整故事：加入同伴游戏、积木倒下、日常玩耍后的告别。
- 六步可跳过导览，多选感受与身体信号、应对反馈、回顾、线下自愿练习。
- 家长陪伴指南、理论来源及限制、使用说明和隐私页。
- 三张本地故事插图、SVG 表情脸、参考页面的浅青与深蓝配色、大字大按钮、响应式布局、键盘操作、减少动态偏好支持。
- 选择只在页面内存保留；退出、刷新或切换故事清空。跳过清空该步，返回上一步保留本关选择。

## 本地运行
使用 Python 3 启动静态服务（ES modules 需要 HTTP，不能直接双击 HTML）：

```sh
python -m http.server 4173 --bind 127.0.0.1
```

浏览器打开 http://127.0.0.1:4173 。Node 24+ 用于检查，无需 npm install：

```sh
npm test
npm run check
```

可选真实浏览器回归检查（需已有 Playwright 和 Chrome，不属于产品运行依赖）：

```sh
node tests/browser-check.mjs
```

若 Playwright 不在本项目模块查找路径，可通过 `PLAYWRIGHT_MODULE` 指定已有安装的 `index.mjs` 绝对路径；`PREVIEW_URL` 可覆盖默认预览地址。截图保存在已忽略的 `screenshots/`。本机若全局 `npm` 命令损坏，可直接运行 `node --test tests/game.test.mjs`，或使用 Node 安装目录中的 `npm.cmd`。

## 发布 GitHub Pages
1. 将项目上传到你自己的 GitHub 仓库，默认分支设为 `main`。
2. 仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。
3. 推送 main 或手动运行 `Check and deploy static site` workflow。检查通过后发布页面静态文件与 assets 素材目录；测试和文档不会进入网页发布产物。
4. 发布地址查看 Actions deployment 或仓库 Pages 设置。所有资源使用相对路径，兼容仓库子路径。

站点已发布到 GitHub Pages。2026-11-11 已检查线上图片、三个故事主要流程、说明页面及桌面和手机布局，详见[项目说明书的上线检查记录](docs/项目说明书.md#九上线检查记录)。

## 文件
- `game.js`：故事内容、纯状态逻辑。
- `app.js`：页面路由、交互和内容呈现。
- `art.js`、`styles.css`：图片呈现、SVG 表情和植物、界面样式。
- `assets/stories/`：使用内置图像工具生成的三张故事插图；[完整提示词与素材记录](assets/README.md)。
- `tests/game.test.mjs`：内容完整性和状态边界检查。
- [文献与内容审核](docs/content-evidence-review.md)：来源、证据边界、上线内容门槛。
- [设计文档](docs/superpowers/specs/2026-11-11-emotion-island-design.md)。

## 内容与隐私边界
不根据情绪选择、作品或身体信号诊断；不要求披露真实经历；没有情绪排名或打卡奖惩。没有外部字体、统计脚本、API 或存储。普通网站访问日志由托管平台管理，点击外部研究链接适用第三方隐私政策。
家长不应强迫儿童完成。困扰持续影响生活时建议专业评估，有即时危险优先寻求现实中的保护和紧急帮助。

## 许可
代码、原创插画和原创文案采用 [MIT](LICENSE)。外部文章、论文、机构名称及其材料不属于本项目授权范围；本项目不包含复制的课程或量表，不暗示相关机构认可产品。
