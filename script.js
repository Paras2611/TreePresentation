document.addEventListener("DOMContentLoaded", function () {
    // -------------------------------------------------------------------------
    // 1. Data Definitions
    // -------------------------------------------------------------------------
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
            desc: "Visits the left subtree, then the current node, then the right subtree.",
            sequence: ['4', '2', '5', '1', '6', '3', '7'],
            code: `def inorder(root):\n    if root:\n        inorder(root.left)\n        print(root.val, end=" ")\n        inorder(root.right)`
        },
        preorder: {
            title: "Preorder Traversal",
            order: "Root → Left → Right",
            desc: "Visits the current node first, then the left subtree, then the right subtree.",
            sequence: ['1', '2', '4', '5', '3', '6', '7'],
            code: `def preorder(root):\n    if root:\n        print(root.val, end=" ")\n        preorder(root.left)\n        preorder(root.right)`
        },
        postorder: {
            title: "Postorder Traversal",
            order: "Left → Right → Root",
            desc: "Visits the left subtree, then the right subtree, then the current node.",
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

    let currentType = 'inorder';
    let isPlaying = false;
    let animationTimeout = null;

    // -------------------------------------------------------------------------
    // 2. DOM Selection with Null Checks
    // -------------------------------------------------------------------------
    const introSvg = document.getElementById('intro-static-svg');
    const typesContainer = document.getElementById('tree-types-container');
    const menuButtons = document.querySelectorAll('.t-btn');
    const visualizerSvg = document.getElementById('visualizer-svg');
    const sequenceContainer = document.getElementById('sequence-container');
    const playbackBtn = document.getElementById('playback-btn');
    const orderText = document.getElementById('traversal-order-text');
    const descText = document.getElementById('traversal-desc-text');
    const filenameDisplay = document.getElementById('filename-display');
    const codeDisplay = document.getElementById('python-code-display');
    
    // AI Elements
    const aiInsightBtn = document.getElementById('ai-insight-btn');
    const currentTypeLabel = document.getElementById('current-type-label');
    const aiResponseArea = document.getElementById('ai-response-area');
    const aiResponseText = document.getElementById('ai-response-text');

    // -------------------------------------------------------------------------
    // 3. Helper Functions
    // -------------------------------------------------------------------------
    function renderIntroSvg() {
        if (introSvg) {
            introSvg.innerHTML = `
                <line x1="120" y1="30" x2="60" y2="90" stroke="#10b981" stroke-width="3" />
                <line x1="120" y1="30" x2="180" y2="90" stroke="#10b981" stroke-width="3" />
                <circle cx="120" cy="30" r="22" fill="#10b981" />
                <text x="120" y="36" text-anchor="middle" fill="white" font-weight="bold" font-size="12">ROOT</text>
                <circle cx="60" cy="90" r="18" fill="white" stroke="#10b981" stroke-width="2" />
                <circle cx="180" cy="90" r="18" fill="white" stroke="#10b981" stroke-width="2" />
                <line x1="60" y1="90" x2="30" y2="150" stroke="#10b981" stroke-width="2" />
                <circle cx="30" cy="150" r="15" fill="white" stroke="#10b981" stroke-width="2" />
            `;
        }
    }

    function renderTypes() {
        if (typesContainer) {
            typesContainer.innerHTML = TREE_TYPES.map(type => `
                <div class="group bg-white p-8 rounded-3xl border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300">
                    <div class="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                        <i class="fa-solid ${type.icon} text-emerald-600 group-hover:text-white text-xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-800 mb-3">${type.name}</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">${type.desc}</p>
                </div>
            `).join('');
        }
    }

    function updateUI() {
        const info = TRAVERSAL_INFO[currentType];
        if (orderText) orderText.textContent = info.order;
        if (descText) descText.textContent = info.desc;
        if (filenameDisplay) filenameDisplay.textContent = `${currentType}.py`;
        if (codeDisplay) codeDisplay.textContent = info.code;
        if (currentTypeLabel) currentTypeLabel.textContent = info.title;
        
        drawTree();
        renderSequenceDots();
    }

    function drawTree(activeId = null, visitedIds = []) {
        if (!visualizerSvg) return;
        
        let html = '';
        TREE_NODES.forEach(node => {
            if (node.left) {
                const child = TREE_NODES.find(n => n.id === node.left);
                html += `<line x1="${node.x}" y1="${node.y}" x2="${child.x}" y2="${child.y}" stroke="rgba(255,255,255,0.1)" stroke-width="2" />`;
            }
            if (node.right) {
                const child = TREE_NODES.find(n => n.id === node.right);
                html += `<line x1="${node.x}" y1="${node.y}" x2="${child.x}" y2="${child.y}" stroke="rgba(255,255,255,0.1)" stroke-width="2" />`;
            }
        });

        TREE_NODES.forEach(node => {
            const isActive = activeId === node.id;
            const isVisited = visitedIds.includes(node.id);
            const fillColor = isActive ? '#10b981' : (isVisited ? '#065f46' : '#1e293b');
            const strokeColor = isActive ? '#34d399' : '#334155';
            
            html += `
                <g>
                    <circle cx="${node.x}" cy="${node.y}" r="20" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2" />
                    <text x="${node.x}" y="${node.y + 6}" text-anchor="middle" fill="white" font-size="14" font-weight="bold">${node.val}</text>
                </g>
            `;
        });
        visualizerSvg.innerHTML = html;
    }

    function renderSequenceDots(visitedIds = []) {
        if (!sequenceContainer) return;
        const sequence = TRAVERSAL_INFO[currentType].sequence;
        sequenceContainer.innerHTML = sequence.map(id => {
            const isVisited = visitedIds.includes(id);
            const classes = isVisited 
                ? 'bg-emerald-600 border-emerald-400 text-white scale-110 shadow-lg shadow-emerald-500/20' 
                : 'bg-slate-800 border-slate-700 text-slate-500';
            return `<div class="w-10 h-10 flex items-center justify-center rounded-lg font-mono font-bold border transition-all duration-300 ${classes}">${id}</div>`;
        }).join('');
    }

    function startAnimation() {
        isPlaying = true;
        if (playbackBtn) playbackBtn.innerHTML = '<i class="fa-solid fa-rotate-right text-xl"></i>';
        
        const sequence = TRAVERSAL_INFO[currentType].sequence;
        let i = 0;
        const visited = [];

        function step() {
            if (i < sequence.length) {
                const nodeId = sequence[i];
                visited.push(nodeId);
                drawTree(nodeId, visited);
                renderSequenceDots(visited);
                i++;
                animationTimeout = setTimeout(step, 800);
            } else {
                isPlaying = false;
                if (playbackBtn) playbackBtn.innerHTML = '<i class="fa-solid fa-play text-xl"></i>';
            }
        }
        step();
    }

    function stopAnimation() {
        isPlaying = false;
        clearTimeout(animationTimeout);
        if (playbackBtn) playbackBtn.innerHTML = '<i class="fa-solid fa-play text-xl"></i>';
        drawTree();
        renderSequenceDots();
    }

    // -------------------------------------------------------------------------
    // 4. AI Integration Logic
    // -------------------------------------------------------------------------
    async function getAIInsight() {
        if (!aiInsightBtn || !aiResponseArea || !aiResponseText) return;
        
        const originalContent = aiInsightBtn.innerHTML;
        aiInsightBtn.disabled = true;
        aiInsightBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing...';
        aiResponseArea.classList.remove('hidden');
        aiResponseText.textContent = "Consulting the Gemini AI academic model for deep tree insights...";

        try {
            // Using the native GoogleGenAI SDK as per instructions
            // Since we're in a browser, we import from the esm.sh version typically
            // but for this specific instruction set, we assume the environment provides process.env.API_KEY
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.API_KEY}`;
            const prompt = `Provide a concise academic fun fact or optimization tip about ${TRAVERSAL_INFO[currentType].title} in data structures. Keep it under 100 words. Mention real-world usage like file systems or compiler design.`;

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to retrieve AI insight at this time.";
            aiResponseText.textContent = text;
        } catch (error) {
            console.error("Gemini API Error:", error);
            aiResponseText.textContent = "Academic server communication error. Please try again later.";
        } finally {
            aiInsightBtn.disabled = false;
            aiInsightBtn.innerHTML = originalContent;
        }
    }

    // -------------------------------------------------------------------------
    // 5. Setup Events
    // -------------------------------------------------------------------------
    if (menuButtons) {
        menuButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                if (isPlaying) stopAnimation();
                menuButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentType = this.dataset.type;
                if (aiResponseArea) aiResponseArea.classList.add('hidden');
                updateUI();
            });
        });
    }

    if (playbackBtn) {
        playbackBtn.addEventListener('click', () => {
            if (isPlaying) stopAnimation(); else startAnimation();
        });
    }

    if (aiInsightBtn) {
        aiInsightBtn.addEventListener('click', getAIInsight);
    }

    // Initialize the page
    renderIntroSvg();
    renderTypes();
    updateUI();
});