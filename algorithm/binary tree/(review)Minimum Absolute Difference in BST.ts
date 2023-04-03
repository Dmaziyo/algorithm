/**
 * link:https://leetcode.cn/problems/minimum-absolute-difference-in-bst/
 * TODO review
 */
function getMinimumDifference(root: TreeNode | null): number {
  let minimum = Number.MAX_SAFE_INTEGER
  let prev: TreeNode | null = null
  let inorder = (root: TreeNode | null): void => {
    if (!root) return
    inorder(root.left)
    if (prev !== null) {
      minimum = Math.min(minimum, Math.abs(prev.val - root.val))
    }
    // when the curNode was traversed, record the curNode as previous node
    prev = root
    inorder(root.right)
  }
  inorder(root)
  return minimum
}
