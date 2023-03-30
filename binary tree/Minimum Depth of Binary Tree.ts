/**
 * link:https://leetcode.cn/problems/minimum-depth-of-binary-tree/
 */

function minDepth(root: TreeNode | null): number {
  if (!root) return 0
  let min = Number.MAX_SAFE_INTEGER
  let getDepth = (root: TreeNode | null, height: number): void => {
    if (!root) return
    getDepth(root.left, height + 1)
    getDepth(root.right, height + 1)
    if (!root.left && !root.right) {
      min = Math.min(height, min)
    }
  }
  getDepth(root, 1)
  return min
}
