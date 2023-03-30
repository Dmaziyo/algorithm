/**
 * links:https://leetcode.cn/problems/maximum-depth-of-binary-tree/
 */

function maxDepth(root: TreeNode | null): number {
  if (!root) return 0
  let getDepth = (root: TreeNode | null, height: number): number => {
    if (!root) return height
    let height1 = getDepth(root.left, height)
    let height2 = getDepth(root.right, height)
    return Math.max(height2, height1) + 1
  }
  return getDepth(root, 0)
}
