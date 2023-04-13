/**
    link:https://leetcode.cn/problems/delete-node-in-a-bst/submissions/
 */

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) return null
  if (root.val === key) {
    let left = root.left
    let right = root.right
    if (!left && !right) return null
    else if (left && !right) return left
    else if (!left && right) return right
    else {
      let p = right
      while (p.left) {
        p = p.left
      }
      p.left = left
      return right
    }
  }
  if (root.val > key) {
    root.left = deleteNode(root.left, key)
  } else if (root.val < key) {
    root.right = deleteNode(root.right, key)
  }
  return root
}
