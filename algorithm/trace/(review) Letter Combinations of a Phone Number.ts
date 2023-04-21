/**
 * links:https://leetcode.cn/problems/letter-combinations-of-a-phone-number/
 */
const mapping = {
  '2': 'abc',
  '3': 'def',
  '4': 'ghi',
  '5': 'jkl',
  '6': 'mno',
  '7': 'pqrs',
  '8': 'tuv',
  '9': 'wxyz'
}
function letterCombinations(digits: string): string[] {
  let result: string[] = []
  let arrayDigits = Array.from(digits)
  let backtracking = (combination: string[], curDigits: string[]) => {
    if (!curDigits.length) {
      if (combination.join('') !== '') {
        result.push(combination.join(''))
      }
      return
    }
    let letters: string = mapping[curDigits.shift()]
    for (let i = 0; i < letters.length; i++) {
      combination.push(letters[i])
      backtracking(combination, curDigits.slice())
      combination.pop()
    }
  }
  backtracking([], arrayDigits)
  return result
}
