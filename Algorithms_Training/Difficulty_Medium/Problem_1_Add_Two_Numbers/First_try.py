#%%
#https://leetcode.com/problems/add-two-numbers/

class ListNode(object):

    def __init__(self, val=0, next=None):
         self.val = val
         self.next = next

    def push(self, node):
        tmp = self
        while(tmp.next != None):
            tmp = tmp.next
        
        tmp.next = node
    
    def __str__(self):
        values = []
        tmp = self
        while(tmp != None):
            values.append(tmp.val)
            tmp = tmp.next

        return f"List Node values: {values}"

#%%
#num1 = str(342)
#num2 = str(465)
num1 = str(9999999)
num2 = str(9999)

num1_reverse = []
for indx in range(1, len(num1) + 1):
    num1_reverse.append(int(num1[len(num1) - indx]))

num2_reverse = []
for indx in range(1, len(num2) + 1):
    num2_reverse.append(int(num2[len(num2) - indx]))

print('Number 1 list: ', num1_reverse)
print('Number 2 list: ', num2_reverse)

#%%
l1 = ListNode(num1_reverse[0])
l2 = ListNode(num2_reverse[0])


for value in range(1, len(num1_reverse)):
    l1.push(ListNode(num1_reverse[value]))

for value in range(1, len(num2_reverse)):
    l2.push(ListNode(num2_reverse[value]))

    

print(l1)
print(l2)

#%%
def addTwoNumbers(l1, l2)->ListNode:
    l1node = l1
    l2node = l2
    carry = 0
    output = None

    while(l1node != None and l2node != None):
        if output == None:
            if int((l1node.val + l2node.val + carry)/10) > 0:
                value = (l1node.val+l2node.val + carry)%10
                carry = 1
                output = ListNode(value)
                l1node = l1node.next
                l2node = l2node.next

            else:
                value = (l1node.val+l2node.val + carry)%10
                carry = 0
                output = ListNode(value)
                l1node = l1node.next
                l2node = l2node.next
        else:
            if int((l1node.val + l2node.val + carry)/10) >0:
                value = (l1node.val + l2node.val + carry)%10
                carry = 1
                output.push(ListNode(value))
                l1node = l1node.next
                l2node = l2node.next

            else:
                value = (l1node.val+l2node.val + carry)%10
                carry = 0
                output.push(ListNode(value))
                l1node = l1node.next
                l2node = l2node.next
    if(l1node != None):
        while(l1node != None):
            if int((l1node.val + carry)/10) >0:
                value = (l1node.val + carry)%10
                carry = 1
                output.push(ListNode(value))
                l1node = l1node.next

            else:
                value = (l1node.val + carry)%10
                carry = 0
                output.push(ListNode(value))
                l1node = l1node.next
    else:
        while(l2node != None):
            if int((l2node.val + carry)/10) >0:
                value = (l2node.val + carry)%10
                carry = 1
                output.push(ListNode(value))
                l2node = l2node.next

            else:
                value = (l2node.val + carry)%10
                carry = 0
                output.push(ListNode(value))
                l2node = l2node.next
    if carry:
        output.push(ListNode(carry))
    
    return output
#%%
print(addTwoNumbers(l1, l2))


# %%

# %%
