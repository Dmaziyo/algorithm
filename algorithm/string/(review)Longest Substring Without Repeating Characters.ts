/**
 * links:https://leetcode.cn/problems/longest-substring-without-repeating-characters/
 */

function lengthOfLongestSubstring(s: string): number {
  if (s.length <= 1) return s.length
  let map = new Map()
  let start = 0,
    maxLength = 1
  for (let end = 0; end < s.length; end++) {
    if (map.has(s[end])) {
      // if the last one
      start = Math.max(start, map.get(s[end]) + 1)
      map.set(s[end], end)
    } else {
      map.set(s[end], end)
    }
    maxLength = Math.max(maxLength, end - start + 1)
  }
  return maxLength
}
