---
title: BM5 合并k个已排序的链表
---
## 描述
合并 k 个升序的链表并将结果作为一个升序的链表返回其头节点。



数据范围：节点总数0≤n≤50000≤n≤5000，每个节点的val满足val∣< =1000∣val∣< =1000
要求：时间复杂度 O(nlogn)
```
输入：
[{1,2,3},{4,5,6,7}]
返回值：
{1,2,3,4,5,6,7}
```
## 思考
这里涉及多个链表且要求时间复杂度为n`*`logn，应考虑使用特定排序算法。

### 归并排序
最开始想法是把链表转化为数组进行排序后在转化回去，然后再直接进行合并排序，但发现最后我们内存超限了。
代码如下：
```go
func mergeKLists(lists []*ListNode) *ListNode {
	if lists == nil {
		return nil
	}
	var link *ListNode
	var nowNode  *ListNode
	single := listToLinkList(lists)
    

	arrNode := merge(single)
	for _, i := range arrNode {
        
		tmpNode:=&ListNode{
            Val: i,
        }
         if link==nil{
            link=tmpNode
            nowNode=tmpNode
        }else{
           nowNode.Next=tmpNode
            nowNode=tmpNode
        }
        
	}
    if link==nil{
        link=&ListNode{
        
        }
    }
	return link

}
func listToLinkList(list []*ListNode) []int {
	// 检查 list 是否为空
	if len(list) == 0 {
		return []int{}
	}
	// 找到第一个非 nil 的节点
	var preNode *ListNode
    var prekey int
	for k, v := range list {
		if v != nil {
			preNode = v
            prekey=k
			break
		}
	}
   
	// 如果没有找到非 nil 的节点，返回空列表
	if preNode == nil {
		return []int{}
	}
	// 找到第一个链表的尾节点
	tail := preNode
	for tail.Next != nil {
		tail = tail.Next
	}
	// 连接后续的链表
	for _, v := range list[prekey+1:] {
		if v == nil {
			continue
		}
		tail.Next = v
		// 找到当前链表的尾节点
		for v.Next != nil {
			v = v.Next

		}
		tail = v
	}

	var a []int
	current := preNode
	for current != nil {
		a = append(a, current.Val)
		current = current.Next
	}
	return a
}

func merge(list []int) []int {
	//终止条件
	if len(list) == 1 {
		return list
	}
	//递
	left := len(list) / 2
	leftArr := merge(list[:left])
	rightArr := merge(list[left:])
	//归
	i := 0
	j := 0
	var arr []int
	for i < len(leftArr) && j < len(rightArr) {
		if leftArr[i] < rightArr[j] {
			arr = append(arr, leftArr[i])
			i++
		} else {
			arr = append(arr, rightArr[j])
			j++
		}
	}
	// 处理左子数组剩余元素
	for i < len(leftArr) {
		arr = append(arr, leftArr[i])
		i++
	}
	// 处理右子数组剩余元素
	for j < len(rightArr) {
		arr = append(arr, rightArr[j])
		j++
	}

	return arr
}
```
想了一会儿，决定还是看看答案。
代码如下
```go
func mergeKLists( lists []*ListNode ) *ListNode {
    // write code here
    //先处理值情况
	if lists ==nil{
		return nil
	}
    //使用归并排序处理值
	return merger(lists, 0, len(lists)-1)
    
}
func merger(lists []*ListNode,left int,right int) *ListNode{
    //使用递归先判断终止条件
    if left>right{
		//防止空值
		return nil
	}else if left==right{
		return lists[left]
	}
	//递
	mid:=(left+right)/2
	leftNode:=merger(lists, left,mid )
	rightNode:=merger(lists, mid+1, right)
	//归
    
	//处理可能的空值情况
	if leftNode==nil&&rightNode==nil{
		return nil
	}else if leftNode==nil{
		return rightNode
	}else if rightNode==nil{
		return leftNode
	}
    //进行合并
	var newHeader,tmpLeft,tmpRight,tmpHead *ListNode
	newHeader=&ListNode{
		Val: 0,
	}
	tmpHead=newHeader
    tmpLeft=leftNode
	tmpRight=rightNode
    for tmpLeft!=nil&&tmpRight!=nil{
		if tmpLeft.Val>tmpRight.Val{
			tmpHead.Next=tmpRight
			tmpHead=tmpHead.Next
			tmpRight=tmpRight.Next
		}else{
			tmpHead.Next=tmpLeft
			tmpHead=tmpHead.Next
			tmpLeft=tmpLeft.Next
		}
	}
	if tmpLeft!=nil{
		tmpHead.Next=tmpLeft
	}else{
		tmpHead.Next=tmpRight
	}
	newHeader=newHeader.Next
	return newHeader

}
```
其实这里是使用合并排序处理的数组环节，同时考虑到了链表本身是升序的条件。
### 堆排序
```go
package main
import . "nc_tools"
import "container/heap"
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
 * @param lists ListNode类一维数组 
 * @return ListNode类
*/
type linkHead []*ListNode
//实现长度
func (h *linkHead)Len() int{
	return len(*h)

}
//实现比较
func (h *linkHead)Less(i,j int) bool{
    return (*h)[i].Val<(*h)[j].Val
}
//实现交换
func (h *linkHead)Swap(i,j int){
	(*h)[i],(*h)[j]=(*h)[j],(*h)[i]

}
//实现入堆
func (h *linkHead)Push(x interface{}){
     *h=append((*h), x.(*ListNode))
}
//实现出堆
func (h *linkHead)Pop()interface{} { 
	last:=(*h)[len((*h))-1]
	*h=(*h)[:len((*h))-1]
	return last
}

func mergeKLists( lists []*ListNode ) *ListNode {
	h:=&linkHead{}
	heap.Init(h)
    for _,i :=range lists{
		if i!=nil{
			heap.Push(h, i)
		}
	}

    var newLinkHead *ListNode
	var nowNode *ListNode
    newLinkHead=&ListNode{
		Val: 0,
	}
    nowNode=newLinkHead
	var tmpNode *ListNode
	for h.Len()>0{
        tmpNode=heap.Pop(h).(*ListNode)
		nowNode.Next=tmpNode
		nowNode=nowNode.Next
		if tmpNode.Next!=nil{
			heap.Push(h , tmpNode.Next)
		}
	}
	nowNode.Next=nil
	newLinkHead=newLinkHead.Next
	return newLinkHead
}


```