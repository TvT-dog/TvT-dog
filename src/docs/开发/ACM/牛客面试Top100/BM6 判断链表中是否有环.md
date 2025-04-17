---
title: BM6 判断链表中是否有环
---
判断给定的链表中是否有环。如果有环则返回true，否则返回false。

输入分为两部分，第一部分为链表，第二部分代表是否有环，然后将组成的head头结点传入到函数里面。-1代表无环，其它的数字代表有环，这些参数解释仅仅是为了方便读者自测调试。实际在编程时读入的是链表的头节点。

![](https://md-blog-images.oss-cn-beijing.aliyuncs.com/images/affzvs.png)
## 快慢指针
```go
package main
import . "nc_tools"
/*
 * type ListNode struct{
 *   Val int
 *   Next *ListNode
 * }
 */

/**
 * 
 * @param head ListNode类 
 * @return bool布尔型
*/
func hasCycle( head *ListNode ) bool {
    // write code here
    if head==nil||head.Next==nil{
        return false
    }
    var fast ,slow *ListNode
    fast=head.Next
    slow=head
    for fast != nil && fast.Next != nil{
       if fast==slow{
        return true
       }
       fast=fast.Next.Next
       slow=slow.Next
    }
    return false
}
```
## 哈希表
```go
func hasCycle( head *ListNode ) bool {
    var  nowNode *ListNode
    nowNode=head
    nodeMap:=make(map[*ListNode]bool)

    for nowNode!=nil{
        if nodeMap[nowNode]{
            return true
        }
        nodeMap[nowNode]=true
        nowNode=nowNode.Next
    }
    return false
}
```