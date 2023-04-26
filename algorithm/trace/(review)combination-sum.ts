/**
 * links:https://leetcode.cn/problems/combination-sum/submissions/
 */
// 单集合的组合是需要有startIndex的
function combinationSum(candidates: number[], target: number): number[][] {
  let result: number[][] = []
  let combinations = []
  let backTracking = (combinations: number[], candidates: number[], target: number, startIndex: number) => {
    if (target === 0) {
      result.push(combinations.slice())
    } else if (target < 0) return
    for (let i = startIndex; i < candidates.length; i++) {
      combinations.push(candidates[i])
      backTracking(combinations, candidates, target - candidates[i], i)
      combinations.pop()
    }
  }
  backTracking(combinations, candidates, target, 0)
  return result
}
