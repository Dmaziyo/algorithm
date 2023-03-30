/**
 * link:https://leetcode.cn/problems/binary-tree-preorder-traversal/
 */

function preorderTraversal(root: TreeNode | null): number[] {
  let results: number[] = []
  let preOrder = root => {
    if (!root) return
    results.push(root.val)
    preOrder(root.left)
    preOrder(root.right)
  }
  preOrder(root)
  return results
}
