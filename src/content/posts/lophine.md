---
title: 关于 Lophine 删库
pubDate: 2026-07-17
description: 对于 Lophine 删库的一些看法
tags:
  - MC
  - 技术
category: 技术
draft: true
comment: true
---

今天一大早听说了 Lophine 删库的消息，索性去看了一眼

## 先搞清楚这个项目是啥

**Luminol** 是一个基于 Folia 的 Minecraft 服务端核心，轻量级、优化且功能齐全。**Lophine** 是 Luminol 的下游分支，目标是“在 Folia 上实现更多生电的内容以及更多的功能”。

**CanvasMC** 则是另一个 Folia 分支，定位是修复游戏机制不一致和 Bug，引入进一步的性能优化。它同样基于 Folia，和 Luminol 系列在技术栈和目标用户上有重叠。

总之，这些都是 **Folia** 的分支

## 起因

起因是在 2026 年 7 月 11 日，一位名为开发者 Tomatto1123 在 CanvasMC 的 GitHub 仓库中创建了 Issue [#286](https://github.com/CraftCanvasMC/Canvas/issues/286)

> You are absolutely violating GPL3 and MIT licenses and making malicious competition  
> 翻译：*你们正在违反 GPL-3.0 与 MIT 许可证，并进行恶意竞争*

这个 Issue 引用了 LuminolMC 的 **AboutCanvas** 仓库。该仓库集中列出了多个所谓的“争议案例”，包括高速移动修复、世界加载与卸载 API、异步网络协议切换等等功能，并且提供了相关 Pull Request、历史提交、网页存档和代码截图。

后来，CanvasMC 关闭了这个 Issue，CanvasMC 项目团队尚未发布完整的正式回应

![Issue #286 截图](/images/archive/Pasted%20image%2020260717164548.webp)

## 争议

这件事的争论在于：**CanvasMC 有到底没有违反 GPL-3.0 和 MIT 许可证？**

LuminolMC 认为，CanvasMC 在使用来自 Luminol 等 GPL-3.0 项目的代码时，删除了必要的版权声明和修改说明，这违反了 GPL-3.0

**但 CanvasMC 社区这边有不同的看法。**

GitHub 用户 realfraze 在评论中表示，自己无法理解所谓的许可证违规依据——他认为 GPL-3.0 并不要求下游项目对每段代码单独署名，而且 LuminolMC 提供的两个示例中也没有发现采用 MIT 许可证的代码。他甚至直言：“Skidding may be a sin, but it does not violate the license.”（借鉴代码可能是一种罪过，但不违反许可证）

在 CanvasMC 的 Discord 社区讨论中，还有参与者认为 AboutCanvas 列出的部分案例可能有误——比如某个被指控从 LeafPile 获取并修改但没有注明来源的类，实际上可能已经保留了相关署名。另一位社区成员 Bacon 也表示：“我很确定自己在对应的 Pull Request 中注明了 Luminol。”

不过需要强调的是——**这些都属于社区成员的个人回应，并非 CanvasMC 项目维护团队的正式声明**

## 删库

Luminol 核心开发者 **EarthMe** 在开发者群聊中宣布不再继续维护相关项目。
![EarthMe 宣布不再维护](/images/archive/Pasted%20image%2020260717170010.webp)

下游 **Lophine** 也已经宣布删库
![Lophine 删库公告](/images/archive/Pasted%20image%2020260717170209.webp)

截至发稿，CanvasMC 方面尚未就 Issue [#286](https://github.com/CraftCanvasMC/Canvas/issues/286) 发布正式回应。

但事实有时候也没那么重要。重要的是：一个还有 123 个 Star、16 个 Fork、一周前还在推送代码的项目，就这么从 GitHub 上消失了。

*(以上信息均来自公开渠道，如有错误请予以指正)*
