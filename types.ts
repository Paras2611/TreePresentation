
export interface TreeNodeData {
  id: string;
  value: string;
  left?: TreeNodeData;
  right?: TreeNodeData;
}

export enum TraversalType {
  PREORDER = 'Preorder',
  INORDER = 'Inorder',
  POSTORDER = 'Postorder',
  LEVELORDER = 'Level Order'
}

export interface TreeType {
  title: string;
  description: string;
  visual: React.ReactNode;
}
