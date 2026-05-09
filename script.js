/* ─── IMAGIX AI — script.js ─────────────────────────── */
'use strict';

/* ── CONFIG ── */
const POLLINATIONS_BASE = 'https://image.pollinations.ai/prompt/';

const STYLES = [
  { id: 'realistic',  label: '📷 Realistic',  suffix: 'photorealistic, 8k, ultra detailed, sharp focus, DSLR photo' },
  { id: 'anime',      label: '🌸 Anime',      suffix: 'anime art style, Studio Ghibli, vibrant, cel-shaded, beautiful illustration' },
  { id: 'cyberpunk',  label: '🌆 Cyberpunk',  suffix: 'cyberpunk aesthetic, neon lights, dark futuristic city, rain, blade runner style' },
  { id: 'fantasy',    label: '🧙 Fantasy',    suffix: 'epic fantasy art, magical, mystical, painterly, concept art, dramatic lighting' },
  { id: 'cartoon',    label: '🎨 Cartoon',    suffix: 'cartoon style, bold outlines, flat colors, fun, playful illustration' },
  { id: 'cinematic',  label: '🎬 Cinematic',  suffix: 'cinematic composition, film still, dramatic lighting, anamorphic lens, color graded' },
];

const RATIOS = [
  { id: 'square',    label: '1:1',   w: 1024, h: 1024 },
  { id: 'portrait',  label: '2:3',   w: 832,  h: 1216 },
  { id: 'landscape', label: '3:2',   w: 1216, h: 832  },
  { id: 'wide',      label: '16:9',  w: 1344, h: 768  },
  { id: 'ultra',     label: '21:9',  w: 1536, h: 640  },
];

const SUGGESTIONS = [
  'Glowing jellyfish floating through a neon-lit deep ocean',
  'Ancient temple hidden in a misty rainforest at golden hour',
  'A lone astronaut on a purple alien beach at sunset',
  'Steampunk clockwork dragon perched on a Victorian tower',
  'Enchanted library with floating books and fireflies',
  'Wolf made of northern lights in a snowy pine forest',
  'A futuristic Tokyo street viewed from above in rain',
  'Crystal cave filled with bioluminescent plants',
  'Portrait of a samurai warrior in cherry blossom storm',
  'Retro-futuristic diner on Mars with Earth visible outside',
];

const LOADING_MESSAGES = [
  'Initializing neural canvas…',
  'Painting pixels from your words…',
  'Adding depth and atmosphere…',
  'Sharpening final details…',
  'Almost there, polishing the art…',
];

/* ── STATE ── */
let selectedStyle = STYLES[0].id;
let selectedRatio = RATIOS[0].id;
let galleryHistory = [];
let currentPrompt  = '';
let currentImgUrl  = '';
let isGenerating   = false;

/* ── DOM REFS ── */
const promptEl       = document.getElementById('prompt');
const negPromptEl    = document.getElementById('negative-prompt');
const genBtn         = document.getElementById('gen-btn');
const genBtnText     = genBtn.querySelector('.gen-btn-text');
const genBtnLoading  = genBtn.querySelector('.gen-btn-loading');
const copyPromptBtn  = document.getElementById('copy-prompt-btn');
const clearBtn       = document.getElementById('clear-btn');
const downloadBtn    = document.getElementById('download-btn');
const regenerateBtn  = document.getElementById('regenerate-btn');
const resultImg      = document.getElementById('result-img');
const resultPromptTx = document.getElementById('result-prompt-text');
const resultStyleCh  = document.getElementById('result-style-chip');
const emptyState     = document.getElementById('empty-state');
const loadingState   = document.getElementById('loading-state');
const resultState    = document.getElementById('result-state');
const loadingText    = document.getElementById('loading-text');
const loadingBar     = document.getElementById('loading-bar');
const galleryGrid    = document.getElementById('gallery-grid');
const galleryEmpty   = document.getElementById('gallery-empty');
const clearGalleryBtn= document.getElementById('clear-gallery-btn');
const navGallery     = document.getElementById('nav-gallery');
const toastEl        = document.getElementById('toast');
const styleGrid      = document.getElementById('style-grid');
const ratioGrid      = document.getElementById('ratio-grid');
const chipsWrap      = document.getElementById('chips');

