# https://leetcode.com/problems/container-with-most-water/
#%%

#%%
height = [1,8,6,2,5,4,8,3,7]
def maxArea(height) -> int:
    # O(n^2)
    """     heights = []
    counter = 0
    for h in height:
        #longer distance have higher weight
        heights.append((counter, h))
        counter += 1

    #heights.sort(key=lambda x: x[1]) """
    area = 0

    for ind in range(0, len(height) - 1):
        highInd = len(height) - 1
        while(highInd > ind):
            #Can be negative because the indeces can proceed each other
            putativeArea = min(height[ind], height[highInd]) * abs(ind - highInd)
            #print('Area', putativeArea)
            if putativeArea > area:
                area = putativeArea

            highInd -= 1
    return area
print(maxArea(height))
# %%

# %%
