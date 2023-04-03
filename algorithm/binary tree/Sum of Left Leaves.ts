/**
 * links:https://leetcode.cn/problems/sum-of-left-leaves/
 */
function sumOfLeftLeaves(root: TreeNode | null): number {
  if (!root) return 0
  let left = root.left
  let right = root.right
  if (left) {
    if (!left.left && !left.right) {
      return left.val + sumOfLeftLeaves(right)
    }
  }
  return sumOfLeftLeaves(left) + sumOfLeftLeaves(right)
}
