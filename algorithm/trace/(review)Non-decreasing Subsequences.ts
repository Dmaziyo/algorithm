/**
 * links:https://leetcode.cn/problems/non-decreasing-subsequences/
 */
function findSubsequences(nums: number[]): number[][] {
  let result: number[][] = []
  let combination: number[] = []
  let backtracking = (startIndex: number) => {
    if (startIndex === nums.length) return
    let records: number[] = []
    for (let i = startIndex; i < nums.length; i++) {
      if (records.indexOf(nums[i]) !== -1) continue
      if (nums[i] < combination[combination.length - 1]) continue
      combination.push(nums[i])
      records.push(nums[i])
      if (combination.length >= 2) result.push(combination.slice())
      backtracking(i + 1)
      combination.pop()
    }
  }
  backtracking(0)
  return result
}
