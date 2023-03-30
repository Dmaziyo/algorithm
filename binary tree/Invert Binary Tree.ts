/**
 * links:https://leetcode.cn/problems/invert-binary-tree/

 */

function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null
  let invert = (root: TreeNode | null): TreeNode | null => {
    if (!root) return null
    let left: TreeNode | null = invert(root.right)
    let right: TreeNode | null = invert(root.left)
    root.left = left
    root.right = right
    return root
  }
  return invert(root)
}
