#%%
class ListNode(object):

    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
    def push(self, node):
        tmp = self
        counter = 0
        while(tmp.next != None):
            #print(counter, tmp.next.val)
            tmp = tmp.next
            counter += 1
        tmp.next = node
    def __str__(self)->list:
        values = []
        tmp = self
        while(tmp != None):
            values.append(tmp.val)
            tmp = tmp.next
        return f"Values of this list are: {values}"
# %%
#I will assume that the list are sorted as suggeted in the problem
list1 = [1, 2, 4]
list2 = []
nodeList1 = None
nodeList2 = None
if(len(list1) > 0):
    nodeList1 = ListNode(list1[0])
    if(len(list1) > 1):
        for indx in range(1, len(list1)):
            nodeList1.push(ListNode(list1[indx]))

if(len(list2) > 0):
    nodeList2 = ListNode(list2[0])
    if(len(list2) > 1):
        for indx in range(1, len(list2)):
            nodeList2.push(ListNode(list2[indx]))

print(nodeList1)
print(nodeList2)

# %%
def mergeTwoLists(l1: ListNode, l2: ListNode) -> ListNode:
    positionInL1 = l1
    positionInL2 = l2
    outList = None
    if(l1 == None and l2 == None):
        return None

    elif(l1 == None):
        values = []
        outList = positionInL2
        while(positionInL2 != None):
            values.append(positionInL2.val)
            positionInL2 = positionInL2.next
        return outList
    elif(l2 == None):
        values = []
        outList = positionInL1
        while(positionInL1 != None):
            values.append(positionInL1.val)
            positionInL1 = positionInL1.next
        return outList
    else:
        values = []
        if positionInL1.val <= positionInL2.val:
            outList = ListNode(positionInL1.val)
            positionInL1 = positionInL1.next
        else:
            outList = ListNode(positionInL2.val)
            positionInL2 = positionInL2.next
        #Pivot list will be l1
        while(positionInL1 != None and positionInL2 != None):
            flag = True
            #loop through the second list
            while(flag and positionInL2 != None):
                if positionInL1.val >= positionInL2.val:
                    outList.push(ListNode(positionInL2.val))
                    positionInL2 = positionInL2.next
                else:
                    flag = False
                
            outList.push(ListNode(positionInL1.val))
            positionInL1 = positionInL1.next
        
        if(positionInL1 != None):
            while(positionInL1 != None):
                outList.push(ListNode(positionInL1.val))
                positionInL1 = positionInL1.next
            tmp = outList
            while(tmp != None):
                values.append(tmp.val)
                tmp = tmp.next
            return outList

        else:
            while(positionInL2 != None):
                outList.push(ListNode(positionInL2.val))
                positionInL2 = positionInL2.next
            tmp = outList
            while(tmp != None):
                values.append(tmp.val)
                tmp = tmp.next
            return outList
                
# %%
print(mergeTwoLists(nodeList1, nodeList2))
# %%
