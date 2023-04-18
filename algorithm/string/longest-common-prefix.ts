/**
 * links:https://leetcode.cn/problems/longest-common-prefix/submissions/
 */
function longestCommonPrefix(strs: string[]): string {
  let prefixLen = 0
  let length = Math.min(...strs.map(str => str.length))
  for (let i = 0; i < length; i++) {
    let sets = new Set(strs.map(str => str[prefixLen]))
    if (sets.size === 1) {
      prefixLen++
    }
  }
  return prefixLen === 0 ? '' : strs[0].slice(0, prefixLen)
}
