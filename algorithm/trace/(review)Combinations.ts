/**
 * links:https://leetcode.cn/problems/combinations/
 */
// backtracking is recursive for loop
function combine(n: number, k: number): number[][] {
  let result: number[][] = []
  let backtracking = (combination: number[], start) => {
    if (combination.length === k) {
      result.push(combination.slice())
      return
    }
    for (let i = start; i <= n; i++) {
      combination.push(i)
      backtracking(combination, i + 1)
      combination.pop()
    }
  }
  backtracking([], 1)
  return result
}
