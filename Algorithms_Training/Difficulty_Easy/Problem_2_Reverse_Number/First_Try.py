#%%
x = 153423646

def reverseNum(x):
    sign = 1
    if(x < 0):
        sign = -1
    x = sign * x #Remove negative         

    charNumber = str(x)
    rev = ''
    for value in charNumber[-1::-1]:
        rev += value
    if(int(rev) < 2**31 - 1):
        return sign * int(rev)
    return 0


reverseNum(x)

    

# %%
