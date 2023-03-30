export class TreeNode {
  val: number | null
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number | null, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val == undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

export function createBinaryTree(numbers: (number | null)[]): TreeNode | null {
  if (!numbers) return null
  let root = new TreeNode(numbers.shift())
  let stack = [root]
  while (numbers.length > 0) {
    let curLevel = stack.length
    while (curLevel--) {
      let curNode = stack.shift()
      if (curNode === undefined) {
        // This should never happen, but just in case
        continue
      }
      // Add left child
      let leftVal = numbers.shift()
      if (leftVal !== null && leftVal !== undefined) {
        let leftNode = new TreeNode(leftVal)
        curNode.left = leftNode
        stack.push(leftNode)
      }

      // Add right child
      let rightVal = numbers.shift()
      if (rightVal !== null && rightVal !== undefined) {
        let rightNode = new TreeNode(rightVal)
        curNode.right = rightNode
        stack.push(rightNode)
      }
    }
  }
  return root
}
