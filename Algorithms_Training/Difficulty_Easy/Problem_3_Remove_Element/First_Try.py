#%%
nums = [0,1,2,2,3,0,4,2]
# %%
def removeElement(nums: list, value: int)->(int,list):
    counter = 0
    lenNums = len(nums)
    ind = 0 
    while(ind < lenNums):
        #print(ind, nums)
        if lenNums - counter > ind:
            if nums[ind] == value :
                counter += 1
                tmp  = nums[ind]
                nums[ind:lenNums-1] = nums[ind+1:]
                nums[-1] = tmp
                if nums[ind] == value:
                    ind -= 1
        else:
            break
        ind += 1
    nums = nums[:len(nums) - counter]
    print(counter,',',nums)
    return (counter, nums)
# %% 
print(removeElement(nums, 2))
# %%

# %%
