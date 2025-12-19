
import React, { useState, useEffect } from 'react';
import { TraversalType } from './types';
import { PRESENTER_NAME, ROLL_NO, TREE_TYPES_DATA, PYTHON_CODE } from './constants';
import TreeVisualizer from './components/TreeVisualizer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TraversalType>(TraversalType.INORDER);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-tree text-emerald-600 text-2xl"></i>
              <span className="font-bold text-xl tracking-tight text-slate-800">TreeEdu</span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
              <a href="#intro" className="hover:text-emerald-600 transition-colors">Introduction</a>
              <a href="#types" className="hover:text-emerald-600 transition-colors">Types</a>
              <a href="#traversal" className="hover:text-emerald-600 transition-colors">Traversals</a>
              <a href="#python" className="hover:text-emerald-600 transition-colors">Python Code</a>
              <a href="#complexity" className="hover:text-emerald-600 transition-colors">Complexity</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <header className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in">Trees in Data Structures</h1>
          <p className="text-xl text-indigo-200 mb-8 font-light">Types, Traversals & Operations</p>
          
          <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="text-left">
                <p className="text-indigo-300 text-xs uppercase tracking-widest font-bold mb-1">Presenter</p>
                <p className="text-xl font-semibold">{PRESENTER_NAME}</p>
              </div>
              <div className="w-px h-12 bg-white/20 hidden md:block"></div>
              <div className="text-left">
                <p className="text-indigo-300 text-xs uppercase tracking-widest font-bold mb-1">Roll Number</p>
                <p className="text-xl font-semibold">{ROLL_NO}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        
        {/* Section 1: Introduction */}
        <section id="intro" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 border-l-4 border-emerald-500 pl-4">Introduction to Trees</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                A <span className="text-emerald-700 font-semibold">Tree</span> is a non-linear data structure that represents a hierarchical relationship between data elements. Unlike arrays or linked lists, which are linear, trees organize data into branches, similar to how a family tree or a file system works.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "Root", desc: "The top node" },
                  { label: "Parent", desc: "Node with children" },
                  { label: "Child", desc: "Node descending from parent" },
                  { label: "Leaf", desc: "Node with no children" },
                  { label: "Subtree", desc: "A tree within a tree" },
                  { label: "Edge", desc: "Link between nodes" }
                ].map(term => (
                  <div key={term.label} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <p className="font-bold text-emerald-600 text-sm mb-1">{term.label}</p>
                    <p className="text-slate-500 text-xs">{term.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full flex justify-center">
              <div className="relative p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
                <div className="absolute -top-4 -right-4 bg-white p-2 rounded-lg shadow-lg rotate-3">
                  <span className="text-xs font-mono text-emerald-600">Hierarchical Structure</span>
                </div>
                {/* Visual Placeholder for a simple Tree Diagram */}
                <svg width="240" height="200" viewBox="0 0 240 200" className="drop-shadow-sm">
                  <line x1="120" y1="40" x2="60" y2="100" stroke="#10b981" strokeWidth="2" />
                  <line x1="120" y1="40" x2="180" y2="100" stroke="#10b981" strokeWidth="2" />
                  <circle cx="120" cy="40" r="18" fill="white" stroke="#10b981" strokeWidth="2" />
                  <circle cx="60" cy="100" r="18" fill="white" stroke="#10b981" strokeWidth="2" />
                  <circle cx="180" cy="100" r="18" fill="white" stroke="#10b981" strokeWidth="2" />
                  <text x="120" y="45" textAnchor="middle" className="text-[12px] font-bold fill-slate-800">A</text>
                  <text x="60" y="105" textAnchor="middle" className="text-[12px] font-bold fill-slate-800">B</text>
                  <text x="180" y="105" textAnchor="middle" className="text-[12px] font-bold fill-slate-800">C</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Types of Trees */}
        <section id="types" className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Types of Trees</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Different organizational patterns for different computational problems.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TREE_TYPES_DATA.map((type, idx) => (
              <div key={idx} className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <i className="fa-solid fa-diagram-project text-emerald-600 group-hover:text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{type.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{type.description}</p>
                <div className="pt-4 border-t border-slate-50 flex items-center justify-center bg-slate-50/50 rounded-lg py-2">
                   <span className="text-xs text-slate-400 font-mono italic">Visualized in presentation</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Tree Traversals */}
        <section id="traversal" className="scroll-mt-24">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/3 space-y-6">
                <h2 className="text-3xl font-bold border-l-4 border-emerald-500 pl-4">Tree Traversals</h2>
                <p className="text-slate-400 leading-relaxed">
                  Traversal is the process of visiting every node in the tree exactly once. There are several ways to do this, depending on the order we visit the root and its children.
                </p>
                
                <div className="space-y-3">
                  {Object.values(TraversalType).map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveTab(type)}
                      className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-200 border ${
                        activeTab === type 
                          ? 'bg-emerald-600 border-emerald-500 shadow-lg translate-x-2' 
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className="block font-bold">{type}</span>
                      <span className="text-xs opacity-70">
                        {type === TraversalType.PREORDER && "Root → Left → Right"}
                        {type === TraversalType.INORDER && "Left → Root → Right"}
                        {type === TraversalType.POSTORDER && "Left → Right → Root"}
                        {type === TraversalType.LEVELORDER && "Breadth First Search"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:w-2/3 flex flex-col items-center justify-center space-y-8 min-h-[500px] bg-black/20 rounded-2xl border border-white/5 p-8">
                <TreeVisualizer type={activeTab} />
                <div className="text-center">
                   <p className="text-emerald-400 font-mono text-sm">Interactive Visualization</p>
                   <p className="text-slate-500 text-xs">Click the "Play" button above to animate traversal</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Python Code Display */}
        <section id="python" className="scroll-mt-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Algorithm Implementation</h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold border border-amber-200">
                <i className="fa-solid fa-circle-info"></i>
                Python code shown for understanding only – not executable
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-slate-700">
              <div className="bg-slate-700 px-6 py-3 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-slate-400 text-xs font-mono uppercase tracking-widest">{activeTab} Implementation</div>
              </div>
              <div className="p-8">
                <pre className="text-emerald-300 font-mono text-lg overflow-x-auto">
                  <code>{PYTHON_CODE[activeTab]}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Complexity & Use Cases */}
        <section id="complexity" className="scroll-mt-24 pb-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <i className="fa-solid fa-stopwatch text-emerald-500"></i>
                Performance Analysis
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 font-bold uppercase mb-1">Time Complexity</p>
                  <p className="text-3xl font-black text-slate-800 font-mono">O(n)</p>
                  <p className="text-xs text-slate-400 mt-2">Since every node must be visited exactly once.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 font-bold uppercase mb-1">Space Complexity</p>
                  <p className="text-3xl font-black text-slate-800 font-mono">O(h)</p>
                  <p className="text-xs text-slate-400 mt-2">Where 'h' is the height of the tree (call stack space).</p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-600 p-8 rounded-3xl text-white shadow-lg space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <i className="fa-solid fa-rocket"></i>
                Real-World Applications
              </h3>
              <ul className="grid grid-cols-1 gap-4">
                {[
                  { icon: "fa-folder-tree", text: "File Systems (Directories)" },
                  { icon: "fa-calculator", text: "Expression Evaluation" },
                  { icon: "fa-database", text: "Indexing in Databases" },
                  { icon: "fa-code", text: "Abstract Syntax Trees (AST)" },
                  { icon: "fa-brain", text: "Decision Trees in AI" }
                ].map(app => (
                  <li key={app.text} className="flex items-center gap-4 bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-colors">
                    <i className={`fa-solid ${app.icon} text-emerald-200`}></i>
                    <span className="font-medium">{app.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-500 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-tree text-emerald-500 text-xl"></i>
              <span className="font-bold text-white text-lg">TreeEdu</span>
            </div>
            <p className="text-sm">Academic Project for Data Structures Presentation</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-white font-bold">{PRESENTER_NAME}</p>
            <p className="text-xs">Roll No: {ROLL_NO}</p>
            <p className="text-xs mt-4 opacity-50">&copy; 2024 Trees in Data Structures</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
