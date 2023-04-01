/**
 * links:https://leetcode.cn/problems/unique-binary-search-trees/
 * TODO review
 */
function numTrees(n: number): number {
  let dp = [1, 1, 2]
  if (n <= 2) return dp[n]

  for (let i = 3; i <= n; i++) {
    dp[i] = 0
    // j = 1 means let the minimum number be the root initially
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j]
    }
  }
  return dp[n]
}
