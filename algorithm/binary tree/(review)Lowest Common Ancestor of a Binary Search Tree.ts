/**
 * links:https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/
    Tips:The first node visited during the recursivetraversal of a binary search tree 
         that belongs to the range [min, max] must be the lowest common ancestor node of min and max.
*/
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  if (!root) return null
  let min = Math.min(p.val, q.val)
  let max = Math.max(p.val, q.val)
  if (root.val >= min && root.val <= max) {
    return root
  } else if (root.val > max) {
    return lowestCommonAncestor(root.left, p, q)
  } else if (root.val < min) {
    return lowestCommonAncestor(root.right, p, q)
  }
}
