/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if(!this.root)return 0;
    let acc=0;
    let que=[this.root]
    while(que.length >0){
      let curr = que.pop();
      acc+= curr.val;
      que.push(...curr.children)
    }
    return acc;

    
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if(!this.root)return 0;
    let acc=0;
    let que=[this.root]
    while(que.length >0){
      let curr = que.pop();
      acc= curr.val%2===0 ? acc+1:acc;
      que.push(...curr.children)
    }
    return acc;

  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if(!this.root)return 0;
    let acc=0;
    let que=[this.root]
    while(que.length >0){
      let curr = que.pop();
      acc= curr.val>lowerBound ? acc+1:acc;
      que.push(...curr.children)
    }
    return acc;

  }
}

module.exports = { Tree, TreeNode };
