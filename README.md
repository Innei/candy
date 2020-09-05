# Candy

静态博客生成器, 最小化版本的 [Kami](https://github.com/mx-space/kami).

A simple static space generator. Minified version [Kami](https://github.com/mx-space/kami).

## Ready

开始之前, 你需要确保已经安装 Node, Yarn.

Before you start, you need to make sure you have Node, Yarn, installed.

```
Node > 12
Yarn > 1.19
```

## Usage

根目录下的 `_posts` 文件夹是用来存放文章的.

`articles` 文件夹是放博文的

`notes` 是放日记的

只支持 YAML Markdown 格式.

The `_posts` folder in the root directory is for posts.

The `articles` folder is for blog posts.

`notes` is for diaries.

Only YAML Markdown format is supported.

### MetaData

每种类型的文章都有 Metadata, 也就是 YAML 类型的文件头部, 每种类型支持的 MetaData 不相同.

但是他们全部支持如下 MetaData:

Each type of article has a Metadata, which is a YAML-type file header, and each type supports a different MetaData.

However, they all support the following MetaData:

```yaml
title: 这是一个标题 (不推荐省略, 可选, 默认使用文件名)
created: 这个文件何时被创建 (可选, 默认文件创建时间)
modified: 这个文件何时被修改 (可选, 默认文件修改时间)
```

`Article` 还支持如下额外的属性:

`Article` also supports the following additional attributes:

```yaml
slug: 地址栏映射 (可选, 默认为时间戳)
```

`Note` 还支持如下额外的属性:

`Note` also supports the following additional attributes:

```yaml
title: 文章名 (必选)
mood: 心情 (可选)
weather: 天气 (可选)
nid: 当前的日记序号 (可选, 默认自动按照创建时间排序)
```

`Page` 还支持如下额外的属性:

`Page` also supports the following additional attributes:

```yaml
subtitle: 子标题 (可选)
order: 页面顺序 (可选)
slug: 地址栏映射 (必选)
```

### Example

一个完整的 Article Markdown.

A complete version of `Article` Markdown.

```markdown
---
date: 2020-07-27T05:11:45.989Z
updated: 2020-09-04T16:12:36.186Z
title: Test
slug: test-1
type: Post
---

这是内容
```

一个完整的 Note Markdown.

A complete version of `Note` Markdown.

```markdown
---
date: 2020-01-15T11:29:00.000Z
updated: 2020-08-27T05:21:27.231Z
title: 新的开始
nid: 54
weather: 晴
mood: 开心
---

最近忙着准备<del>考试</del>玩，到了新的一年也没能挤出时间来去写<del>水</del>一篇杂谈。其实也不是因为考试，但是就是所有的事情好像挤到了一条线上，有点喘不过气起来。我想着，在新的一年里，我总要有所改变。

巴拉巴拉..
```

一个完整的 Page Markdown.

A complete version of `Page` Markdown.

```markdown
---
date: 2020-05-08T12:25:36.390Z
updated: 2020-08-17T09:04:51.399Z
title: 留言
slug: message
subtitle: 在这里，悄悄的留下点什么呢
order: 3
---

嘿，远方的朋友。

你可以在这里畅所欲言。

我都会倾听你的诉说。

申请友链请前往 <https://innei.ren/friends>
```

## Build

只需要执行 `yarn build`, 输出的文件在 `out` 目录下.

Just run `yarn build`, the output file is in the `out` directory.

## Deploy

### Host on Github

你需要在 Github 上新建一个仓库, 然后把 `out` 目录下的文件上传, 开启 GitHub Pages 托管即可.

## Markdown Additional Syntax

支持全部 GFM Markdown 语法, 在此基础上增加了如下语法

- Spoiler 防剧透

语法:

`|| ||`

用两个 `||` 包裹

- Mention 链接 GitHub Profile

语法:

`(@username)`

example: `(@Innei)` 将会渲染成 [@Innei](https://github.com/Innei)

The full GFM Markdown syntax is supported, with the following syntax additions

- Spoiler. Spoiler-proof.

Syntax:

`|| ||`

Content wrapped in two `||` packages

- Mention link to GitHub Profile

Syntax:

`(@username)`

example: `(@Innei)` will be rendered as [@Innei](https://github.com/Innei)
