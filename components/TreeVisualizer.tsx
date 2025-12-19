
import React, { useState, useEffect, useRef } from 'react';
import { TraversalType } from '../types';

interface TreeVisualizerProps {
  type: TraversalType;
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ type }) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Hardcoded simple tree structure for visualization
  //         1
  //       /   \
  //      2     3
  //     / \   / \
  //    4   5 6   7
  const nodes = [
    { id: '1', x: 200, y: 50, val: '1', children: ['2', '3'] },
    { id: '2', x: 100, y: 150, val: '2', children: ['4', '5'] },
    { id: '3', x: 300, y: 150, val: '3', children: ['6', '7'] },
    { id: '4', x: 50, y: 250, val: '4', children: [] },
    { id: '5', x: 150, y: 250, val: '5', children: [] },
    { id: '6', x: 250, y: 250, val: '6', children: [] },
    { id: '7', x: 350, y: 250, val: '7', children: [] },
  ];

  const getTraversalOrder = (type: TraversalType): string[] => {
    switch (type) {
      case TraversalType.PREORDER: return ['1', '2', '4', '5', '3', '6', '7'];
      case TraversalType.INORDER: return ['4', '2', '5', '1', '6', '3', '7'];
      case TraversalType.POSTORDER: return ['4', '5', '2', '6', '7', '3', '1'];
      case TraversalType.LEVELORDER: return ['1', '2', '3', '4', '5', '6', '7'];
      default: return [];
    }
  };

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const order = getTraversalOrder(type);
    let i = 0;

    const run = () => {
      if (i < order.length) {
        setActiveNode(order[i]);
        i++;
        setTimeout(run, 1000);
      } else {
        setIsAnimating(false);
        setActiveNode(null);
      }
    };
    run();
  };

  useEffect(() => {
    setActiveNode(null);
    setIsAnimating(false);
  }, [type]);

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="relative bg-white rounded-2xl p-4 shadow-inner">
        <svg width="400" height="320" viewBox="0 0 400 320" className="overflow-visible">
          {/* Edges */}
          <g stroke="#e2e8f0" strokeWidth="2">
            <line x1="200" y1="50" x2="100" y2="150" />
            <line x1="200" y1="50" x2="300" y2="150" />
            <line x1="100" y1="150" x2="50" y2="250" />
            <line x1="100" y1="150" x2="150" y2="250" />
            <line x1="300" y1="150" x2="250" y2="250" />
            <line x1="300" y1="150" x2="350" y2="250" />
          </g>

          {/* Nodes */}
          {nodes.map((node) => (
            <g key={node.id} className="traversal-node">
              <circle
                cx={node.x}
                cy={node.y}
                r="22"
                fill={activeNode === node.id ? '#10b981' : 'white'}
                stroke={activeNode === node.id ? '#10b981' : '#cbd5e1'}
                strokeWidth="2"
                className={`transition-all duration-300 ${activeNode === node.id ? 'scale-110 drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]' : ''}`}
              />
              <text
                x={node.x}
                y={node.y + 6}
                textAnchor="middle"
                className={`font-bold text-sm pointer-events-none transition-colors duration-300 ${activeNode === node.id ? 'fill-white' : 'fill-slate-600'}`}
              >
                {node.val}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <button
        onClick={startAnimation}
        disabled={isAnimating}
        className={`px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all ${
          isAnimating 
            ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
            : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg hover:shadow-emerald-500/40 active:scale-95'
        }`}
      >
        {isAnimating ? (
          <><i className="fa-solid fa-spinner fa-spin"></i> Traversal in Progress...</>
        ) : (
          <><i className="fa-solid fa-play"></i> Run {type} Animation</>
        )}
      </button>

      {/* Traversal sequence visualization */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {getTraversalOrder(type).map((val, idx) => {
           const isDone = getTraversalOrder(type).indexOf(activeNode || '') >= idx && activeNode !== null;
           return (
            <div 
              key={idx} 
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono border transition-all duration-300 ${
                isDone ? 'bg-emerald-500 text-white border-emerald-500 scale-105' : 'bg-white/10 border-white/20 text-slate-400'
              }`}
            >
              {val}
            </div>
           )
        })}
      </div>
    </div>
  );
};

export default TreeVisualizer;
