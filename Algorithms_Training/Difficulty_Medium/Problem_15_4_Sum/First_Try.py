#%%
# https://leetcode.com/problems/4sum/

#%%
nums = [1,0,-1,0,-2,2]
nums = [-2,-1,-1,1,1,2,2]
target = 0
# %%
def _4Sum(nums, target):
    putativeAnswers = []
    nums.sort()
    print(nums)
    for ind in range(0, len(nums)):
        for ind2 in range(ind + 1, len(nums)):
            low = ind2 + 1
            high = len(nums) - 1
            while(low < high):
                #print(low, '|', high)
                #print([nums[ind], nums[ind2], nums[low], nums[high]])
                if nums[ind] + nums[ind2] + nums[low] + nums[high] == target:
                    flag = False
                    for p in putativeAnswers:
                        if p == [nums[ind], nums[ind2], nums[low], nums[high]]:
                            flag = True
                            break
                    if not flag:
                        putativeAnswers.append([nums[ind], nums[ind2], nums[low], nums[high]])
                if nums[ind] + nums[ind2] + nums[low] + nums[high] > target:
                    high -= 1
                else:
                    low += 1
    
    return putativeAnswers 
print(_4Sum(nums, target))

# %%
