/**
 * links:https://leetcode.cn/problems/maximum-binary-tree/
 */
function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
    let root = new TreeNode();

    if(nums.length===0){
        return null;
    }
    let maximum =Math.max(...nums);
    let maxIndex = nums.findIndex((val)=>val === maximum);
    root.val = maximum;
    root.left = constructMaximumBinaryTree(nums.slice(0,maxIndex));
    root.right = constructMaximumBinaryTree(nums.slice(maxIndex+1));
    return root;
};