
// Fix: Define the TraversalType enum to resolve the 'is not a module' error in TreeVisualizer.tsx
// This ensures that the file has at least one export, making it a valid TypeScript module.
export enum TraversalType {
  PREORDER = 'preorder',
  INORDER = 'inorder',
  POSTORDER = 'postorder',
  LEVELORDER = 'levelorder',
}
