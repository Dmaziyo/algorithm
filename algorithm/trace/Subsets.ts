/**
 * links:https://leetcode.cn/problems/subsets/
 */
function subsets(nums: number[]): number[][] {
  let result: number[][] = [[]]
  let backtracking = (combination: number[], nums: number[], startIndex: number) => {
    if (startIndex === nums.length) return
    for (let i = startIndex; i < nums.length; i++) {
      combination.push(nums[i])
      result.push(combination.slice())
      backtracking(combination, nums, i + 1)
      combination.pop()
    }
  }
  backtracking([], nums, 0)
  return result
}
