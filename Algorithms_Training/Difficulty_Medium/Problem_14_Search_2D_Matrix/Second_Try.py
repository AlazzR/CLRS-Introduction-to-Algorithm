#%% 
#https://leetcode.com/problems/search-a-2d-matrix/
#%%
#It worked but there are redundant steps, the second solution is better.
inp = [[1,3,5,7],[10,11,16,20],[23,30,34,60],[23,30,34,60],[23,30,34,60]]
inp = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]
#inp = [[1]]
inp = [[1,3]]
inp = [[1], [3]]
#inp = [[1,3,5]]
target = 3
#target = 13
#target = 1
target = 3

def searchMatrix(inp, target):
    #Because it is already ordered, we can spread it to 1 dimensional array and just moving the two pointers
    low = 0
    high = len(inp) * len(inp[0])
    while(low <= high):
        mid = (low + high)/2
        value = inp[int(mid/len(inp[0]))][int(mid%len(inp[0]))]#number of blocks to move

        if value == target:
            return True
        elif value < target:
            #the left half is redundant inclusive
            low = mid + 1
        else:
            #now the right is redundant
            hight = mid 
    
    return False


print(searchMatrix(inp, target))
# %%
