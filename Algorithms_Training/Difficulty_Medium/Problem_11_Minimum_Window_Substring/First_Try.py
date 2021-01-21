#%%
""" Will contain only two strings, the first parameter being the string N and the second parameter being a string K of some characters, and your goal is to determine the smallest substring of N that contains all the characters in K.

For example:

if strArr is ["aaabaaddae", "aed"] then the smallest substring of N that contains the characters a, e, and d is "dae" located at the end of the string.

So for this example your program should return the string dae.

Another example:

if strArr is ["aabdccdbcacd", "aad"] then the smallest substring of N that contains all of the characters in K is "aabd" which is located at the beginning of the string.

Both parameters will be strings ranging in length from 1 to 50 characters and all of K's characters will exist somewhere in the string N.

Both strings will only contains lowercase alphabetic characters.

Examples
Input: ["ahffaksfajeeubsne", "jefaa"]
Output: aksfaje
Input: ["aaffhkksemckelloe", "fhea"]
Output: affhkkse
 """
#%%

inp = ["ahffaksfajeeubsne", "jefaa"]
inp =  ["aabdccdbcacd", "aad"] 
def findMinWindow(inp):
    dictK = {}
    for letter in list(inp[1]):
        if letter not in dictK:
            dictK[letter] = 1
        else:
            dictK[letter] += 1
    lenK = len(list(inp[1]))

    counter = 0 
    flag = True
    while counter <= len(inp[0]) and flag:
        for indx in range(0, len(inp[0])):
            if flag:
                dictT = {}
                substr = inp[0][indx: lenK + indx + counter + 1]
                for letter in list(substr):
                    if letter not in dictT:
                        dictT[letter] = 1
                    else:
                        dictT[letter] += 1
                count = 0
                for letter in list(inp[1]):
                    if letter in dictT:
                        if dictK[letter] == dictT[letter]:
                            count += 1
                        if count == lenK:
                            flag = False
                            #print(substr)
                            break
        counter += 1
    return substr
print(findMinWindow(inp))
    # %%
