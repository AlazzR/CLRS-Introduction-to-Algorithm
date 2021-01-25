#%%
#https://leetcode.com/problems/divide-two-integers/

#%%
dividend = -2147483648
dividend = -10
divisor = -1
divisor = 3

def divideInt(dividend, divisor):
    sign = -1 if dividend * divisor < 0 else 1

    if dividend == 0:
        return 0
    dividend = abs(dividend)
    divisor = abs(divisor)
    if divisor == 1:
        return sign * dividend
    remainder = dividend
    quotient = 0
    remainderOld = 0
    while remainder >= 0 and remainderOld != remainder:
        remainderOld = remainder
        remainder = remainder - divisor
        #print(remainder)
        quotient += 1

    quotient = sign * (quotient - 1)
    return quotient

print(divideInt(dividend, divisor))
# %%
