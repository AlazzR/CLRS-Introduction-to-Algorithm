#
"""
    Have the function PlusMinus(num) read the num parameter being passed which will be a combination of 1 or more single digits, and determine if it's possible to separate the digits with either a plus or minus sign to get the final expression to equal zero. For example: if num is 35132 then it's possible to separate the digits the following way, 3 - 5 + 1 + 3 - 2, and this expression equals zero. Your program should return a string of the signs you used, so for this example your program should return -++-. If it's not possible to get the digit expression to equal zero, return the string not possible.

    If there are multiple ways to get the final expression to equal zero, choose the one that contains more minus characters. For example: if num is 26712 your program should return -+-- and not +-+-. 
"""
#%%
#From the internet
#array = 1991
#array = 35132
array = 26712 
def PlusMinus(nums):
  # code goes here
  #I have used the internet to be honest with you
  numList = [int(n) for n in str(nums)]
  #combination = '' # can't be used because it will be changed when we go to the function
  def traverse(curr, arr, combination, sumV):
    #print(arr)
    #print(sumV)
    #print('-'*10)
    if len(arr) == 0:
        #We emptied the list from all possible combination
        #We are dealing with the last remining number
        result= []
        if sumV + curr == 0:
            combination += '+'
            #print(combination)
            result.append(combination)
        elif sumV - curr == 0:
            #We use elif because we want to mitigate the problem of 0.
            combination += '-'
            #print(combination)
            result.append(combination)

        return result


    #remove first element
    post = traverse(arr[0], arr[1:], combination + '+', sumV + curr)#go to the postive path of f
    #print('*'*10)
    neg = traverse(arr[0], arr[1:], combination + '-', sumV - curr)#go to the negative path of f
    return post + neg 

  combination = traverse(numList[1], numList[2:], '', numList[0])
  #print('0', combination)
  putativeMatch = []
  if len(combination) == 1:
    letters = [i for i in combination[0]]
    if len(letters) == len(numList) - 1:
      return combination[0]
    return 'not possible'
  elif len(combination) > 1:
    findMostNegative = []
    maxV = 0
    for comb in combination:
      letters = [i for i in comb]
      counter = 0
      if len(letters) == len(numList) - 1:
        for i in letters:
          if i == '-':
            counter += 1
        
        if maxV < counter:
          putativeMatch.append(comb)
          maxV = counter
    #print(putativeMatch[-1])
    return putativeMatch[-1]
  return 'not possible'

    


# keep this function call here 
print(PlusMinus(array))
# %%
