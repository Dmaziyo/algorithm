/**
 * link:https://leetcode.cn/problems/search-in-a-binary-search-tree/
 */
function searchBST(root: TreeNode | null, val: number): TreeNode | null {
    if(!root)return null
    let curVal = root.val;
    if(curVal===val){
        return root;
    }
    return curVal>val?searchBST(root.left,val):searchBST(root.right,val);
};