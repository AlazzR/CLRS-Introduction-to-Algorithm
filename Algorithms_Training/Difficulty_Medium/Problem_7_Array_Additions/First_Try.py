#
"""
Array addition
    Have the function ArrayAddition(arr) take the array of numbers stored in arr and return the string true if any combination of numbers in the array (excluding the largest number) can be added up to equal the largest number in the array, otherwise return the string false. For example: if arr contains [4, 6, 23, 10, 1, 3] the output should return true because 4 + 6 + 10 + 3 = 23. The array will not be empty, will not contain all the same elements, and may contain negative numbers.
"""
#%%
# Solution seen from the internet but I fully understood it, https://www.geeksforgeeks.org/subset-sum-problem-dp-25/
#array = [ 4, 6, 23, 10, 1, 3]#True
#array = [ -1, -2, -1]#False
array = [3,5,-1,8,12]#True


def searchSum(arr, sumV, ind, maxV):
    if sumV == maxV:
        return True

    elif sumV > maxV or ind >= len(arr):
        #no point of continuing with this stack
        return None
    
    sumLinearly = searchSum(arr, sumV + arr[ind], ind + 1, maxV)
    skipPoisition = searchSum(arr, sumV, ind + 1, maxV)

    return  sumLinearly or skipPoisition

def findingSuminArr(arr):
    arr.sort()

    maxV = arr.pop(-1)
    arrLen = len(arr)

    doesExist = searchSum(arr, 0, 0, maxV)

    if doesExist == False or doesExist == None:
        return False
    return True

print(findingSuminArr(array))
# %%
