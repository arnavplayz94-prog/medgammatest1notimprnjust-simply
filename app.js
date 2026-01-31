/* =====================================================
   MEDGAMMA - JavaScript Application
   Navigation, Interactions, and AI Integration Points
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAnimations();
    initMoleculeAnalysis();
    initUploadZones();
    initParticles();
    initCardEffects();
});

// Particle Background Effect
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.6;';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.hue = Math.random() * 60 + 220;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 60; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

// Card Interactive Glow Effect
function initCardEffects() {
    document.querySelectorAll('.stat-card, .dashboard-card, .project-card, .option-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(99, 102, 241, 0.15), transparent 50%), rgba(18, 18, 35, 0.85)`;
        });
        card.addEventListener('mouseleave', () => { card.style.background = ''; });
    });
}



// Navigation System
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.dataset.section;

            // Update nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Update sections
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// Stat Counter Animation
function initAnimations() {
    const statValues = document.querySelectorAll('.stat-value');

    const animateValue = (element, start, end, duration) => {
        const startTime = performance.now();
        const comma = (num) => num.toLocaleString();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);
            element.textContent = comma(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    };

    // Observe stats for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent.replace(/,/g, '');
                const target = parseInt(text) || 0;
                if (target > 0) {
                    animateValue(element, 0, target, 1500);
                }
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(stat => observer.observe(stat));

    // Progress bar animations
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// Molecule Analysis Module
function initMoleculeAnalysis() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const smilesInput = document.getElementById('smilesInput');
    const resultsPanel = document.getElementById('analysisResults');
    const moleculeViewer = document.getElementById('moleculeViewer');

    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', async () => {
            const smiles = smilesInput?.value.trim();

            if (!smiles) {
                showNotification('Please enter a SMILES notation', 'warning');
                return;
            }

            // Show loading state
            analyzeBtn.disabled = true;
            analyzeBtn.innerHTML = '<span class="material-icons-outlined spinning">hourglass_empty</span> Analyzing...';

            try {
                // Simulate AI analysis (replace with your Python/C++ backend call)
                const results = await analyzeWithAI(smiles);
                displayResults(results);
                updateMoleculeViewer(smiles);
            } catch (error) {
                showNotification('Analysis failed: ' + error.message, 'error');
            } finally {
                analyzeBtn.disabled = false;
                analyzeBtn.innerHTML = '<span class="material-icons-outlined">psychology</span> Analyze with AI';
            }
        });
    }
}

// AI Analysis Integration Point
// Replace this with your actual Python/C++ backend API call
async function analyzeWithAI(smiles) {
    // Simulated delay for demo
    await new Promise(resolve => setTimeout(resolve, 2000));

    // =====================================================
    // TODO: INTEGRATE YOUR PYTHON/C++ MODEL HERE
    // Example API call:
    // const response = await fetch('http://localhost:5000/analyze', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ smiles: smiles })
    // });
    // return await response.json();
    // =====================================================

    // Demo results
    return {
        moleculeName: 'Unknown Compound',
        molecularWeight: (Math.random() * 500 + 100).toFixed(2),
        drugLikeness: (Math.random() * 100).toFixed(1),
        toxicity: (Math.random() * 100).toFixed(1),
        bioavailability: (Math.random() * 100).toFixed(1),
        bindingAffinity: (Math.random() * 10).toFixed(2),
        predictions: [
            { property: 'Solubility', value: 'Moderate', score: 72 },
            { property: 'BBB Permeability', value: 'Low', score: 34 },
            { property: 'CYP Inhibition', value: 'None', score: 95 }
        ]
    };
}

// Display Analysis Results
function displayResults(results) {
    const resultsPanel = document.getElementById('analysisResults');
    if (!resultsPanel) return;

    resultsPanel.innerHTML = `
        <div class="results-content">
            <div class="result-header">
                <h4>${results.moleculeName}</h4>
                <span class="mw">MW: ${results.molecularWeight}</span>
            </div>
            <div class="result-metrics">
                <div class="result-metric">
                    <span class="label">Drug-likeness</span>
                    <div class="metric-bar">
                        <div class="metric-fill" style="width: ${results.drugLikeness}%; background: ${getScoreColor(results.drugLikeness)}"></div>
                    </div>
                    <span class="value">${results.drugLikeness}%</span>
                </div>
                <div class="result-metric">
                    <span class="label">Toxicity Risk</span>
                    <div class="metric-bar">
                        <div class="metric-fill" style="width: ${100 - results.toxicity}%; background: ${getScoreColor(100 - results.toxicity)}"></div>
                    </div>
                    <span class="value">${(100 - results.toxicity).toFixed(1)}% Safe</span>
                </div>
                <div class="result-metric">
                    <span class="label">Bioavailability</span>
                    <div class="metric-bar">
                        <div class="metric-fill" style="width: ${results.bioavailability}%; background: ${getScoreColor(results.bioavailability)}"></div>
                    </div>
                    <span class="value">${results.bioavailability}%</span>
                </div>
            </div>
            <div class="predictions-list">
                <h5>AI Predictions</h5>
                ${results.predictions.map(p => `
                    <div class="prediction-item">
                        <span class="prop">${p.property}</span>
                        <span class="val">${p.value}</span>
                        <span class="score" style="color: ${getScoreColor(p.score)}">${p.score}%</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Add result styles dynamically
    addResultStyles();
}

function getScoreColor(score) {
    if (score >= 70) return '#22c55e';
    if (score >= 40) return '#f97316';
    return '#ef4444';
}

function addResultStyles() {
    if (document.getElementById('result-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'result-styles';
    styles.textContent = `
        .results-content { animation: fadeIn 0.4s ease; }
        .result-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color); }
        .result-header h4 { font-size: 1.1rem; }
        .mw { color: var(--text-muted); font-size: 0.85rem; }
        .result-metrics { margin-bottom: 1.5rem; }
        .result-metric { margin-bottom: 1rem; }
        .result-metric .label { display: block; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.5rem; }
        .metric-bar { height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; flex: 1; }
        .metric-fill { height: 100%; border-radius: 3px; transition: width 0.8s ease; }
        .result-metric { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .result-metric .label { flex: 0 0 100%; }
        .result-metric .value { font-size: 0.85rem; font-weight: 600; min-width: 80px; text-align: right; }
        .predictions-list h5 { font-size: 0.9rem; margin-bottom: 0.75rem; color: var(--text-secondary); }
        .prediction-item { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color); font-size: 0.85rem; }
        .prediction-item .prop { color: var(--text-secondary); }
        .prediction-item .score { font-weight: 600; }
        .spinning { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(styles);
}

// Update Molecule Viewer
function updateMoleculeViewer(smiles) {
    const viewer = document.getElementById('moleculeViewer');
    if (!viewer) return;

    // =====================================================
    // TODO: INTEGRATE 3D MOLECULE VISUALIZATION LIBRARY
    // Examples: 3Dmol.js, NGL Viewer, or your custom renderer
    // =====================================================

    viewer.innerHTML = `
        <div class="molecule-display">
            <div class="molecule-3d-render">
                <div class="atom-cloud">
                    ${generateAtomCloud()}
                </div>
            </div>
            <p class="smiles-display">${smiles}</p>
        </div>
    `;

    addMoleculeStyles();
}

function generateAtomCloud() {
    let atoms = '';
    const colors = ['#4f8cff', '#a855f7', '#22c55e', '#f97316', '#ec4899'];
    for (let i = 0; i < 8; i++) {
        const size = 8 + Math.random() * 16;
        const x = 30 + Math.random() * 40;
        const y = 30 + Math.random() * 40;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = Math.random() * 2;
        atoms += `<div class="atom" style="width:${size}px;height:${size}px;left:${x}%;top:${y}%;background:${color};animation-delay:${delay}s"></div>`;
    }
    return atoms;
}

function addMoleculeStyles() {
    if (document.getElementById('molecule-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'molecule-styles';
    styles.textContent = `
        .molecule-display { text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: center; }
        .molecule-3d-render { height: 200px; position: relative; margin-bottom: 1rem; }
        .atom-cloud { position: relative; width: 100%; height: 100%; }
        .atom { position: absolute; border-radius: 50%; animation: float 3s ease-in-out infinite; box-shadow: 0 0 20px currentColor; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .smiles-display { font-family: 'Fira Code', monospace; font-size: 0.8rem; color: var(--text-muted); word-break: break-all; padding: 0 1rem; }
    `;
    document.head.appendChild(styles);
}

// Upload Zones
function initUploadZones() {
    const uploadZones = document.querySelectorAll('.upload-zone');

    uploadZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('dragover');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('dragover');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('dragover');

            const files = Array.from(e.dataTransfer.files);
            handleFileUpload(files, zone);
        });

        zone.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.accept = '.py,.cpp,.h,.pkl,.pt,.onnx';
            input.onchange = () => {
                if (input.files.length) {
                    handleFileUpload(Array.from(input.files), zone);
                }
            };
            input.click();
        });
    });
}

function handleFileUpload(files, zone) {
    // =====================================================
    // TODO: IMPLEMENT FILE UPLOAD TO YOUR BACKEND
    // This is where you'd upload the Python/C++ model files
    // =====================================================

    const fileNames = files.map(f => f.name).join(', ');
    showNotification(`Files ready for upload: ${fileNames}`, 'success');

    zone.innerHTML = `
        <span class="material-icons-outlined" style="color: var(--accent-green)">check_circle</span>
        <p>${files.length} file(s) selected</p>
        <p style="font-size: 0.75rem; color: var(--text-muted)">${fileNames}</p>
    `;
}

// Notification System
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span class="material-icons-outlined">${getNotificationIcon(type)}</span>
        <span>${message}</span>
    `;

    // Add notification styles
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification { position: fixed; bottom: 2rem; right: 2rem; display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.5rem; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: var(--shadow-lg); animation: slideIn 0.3s ease; z-index: 1000; }
            .notification.success { border-color: var(--accent-green); }
            .notification.success span.material-icons-outlined { color: var(--accent-green); }
            .notification.warning { border-color: var(--accent-orange); }
            .notification.warning span.material-icons-outlined { color: var(--accent-orange); }
            .notification.error { border-color: #ef4444; }
            .notification.error span.material-icons-outlined { color: #ef4444; }
            @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check_circle',
        warning: 'warning',
        error: 'error',
        info: 'info'
    };
    return icons[type] || 'info';
}

// Global Search
const globalSearch = document.getElementById('globalSearch');
if (globalSearch) {
    globalSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        // Implement search functionality here
        console.log('Searching:', query);
    });
}

// Export functions for external use (e.g., from your Python backend)
window.MedgammaAPI = {
    analyzeWithAI,
    displayResults,
    showNotification,
    updateMoleculeViewer
};
