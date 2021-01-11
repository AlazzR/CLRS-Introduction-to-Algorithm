#
"""
Letter Count: 
    Have the function LetterCount(str) take the str parameter being passed and return the first word with the greatest number of repeated letters. For example: "Today, is the greatest day ever!" should return greatest because it has 2 e's (and 2 t's) and it comes before ever which also has 2 e's. If there are no words with repeating letters return -1. Words will be separated by spaces.

    Use the Parameter Testing feature in the box below to test your code with different arguments.
"""

#%%
def LetterCount(strParam):
  # code goes here
  words = strParam.split(' ')
  #print(words)
  counterWords = []
  for word in words:
      counter = {}
      for letter in list(word):
        if letter not in counter:
          counter[letter] = 1
        else:
          counter[letter] += 1
      putativeLetter = max(counter, key=counter.get)
      counterWords.append((putativeLetter, counter[putativeLetter]))
  
  maxV = 1
  maxWord = ''
  for ind, row in enumerate(counterWords):
    #print(row)
    p, c = row
    #The nonequality clause will deal with the postion
    if maxV < c:
      maxWord = words[ind]
      maxV = c
  
  if maxV == 1:
    return -1
  return maxWord


  return strParam
#%%
print(LetterCount("Today, is the greatest day ever!"))
# %%
