/**
 * links:https://leetcode.cn/problems/binary-tree-level-order-traversal/
 */
class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
      this.val = (val===undefined ? 0 : val)
      this.left = (left===undefined ? null : left)
      this.right = (right===undefined ? null : right)
  }
}
function levelOrder(root: TreeNode | null): number[][] {
  if(!root)return [];
  let queue:TreeNode[] = [root];
  let results:number[][] = [[]];
  let end = queue.length-1;
  let level = 0;
  for(let i=0;i<queue.length;i++){
      let val = queue[i].val;
      queue[i].left&&queue.push(queue[i].left!);
      queue[i].right&&queue.push(queue[i].right!);
      if(i<=end){
          results[level] =!results[level]?[val]:[...results[level],val];
          if(i===end){
              level++;
              end = queue.length-1;   
          } 
      }

  }
  return results;
};