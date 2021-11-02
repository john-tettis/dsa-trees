/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if(!this.root) return 0;
    function findMin(node){
      if(node.left === null && node.right===null)return 1;
      if(node.left===null)return findMin(node.right)+1
      if(node.right===null)return findMin(node.left)+1
      return Math.min(findMin(node.left),findMin(node.right))+1;
    }
    return findMin(this.root)
  
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if(!this.root) return 0;
    function findMax(node){
      if(node.left === null && node.right===null)return 1;
      if(node.left===null)return findMax(node.right)+1
      if(node.right===null)return findMax(node.left)+1
      return Math.max(findMax(node.left),findMax(node.right))+1;
    }
    return findMax(this.root)
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if(!this.root) return 0;
    let count=0;
    function summation(node) {
      if(node===null) return 0;
      let left = summation(node.left);
      let right = summation(node.right);
      count = Math.max(count,left+right+node.val)
      return Math.max(0,left+node.val,right+node.val)
    }
    summation(this.root);
    return count;
    
    
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    
    function nextLarge(node){
      if(!node)return Infinity;
      let passed = Math.min(nextLarge(node.right),nextLarge(node.left));
      if(node.val >lowerBound) return Math.min(node.val, passed)
      return passed;
      
    }
   let val = nextLarge(this.root);
   return val!= Infinity ? val:null;

  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    //search for node 1 or node 2, keeping track of which level we are at.
    if(node1===this.root || node2===this.root)return false;
    if(this.root===null) throw new Error('cannot do cousin check on empty tree.')
    function findLevel(node,root=this.root, data={level:0, parent:null}){
      if(data.parent) return data;
      if(root===null) return {level:-1};
      if(root.left===node ||root.right===node){
        data.level++;
        data.parent=root;
      }
      let left = findLevel(node,root.left,{...data, level:data.level+1})
      let right = findLevel(node,root.right,{...data, level:data.level+1})
      //return left if left is found, right if right is found, -1 if neither is found
      return left.level !=-1 ? left: right.level!==-1 ? right:{level:-1};
    }
    let res1=findLevel.call(this, node1);
    let res2 =findLevel.call(this,node2);
    if(res1.level!=-1 && res2.level!=-1){
      return res1.level === res2.level && res1.parent!==res2.parent;
    }
    return false;

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string.
   * returns a post-order traversal of the tree => 
   * [1,3,7,null,null,6,null,null,4]
   *        1
   *    2      3
   *   4 5    6 7
   * 
   *  */

  static serialize(tree) {

    let record=[];
    function sift(node){
      if(node){
        record.push(node.val)
        sift(node.left);
        sift(node.right);
      }
      else{
        record.push(null)
      }
    }
    sift(tree.root);
    return record.join(' ');
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}
let root = new BinaryTreeNode(1);
    root.left = new BinaryTreeNode(2);
    root.right = new BinaryTreeNode(3);
    root.right.left = new BinaryTreeNode(4);
    root.right.right = new BinaryTreeNode(5);

    let myTree = new BinaryTree(root);

    console.log(BinaryTree.serialize(myTree));
module.exports = { BinaryTree, BinaryTreeNode };
