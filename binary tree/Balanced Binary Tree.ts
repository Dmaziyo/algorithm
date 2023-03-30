/**
 * links:https://leetcode.cn/problems/balanced-binary-tree/
 * Definition for a binary tree node.
 */

function isBalanced(root: TreeNode | null): boolean {
  if (!root) return true
  let isBalance = (root: TreeNode | null, height: number): number => {
    if (!root) return height
    let left_height = isBalance(root.left, height + 1)
    if (left_height === -1) return -1
    let right_height = isBalance(root.right, height + 1)
    if (right_height === -1) return -1
    if (Math.abs(left_height - right_height) <= 1) {
      return Math.max(left_height, right_height)
    } else {
      return -1
    }
  }
  let result = isBalance(root, 0)
  return result === -1 ? false : true
}
