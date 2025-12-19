import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// Constants
const PRESENTER_NAME = "Pras Jagdish Patil";
const ROLL_NO = "2547028";

const TREE_TYPES = [
  { name: "Binary Tree", desc: "Each node has at most 2 children.", icon: "fa-diagram-project" },
  { name: "Full Binary Tree", desc: "Every node has 0 or 2 children.", icon: "fa-circle-dot" },
  { name: "Complete Binary Tree", desc: "All levels filled except possibly the last, left-to-right.", icon: "fa-align-left" },
  { name: "Perfect Binary Tree", desc: "All internal nodes have 2 children and leaves are at same level.", icon: "fa-star" },
  { name: "Skewed Tree", desc: "All nodes have only one child, forming a line.", icon: "fa-arrow-trend-down" },
  { name: "Binary Search Tree", desc: "Left < Root < Right. Efficient for searching.", icon: "fa-magnifying-glass" },
  { name: "AVL Tree", desc: "Self-balancing BST where height difference is at most 1.", icon: "fa-scale-balanced" },
  { name: "Heap", desc: "Complete tree satisfying Min/Max heap property.", icon: "fa-layer-group" },
  { name: "Trie", desc: "Search tree for efficient prefix/string retrieval.", icon: "fa-font" },
  { name: "B-Tree", desc: "Balanced search tree optimized for large blocks of data.", icon: "fa-database" }
];

const TRAVERSAL_INFO = {
  inorder: {
    title: "Inorder Traversal",
    order: "Left → Root → Right",
    desc: "Visits the left subtree, then the current node, then the right subtree. In a BST, this yields values in ascending order.",
    sequence: ['4', '2', '5', '1', '6', '3', '7'],
    code: `def inorder(root):\n    if root:\n        inorder(root.left)\n        print(root.val, end=" ")\n        inorder(root.right)`
  },
  preorder: {
    title: "Preorder Traversal",
    order: "Root → Left → Right",
    desc: "Visits the current node first, then the left subtree, then the right subtree. Useful for creating a copy of the tree.",
    sequence: ['1', '2', '4', '5', '3', '6', '7'],
    code: `def preorder(root):\n    if root:\n        print(root.val, end=" ")\n        preorder(root.left)\n        preorder(root.right)`
  },
  postorder: {
    title: "Postorder Traversal",
    order: "Left → Right → Root",
    desc: "Visits the left subtree, then the right subtree, then the current node. Useful for deleting or evaluating expression trees.",
    sequence: ['4', '5', '2', '6', '7', '3', '1'],
    code: `def postorder(root):\n    if root:\n        postorder(root.left)\n        postorder(root.right)\n        print(root.val, end=" ")`
  },
  levelorder: {
    title: "Level Order Traversal",
    order: "Breadth-First Search",
    desc: "Visits nodes level by level from top to bottom, and left to right within each level.",
    sequence: ['1', '2', '3', '4', '5', '6', '7'],
    code: `from collections import deque\n\ndef level_order(root):\n    if not root: return\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        print(node.val, end=" ")\n        if node.left: queue.append(node.left)\n        if node.right: queue.append(node.right)`
  }
};

const TREE_NODES = [
  { id: '1', x: 200, y: 40,  val: '1', left: '2', right: '3' },
  { id: '2', x: 100, y: 110, val: '2', left: '4', right: '5' },
  { id: '3', x: 300, y: 110, val: '3', left: '6', right: '7' },
  { id: '4', x: 50,  y: 180, val: '4' },
  { id: '5', x: 150, y: 180, val: '5' },
  { id: '6', x: 250, y: 180, val: '6' },
  { id: '7', x: 350, y: 180, val: '7' }
];

