const TREE_TYPES = [
    { name: "General Tree", desc: "No child limit." },
    { name: "Binary Tree", desc: "At most 2 children." },
    { name: "Full Binary Tree", desc: "0 or 2 children." },
    { name: "Complete Binary Tree", desc: "Filled L-to-R." },
    { name: "Perfect Binary Tree", desc: "All levels filled." },
    { name: "Skewed Tree", desc: "All nodes one side." },
    { name: "Binary Search Tree", desc: "L < Node < R." },
    { name: "AVL Tree", desc: "Self-balancing BST." },
    { name: "Heap", desc: "Satisfies Heap property." },
    { name: "Trie", desc: "Prefix retrieval tree." },
    { name: "B-Tree", desc: "Optimized block access." }
];

const PYTHON_CODE = {
    inorder: `def inorder(root):
    if root:
        inorder(root.left)
        print(root.val, end=" ")
        inorder(root.right)`,
    preorder: `def preorder(root):
    if root:
        print(root.val, end=" ")
        preorder(root.left)
        preorder(root.right)`,
    postorder: `def postorder(root):
    if root:
        postorder(root.left)
        postorder(root.right)
        print(root.val, end=" ")`,
    levelorder: `def level_order(root):
    if not root: return
    queue = [root]
    while queue:
        node = queue.pop(0)
        print(node.val, end=" ")
        if node.left: queue.append(node.left)
        if node.right: queue.append(node.right)`
};

const T_INFO = {
    inorder: "Visit Left → Node → Right. Ideal for BST sorting.",
    preorder: "Visit Node → Left → Right. Useful for cloning trees.",
    postorder: "Visit Left → Right → Node. Used for deleting trees.",
    levelorder: "Visit each level horizontally. Also known as BFS."
};

const treeNodes = [
    { id: '1', x: 200, y: 50,  val: '1', children: ['2', '3'] },
    { id: '2', x: 100, y: 130, val: '2', children: ['4', '5'] },
    { id: '3', x: 300, y: 130, val: '3', children: ['6', '7'] },
    { id: '4', x: 50,  y: 210, val: '4', children: [] },
    { id: '5', x: 150, y: 210, val: '5', children: [] },
    { id: '6', x: 250, y: 210, val: '6', children: [] },
    { id: '7', x: 350, y: 210, val: '7', children: [] }
];

const SEQUENCES = {
    preorder: ['1', '2', '4', '5', '3', '6', '7'],
    inorder: ['4', '2', '5', '1', '6', '3', '7'],
    postorder: ['4', '5', '2', '6', '7', '3', '1'],
    levelorder: ['1', '2', '3', '4', '5', '6', '7']
};

let activeType = 'inorder';
let isPlaying = false;

function init() {
    renderTypes();
    renderIntro();
    setupTraversal();
    updateUI('inorder');
    drawTree();
}

function renderTypes() {
    const container = document.getElementById('types-container');
    container.innerHTML = TREE_TYPES.map(t => `
        <div class="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all">
            <div class="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
                <i class="fa-solid fa-network-wired text-emerald-600"></i>
            </div>
            <h4 class="font-bold text-slate-800 mb-1">${t.name}</h4>
            <p class="text-xs text-slate-500">${t.desc}</p>
        </div>
    `).join('');
}

function renderIntro() {
    const svg = document.getElementById('intro-svg');
    svg.innerHTML = `
        <line x1="140" y1="40" x2="80" y2="100" stroke="#10b981" stroke-width="2"/>
        <line x1="140" y1="40" x2="200" y2="100" stroke="#10b981" stroke-width="2"/>
        <circle cx="140" cy="40" r="18" fill="#10b981"/>
        <text x="140" y="45" text-anchor="middle" fill="white" font-size="10" font-weight="bold">ROOT</text>
        <circle cx="80" cy="100" r="15" fill="white" stroke="#cbd5e1"/>
        <text x="80" y="104" text-anchor="middle" fill="#64748b" font-size="9">Child</text>
        <circle cx="200" cy="100" r="15" fill="white" stroke="#cbd5e1"/>
        <text x="200" y="104" text-anchor="middle" fill="#64748b" font-size="9">Leaf</text>
    `;
}

function drawTree() {
    const svg = document.getElementById('t-svg');
    svg.innerHTML = '';
    
    // Edges
    treeNodes.forEach(node => {
        node.children.forEach(cid => {
            const child = treeNodes.find(n => n.id === cid);
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', node.x); line.setAttribute('y1', node.y);
            line.setAttribute('x2', child.x); line.setAttribute('y2', child.y);
            line.setAttribute('stroke', 'rgba(255,255,255,0.1)');
            line.setAttribute('stroke-width', '2');
            svg.appendChild(line);
        });
    });

    // Nodes
    treeNodes.forEach(node => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', node.x); c.setAttribute('cy', node.y); c.setAttribute('r', '18');
        c.setAttribute('fill', 'rgba(255,255,255,0.05)');
        c.setAttribute('stroke', 'rgba(255,255,255,0.15)');
        c.setAttribute('class', 'node-circle');
        c.setAttribute('id', `c-${node.id}`);
        
        const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('x', node.x); t.setAttribute('y', node.y+5);
        t.setAttribute('text-anchor', 'middle'); t.setAttribute('fill', '#94a3b8');
        t.setAttribute('font-size', '12'); t.setAttribute('id', `t-${node.id}`);
        t.textContent = node.val;
        
        g.appendChild(c); g.appendChild(t);
        svg.appendChild(g);
    });
}

function setupTraversal() {
    document.querySelectorAll('.t-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (isPlaying) return;
            document.querySelectorAll('.t-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            updateUI(e.currentTarget.dataset.type);
        });
    });

    document.getElementById('play-btn').addEventListener('click', runAnimation);
}

function updateUI(type) {
    activeType = type;
    document.getElementById('code-area').textContent = PYTHON_CODE[type];
    document.getElementById('code-label').textContent = type;
    document.getElementById('t-info').textContent = T_INFO[type];
    resetNodes();
    
    const seqCont = document.getElementById('t-seq');
    seqCont.innerHTML = SEQUENCES[type].map(id => `
        <div id="dot-${id}" class="seq-dot">${id}</div>
    `).join('');
}

function resetNodes() {
    treeNodes.forEach(n => {
        const c = document.getElementById(`c-${n.id}`);
        const t = document.getElementById(`t-${n.id}`);
        if(c) {
            c.classList.remove('node-highlighted');
            c.setAttribute('fill', 'rgba(255,255,255,0.05)');
        }
        if(t) {
            t.classList.remove('text-active');
            t.setAttribute('fill', '#94a3b8');
        }
        const d = document.getElementById(`dot-${n.id}`);
        if(d) d.classList.remove('active');
    });
}

async function runAnimation() {
    if (isPlaying) return;
    isPlaying = true;
    resetNodes();
    const btn = document.getElementById('play-btn');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    
    const seq = SEQUENCES[activeType];
    for (let id of seq) {
        const c = document.getElementById(`c-${id}`);
        const t = document.getElementById(`t-${id}`);
        const d = document.getElementById(`dot-${id}`);
        if(c) c.classList.add('node-highlighted');
        if(t) t.classList.add('text-active');
        if(d) d.classList.add('active');
        await new Promise(r => setTimeout(r, 800));
    }
    
    isPlaying = false;
    btn.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
}

window.addEventListener('load', init);