/* ── INIT ── */
function init() {
  buildStyleGrid();
  buildRatioGrid();
  buildChips();
  updateGalleryVisibility();

  genBtn.addEventListener('click', handleGenerate);
  copyPromptBtn.addEventListener('click', copyPrompt);
  clearBtn.addEventListener('click', () => { promptEl.value = ''; promptEl.focus(); });
  downloadBtn.addEventListener('click', () => downloadImage(currentImgUrl, currentPrompt));
  regenerateBtn.addEventListener('click', handleGenerate);
  clearGalleryBtn.addEventListener('click', clearGallery);
  navGallery.addEventListener('click', () => {
    document.getElementById('gallery-section').scrollIntoView({ behavior: 'smooth' });
  });

  promptEl.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') handleGenerate();
  });
}

/* ── BUILD STYLE GRID ── */
function buildStyleGrid() {
  STYLES.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'style-btn' + (s.id === selectedStyle ? ' active' : '');
    btn.textContent = s.label;
    btn.dataset.id = s.id;
    btn.addEventListener('click', () => {
      selectedStyle = s.id;
      styleGrid.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
    styleGrid.appendChild(btn);
  });
}

/* ── BUILD RATIO GRID ── */
function buildRatioGrid() {
  RATIOS.forEach(r => {
    const btn = document.createElement('button');
    btn.className = 'ratio-btn' + (r.id === selectedRatio ? ' active' : '');
    btn.textContent = r.label;
    btn.dataset.id = r.id;
    btn.addEventListener('click', () => {
      selectedRatio = r.id;
      ratioGrid.querySelectorAll('.ratio-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
    ratioGrid.appendChild(btn);
  });
}

/* ── BUILD CHIPS ── */
function buildChips() {
  const shuffled = [...SUGGESTIONS].sort(() => Math.random() - 0.5).slice(0, 6);
  shuffled.forEach(text => {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.textContent = text.length > 42 ? text.slice(0, 42) + '…' : text;
    chip.title = text;
    chip.addEventListener('click', () => {
      promptEl.value = text;
      promptEl.focus();
    });
    chipsWrap.appendChild(chip);
  });
}

/* ── GENERATE ── */
async function handleGenerate() {
  const prompt = promptEl.value.trim();
  if (!prompt) { showToast('Please enter a prompt first', 'error'); promptEl.focus(); return; }
  if (isGenerating) return;

  isGenerating = true;
  currentPrompt = prompt;
  setLoadingState(true);

  const style   = STYLES.find(s => s.id === selectedStyle);
  const ratio   = RATIOS.find(r => r.id === selectedRatio);
  const negPr   = negPromptEl.value.trim();
  const seed    = Math.floor(Math.random() * 9999999);

  // Build full prompt
  let fullPrompt = `${prompt}, ${style.suffix}`;
  if (negPr) fullPrompt += `, (avoid: ${negPr})`;

  const encodedPrompt = encodeURIComponent(fullPrompt);
  const url = `${POLLINATIONS_BASE}${encodedPrompt}?width=${ratio.w}&height=${ratio.h}&seed=${seed}&nologo=true&enhance=true`;

  // Animate loading bar
  animateLoadingBar();
  cycleLoadingText();

  try {
    const imgUrl = await loadImage(url);
    currentImgUrl = imgUrl;
    showResult(imgUrl, prompt, style);
    addToGallery(imgUrl, prompt, style);
    showToast('✦ Image generated successfully', 'success');
  } catch (err) {
    console.error(err);
    showEmptyState();
    showToast('Generation failed. Please try again.', 'error');
  } finally {
    isGenerating = false;
    setLoadingState(false);
  }
}

/* ── LOAD IMAGE (returns blob URL) ── */
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error('Image failed to load'));
    img.src = url;

    // Timeout after 45s
    setTimeout(() => reject(new Error('Timeout')), 45000);
  });
}

/* ── STATE MANAGEMENT ── */
function setLoadingState(loading) {
  if (loading) {
    genBtn.disabled = true;
    genBtnText.classList.add('hidden');
    genBtnLoading.classList.remove('hidden');
    showPanel('loading');
  } else {
    genBtn.disabled = false;
    genBtnText.classList.remove('hidden');
    genBtnLoading.classList.add('hidden');
  }
}

