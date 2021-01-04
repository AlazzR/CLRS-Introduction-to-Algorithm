#%%
import time
#%%
tbegin = time.time_ns()
array = [3, 3]

target = 6

def twoNumbers(array, target):
    hashTable = {}
    for counter in range(0, len(array)):
        if(str(array[counter]) not in hashTable):
            hashTable[str(array[counter])] = [counter]
        else:
            hashTable[str(array[counter])].append(counter)
    print(hashTable)
    for key in hashTable.keys():
        print(key)
        if(str(target - int(key)) in hashTable):
            if(hashTable[key] != hashTable[str(target - int(key))])or( len(hashTable[str(target - int(key))]) > 1):
                if(len(hashTable[str(target - int(key))]) == 1):
                    return (hashTable[key][0], hashTable[str(target - int(key))][0])
                else:
                    return (hashTable[key][0], hashTable[str(target - int(key))][1])


key_1, key_2 = twoNumbers(array, target)
tend = time.time_ns()
print(f"Index:Key value-> {key_1}:{array[key_1]}, Index:Key value-> {key_2}:{array[key_2]}")
print(f'Took {tend - tbegin} nsec')
# %%

# %%
