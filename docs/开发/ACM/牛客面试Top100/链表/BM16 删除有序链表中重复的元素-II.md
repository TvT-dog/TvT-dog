---
title: BM16 删除有序链表中重复的元素-II
---
## 描述
给出一个升序排序的链表，删除链表中的所有重复出现的元素，只保留原链表中只出现一次的元素。  
例如：  
给出的链表为1→2→3→3→4→4→51→2→3→3→4→4→5, 返回1→2→51→2→5.  
给出的链表为1→1→1→2→31→1→1→2→3, 返回2→32→3.
```
{1,2,2}
{1}
```

## 思路
从题目可以看，链表要保持顺序且要进行删除，我们可以使用双指针,来记录边界。
```go
func deleteDuplicates(head *ListNode) *ListNode {
	// write code here
	if head == nil {
		return nil
	}
	if head.Next == nil {
		return head
	}
	var preNode, nowNode, nextNode,newHead *ListNode

	preNode = &ListNode{
		Val: 0,
	}
    newHead=preNode
	nowNode = head
	nextNode = head.Next

	for  nextNode!=nil{
		if nowNode.Val != nextNode.Val {
			preNode.Next = nowNode
            preNode=preNode.Next
			nowNode = nowNode.Next
			nextNode = nextNode.Next
		} else {
               
			if nextNode.Next == nil {
				preNode.Next = nil
                nowNode=nil
           
                break
			} else {
				nowNode = nextNode.Next
				nextNode = nextNode.Next
            
			}

		}
	}
 
	return newHead.Next

}
```
但最后还是由于边界条件过于复杂，最后难以实现。
最后看了一下官方答案的实现
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
func deleteDuplicates(head *ListNode) *ListNode {
	if head == nil {
		return nil
	}
	if head.Next == nil {
		return head
	}
	dummy := &ListNode{Val: 0, Next: head}
	pre := dummy
	cur := head

	for cur != nil {
		// 跳过重复节点
		for cur.Next != nil && cur.Val == cur.Next.Val {
			cur = cur.Next
		}
		if pre.Next == cur {
			// 没有重复节点，移动 pre 指针
			pre = pre.Next
		} else {
			// 有重复节点，跳过重复节点
			pre.Next = cur.Next
		}
		cur = cur.Next
	}
	return dummy.Next
}
```