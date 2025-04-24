---
title: BM15 删除有序链表中重复的元素-I
---
## 描述
删除给出链表中的重复元素（链表中元素从小到大有序），使链表中的所有元素都只出现一次  
例如：  
给出的链表为1→1→21→1→2,返回1→21→2.  
给出的链表为1→1→2→3→31→1→2→3→3,返回1→2→31→2→3.

## 示例
```
{1,1,2}
{1,2}
```
## 思路
### 哈希表
要求元素只出现一次，感觉可以使用哈希表
```go
package main

import (
	. "nc_tools"
)

/*
 * type ListNode struct{
 *   Val int
 *   Next *ListNode
 * }
 */

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param head ListNode类
 * @return ListNode类
 */
func deleteDuplicates( head *ListNode ) *ListNode {
     if head==nil{
        return nil
     }
     hashList:=make(map[int]*ListNode) 
     var nowNode *ListNode
     nowNode=head
     for nowNode!=nil{
        hashList[nowNode.Val]=nowNode
        nowNode=nowNode.Next
     }
     var newHead,tmpNode *ListNode
     tmpNode=&ListNode{
        Val: 0,
     }
     newHead=tmpNode
     for _,i :=range hashList{
        i.Next=nil
        tmpNode.Next=i
        tmpNode=tmpNode.Next
     }
     return newHead.Next
}
```
but很可惜，我写完才发现原来要保持顺序。哈希表这条路看来是走不通了。想想条件既然链表有序，那么我们就可以使用指针记录上一个值即可。
```go

import (
	. "nc_tools"
)
/*
 * type ListNode struct{
 *   Val int
 *   Next *ListNode
 * }
 */

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param head ListNode类
 * @return ListNode类
 */
func deleteDuplicates( head *ListNode ) *ListNode {
    // write code here
    if head==nil{
        return nil
    }
    if head.Next==nil{
        return head
    }
    var perNode,nowNode *ListNode
    perNode=head
    nowNode=head.Next
    for nowNode!=nil{
      if perNode.Val==nowNode.Val{
            perNode.Next=nowNode.Next
            nowNode=nowNode.Next
       }else{
           perNode=nowNode
           nowNode=nowNode.Next
       }
    } 
    return head
}
```