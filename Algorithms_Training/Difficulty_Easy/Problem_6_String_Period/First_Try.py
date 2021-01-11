#
"""
StringPeriods(str)

1 Determine if there is some substring K
2 that can be repeated N > 1 times
3 to produce the input string exactly as it appears.

Your program should return the longest substring K,

and if there is none it should return the string -1.
Example:

If str is "abcababcababcab" then your program should return abcab because that is the longest substring that is repeated 3 times to create the final string.

Another example:

If str is "abababababab" then your program should return ababab because it is the longest substring.

If the input string contains only a single character, your program should return the string -1.
"""
#%%
#This will find the highest repeated word in the string. O(n^3)
inp = "abcababcababcab"

def stringPeriod(inp):
    if len(inp) == 1:
        return -1
    counter = 2
    putativeMatch = ''
    maxV = 0
    while(counter < len(inp) - 1):
        for ind in range(0, len(inp)-counter + 1):
            c1 = 0
            word = inp[ind:ind+counter]
            for ind2 in range(ind + 1, len(inp) - counter + 1):
                #print(inp[ind:ind+counter])
                if word == inp[ind2:ind2+counter]:
                    c1 += 1
                    print(c1)
            if c1 > 2:
                putativeMatch = word 
                maxV = c1   
        counter += 1
    if maxV > 2:
        return(putativeMatch)
    else:
        return -1
print(stringPeriod(inp))
# %%
#I need to find the longest substring that is repeated
inp = "abcababcababcab"
inp = 'abababababab'
inp = 'abcxabc'
def stringPeriod(inp):
    if len(inp) == 1:
        return -1
    #Because the longest substring can be repeated in a sentence only if it was half the sentence, so, we luckily have an upper limit on the counter.
    counter = int(len(inp)/2)
    putativeMatch = ''
    sos = []
    sos.append(counter)
    while(counter > 2):
        for ind in range(0, len(inp)-counter + 1):
            c1 = 0
            word = inp[ind:ind+counter]
            for ind2 in range(ind + 1, len(inp)):
                if counter + ind2 > len(inp):
                    break
                if word == inp[ind2:ind2+counter]:
                    c1 += 1
                    print('c1', c1, ' ', word)
            print('-'*10)
            if c1 >= 2:
                putativeMatch = word 
                counter -= 10
                break  
        counter -= 1
    if putativeMatch != '':
        return(putativeMatch)
    else:
        return -1
print(stringPeriod(inp))
# %%
