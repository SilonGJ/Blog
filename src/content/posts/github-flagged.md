---
title: 记一次 Github 账号被 Flagged 并恢复
published: 2026-09-01
description: 一次意外的 GitHub 账号限制经历，从发现问题到解决的完整记录
tags:
  - 技术
  - 杂谈
  - Github
category: 杂谈
image: /images/archive/github.png
---

# 发生了什么

前几天(大约是29号的时候)，我正在更改我的 Github 个人资料仓库

预览效果时，发现：

![2026-08-31_22-49_1.png](/images/archive/2026-08-31_22-49_1.png)

是的，我的个人资料忽然 404 了

不仅个人资料 404，所有关于我的记录他人全部看不到，仓库啥的也看不到，自己登录后却一切正常

~~(感觉跟封号没啥区别)~~

# 排查

其实我那时也不明白怎么回事，以为 Github 宕机了，还去了一趟 [githubstatus](https://www.githubstatus.com/) 看，结果一切正常

在整了 10 分钟后，还是不知道咋回事，只好问 AI 了

![2026-09-01_09-57.png](/images/archive/2026-09-01_09-57.png)

![38.gif](/images/archive/38.gif)

我还是第一次知道有这种限制

猜测是我修改了 `Metrics` 这个 Action 的执行间隔，从 6 小时一次改成了一小时一次。而这个 Action 会大量请求 Github API 来生成用户资料...

# 尝试解决

一开始第一想到的就是去 [support.github.com](http://support.github.com) 提工单

但是...

![2026-08-31_22-48.png](/images/archive/2026-08-31_22-48.png)

这玩意不支持中国的手机号，然而账户被标记了就必须使用手机号验证才能发工单。我上哪找国外的手机号嘞😅

上网查了查，有一些免费的接码平台，但是貌似挺多人反馈接不到

在想了很久之后，只好试试拿小号发工单试试

这一试就是3天，没有任何回应...

![Screenshot_20260831-224039_Chrome.png](/images/archive/Screenshot_20260831-224039_Chrome.png)

# 转机

其实到这我就像放弃了，拿小号，改个名，把仓库都转移过去，不一样也能用

毕竟看网上有人被封禁都得要十天半个月的，甚至是好几个月都没解决

事情的转机发生在昨天，也就是31号 ~~(呃好像也没过多久)~~

当我把`梯子`关掉，重新进入 [support.github.com](http://support.github.com)

然后就发现...

![图片.png](/images/archive/图片-3.png)

哎我怎么就可以直接提工单了

```
不要开梯子
不要开梯子
不要开梯子！
```

# 最后

着急忙慌的把小号的工单下了，用主号开了新的工单

第二天就回复了，速度非常快

![Screenshot_20260901-091629_Chrome.png](/images/archive/Screenshot_20260901-091629_Chrome.png)

直到现在，我的 Github 账号貌似都没有什么问题了
