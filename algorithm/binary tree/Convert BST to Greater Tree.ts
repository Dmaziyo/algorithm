/**
 * links:https://leetcode.cn/problems/convert-bst-to-greater-tree/
 */
function convertBST(root: TreeNode | null): TreeNode | null {
  let prev = 0
  let inorder = (root: TreeNode | null) => {
    if (!root) return
    inorder(root.right)
    let record = root.val
    root.val += prev
    prev += record

    inorder(root.left)
  }
  inorder(root)
  return root
}
