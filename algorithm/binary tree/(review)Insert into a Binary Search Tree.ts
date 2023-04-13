import { createBinaryTree, TreeNode } from './utils'

/**
 * link:https://leetcode.cn/problems/insert-into-a-binary-search-tree/
 */
function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
  let prev = null
  let recursive = (root: TreeNode | null, val: number) => {
    if (!root) {
      if (prev) {
        let newNode = new TreeNode(val)
        if (prev.val > val) {
          prev.left = newNode
        } else {
          prev.right = newNode
        }
      }
      return
    }
    prev = root
    if (root.val > val) {
      recursive(root.left, val)
    } else {
      recursive(root.right, val)
    }
  }
  recursive(root, val)
  return root
}
insertIntoBST(createBinaryTree([4, 2, 7, 1, 3]), 5)
