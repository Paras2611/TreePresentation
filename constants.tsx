
import React from 'react';
import { TraversalType } from './types';

export const PRESENTER_NAME = "Pras Jagdish Patil";
export const ROLL_NO = "2547028";

export const PYTHON_CODE = {
  [TraversalType.PREORDER]: `def preorder(root):
    if root:
        print(root.val)
        preorder(root.left)
        preorder(root.right)`,
  [TraversalType.INORDER]: `def inorder(root):
    if root:
        inorder(root.left)
        print(root.val)
        inorder(root.right)`,
  [TraversalType.POSTORDER]: `def postorder(root):
    if root:
        postorder(root.left)
        postorder(root.right)
        print(root.val)`,
  [TraversalType.LEVELORDER]: `def level_order(root):
    if not root: return
    queue = [root]
    while queue:
        node = queue.pop(0)
        print(node.val)
        if node.left: queue.append(node.left)
        if node.right: queue.append(node.right)`
};

export const TREE_TYPES_DATA = [
  {
    title: "General Tree",
    description: "A hierarchy with a root where each node can have an infinite number of children."
  },
  {
    title: "Binary Tree",
    description: "Each node has at most two children, referred to as the left child and the right child."
  },
  {
    title: "Full Binary Tree",
    description: "Every node has either 0 or 2 children. No node has only one child."
  },
  {
    title: "Complete Binary Tree",
    description: "All levels are completely filled except possibly the last level, which is filled from left to right."
  },
  {
    title: "Perfect Binary Tree",
    description: "All internal nodes have two children and all leaves are at the same level."
  },
  {
    title: "Skewed Tree",
    description: "A tree where nodes only have one child, either all left or all right, forming a line."
  },
  {
    title: "Binary Search Tree (BST)",
    description: "A binary tree where left children are smaller than root and right children are larger."
  },
  {
    title: "AVL Tree",
    description: "A self-balancing BST where the height difference of subtrees is at most one."
  },
  {
    title: "Heap",
    description: "A specialized tree-based structure that satisfies the heap property (Max or Min)."
  },
  {
    title: "Trie",
    description: "An efficient information retrieval data structure, often used for prefix searches."
  },
  {
    title: "B-Tree / B+ Tree",
    description: "Self-balancing search trees designed for storage systems with large blocks of data."
  }
];