const TreeVisualizer = ({ type, isPlaying, onFinish }) => {
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);

  useEffect(() => {
    if (isPlaying) {
      setVisitedNodes([]);
      const sequence = TRAVERSAL_INFO[type].sequence;
      let i = 0;
      const interval = setInterval(() => {
        if (i < sequence.length) {
          const nodeId = sequence[i];
          setActiveNode(nodeId);
          setVisitedNodes(prev => [...prev, nodeId]);
          i++;
        } else {
          clearInterval(interval);
          setActiveNode(null);
          onFinish();
        }
      }, 800);
      return () => clearInterval(interval);
    } else {
      setActiveNode(null);
      setVisitedNodes([]);
    }
  }, [isPlaying, type]);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 relative mb-6">
        <svg width="400" height="240" viewBox="0 0 400 240">
          {/* Edges */}
          {TREE_NODES.map(node => (
            <React.Fragment key={`edges-${node.id}`}>
              {node.left && (
                <line 
                  x1={node.x} y1={node.y} 
                  x2={TREE_NODES.find(n => n.id === node.left).x} 
                  y2={TREE_NODES.find(n => n.id === node.left).y} 
                  stroke="rgba(255,255,255,0.1)" strokeWidth="2" 
                />
              )}
              {node.right && (
                <line 
                  x1={node.x} y1={node.y} 
                  x2={TREE_NODES.find(n => n.id === node.right).x} 
                  y2={TREE_NODES.find(n => n.id === node.right).y} 
                  stroke="rgba(255,255,255,0.1)" strokeWidth="2" 
                />
              )}
            </React.Fragment>
          ))}
          {/* Nodes */}
          {TREE_NODES.map(node => (
            <g key={`node-${node.id}`}>
              <circle 
                cx={node.x} cy={node.y} r="20" 
                fill={activeNode === node.id ? '#10b981' : (visitedNodes.includes(node.id) ? '#065f46' : '#1e293b')}
                stroke={activeNode === node.id ? '#34d399' : '#334155'}
                strokeWidth="2"
                className="transition-all duration-300"
              />
              <text 
                x={node.x} y={node.y + 6} 
                textAnchor="middle" 
                fill="white" 
                fontSize="14" 
                fontWeight="bold"
              >
                {node.val}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        {TRAVERSAL_INFO[type].sequence.map((id, idx) => (
          <div 
            key={idx} 
            className={`w-10 h-10 flex items-center justify-center rounded-lg font-mono font-bold border transition-all duration-300 ${
              visitedNodes.includes(id) ? 'bg-emerald-600 border-emerald-400 text-white scale-110 shadow-lg shadow-emerald-500/20' : 'bg-slate-800 border-slate-700 text-slate-500'
            }`}
          >
            {id}
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [activeTraversal, setActiveTraversal] = useState('inorder');
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-tree text-emerald-600 text-2xl"></i>
            <span className="font-bold text-xl tracking-tight text-slate-800">TreeEdu</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#intro" className="hover:text-emerald-600 transition-colors">Introduction</a>
            <a href="#types" className="hover:text-emerald-600 transition-colors">Types</a>
            <a href="#traversal" className="hover:text-emerald-600 transition-colors">Traversals</a>
            <a href="#python" className="hover:text-emerald-600 transition-colors">Implementation</a>
            <a href="#complexity" className="hover:text-emerald-600 transition-colors">Complexity</a>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="bg-slate-900 text-white py-24 px-6 relative overflow-hidden border-b-4 border-emerald-500">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#10b981_0,transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Trees in <span className="text-emerald-400">Data Structures</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 font-light">
            Academic Presentation: Types, Traversals & Operations
          </p>
          
          <div className="inline-flex flex-col md:flex-row gap-8 bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl">
            <div className="text-left">
              <span className="text-xs uppercase tracking-widest text-emerald-500 font-bold block mb-2">Presenter</span>
              <span className="text-2xl font-semibold text-white">{PRESENTER_NAME}</span>
            </div>
            <div className="w-px h-14 bg-white/20 hidden md:block"></div>
            <div className="text-left">
              <span className="text-xs uppercase tracking-widest text-emerald-500 font-bold block mb-2">Roll Number</span>
              <span className="text-2xl font-semibold text-white">{ROLL_NO}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
        
        {/* Section 1: Intro */}
        <section id="intro" className="scroll-mt-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-slate-900 border-l-8 border-emerald-500 pl-6">01. Introduction</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              A <strong>Tree</strong> is a non-linear data structure that represents data in a hierarchical manner. 
              It consists of nodes connected by edges, with a single topmost node called the <strong>Root</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { t: "Root", d: "The unique top node with no parent." },
                { t: "Leaf", d: "Nodes with no children." },
                { t: "Parent", d: "A node with one or more children." },
                { t: "Height", d: "The longest path from root to leaf." }
              ].map(item => (
                <div key={item.t} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-200 transition-colors">
                  <span className="font-bold text-emerald-700 block text-lg mb-1">{item.t}</span>
                  <span className="text-sm text-slate-500 leading-snug">{item.d}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-emerald-50 rounded-[3rem] p-12 border border-emerald-100 flex items-center justify-center">
            <svg width="240" height="180" viewBox="0 0 240 180" className="drop-shadow-xl">
              <line x1="120" y1="30" x2="60" y2="90" stroke="#10b981" strokeWidth="3" />
              <line x1="120" y1="30" x2="180" y2="90" stroke="#10b981" strokeWidth="3" />
              <circle cx="120" cy="30" r="22" fill="#10b981" />
              <text x="120" y="36" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">ROOT</text>
              <circle cx="60" cy="90" r="18" fill="white" stroke="#10b981" strokeWidth="2" />
              <circle cx="180" cy="90" r="18" fill="white" stroke="#10b981" strokeWidth="2" />
              <line x1="60" y1="90" x2="30" y2="150" stroke="#10b981" strokeWidth="2" />
              <circle cx="30" cy="150" r="15" fill="white" stroke="#10b981" strokeWidth="2" />
            </svg>
          </div>
        </section>

        {/* Section 2: Types */}
        <section id="types" className="scroll-mt-24 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">02. Types of Trees</h2>
            <p className="text-slate-500">From basic hierarchies to advanced self-balancing structures.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TREE_TYPES.map((type, idx) => (
              <div key={idx} className="group bg-white p-8 rounded-3xl border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <i className={`fa-solid ${type.icon} text-emerald-600 group-hover:text-white text-xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{type.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Traversals */}
        <section id="traversal" className="scroll-mt-24">
          <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[600px] border border-white/5">
            <div className="lg:w-1/3 p-12 bg-slate-800 text-white flex flex-col">
              <h2 className="text-3xl font-bold mb-8 border-l-4 border-emerald-500 pl-5">03. Traversals</h2>
              <div className="flex flex-col gap-3">
                {Object.keys(TRAVERSAL_INFO).map(key => (
                  <button 
                    key={key} 
                    onClick={() => { setActiveTraversal(key); setIsPlaying(false); }}
                    className={`w-full text-left p-4 rounded-2xl transition-all font-medium border ${
                      activeTraversal === key 
                        ? 'bg-emerald-600 border-emerald-400 shadow-lg shadow-emerald-500/20 translate-x-2' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                    }`}
                  >
                    {TRAVERSAL_INFO[key].title}
                  </button>
                ))}
              </div>
              <div className="mt-auto pt-10">
                <div className="p-6 bg-slate-900/50 rounded-3xl border border-white/5">
                  <h4 className="text-emerald-400 font-bold mb-2 text-sm uppercase tracking-widest">Logic Order</h4>
                  <p className="text-xl font-bold text-white mb-2">{TRAVERSAL_INFO[activeTraversal].order}</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{TRAVERSAL_INFO[activeTraversal].desc}</p>
                </div>
              </div>
            </div>
            <div className="lg:w-2/3 p-12 bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
              <button 
                onClick={togglePlayback}
                className="absolute top-10 right-10 w-16 h-16 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-20"
              >
                <i className={`fa-solid ${isPlaying ? 'fa-rotate-right' : 'fa-play'} text-xl`}></i>
              </button>
              <TreeVisualizer 
                type={activeTraversal} 
                isPlaying={isPlaying} 
                onFinish={() => setIsPlaying(false)} 
              />
            </div>
          </div>
        </section>

        {/* Section 4: Python implementation */}
        <section id="python" className="scroll-mt-24">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-slate-900 mb-2">04. Implementation</h2>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200">EDUCATIONAL REFERENCE ONLY</span>
            </div>
            <div className="bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-800">
              <div className="bg-slate-800 px-8 py-4 flex items-center justify-between border-b border-slate-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/30"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/30"></div>
                </div>
                <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">{activeTraversal}.py</span>
              </div>
              <div className="p-10">
                <pre className="text-emerald-400 font-mono text-base md:text-lg leading-relaxed overflow-x-auto">
                  <code>{TRAVERSAL_INFO[activeTraversal].code}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Complexity */}
        <section id="complexity" className="scroll-mt-24 pb-20">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="bg-white p-12 rounded-[3rem] border border-slate-200 shadow-xl space-y-10 flex flex-col justify-center">
              <h3 className="text-3xl font-bold flex items-center gap-4 text-slate-800">
                <i className="fa-solid fa-bolt text-emerald-500"></i> Performance
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Time Complexity</span>
                  <span className="text-5xl font-black text-emerald-600 font-mono">O(n)</span>
                </div>
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Space Complexity</span>
                  <span className="text-5xl font-black text-indigo-600 font-mono">O(h)</span>
                </div>
              </div>
              <p className="text-slate-500 text-center text-sm">Where <span className="font-bold">n</span> is nodes and <span className="font-bold">h</span> is tree height.</p>
            </div>
            <div className="bg-emerald-600 p-12 rounded-[3rem] text-white shadow-2xl flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-4">
                <i className="fa-solid fa-rocket"></i> Applications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["File Systems", "Network Routing", "DOM/XML Parsing", "Database Indexing", "Decision AI", "Compilers"].map(app => (
                  <div key={app} className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex items-center gap-3">
                    <i className="fa-solid fa-check-circle text-emerald-300"></i>
                    <span className="font-semibold">{app}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-slate-500 py-20 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 border-t border-slate-900 pt-12">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <i className="fa-solid fa-tree text-emerald-500 text-3xl"></i>
              <span className="text-white font-bold text-2xl tracking-tighter">TreeEdu</span>
            </div>
            <p className="text-sm max-w-xs leading-relaxed">
              Modern educational resources for mastering complex data structures through visualization.
            </p>
          </div>
          <div className="text-center md:text-right space-y-2">
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-[0.2em]">Academic Presentation</p>
            <p className="text-white text-2xl font-bold">{PRESENTER_NAME}</p>
            <p className="text-slate-400 font-mono">Roll: {ROLL_NO}</p>
            <p className="text-[10px] mt-8 uppercase tracking-widest opacity-30">Vercel Ready &middot; Static Deployment</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);