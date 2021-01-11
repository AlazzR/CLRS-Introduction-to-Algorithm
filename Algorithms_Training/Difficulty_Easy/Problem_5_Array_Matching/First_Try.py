#
"""
ArrayMatching(strArr)

read the array of strings stored in strArr which will contain only two elements, both of which will represent an array of positive integers.

Example:
if strArr = ["[1, 2, 5, 6]", "[5, 2, 8, 11]"]``

then both elements in the input represent two integer arrays, and your goal for this challenge is to add the elements in corresponding locations from both arrays.

For the example input, your program should do the following additions: [(1 + 5), (2 + 2), (5 + 8), (6 + 11)] which then equals [6, 4, 13, 17].

Your program should finally return this resulting array in a string format with each element separated by a hyphen: 6-4-13-17.

If the two arrays do not have the same amount of elements, then simply append the remaining elements onto the new array (example shown below).

Both arrays will be in the format: [e1, e2, e3, ...] where at least one element will exist in each array.
"""
#%%
inp = ["[5, 2, 3]", "[2, 2, 3, 10, 6]"]

# %%
def ArrayMatching(inp):
    arr1 = [int(i) for i in ((inp[0].strip('[')).strip(']')).split(',')]
    arr2 = [int(i) for i in ((inp[1].strip('[')).strip(']')).split(',')]
    print(arr1)
    print(arr2)

    output = []
    while(len(arr1) !=0 and len(arr2) != 0):
        output.append(arr1[0] + arr2[0])
        arr1.pop(0)
        arr2.pop(0)
    if len(arr1) != 0:
        output += arr1
    if len(arr2) != 0:
        output += arr2
    comb = ''
    for i in output:
        comb += str(i) + '-'
    comb = comb[:-1]
    return comb

ArrayMatching(inp)
# %%
