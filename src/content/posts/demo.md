---
title: Markdown 样式演示
description: 展示博客支持的所有 Markdown 元素样式
pubDate: 2026-07-24
category: 教程
tags: [Markdown, 样式, 演示]
---

# 标题演示

## 二级标题

这是二级标题，带有底部分隔线。

### 三级标题

这是三级标题。

#### 四级标题

这是四级标题。

---

## 文本样式

这是一段普通文本。**这是加粗文本**，*这是斜体文本*，~~这是删除线文本~~。

行内代码：`const hello = "world"`

---

## 链接

[这是一个外部链接](https://example.com)

[这是一个带下划线的链接](https://example.com)

---

## 引用块

> 这是一段引用文本。
> 
> 可以包含多行内容。
> 
> — 作者名称

---

## 列表

### 无序列表

- 列表项 1
- 列表项 2
  - 嵌套列表项 A
  - 嵌套列表项 B
- 列表项 3

### 有序列表

1. 第一步
2. 第二步
3. 第三步

---

## 代码块

### JavaScript

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
  return {
    message: `Welcome to the blog`,
    timestamp: Date.now()
  };
}

const result = greet("World");
```

### Python

```python
def fibonacci(n):
    """生成斐波那契数列"""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib

print(fibonacci(10))
```

### CSS

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 2rem;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  transition: all 0.25s ease;
}

.card:hover {
  border-color: var(--accent);
  background-color: var(--surface-secondary);
}
```

### HTML

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>示例页面</title>
</head>
<body>
  <header>
    <h1>欢迎</h1>
  </header>
  <main>
    <p>这是一个示例段落。</p>
  </main>
</body>
</html>
```

### JSON

```json
{
  "name": "blog",
  "version": "1.0.0",
  "dependencies": {
    "astro": "^7.1.3",
    "tailwindcss": "^4.3.3"
  }
}
```

### Bash

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

---

## 表格

### 基础表格

| 名称 | 类型 | 描述 |
|------|------|------|
| title | string | 文章标题 |
| description | string | 文章描述 |
| pubDate | Date | 发布日期 |
| category | string | 分类 |
| tags | string[] | 标签数组 |

### 带对齐的表格

| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:-------:|-------:|
| 文本 | 文本 | 文本 |
| 短 | 中等 | 长文本内容 |
| A | B | C |

---

## 图片

![示例图片](https://picsum.photos/800/400)

图片会自动居中显示，并带有边框。

---

## 水平线

---

## 混合内容

### 包含代码的段落

在 JavaScript 中，我们可以使用 `console.log()` 来输出调试信息。例如：

```javascript
console.log("调试信息：", { user, timestamp });
```

### 包含链接的引用

> 推荐阅读：[MDN Web Docs](https://developer.mozilla.org/) 是学习 Web 开发的最佳资源。

### 包含加粗的列表

- **重要**：这是一个关键点
- **注意**：请仔细阅读
- **提示**：这个功能很有用

---

## 复杂表格

| 特性 | 支持情况 | 备注 |
|:-----|:--------:|:-----|
| 标题 | ✅ | 支持 h1-h6 |
| 加粗 | ✅ | 使用 `**text**` |
| 斜体 | ✅ | 使用 `*text*` |
| 链接 | ✅ | 支持外部链接 |
| 图片 | ✅ | 支持缩放查看 |
| 代码块 | ✅ | 支持语法高亮 |
| 表格 | ✅ | 支持对齐 |
| 引用 | ✅ | 带背景色 |
| 列表 | ✅ | 有序/无序 |

---

## 数学公式（如果支持）

行内公式：$E = mc^2$

块级公式：

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

---

## 任务列表

[x] 完成基础样式
[x] 添加代码高亮
[x] 优化表格样式
[ ] 添加数学公式支持
[ ] 支持流程图


这就是博客目前支持的所有 Markdown 元素样式演示。希望对你有所帮助！
