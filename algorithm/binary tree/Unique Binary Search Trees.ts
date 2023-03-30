/**
 * links:https://leetcode.cn/problems/unique-binary-search-trees/
 * TODO review
 */
function numTrees(n: number): number {
  if (n <= 1) return n
  let dp: number[] = [1, 1]
  for (let i = 2; i <= n; i++) {
    dp[i] = 0
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j]
    }
  }
  return dp[n]
}
