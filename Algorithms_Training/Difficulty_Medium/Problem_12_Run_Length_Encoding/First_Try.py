#%%
""" Have the function RunLength(str) take the str parameter being passed and return a compressed version of the string using the Run-length encoding algorithm.

This algorithm works by taking the occurrence of each repeating character and outputting that number along with a single character of the repeating sequence. For example: "wwwggopp" would return 3w2g1o2p.

The string will not contain any numbers, punctuation, or symbols.
Examples """

#%%
inp = "aabb1111cde"
inp = "aabbcde"
inp = "wwwggopp11w" 

def RunLength(inp):
    
    prevCharacter = inp[0]
    count = 1 
    word = ""
    for ind in range(1, len(inp)):
        if prevCharacter == inp[ind] and str.isalpha(prevCharacter):
            count += 1
        
        else:
            if str.isalpha(prevCharacter):
                word += str(count) + prevCharacter 
            prevCharacter = inp[ind]
            count = 1
        
    print(word)
    return word


print(RunLength(inp))

#%%
def RunLength(inp):
    #This will find the longest streak, he needs just to write the streak of each character.
    occurrences = {}
    prevCharacter = inp[0]
    occurrences[prevCharacter] = 1
    count = 1
    for current in range(1, len(inp)):
        if prevCharacter == inp[current]:
            count += 1
        else:
            if prevCharacter not in occurrences:
                occurrences[prevCharacter] = count
            #update to the longest streak
            elif count >= occurrences[prevCharacter]:
                occurrences[prevCharacter] = count
            #reset count
            prevCharacter = inp[current]
            count = 1
    occurrences = sorted(occurrences.items(), key=lambda x: x[1], reverse=True) 
    print(occurrences)
    word = ''
    for tup in occurrences:
        word += str(tup[1]) + str(tup[0])
    print(word)
print(RunLength(inp))

#%%
#The following was for counting the number of occurrences of characters in string.
def RunLength(inp):
    occurrences = {}

    for letter in inp:
        if str.isalpha(letter):
            if letter not in occurrences:
                occurrences[letter] = 1
            else:
                occurrences[letter] += 1
    occurrences = sorted(occurrences.items(), key=lambda x: x[1], reverse=True) 
    print(occurrences)
    word = ''
    for tup in occurrences:
        word += str(tup[1]) + str(tup[0])
    print(word)



print(RunLength(inp))
# %%
