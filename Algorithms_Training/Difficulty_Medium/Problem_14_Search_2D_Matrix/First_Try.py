#%% 
#https://leetcode.com/problems/search-a-2d-matrix/
#%%
#It worked but there are redundant steps, the second solution is better.
inp = [[1,3,5,7],[10,11,16,20],[23,30,34,60],[23,30,34,60],[23,30,34,60]]
inp = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]
#inp = [[1]]
inp = [[1,3]]
inp = [[1], [3]]
inp = [[1,3,5]]
target = 3
#target = 13
#target = 1
target = 3

def searchMatrix(inp, target):
    lenX = len(inp)
    lenY = len(inp[0])
    if len(inp) == 1:
        if len(inp[0]) == 1:
            if inp[0][0] == target:
                return True
            else:
                return False

    flag = True
    foundTarget = False
    mid = int(lenX/2) - 1 if lenX%2 == 0 else int(lenX/2)
    #Finding the right row
    while(len(inp) >= 2):
        print(len(inp))
        mid =   int((len(inp)-mid)/2) - 1 if (len(inp)-mid)%2 == 0 else int((len(inp) - mid)/2)

        if target < inp[mid][0]:
            #Go to left
            inp = inp[0:mid+1]
            #print('l', inp)
        #Check if it is larger than the largest value in the middle row
        elif target > inp[mid][lenY - 1]:
            #Go to right
            inp = inp[mid+1:]
            #print('r', len(inp))

        else:
            inp = [inp[mid]]
            print("HH")
            break
            #found putative row
    inp = inp[0]
    print('//',inp)
    midCol = int(lenY/2) - 1 if lenY%2 == 0 else int(lenY/2)
    while(len(inp) > 0):
        midCol =   int((len(inp)-midCol)/2) - 1 if (len(inp)-midCol)%2 == 0 else int((len(inp) - midCol)/2)
        if target < inp[midCol]:
            #Go to left
            inp = inp[0:midCol+1]
            print('l', inp)
        elif target > inp[mid]:
            #Go to right
            print(inp)
            inp = inp[midCol:]
            print('r', inp)
        elif target == inp[midCol]:
            #Found
            return True
        print(inp)
        print(midCol)
        if len(inp) == 2:
            if target == inp[0] or target == inp[1]:
                #Found
                return True
            else:
                #Not found
                return False
        if len(inp) < 2:
            if target == inp[midCol]:
                return True
            else:
                return False



print(searchMatrix(inp, target))

# %%
