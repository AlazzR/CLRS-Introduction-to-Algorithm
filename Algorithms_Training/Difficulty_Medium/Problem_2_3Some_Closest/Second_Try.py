# https://leetcode.com/problems/3sum-closest/
# Interesting solution that I saw in leetcode website.
#%%
nums =  [-1,2,1,-4]
target = 1
# %%
def threeSumClosest(nums, target: int) -> int:
    nums.sort()
    #Better to use only two loops
    #print('nums', nums)
    closest = float('inf')
    value = 0
    for ind, num in enumerate(nums):
        lowInd = ind + 1 
        highInd = len(nums) - 1
        while(lowInd < highInd):
            #We move lowInd to the right iff level1 + level2 + level3 < target
            #We move highInd to the left iff level1 + level2 + level3 > target
            sum_levels = num + nums[lowInd] + nums[highInd]
            if closest > abs(target - sum_levels):
                closest = abs(target - sum_levels)
                value = sum_levels
            if sum_levels < target:
                lowInd += 1
            else:
                highInd -= 1
            
            if closest == 0:
                break
        if closest == 0:
            break

    return value
print(threeSumClosest(nums, target))
# %%
