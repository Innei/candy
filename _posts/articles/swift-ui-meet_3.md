---
date: 2020-12-28T06:37:17.970Z
updated: 2020-12-28T06:38:01.547Z
title: 从零开始的 Swift UI (三)
slug: swift-ui-meet_3
categories: 编程
type: Post
permalink: posts/swift-ui-meet_3
---


接上文：[从零开始的 Swift UI (二)](https://innei.ren/posts/programming/swift-ui-meet_2)

上篇文章介绍了如何使用 UserDefaults 和 ObserveableObject 来进行数据管理。

这篇文章来完成 LikeView 的布局和功能实现。

![](https://gitee.com/xun7788/my-imagination/raw/master/uPic/1609134619435.png)

## Layout

在 LikeView 中编写如下代码。

```swift
struct LikeView: View {
  @EnvironmentObject var like: Like

  var likes: [LikeModel] {
    like.likes
  }

  var body: some View {
    ZStack {
      GeometryReader { _ in
                      List {
                        ForEach(likes) { like in
                                        Button(action: {}, label: { Text(like.text) })
                                       }
                      }
                     }
    }
  }
}

```

![](https://gitee.com/xun7788/my-imagination/raw/master/uPic/1609136864498.png)

再修改 HomeView 中的 Like Button 代码。

```swift
Button(action: {
  like.add(hikotoko: model)
}, label: {
  Image(systemName: liked ? "suit.heart.fill" : "suit.heart")
  .foregroundColor(liked ? .red : .primary)
  .font(.custom("icon", size: 28))
})
```

Like.swift 中新增一个方法。

```swift
func add(hikotoko: HitokotoModel) -> Bool {
  let date = ISO8601DateFormatter().date(from: hikotoko.createdAt) ?? Date()

  return add(item: LikeModel(id: UUID(uuidString: hikotoko.uuid) ?? UUID(), text: hikotoko.hitokoto,
                             createdAt: date, from: hikotoko.from, author: hikotoko.creator))
}
```

上面 Like Button 时候被选中，可以根据 Like 中有没有存储判断。

将 ActionView 修改为如下代码：

```swift
struct ActionView: View {
    @Binding var model: HitokotoModel?
    @EnvironmentObject var like: Like

    var liked: Bool {
        guard let model = model else {
            return false
        }
        return like.has(uuid: UUID(uuidString: model.uuid))
    }

    @ViewBuilder
    var body: some View {
        if let model = model {
            HStack(spacing: 20) {
                Button(action: {
                    like.add(hikotoko: model)
                }, label: {
                    Image(systemName: liked ? "suit.heart.fill" : "suit.heart")
                        .foregroundColor(liked ? .red : .primary)
                        .font(.custom("icon", size: 28))
                })
                Button(action: {
                }, label: {
                    Image(systemName: "square.and.arrow.up")
                        .font(.custom("icon", size: 28))
                        .foregroundColor(.primary)
                })
            }
        }
    }
}

```

`liked` 计算属性根据 model 中的 uuid 推断状态。因为使用了 `@Binding` 所以上层 View 还需要传一个 Binding 给他。可以理解为 React 中的 Props。注意的是 只有加了 `@Binding` 的参数传递才是引用传递，也就是上层数据更新后下层也会被更新。

在 HomeView 中修改为 `ActionView(model: $model).offset(x: 0, y: reader.size.height / 2 - 50)`

被 `@State` 装饰的属性，取他的 Binding 只需要在前面加一个 `$`

这样点击 Like Button 后 ❤就会变红啦。

## Navigation

为了实现能在各个 View 之间导航。使用 NavigationView 就可以做到啦。

修改 HomeView，在外层加上 NavigationView。

修改 LikeView，在外层加上 NavigationView。

```swift
var body: some View {
  NavigationView {
    ZStack {
      GeometryReader { _ in
                      List {
                        ForEach(likes) { like in
                                        Button(action: {}, label: { Text(like.text) })
                                       }
                      }
                     }
    }.navigationBarTitle("喜欢")
  }
}
```

注意在设定 `.navigationBarTitle` 必须加在 NavigationView 的子 View 上才会生效。

![](https://gitee.com/xun7788/my-imagination/raw/master/uPic/1609137171258.png)

接下来，调整一下 List 的 style，让 Item 撑满整个宽度。只需要使用内置的 `.listStyle(PlainListStyle())`  即可。

其余知识点将通过小 Demo 描述。

- Share
- Sheet Modal

完整 App：<https://github.com/Innei/meet-swift>

（完）