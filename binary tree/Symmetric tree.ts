/**
 * links:https://leetcode.cn/problems/symmetric-tree/submissions/
 */
function isSymmetric(root: TreeNode | null): boolean {
  let checkSymmetric = (mirror1: TreeNode | null, mirror2: TreeNode | null) => {
    if (!mirror1 || !mirror2) return mirror1 === mirror2
    let check1 = checkSymmetric(mirror1.left, mirror2.right)
    let check2 = checkSymmetric(mirror1.right, mirror2.left)
    return check1 && check2 && mirror2.val === mirror1.val
  }
  if (!root) return true
  return checkSymmetric(root.left, root.right)
}
