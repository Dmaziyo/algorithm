/**
 * links:https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/
 */
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  if (!root) return null
  if (root.val === p.val || root.val === q.val) return root
  let left = lowestCommonAncestor(root.left, p, q)
  let right = lowestCommonAncestor(root.right, p, q)
  if (left && right) {
    return root
  } else {
    return left || right
  }
}
