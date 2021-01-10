# https://leetcode.com/problems/rotate-list/
#%%
class ListNode(object):
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
    
    def push(self, node):
        tmp = self
        while(tmp.next != None):
            tmp = tmp.next
        
        tmp.next = node
    def shift_right(self, k):
        if k == 0:
            return self
        if self.next == None:
            return self
        #Counting the number of nodes in the tree in order to prevent the procedure from redundant shifting due to high k 
        length = 0
        tmp = self
        while(tmp != None):
            length += 1
            tmp = tmp.next

        rotations = k%length
        while(rotations > 0 ):
            head = self
            tail = None
            tailPrev = None
            tmp = head
            while tmp.next.next != None:
                tmp = tmp.next
            
            tailPrev = tmp
            tail = tmp.next
            self = tail
            self.next = head
            tailPrev.next = None
            print(f'Rotate right by k={rotations}: ', end='')
            print(self)
            rotations -= 1
        #return self

    def shift_left(self, k):
        if k == 0:
            return self
        if self.next == None:
            return self

        #Counting the number of nodes in the tree in order to prevent the procedure from redundant shifting due to high k 
        length = 0
        tmp = self
        while(tmp != None):
            length += 1
            tmp = tmp.next

        rotations = k%length
        while(rotations > 0):
            head = self
            headNext = self.next
            tail = None
            tmp = head
            while tmp.next != None:
                tmp = tmp.next
            
            head.next = None
            tail = tmp
            tail.next = head
            self = headNext
            
            print(f'Rotate Left by k={rotations}: ', end='')
            print(self)
            rotations -= 1
        #return self

    def __str__(self):
        values = []
        tmp = self
        while(tmp != None):
            values.append(tmp.val)
            tmp = tmp.next
        
        return f"The values in this node are: {values}"
# %%
head = [1,2,3,4,5]
k = 2

tree = ListNode(head[0])
for i in range(1, len(head)):
    tree.push(ListNode(head[i]))

print(tree)
# %%
tree.shift_right(k)
# %%
tree.shift_left(2)


# %%
