/**
 * links:https://leetcode.cn/problems/binary-tree-level-order-traversal/
 
}
 */

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return []
  let queue: TreeNode[] = [root]
  let results: number[][] = [[]]
  let end = queue.length - 1
  let level = 0
  for (let i = 0; i < queue.length; i++) {
    let val = queue[i].val
    queue[i].left && queue.push(queue[i].left!)
    queue[i].right && queue.push(queue[i].right!)
    if (i <= end) {
      results[level] = !results[level] ? [val] : [...results[level], val]
      if (i === end) {
        level++
        end = queue.length - 1
      }
    }
  }
  return results
}
