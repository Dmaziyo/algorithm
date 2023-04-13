/**
 * link:https://leetcode.cn/problems/trim-a-binary-search-tree/
 */

function trimBST(root: TreeNode | null, low: number, high: number): TreeNode | null {
  if (!root) return null
  if (root.val >= low && root.val <= high) {
    root.left = trimBST(root.left, low, high)
    root.right = trimBST(root.right, low, high)
  } else {
    if (root.val < low) {
      return trimBST(root.right, low, high)
    } else {
      return trimBST(root.left, low, high)
    }
  }
  return root
}
