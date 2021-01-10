# https://leetcode.com/problems/remove-nth-node-from-end-of-list/
#%%
#This is using DLL, apparently they want SLL.
head = [1,2,3,4,5]
n = 2
# %%
class ListNode(object):

    def __init__(self, val, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next
    
    def __str__(self):
        return f"{self.val}"

class ListTree(object):
    def __init__(self, val):
        self.head = ListNode(val)
        self.tail = self.head

    def push(self, node=None):
        if(self.head == self.tail):
            self.head.next = node
            self.tail = node
            self.tail.prev = self.head
        else:
            tmp = self.tail
            tmp.next = node
            self.tail = node
            self.tail.prev = tmp
    def removeFromEnd(self, ind):
        #index start from 1 according to this problem
        tmp = self.tail
        tmpPrev = tmp.prev
        tmpNext = tmp.next
        if ind == 0:
            ind = 1
        i = 1
        while(i < ind):
            tmp = tmpPrev
            if tmpPrev == None:
                #Reached the head
                break
            tmpNext = tmp.next
            tmpPrev = tmp.prev
            i += 1

        if i == 1:
            self.tail = tmpPrev
            self.tail.next = None
        elif tmpPrev == None:
            self.head = tmpNext
            self.head.prev = None
        else:
            tmpPrev.next = tmpNext
            tmpNext.prev = tmpPrev
        
        return self.head


    def __str__(self):
        values = []
        tmp = self.head
        while(tmp != None):
            values.append(str(tmp))
            tmp = tmp.next
        return f"The values in this List are: {values}"
tree = ListTree(head[0])
for i in range(1, len(head)):
    tree.push(ListNode(head[i]))

print(tree)
# %%
tree.removeFromEnd(6)
print(tree)
# %%