function showPanel(panel) {
  emptyState.classList.add('hidden');
  loadingState.classList.add('hidden');
  resultState.classList.add('hidden');
  if (panel === 'empty') emptyState.classList.remove('hidden');
  if (panel === 'loading') loadingState.classList.remove('hidden');
  if (panel === 'result') resultState.classList.remove('hidden');
}

function showEmptyState() { showPanel('empty'); }

function showResult(url, prompt, style) {
  resultImg.src = url;
  resultPromptTx.textContent = prompt;
  resultStyleCh.textContent  = style.label;
  showPanel('result');
}

/* ── LOADING ANIMATION ── */
let loadingBarInterval = null;
let loadingTextInterval = null;
let loadingProgress = 0;

function animateLoadingBar() {
  loadingProgress = 0;
  loadingBar.style.width = '0%';
  clearInterval(loadingBarInterval);

  loadingBarInterval = setInterval(() => {
    const remaining = 100 - loadingProgress;
    const step = Math.random() * (remaining * 0.08);
    loadingProgress = Math.min(loadingProgress + step, 92);
    loadingBar.style.width = loadingProgress + '%';
  }, 600);
}

function finishLoadingBar() {
  clearInterval(loadingBarInterval);
  loadingBar.style.width = '100%';
}

function cycleLoadingText() {
  let i = 0;
  loadingText.textContent = LOADING_MESSAGES[0];
  clearInterval(loadingTextInterval);
  loadingTextInterval = setInterval(() => {
    i = (i + 1) % LOADING_MESSAGES.length;
    loadingText.textContent = LOADING_MESSAGES[i];
  }, 2800);
}

/* ── GALLERY ── */
function addToGallery(url, prompt, style) {
  finishLoadingBar();
  clearInterval(loadingTextInterval);

  const item = { url, prompt, style: style.label, id: Date.now() };
  galleryHistory.unshift(item);

  const card = createGalleryCard(item);
  galleryGrid.insertBefore(card, galleryGrid.firstChild);
  updateGalleryVisibility();
}

function createGalleryCard(item) {
  const card = document.createElement('div');
  card.className = 'gallery-item';
  card.dataset.id = item.id;

  card.innerHTML = `
    <img src="${item.url}" alt="${escapeHtml(item.prompt)}" loading="lazy" />
    <div class="gallery-item-overlay">
      <span class="gallery-item-style">${escapeHtml(item.style)}</span>
      <p class="gallery-item-prompt">${escapeHtml(item.prompt)}</p>
    </div>
    <button class="gallery-dl-btn" title="Download">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    </button>
  `;

  card.querySelector('.gallery-dl-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    downloadImage(item.url, item.prompt);
  });

  // Click card to restore prompt
  card.addEventListener('click', () => {
    promptEl.value = item.prompt;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Prompt loaded ↑', 'success');
  });

  return card;
}

function clearGallery() {
  if (!galleryHistory.length) return;
  galleryHistory = [];
  galleryGrid.innerHTML = '';
  updateGalleryVisibility();
  showToast('Gallery cleared', 'success');
}

function updateGalleryVisibility() {
  if (galleryHistory.length === 0) {
    galleryEmpty.classList.remove('hidden');
  } else {
    galleryEmpty.classList.add('hidden');
  }
}

/* ── DOWNLOAD ── */
async function downloadImage(url, prompt) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `imagix-${slugify(prompt).slice(0, 40)}-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
    showToast('Downloading image…', 'success');
  } catch {
    // Fallback: open in new tab
    window.open(url, '_blank');
    showToast('Opening image in new tab', 'success');
  }
}

/* ── COPY PROMPT ── */
function copyPrompt() {
  const text = promptEl.value.trim();
  if (!text) { showToast('Nothing to copy', 'error'); return; }
  navigator.clipboard.writeText(text)
    .then(() => showToast('Prompt copied!', 'success'))
    .catch(() => showToast('Copy failed', 'error'));
}

/* ── TOAST ── */
let toastTimer = null;
function showToast(msg, type = 'success') {
  toastEl.textContent = msg;
  toastEl.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 3000);
}

/* ── HELPERS ── */
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── BOOT ── */
document.addEventListener('DOMContentLoaded', init);
