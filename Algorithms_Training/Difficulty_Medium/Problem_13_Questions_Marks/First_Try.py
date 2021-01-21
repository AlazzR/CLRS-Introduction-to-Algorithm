#%%
""" which will contain single digit numbers, letters, and question marks, and check if there are exactly 3 question marks between every pair of two numbers that add up to 10.

If so, then your program should return the string true, otherwise it should return the string false.

If there aren't any two numbers that add up to 10 in the string, then your program should return false as well.

For example:
if str is "arrb6???4xxbl5???eee5" then your program should return true because there are exactly 3 question marks between 6 and 4, and 3 question marks between 5 and 5 at the end of the string.

Examples """
#%%
inp = "arrb6???4xxbl5???eee5"
inp = "acc?7??sss?3rr1??????5"

def findSubset10(inp):
    countQ = 0
    countN = []
    flag = False
    subset = ""
    for letter in inp:
        subset += letter
        if letter == '?' and len(countN) > 0:
            countQ += 1
            if countQ > 3:
                #reset everything
                countN = []
                countQ = 0
                subset = ""
        if countQ == 3 and str.isdigit(letter) and len(countN)==1:
            countN.append(int(letter))
            if sum(countN) == 10:
                flag = True
                break
        #deals with consecutive numbers with no repetition in the question marks
        if str.isdigit(letter):
            #This is digit and still we didn't see consecutive question mark then update countQ and countN
            if len(countN) == 1:
                countN = [int(letter)]
                countQ = 0
                subset = ""
            else:
                countN.append(int(letter))
    ind = 0
    for letter in subset:
        ind += 1
        if str.isdigit(letter):
            ind -=1
            break
    print(subset[ind:])
    return flag

print(findSubset10(inp))
# %%
