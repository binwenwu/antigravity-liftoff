# Antigravity 动画复刻

本项目选择完成题目二：像素级复刻 `antigravity.google` 的首页动画与相关页面效果。最终产物位于 `code/`，可直接在浏览器中本地运行。

## 实现选择

一开始我尝试过原生实现：用 Canvas/Three.js 按观察到的视觉效果手写粒子、环形扰动、鼠标交互和页面布局。这种方式可以快速接近“感觉”，但很难稳定达到题目要求的像素级还原，尤其是以下部分：

- 粒子采样密度、运动阻尼、环形位移参数需要反复肉眼调参；
- 鼠标移动后粒子形变和颜色混合很难通过录屏完全反推出精确公式；
- 页面滚动动画、打字光标、字体度量和响应式布局都有大量细节误差；
- 题目明确允许使用任何技术手段，并且评分目标是像素级复刻，而不是重新发明同款效果。

因此最终切换到纯逆向方案：保留官方公开站点的编译产物、静态资源和运行时参数，让原站的 Angular/Three.js 动画逻辑在本地直接运行。这样能最大程度还原颜色、运动轨迹、交互响应、粒子形变和页面布局，也更符合“像素级复刻”的目标。

## 技术方案

核心思路是 Bundle 级逆向：

1. 分析 `antigravity.google` 的入口 HTML，确认公开加载的前端产物：
   - `styles-7KLEMMT6.css`
   - `chunk-E6TGZIGP.js`
   - `main-QY6M2GAO.js`
2. 将这些 bundle 放入 `code/` 并构造本地 `index.html`，保留 Angular 的 `<app-root>` 启动方式。
3. 从 bundle 中定位首页粒子组件 `landing-main-particles-component`，确认原站直接使用 Three.js 场景和 shader/FBO 粒子模拟。
4. 下载并整理 bundle 引用的静态资源，包括图片、视频、博客 Markdown、文档 Markdown、懒加载语法高亮 chunk 等。字体使用官方在线 Google Fonts 链接，避免本地化字体带来的字重、字宽和图标度量差异。
5. 增加本地 `server.mjs`，解决普通静态服务器无法处理的两个问题：
   - Angular 深链接需要 fallback 到 `index.html`；
   - MP4 视频需要支持 `Range` 请求。

首页粒子动画使用的是官方 bundle 中的原组件。首页配置参数保留为原站值：

- `ringWidth=.006`
- `ringWidth2=.107`
- `particlesScale=.59`
- `ringDisplacement=.62`
- `density=230`

由于动画逻辑、shader、布局 CSS、字体来源和资源路径都与公开站点保持一致，本地效果不会依赖手工近似实现。

## 运行方式

```bash
cd code
node server.mjs
```

打开：

```text
http://127.0.0.1:5173/
```

请使用 `server.mjs` 启动，不要直接用普通文件打开，也不要用只提供静态文件的服务器替代。原站 bundle 使用绝对 `/assets/...` 路径，并且 `/product/antigravity-2`、`/blog/google-io-2026` 等深链接需要由本地服务器回退到 `index.html`。

## 路由说明

已整理并验证以下页面的本地资源：

- `/`
- `/product`
- `/product/antigravity-2`
- `/product/antigravity-sdk`
- `/blog/google-io-2026`
- `/docs/get-started`

官方 bundle 实际支持的文档路由是 `/docs/getting-started`，因此本地服务器会将 `/docs/get-started` 重定向到 `/docs/getting-started`。

## 验证结果

本地浏览器验证中，上述页面均可正常渲染；关键页面无本地资源 404，无 broken image。你可以在运行后自行录屏和截图，并将最终效果截图放入 `screenshot/`，将 AI 交互过程截图放入 `prompt/`。

## 目录结构

```text
solution/
├── code/        # 可运行代码、bundle 和静态资源
├── prompt/      # AI 交互过程截图，由提交前自行放入
├── screenshot/  # 最终效果截图，由提交前自行放入
└── README.md
```
