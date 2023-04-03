/**
 * links:https://leetcode.cn/problems/path-sum/
 */
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    // incase the first root is null, return false
    if(!root)return false;

    let left = root.left;
    let right = root.right;
    if(!left&&!right){
        // Verify if this leaf node meets the criteria
        return targetSum===root.val;
    }
    return hasPathSum(root.left,targetSum-root.val)||hasPathSum(root.right,targetSum-root.val)
};