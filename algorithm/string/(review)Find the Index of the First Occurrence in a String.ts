/**
 * links:https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/
 */
function strStr(haystack: string, needle: string): number {
  let ptb = buildPTB(needle)
  let curState = 0
  for (let i = 0; i < haystack.length; i++) {
      if (haystack[i] === needle[curState]) {
          curState++
      } else {
          while (curState >= 0) {
              // 判断上一个最长相同前后缀能否与当前字符组成新的前缀
              if (curState === 0) {
                  if (haystack[i] === needle[curState]) {
                      curState++
                  }
                  break
              }
              if (haystack[i] === needle[curState]) {
                  curState++
                  break
              }
              curState = ptb[curState - 1]
          }
      }
      if (curState === needle.length) {
          return i - curState + 1
      }
  }
  return -1
}

// 找出后缀与前缀相同的子串
function buildPTB(str: string): number[] {
  let ptb = new Array(str.length)
  let j = 0

  ptb[j] = 0
  for (let i = 1; i < str.length; i++) {
      // 说明后缀+newChar === 前缀
      if (str[i] === str[j]) {
          ptb[i] = ptb[i - 1] + 1
          j++
      } else {
          while (j >= 0) {
              if (j === 0) {
                  if (str[i] !== str[j]) {
                      ptb[i] = 0
                  } else {
                      ptb[i] = 1
                      j++
                  }
                  break
              }
              if (str[i] === str[j]) {
                  ptb[i] = ptb[j] + 1
                  j++
                  break
              }
              j = ptb[j - 1]
          }
      }
  }
  return ptb
}

