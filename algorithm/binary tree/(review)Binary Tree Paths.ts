
/**
 * links:https://leetcode.cn/problems/binary-tree-paths/
 * TODO review
 */
function binaryTreePaths(root: TreeNode | null): string[] {
    let results = [];
    let bTreePath = (root: TreeNode | null,path:string)=>{
        path =  path + root.val;
        if(!root.left&&!root.right){
            results.push(path)
        }

        root.left&&bTreePath(root.left,`${path}->`);
        root.right&&bTreePath(root.right,`${path}->`);
    }
    bTreePath(root,``)
    return results;
};