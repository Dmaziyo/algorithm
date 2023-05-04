/**
 * links:https://leetcode.cn/problems/restore-ip-addresses/
 */
function restoreIpAddresses(s: string): string[] {
  let result: string[] = []
  let backtracking = (s: string, startIndex: number, combination: string[], depth: number) => {
    if (depth === 4) {
      let subStr = s.slice(startIndex)
      if (isValid(subStr)) {
        combination.push(subStr)
        result.push(combination.join('.'))
        combination.pop()
      }
      return
    }
    for (let i = startIndex; i < startIndex + 3 && i < s.length; i++) {
      let subStr = s.slice(startIndex, i + 1)
      if (!isValid(subStr)) continue
      combination.push(subStr)
      backtracking(s, i + 1, combination, depth + 1)
      combination.pop()
    }
  }
  backtracking(s, 0, [], 1)
  return result
}

function isValid(subStr: string) {
  if (Number(subStr) <= 255) {
    if (subStr[0] !== '0' && Number(subStr) > 0) {
      return true
    } else if (subStr[0] === '0' && subStr.length === 1) {
      return true
    } else return false
  }
  return false
}
