# 博客问题修复计划

## 概述

修复博客的 6 个问题：hover 动画、分类页面 404、搜索按钮无反应、页面过渡优化、文章标题竖线间距、删除文章卡片箭头。

---

## 问题分析与修复方案

### 问题 1：Hover 背景动画参照 Fuwari 实现

**当前问题**：
- 目前 hover 动画是 `scaleY` 从底部向上填充，可能与 Fuwari 的效果不一致
- Fuwari 的 hover 效果通常是：背景色从中心扩散或从左向右滑动，带有微妙的缓动曲线

**修复方案**：
- 研究 Fuwari 模板的 hover 动画实现
- 调整 `.button::before` 和 `.chip::before` 的动画效果
- 可能改为 `scale` 从中心向外扩散，或 `translateX` 从左向右滑动
- 调整缓动函数和持续时间以匹配 Fuwari 的手感

**涉及文件**：
- `src/styles/global.css` - button、chip、card 的 hover 动画样式

---

### 问题 2：分类页面 404

**当前问题**：
- 导航栏点击"分类"链接跳转到 `/categories/` 404
- 目前只有 `/categories/[category]/index.astro`（单个分类页面），缺少 `/categories/` 索引页
- 同理检查 `/tags/` 是否也有同样问题

**修复方案**：
- 新增 `src/pages/categories/index.astro` - 分类索引页，展示所有分类
- 检查 `src/pages/tags/index.astro` 是否存在，如不存在也需要添加
- 分类索引页展示所有分类卡片，带文章数量统计

**涉及文件**：
- `src/pages/categories/index.astro` - 新建
- `src/pages/tags/index.astro` - 检查/新建

---

### 问题 3：搜索按钮点击没有任何反应

**当前问题**：
- 点击导航栏搜索按钮没有打开搜索面板
- 可能原因：
  1. 脚本中 `search-toggle` 按钮的事件监听器未正确绑定
  2. `float-panel-closed` 类的 CSS 有问题
  3. 元素 ID 不匹配
  4. Astro 岛组件 hydration 问题

**修复方案**：
- 检查 Navbar 脚本中搜索按钮的事件绑定
- 确保 `search-panel` 的显示/切换逻辑正确
- 检查 `.float-panel-closed` CSS 是否正确隐藏面板
- 确保事件监听在 DOM 加载完成后执行

**涉及文件**：
- `src/components/Navbar.astro` - 搜索按钮事件和搜索面板

---

### 问题 4：页面切换时静态元素不应动画（参考 Fuwari）

**当前问题**：
- 目前使用的是 `::view-transition-old(root)` 和 `::view-transition-new(root)`，整个页面都参与过渡
- 侧边栏、页脚、导航栏等不变的元素也会跟着动画，体验不流畅
- Fuwari 使用 Astro View Transitions，给不同区域设置不同的 `view-transition-name`

**修复方案**：
- 引入 Astro 的 `<ViewTransitions>` 组件（替换 `ClientRouter`）
- 为主要内容区设置 `view-transition-name: content`
- 导航栏、侧边栏、页脚不设置过渡名称，保持静态
- 或者使用 `transition:name` 指令为内容区命名
- 确保只有需要刷新的内容区域参与过渡动画

**涉及文件**：
- `src/layouts/BaseLayout.astro` - 引入 ViewTransitions 组件
- `src/layouts/MainLayout.astro` - 调整过渡区域
- `src/styles/global.css` - 调整 view-transition 样式

---

### 问题 5：文章标题左侧竖线间距太小，叠在一起

**当前问题**：
- PostCard 中文章标题左侧的竖线（`before:w-1 before:h-5`）位置不对
- 从代码看：`before:absolute before:top-[35px] before:left-[18px]`
- 竖线位置与标题文字重叠或间距太小

**修复方案**：
- 调整 PostCard 中标题左侧竖线的位置
- 增加左侧 padding 或调整竖线的 `left` 位置
- 确保竖线与标题文字有足够的间距
- 同时检查归档页面的 `.dash-line` 样式

**涉及文件**：
- `src/components/PostCard.astro` - 标题竖线位置调整
- `src/styles/global.css` - 如需调整 dash-line 样式

---

### 问题 6：删除文章列表右侧的箭头框

**当前问题**：
- PostCard 右侧有一个箭头按钮框（`hidden md:flex btn-regular w-[3.25rem]`）
- 用户要求删除这个右侧的箭头框
- 同时标题内的箭头图标也需要处理

**修复方案**：
- 删除 PostCard 中右侧的箭头按钮容器（81-100 行）
- 可以保留标题内 hover 时出现的箭头图标（可选，看用户需求）
- 调整卡片内容区域宽度，充分利用空间

**涉及文件**：
- `src/components/PostCard.astro` - 删除右侧箭头框

---

## 实施步骤

1. **修复分类页面 404** - 先解决页面访问问题
   - 新建 `src/pages/categories/index.astro`
   - 新建/检查 `src/pages/tags/index.astro`

2. **修复搜索按钮** - 确保基本交互正常
   - 检查并修复 Navbar 中的搜索面板事件绑定

3. **优化页面过渡** - 参考 Fuwari 实现
   - 替换为 Astro ViewTransitions
   - 仅内容区参与过渡

4. **修复 PostCard 样式** - 竖线间距 + 删除箭头
   - 调整标题竖线位置
   - 删除右侧箭头框

5. **优化 Hover 动画** - 参照 Fuwari
   - 调整 button/chip/card 的 hover 动画效果

6. **构建验证** - 确保所有修改正常工作
   - 运行 `pnpm build` 验证
   - 检查所有页面正常渲染

---

## 风险与注意事项

1. **View Transitions 兼容性**：Astro 的 ViewTransitions 组件需要正确配置，确保与现有动画兼容
2. **HeroUI 样式覆盖**：修改 hover 动画时注意不要破坏 HeroUI 的其他样式
3. **分类/标签索引页**：需要与整体设计风格保持一致
4. **移动端适配**：所有修改都需要考虑移动端的显示效果

---

## 验证标准

- [ ] 分类页面 `/categories/` 可正常访问
- [ ] 标签页面 `/tags/` 可正常访问
- [ ] 点击搜索按钮正确打开搜索面板
- [ ] 页面切换时导航栏、侧边栏、页脚保持静态
- [ ] 文章标题左侧竖线间距合理，不重叠
- [ ] 文章卡片右侧没有箭头框
- [ ] Hover 动画流畅自然
- [ ] `pnpm build` 构建成功，无报错
