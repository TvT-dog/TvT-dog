---
title: BM7 链表中环的入口结点
---
给一个长度为n链表，若其中包含环，请找出该链表的环的入口结点，否则，返回null。
例如，输入{1,2},{3,4,5}时，对应的环形链表如下图所示：
![](https://md-blog-images.oss-cn-beijing.aliyuncs.com/images/y5sr0T.png)
可以看到环的入口结点的结点值为3，所以返回结点值为3的结点。
## hash表
类似BM6
```go
func EntryNodeOfLoop(pHead *ListNode) *ListNode{
    if pHead==nil ||pHead.Next==nil{
        return nil
    }
    nodeMap:=make(map[*ListNode]bool)
    var nowNode *ListNode
    nowNode=pHead.Next
    nodeMap[pHead]=true
    for nowNode!=nil{
       if nodeMap[nowNode]{
           return nowNode
       }
       nodeMap[nowNode]=true
       nowNode=nowNode.Next
    }
    return nil

}
```
