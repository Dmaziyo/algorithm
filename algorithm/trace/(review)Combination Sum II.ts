/**
 * links:https://leetcode.cn/problems/combination-sum-ii/
 */
function combinationSum2(candidates: number[], target: number): number[][] {
  //The idea is to check whether the first element (i.e., candidate[i]) of a new combination is the same as the previous one when attempting to create a new combination
  let result: number[][] = []
  let used = new Array(candidates.length).fill(0)
  candidates.sort((a, b) => a - b)
  // Filter out the permutations that add up to the target sum from the list of all permutations.
  let backtracking = (combination: number[], candidates: number[], target: number, startIndex: number, used: number[]) => {
    if (target === 0) {
      result.push(combination.slice())
    } else if (target < 0) return
    for (let i = startIndex; i < candidates.length; i++) {
      // in case [1,1,2]  ret=> [1,2] [1,2] happen
      if (candidates[i] === candidates[i - 1] && used[i] === 0) {
        continue
      }
      combination.push(candidates[i])
      used[i] = 1
      backtracking(combination, candidates, target - candidates[i], i + 1, used)
      used[i] = 0
      combination.pop()
    }
  }
  backtracking([], candidates, target, 0, used)
  return result
}
combinationSum2([2, 5, 2, 1, 2], 5)
