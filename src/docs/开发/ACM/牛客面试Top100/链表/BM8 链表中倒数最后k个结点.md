---
title: BM8 链表中倒数最后k个结点
---
## 题目描述
输入一个长度为 n 的链表，设链表中的元素的值为 ai ，返回该链表中倒数第k个节点。如果该链表长度小于k，请返回一个长度为 0 的链表。
例如输入{1,2,3,4,5},2时，对应的链表结构如下图所示：
![](https://md-blog-images.oss-cn-beijing.aliyuncs.com/images/c8G7zx.png)
其中蓝色部分为该链表的最后2个结点，所以返回倒数第2个结点（也即结点值为4的结点）即可，系统会打印后面所有的节点来比较。
## 快慢指针
```go
func FindKthToTail( pHead *ListNode ,  k int ) *ListNode {
    if pHead==nil{
        return nil
    }
    var fast,slow *ListNode 
    fast=pHead
    slow=pHead
    var tmp int
    tmp=k
    for fast!=nil&&tmp>0{
        fast=fast.Next
        tmp--
    }
    if fast==nil&&tmp!=0{
        return nil
    }
    for fast!=nil{
        fast=fast.Next
        slow=slow.Next
    }
    return slow
}
```
对于另一种做法，是使用栈的思路。但go本身是不直接支持栈的，使用切片进行模拟的化，反而是多此一举，所以就不用考虑了。