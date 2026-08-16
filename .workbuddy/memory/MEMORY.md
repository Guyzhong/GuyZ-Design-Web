# GuyZ Design-Web 长期记忆

## 项目概况
- 个人作品集网站，纯静态 HTML + CSS + JS，无框架
- 5 个页面：index.html、case-1/2/3.html、contact.html
- 技术栈：Noto Sans SC + JetBrains Mono 字体、FontAwesome 图标、CSS 变量主题系统（暗/亮模式）
- 本地预览：`python3 -m http.server 8080`，工作区路径含中文空格

## 设计体系
- 暗色为主（#0a0a0f），强调色 #6366f1（靛蓝紫）
- 亮色通过 `#themeToggle:checked` CSS 切换
- 圆角体系：6/10/16/24px
- 间距体系：0.25–8rem（xs–5xl）

## 已完成的适配
- 2026-04-22：移动端适配，三断点（1024/768/480px），触控安全 44px，iOS safe area
