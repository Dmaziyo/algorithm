/**
 * links:https://leetcode.cn/problems/palindrome-partitioning/
 */

function partition(s: string): string[][] {
  let result: string[][] = []
  let backtracking = (s: string, startIndex: number, combination: string[]) => {
    if (s.length === startIndex) {
      result.push(combination.slice())
      return
    }
    for (let i = startIndex; i < s.length; i++) {
      let subStr = s.slice(startIndex, i + 1)
      if (!isPalindrome(subStr)) continue
      combination.push(subStr)
      backtracking(s, i + 1, combination)
      combination.pop()
    }
  }
  backtracking(s, 0, [])
  return result
}
function isPalindrome(s: string): boolean {
  if (s.length <= 1) return true
  let l = 0,
    r = s.length - 1
  while (l <= r) {
    if (s[l] === s[r]) {
      l++
      r--
    } else {
      return false
    }
  }
  return true
}
