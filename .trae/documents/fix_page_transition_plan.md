# 页面过渡动画修复计划

## 问题现状

当前使用 Astro 内置的 ClientRouter + View Transitions，切换页面时导航栏、侧边栏、页脚都会跟着刷新/动画，用户体验不好。

## Fuwari 的实现方式

通过研究 Fuwari 模板源码，发现它使用的是 **@swup/astro** 集成来实现页面过渡：

### 核心配置（astro.config.mjs）

```javascript
swup({
  theme: false,
  animationClass: "transition-swup-",
  containers: ["main", "#toc"],  // 只替换这些容器的内容
  smoothScrolling: true,
  cache: true,
  preload: true,
  accessibility: true,
  updateHead: true,
  updateBodyClass: false,
  globalInstance: true,
})
```

### 关键原理

* **Swup** 是一个专门的页面过渡库，它通过 AJAX 加载新页面内容，然后只替换指定的容器

* `containers` 选项指定哪些容器的内容需要被替换

* 不在 `containers` 列表中的元素（导航栏、侧边栏、页脚等）**完全不动**，不会重新渲染

* 动画通过 CSS 类控制：`html.is-changing` 和 `html.is-animating`

### 布局结构（MainGridLayout.astro）

```
Layout.astro (最外层)
├── Navbar (不在 swup containers 中 → 切换页面时完全不动)
├── Sidebar (不在 swup containers 中 → 切换页面时完全不动)
└── main#swup-container (在 containers 中 → 只有这里的内容会被替换)
    └── #content-wrapper
        ├── 页面内容（slot）
        └── Footer (桌面端在 main 内 → 跟着内容一起动画)
```

## 修复方案

### 步骤 1：安装 @swup/astro 依赖

```bash
pnpm add @swup/astro
```

### 步骤 2：配置 astro.config.mjs

* 添加 swup 集成

* 配置 `containers: ["main"]` 只替换 main 标签内容

* 配置 `animationClass: "transition-swup-"`

* 移除 ClientRouter（BaseLayout 中）

### 步骤 3：修改布局结构（MainLayout.astro）

* 确保 `<main>` 标签在正确位置

* 侧边栏和导航栏移到 main 外面（它们不应该被替换）

* 页脚：桌面端放在 main 内（跟着内容动），移动端放在外面

### 步骤 4：修改过渡动画 CSS

* 从 `::view-transition-old/new` 改为 swup 的 CSS 类方式

* 使用 `html.is-changing .transition-swup-fade` 和 `html.is-animating .transition-swup-fade`

* 动画效果：淡出 + 上移（参考 Fuwari）

### 步骤 5：移除 ClientRouter 和 transition:name

* BaseLayout.astro 中移除 ClientRouter 导入和使用

* MainLayout.astro 中移除 `transition:name="content"`

### 步骤 6：测试验证

* 构建验证

* 切换页面检查导航栏、侧边栏是否不动

* 内容区是否有正确的过渡动画

## 涉及文件修改清单

| 文件                           | 修改内容                              |
| ---------------------------- | --------------------------------- |
| package.json                 | 添加 @swup/astro 依赖                 |
| astro.config.mjs             | 添加 swup 集成配置                      |
| src/layouts/BaseLayout.astro | 移除 ClientRouter                   |
| src/layouts/MainLayout.astro | 调整布局结构，确保 sidebar/navbar 在 main 外 |
| src/styles/global.css        | 替换 view-transition 动画为 swup 动画样式  |

## 预期效果

* ✅ 切换页面时，导航栏完全不动（不刷新、不闪烁）

* ✅ 切换页面时，侧边栏完全不动（不刷新、不闪烁）

* ✅ 只有 main 内容区域有淡入淡出 + 上移的过渡动画

* ✅ 页脚在桌面端跟着内容一起动画，移动端完全不动

* ✅ 页面标题等 head 内容正常更新

