#%%
array = [ 4, 6, 23, 10, 1, 3]#True


def isSubsetExist(arr):
    arr.sort()
    print(arr)
    maxV = arr.pop(-1)
    def findSum(array, sumV, subset, indx):
        if sumV == maxV:
            return (subset, True)
        elif indx >= len(array) or sumV > maxV:
            return('', False)
        else:
            print(array)
            linearMovement = findSum(array, array[indx] + sumV, subset + '+' + str(array[indx]), indx + 1)
            skip = findSum(array, sumV, subset, indx + 1)
        if linearMovement[1] == True:
            return linearMovement
        else:
            return skip
        return 
    subset, flag = findSum(arr, 0, '', 0)
    sub = [int(i) for i in list(filter(lambda x: x!= '', subset.split('+')))]
    return (sub, flag)


isSubsetExist(array)
# %%
