userInput = input()
l = 0
r = 0
count = 0
index = []
newArr = []

for i, ch in enumerate(userInput):
    if ch == 'L':
        l += 1
    elif ch == 'R':
        r += 1
 
    if l == r:
        count += 1
        newArr.append(userInput[index[-1] + 1:i + 1] if index else userInput[:i + 1])
        index.append(i)
        l = 0
        r = 0

print(count)
for st in newArr:
    print(st)
