/**
 * links:https://leetcode.cn/problems/find-bottom-left-tree-value/
 * TODO review
 */
function findBottomLeftValue(root: TreeNode | null): number {
    let maxDepth = 0;
    let mostLeftVal = root.val
    let MostLeftVal=(root:TreeNode | null,depth:number):void =>{
        if(!root)return;
        let left = root.left;
        let right = root.right;
        if(depth>maxDepth&&!left&&!right){
            maxDepth=depth;
            mostLeftVal = root.val;
        }
        MostLeftVal(root.left,depth+1);
        MostLeftVal(root.right,depth+1);
    }
    MostLeftVal(root,1);
    return mostLeftVal
};