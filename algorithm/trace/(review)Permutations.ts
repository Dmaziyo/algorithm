/**
 * links:https://leetcode.cn/problems/permutations/
 */
function permute(nums: number[]): number[][] {
  let permutations: number[][] = []
  let inorder = (root: number | null, nums: number[], curPermutation: number[]) => {
    curPermutation.push(root)
    nums = nums.filter(number => number !== root)
    for (let i = 0; i < nums.length; i++) {
      inorder(nums[i], nums, curPermutation.slice())
    }
    if (nums.length === 0) {
      permutations.push(curPermutation)
      return
    }
  }
  for (let i = 0; i < nums.length; i++) {
    inorder(nums[i], nums, [])
  }
  return permutations
}
