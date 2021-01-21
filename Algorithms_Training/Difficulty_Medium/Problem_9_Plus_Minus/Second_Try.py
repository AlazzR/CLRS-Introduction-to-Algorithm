#%%
import re #regular expression
#array = 26712 
#array = 1991
#array = 35132
#array = 0000
array = 126
numbers = [int(i) for i in list(str(array))]
putativeMatches = []
def sol(numbers):
    def plusMinusTest(current, array, subset, sumV):
        if len(array) == 1:
            if sumV - current == 0:
                subset += '-' + str(current)
                putativeMatches.append(subset)
                return True
            elif sumV + current == 0:
                subset += '+' + str(current)
                putativeMatches.append(subset)
                return True
            else:
                return None

        else:
            plusMinusTest(array[1], array[1:], subset + '-' + str(array[0]), sumV - array[0])
            plusMinusTest(array[1], array[1:], subset + '+' + str(array[0]), sumV + array[0])
    
    plusMinusTest(numbers[0], numbers, '', 0)
    if len(putativeMatches) > 0:
        mostNegative = ''
        ind = 0
        maxV = 0
        for i, p in enumerate(putativeMatches):
            counter = 0
            for l in p:
                if l == '-':
                    counter += 1
                
            if counter >= maxV:
                maxV = counter
                ind = i
            print('ind', i)        

        return list(zip(re.split('[0-9]', putativeMatches[ind]), re.findall('[0-9]', putativeMatches[ind])))
    else:
        return 'Not possible'
    

print(sol(numbers))


        

# %%
