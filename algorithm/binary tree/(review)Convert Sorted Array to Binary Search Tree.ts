/**
 * links:https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/
 */
function sortedArrayToBST(nums: number[]): TreeNode | null {
  if (nums.length === 0) return null
  let mid = Math.floor(nums.length / 2)
  let val = nums[mid]
  let root = new TreeNode(val)
  root.left = sortedArrayToBST(nums.slice(0, mid))
  root.right = sortedArrayToBST(nums.slice(mid + 1))
  return root
}
