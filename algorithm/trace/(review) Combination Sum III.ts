/**
 * links:https://leetcode.cn/problems/combination-sum-iii/
 */
function combinationSum3(k: number, n: number): number[][] {
  let result: number[][] = []
  let backtracking = (combination: number[], start) => {
    if (combination.length === k) {
      if (
        combination.reduce((accumulator, currentVal) => {
          return accumulator + currentVal
        }, 0) === n
      ) {
        result.push(combination.slice())
      }
      return
    }
    for (let i = start; i <= 9; i++) {
      combination.push(i)
      backtracking(combination, i + 1)
      combination.pop()
    }
  }
  backtracking([], 1)
  return result
}
