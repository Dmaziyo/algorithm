/**
 * links:https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
 */

import { TreeNode, createBinaryTree } from './utils'

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    let root = new TreeNode()
    if (inorder.length === 0) {
      return null
    }
    if (inorder.length === 1) {
      root.val = postorder[0]
      return root
    }
    let rootVal = postorder.pop()
    root.val =rootVal
    let rootIndex = inorder.findIndex(item => item === rootVal)
    let leftInorder = inorder.slice(0, rootIndex)
    let rightInorder = inorder.slice(rootIndex + 1)
    let leftPostorder = postorder.slice(0, leftInorder.length )
    let rightPostorder = postorder.slice(leftInorder.length)
    root.left = buildTree(leftInorder, leftPostorder)
    root.right = buildTree(rightInorder, rightPostorder)
    return root
  }