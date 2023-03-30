/**
 link:https://leetcode.cn/problems/count-complete-tree-nodes/
 //TODO review         
*/

import { TreeNode, createBinaryTree } from './utils'

function countNodes(root: TreeNode | null): number {
  if (root === null) return 0
  let leftDepth = 0
  let rightDepth = 0
  let curNode: TreeNode | null = root
  while (curNode) {
    curNode = curNode.left
    leftDepth++
  }
  curNode = root
  while (curNode) {
    curNode = curNode.right
    rightDepth++
  }
  if (leftDepth === rightDepth) {
    // If we set the first depth to 0, we need to change it to either 2 ** leftDepth + 1 or 2 ** (leftDepth + 1) - 1 to fulfill the full binary tree.
    // However, when we traverse to the leaf node, the expression 2 ** leftDepth + 1 will return 2
    return 2 ** leftDepth - 1
  }
  return 1 + countNodes(root.left) + countNodes(root.right)
}
