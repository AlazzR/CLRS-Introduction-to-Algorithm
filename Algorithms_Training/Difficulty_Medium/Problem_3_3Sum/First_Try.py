# https://leetcode.com/problems/3sum/
#%%
nums = [-1,0,1,2,-1,-4]
target = 0 
#%%
def threeSum(nums: list):
    nums.sort()
    indeces = []
    values = []
    uniqueIndeces = {}
    #need to stop when I reach len(nums) - 2 because that I am going to deal with 2 pointers
    for ind in range(0, len(nums) - 2):
        lowInd = ind + 1 
        highInd = len(nums) - 1
        while(lowInd < highInd):
            sum_value = nums[ind] + nums[lowInd] + nums[highInd]
            #print(sum_value)
            if sum_value == 0:
                if str(nums[ind]) + ' ' + str(nums[lowInd]) + ' ' + str(nums[lowInd]) not in uniqueIndeces:
                    uniqueIndeces[str(nums[ind]) + ' ' + str(nums[lowInd]) + ' ' + str(nums[lowInd])] = [ind, lowInd, highInd]
                    indeces.append([ind, lowInd, highInd])
                    values.append([nums[ind], nums[lowInd], nums[highInd]])
            
            if sum_value > 0:
                highInd -= 1
            else:
                lowInd += 1
    return values

threeSum(nums)

# %%
