# https://leetcode.com/problems/remove-nth-node-from-end-of-list/
#%%
#This is using DLL, apparently they want SLL.
head = [1,2,3,4,5]
n = 2
# %%
class ListNode(object):

    def __init__(self, val, next=None):
        self.val = val
        self.next = next
    
    def push(self, node=None):
        tmp = self
        while(tmp.next != None):
            tmp = tmp.next
        
        tmp.next = ListNode(node.val)

    def removeFromEnd(self, ind):
        #Time O(L) but the problem is that Space complexity is O(ind + 1).
        #index start from 1 according to this problem
        tmp = self
        nodesContainer = []
        if ind < 0:
            ind = 1
        counter = 0
        while(tmp != None):
            #We want to maintain the the node before the nth deisred node
            if counter == ind:
                prev = nodesContainer.pop(0)
                #print('pr', prev.val)
                counter -= 1
                if tmp.next == None:
                    #Reached the tail
                    nodesContainer.append(tmp)
                    #print(nodesContainer[0].val)
                    prev.next = nodesContainer[0].next
                    tmp = tmp.next
                    continue
                else:
                    nodesContainer.append(tmp)
                    tmp = tmp.next
                    counter +=1
            elif tmp.next == None and counter != ind:
                self = self.next
                break
            else:
                nodesContainer.append(tmp)
                tmp = tmp.next
                counter += 1
        return self
    
    def __str__(self):
        values = []
        tmp = self
        while(tmp.next != None):
            values.append(tmp.val)
            tmp = tmp.next
        values.append(tmp.val)
        return f"The values in this List are: {values}"



node = ListNode(head[0])
for i in range(1, len(head)):
    node.push(ListNode(head[i]))

print(node)
# %%
node = node.removeFromEnd(2)
print(node)
# %%
