/**
 * link:https://leetcode.cn/problems/merge-two-binary-trees/
 */
function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
    if(!root1&&!root2){
        return null;
    }
    let root = new TreeNode();
    root.val = (root1? root1.val:0)+(root2?root2.val:0);
    let nextLeft1 = root1?root1.left?root1.left:null:null;
    let nextLeft2 = root2?root2.left?root2.left:null:null;
    let nextRight1 = root1?root1.right?root1.right:null:null;
    let nextRight2 = root2?root2.right?root2.right:null:null;
    root.left = mergeTrees(nextLeft1,nextLeft2)
    root.right = mergeTrees(nextRight1,nextRight2)
    return root;
};