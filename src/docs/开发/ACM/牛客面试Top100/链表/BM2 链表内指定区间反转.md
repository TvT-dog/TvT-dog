---
title: BM2 链表内指定区间反转
---
## 描述

将一个节点数为 size 链表 m 位置到 n 位置之间的区间反转，要求时间复杂度 O(n)O(n)，空间复杂度 O(1)O(1)。  
例如：  
给出的链表为 1→2→3→4→5→NULL1→2→3→4→5→NULL, m=2,n=4m=2,n=4,  
返回 1→4→3→2→5→NULL1→4→3→2→5→NULL.

## 代码
```go

func reverseBetween(head *ListNode, m int, n int) *ListNode {
	if head == nil {
		return head
	}
	var mNext, nNext *ListNode
	var tmpNode *ListNode
	var newLinkHead *ListNode
	var lastNode *ListNode
	tmpNode = head

	for i := 1; i <= n; i++ {
		if m == 1 {
			mNext = nil
			newLinkHead = head
		}
		if i == m-1 {
			mNext = tmpNode
			newLinkHead = mNext.Next
		}
		//{1,2,3,4,5}
		if i == n {
			lastNode = tmpNode
			tmpNode = tmpNode.Next
			lastNode.Next = nil
			break
		}
		tmpNode = tmpNode.Next
	}
	nNext = tmpNode

	var nowNode, preNode, nextNode *ListNode

	nowNode = newLinkHead
	nextNode = newLinkHead.Next
	for nowNode != nil {
		nextNode = nowNode.Next
		nowNode.Next = preNode
		preNode = nowNode
		nowNode = nextNode
	}

	if mNext != nil {
		mNext.Next = preNode
	} else {
		head = preNode
	}

	for preNode.Next != nil {
		preNode = preNode.Next
	}
	preNode.Next = nNext
	return head
}

```