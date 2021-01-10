# https://leetcode.com/problems/3sum-closest/
#%%
nums =  [-1,2,1,-4]
target = 1
# %%
def threeSumClosest(nums, target: int) -> int:
    nums.sort()
    #print('nums', nums)
    closest = 1000
    value = 0
    for ind1, level1 in enumerate(nums):
        for ind2, level2 in enumerate(nums[ind1+1:], start = ind1 + 1):
            for ind3, level3 in enumerate(nums[ind2 + 1:], start=ind2 + 1):
                #print('val1 ', level1, ' ind2 ', level2, ' ind3 ', level3 )
                if closest > abs(target - (level1 + level2 + level3)):
                    closest = abs(target - (level1 + level2 + level3))
                    value = level1 + level2 + level3
                    #print('-'*10)
    return value
print(threeSumClosest(nums, target))
# %%
