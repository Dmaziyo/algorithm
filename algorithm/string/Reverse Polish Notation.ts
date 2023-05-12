/**
 * links:https://leetcode.cn/problems/evaluate-reverse-polish-notation/
 * links:https://www.nowcoder.com/practice/4e7267b55fdf430d9403aa12206572b3?sourceQid=23290&sourceTpId=13
 * sources:https://juejin.cn/post/6987304054095347742#heading-3
 */
/* definition: To make it easier for a computer to analyze an expression, all it needs to do is loop through the entire expression.
   each time  it come across an operator, it will remove 2 integer from the stack to calculate,the expression doesn't contain any parentheses 
*/
let str = '12 +(75 - 32 )* 20 + 910/ 3'
const priority = [
  ['(', ')'],
  ['+', '-'],
  ['*', '/']
]
const operators = ['+', '-', '*', '/', '(', ')']

let regex = /[\+\-\*\/\(\)]/ // Regular expression to match non-operator substrings
// processing integers greater than ten
function format(str) {
  str = str.replace(/\s+/g, '')
  let str2Arr = Array.from(str)
  let expStack = []
  while (str) {
    let match = regex.exec(str)

    if (!match) {
      expStack.push(parseInt(str))
      break
    }

    let operator = match[0]

    if (operator === '(') {
      expStack.push(operator)
      str2Arr.splice(0, 1)
      str = str2Arr ? str2Arr.join('') : null
      continue
    }
    let idx = match.index
    let prev = str2Arr.splice(0, idx)
    let num = parseInt(prev.join('')) // Convert matched substring to integer
    str2Arr.splice(0, 1)
    expStack.push(num)
    expStack.push(operator)
    if (operator === ')') {
      expStack.push(str2Arr.splice(0, 1).join(''))
    }
    str = str2Arr ? str2Arr.join('') : null
  }
  return expStack
}

function buildRPN(exp) {
  // Ensuring that the items in s1 are always in increasing sequence according to their priority.
  let s1 = []
  let s2 = []

  for (let i = 0; i < exp.length; i++) {
    let char = exp[i]
    if (operators.includes(char)) {
      let curPriority = getPriority(char)

      let topPriority = s1.length === 0 ? -1 : getPriority(s1[s1.length - 1])
      if (curPriority === 0) {
        if (char === '(') {
          s1.push(char)
        } else {
          while (s1[s1.length - 1] !== '(') {
            s2.push(s1.pop())
          }
          s1.pop()
        }
      } else if (curPriority > topPriority) {
        s1.push(char)
      } else {
        while (curPriority <= topPriority) {
          s2.push(s1.pop())
          topPriority = s1.length === 0 ? -1 : getPriority(s1[s1.length - 1])
        }
        s1.push(char)
      }
    } else {
      s2.push(char)
    }
  }
  while (s1.length > 0) {
    s2.push(s1.pop())
  }
  return s2
}

function processRPN(rpn) {
  let stack = []
  for (let i = 0; i < rpn.length; i++) {
    if (operators.includes(rpn[i])) {
      let temp1 = stack.pop()
      let temp2 = stack.pop()
      switch (rpn[i]) {
        case '+':
          stack.push(temp2 + temp1)
          break
        case '-':
          stack.push(temp2 - temp1)
          break
        case '*':
          stack.push(temp2 * temp1)
          break
        case '/':
          stack.push(temp2 / temp1)
          break
      }
    } else stack.push(rpn[i])
  }
  return stack[0]
}

function getPriority(op) {
  return priority.findIndex(items => {
    return items.includes(op)
  })
}
console.log(processRPN(buildRPN(format(str))), `${12 + (75 - 32) * 20 + 910 / 3}`) // Output: 12 + (75 - 32) * 2 + 90 / 3
