/* ─── IMAGIX AI — script.js ─── nano banana · Ultra HD 4K ── */
'use strict';

/* ── POLLINATIONS CONFIG ── */
const POLLINATIONS_BASE = 'https://image.pollinations.ai/prompt/';
const MODEL = 'flux';  /* nano banana runs on flux via Pollinations */

/* ── QUALITY TIERS ── */
const QUALITIES = [
  {
    id: 'draft',
    icon: '⚡',
    name: 'Draft',
    res: '512px',
    desc: 'Fast preview — great for testing prompts quickly',
    w: 512, h: 512,
    steps: 20,
    badge: 'FAST',
    badgeClass: 'qb-purple',
    className: '',
    isBanana: false,
  },
  {
    id: 'standard',
    icon: '🌟',
    name: 'Standard',
    res: '768px',
    desc: 'Balanced quality and speed — ideal for most creations',
    w: 768, h: 768,
    steps: 25,
    badge: 'STD',
    badgeClass: 'qb-purple',
    className: '',
    isBanana: false,
  },
  {
    id: 'hd',
    icon: '💎',
    name: 'HD',
    res: '1024px',
    desc: 'High definition — sharp details, great shading and depth',
    w: 1024, h: 1024,
    steps: 30,
    badge: 'HD',
    badgeClass: 'qb-purple',
    className: '',
    isBanana: false,
  },
  {
    id: '2k',
    icon: '🔷',
    name: '2K',
    res: '2048px',
    desc: 'Ultra sharp 2K resolution — stunning clarity for all styles',
    w: 2048, h: 2048,
    steps: 35,
    badge: '2K',
    badgeClass: 'qb-purple',
    className: '',
    isBanana: false,
  },
  {
    id: '4k',
    icon: '🍌',
    name: 'Ultra 4K',
    res: '3840×2160',
    desc: '🍌 Nano Banana Ultra HD 4K — maximum detail, cinematic quality',
    w: 3840, h: 2160,
    steps: 40,
    badge: '4K',
    badgeClass: 'qb-banana',
    className: 'ultra-4k',
    isBanana: true,
  },
];

/* ── ART STYLES ── */
const STYLES = [
  { id: 'realistic', label: '📷 Realistic', suffix: 'photorealistic, ultra detailed, hyper realistic, sharp focus, 8k resolution, DSLR photo quality, professional photography' },
  { id: 'anime',     label: '🌸 Anime',     suffix: 'anime art style, Studio Ghibli inspired, vibrant colors, cel-shaded, beautiful detailed illustration, smooth linework' },
  { id: 'cyberpunk', label: '🌆 Cyberpunk', suffix: 'cyberpunk aesthetic, neon lights, dark futuristic city, rain-soaked streets, blade runner style, neon glow reflections' },
  { id: 'fantasy',   label: '🧙 Fantasy',   suffix: 'epic fantasy art, magical atmosphere, mystical lighting, painterly style, detailed concept art, dramatic epic composition' },
  { id: 'cartoon',   label: '🎨 Cartoon',   suffix: 'cartoon style, bold clean outlines, flat vibrant colors, fun expressive illustration, animation style' },
  { id: 'cinematic', label: '🎬 Cinematic', suffix: 'cinematic composition, professional film still, dramatic lighting, anamorphic lens bokeh, color graded, movie quality' },
];

/* ── ASPECT RATIOS (scaled per quality tier) ── */
const RATIOS = [
  { id: 'square',    label: '1:1',  scaleW: 1.0,   scaleH: 1.0   },
  { id: 'portrait',  label: '2:3',  scaleW: 0.816, scaleH: 1.0   },
  { id: 'landscape', label: '3:2',  scaleW: 1.0,   scaleH: 0.816 },
  { id: 'wide',      label: '16:9', scaleW: 1.0,   scaleH: 0.5625},
  { id: 'ultra',     label: '21:9', scaleW: 1.0,   scaleH: 0.43  },
];

/* ── SUGGESTIONS ── */
const SUGGESTIONS = [
  'Glowing jellyfish floating through a neon deep ocean',
  'Ancient temple hidden in a misty rainforest at golden hour',
  'A lone astronaut on a purple alien beach at sunset',
  'Steampunk clockwork dragon perched on a Victorian tower',
  'Enchanted library with floating books and fireflies',
  'Wolf silhouette made of northern lights in snowy forest',
  'Futuristic Tokyo street at night from above in rain',
  'Crystal cave filled with bioluminescent glowing plants',
  'Portrait of a samurai warrior in cherry blossom storm',
  'Retro-futuristic diner on Mars with Earth visible outside',
];

/* ── LOADING MESSAGES ── */
const LOADING_MSGS = [
  '🍌 Nano banana is warming up…',
  'Painting pixels from your words…',
  'Rendering ultra HD details…',
  'Adding depth, shadow, atmosphere…',
  'Upscaling to maximum resolution…',
  'Almost done — polishing the art…',
];

/* ── STATE ── */
let selectedQuality = QUALITIES[2].id;   /* default: HD */
let selectedStyle   = STYLES[0].id;
let selectedRatio   = RATIOS[0].id;
let galleryHistory  = [];
let currentPrompt   = '';
let currentImgUrl   = '';
let isGenerating    = false;

/* ── DOM REFS ── */
const promptEl        = document.getElementById('prompt');
const negPromptEl     = document.getElementById('negative-prompt');
const genBtn          = document.getElementById('gen-btn');
const genBtnText      = genBtn.querySelector('.gen-btn-text');
const genBtnLoading   = genBtn.querySelector('.gen-btn-loading');
const copyPromptBtn   = document.getElementById('copy-prompt-btn');
const clearBtn        = document.getElementById('clear-btn');
const downloadBtn     = document.getElementById('download-btn');
const regenerateBtn   = document.getElementById('regenerate-btn');
const resultImg       = document.getElementById('result-img');
const resultPromptTx  = document.getElementById('result-prompt-text');
const resultStyleChip = document.getElementById('result-style-chip');
const resultResChip   = document.getElementById('result-res-chip');
const qualityBadgeOv  = document.getElementById('quality-badge-overlay');
const emptyState      = document.getElementById('empty-state');
const loadingState    = document.getElementById('loading-state');
const resultState     = document.getElementById('result-state');
const loadingText     = document.getElementById('loading-text');
const loadingBar      = document.getElementById('loading-bar');
const loadingMeta     = document.getElementById('loading-meta');
const galleryGrid     = document.getElementById('gallery-grid');
const galleryEmpty    = document.getElementById('gallery-empty');
const clearGalleryBtn = document.getElementById('clear-gallery-btn');
const navGallery      = document.getElementById('nav-gallery');
const toastEl         = document.getElementById('toast');
const styleGrid       = document.getElementById('style-grid');
const ratioGrid       = document.getElementById('ratio-grid');
const qualityGrid     = document.getElementById('quality-grid');
const qualityDescBar  = document.getElementById('quality-desc-bar');
const chipsWrap       = document.getElementById('chips');
const metaRes         = document.getElementById('meta-res');
const metaQuality     = document.getElementById('meta-quality');

/* ── INIT ── */
function init() {
  buildQualityGrid();
  buildStyleGrid();
  buildRatioGrid();
  buildChips();
  updateMetaBar();
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
  promptEl.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'Enter') handleGenerate();
  });
}

/* ── BUILD QUALITY GRID ── */
function buildQualityGrid() {
  QUALITIES.forEach(q => {
    const btn = document.createElement('button');
    btn.className = `quality-btn ${q.className}` + (q.id === selectedQuality ? ' active' : '');
    btn.dataset.id = q.id;
    btn.innerHTML = `
      ${q.isBanana ? `<span class="q-badge">4K</span>` : ''}
      <span class="q-icon">${q.icon}</span>
      <span class="q-name">${q.name}</span>
      <span class="q-res">${q.res}</span>
    `;
    btn.addEventListener('click', () => {
      selectedQuality = q.id;
      qualityGrid.querySelectorAll('.quality-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateQualityDesc();
      updateMetaBar();
    });
    qualityGrid.appendChild(btn);
  });
  updateQualityDesc();
}

function updateQualityDesc() {
  const q = QUALITIES.find(x => x.id === selectedQuality);
  qualityDescBar.textContent = `${q.icon}  ${q.desc}`;
  qualityDescBar.className = `quality-desc-bar ${q.isBanana ? 'active-banana' : 'active-purple'}`;
}

/* ── BUILD STYLE GRID ── */
function buildStyleGrid() {
  STYLES.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'style-btn' + (s.id === selectedStyle ? ' active' : '');
    btn.textContent = s.label;
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
    btn.addEventListener('click', () => {
      selectedRatio = r.id;
      ratioGrid.querySelectorAll('.ratio-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateMetaBar();
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
    chip.textContent = text.length > 44 ? text.slice(0, 44) + '…' : text;
    chip.title = text;
    chip.addEventListener('click', () => { promptEl.value = text; promptEl.focus(); });
    chipsWrap.appendChild(chip);
  });
}

/* ── META BAR UPDATE ── */
function updateMetaBar() {
  const q = QUALITIES.find(x => x.id === selectedQuality);
  const r = RATIOS.find(x => x.id === selectedRatio);
  const w = Math.round(q.w * r.scaleW / 64) * 64;
  const h = Math.round(q.h * r.scaleH / 64) * 64;
  metaRes.textContent     = `${w} × ${h}`;
  metaQuality.textContent = `${q.name} ${q.isBanana ? '🍌' : ''}`;
}

/* ── COMPUTE DIMENSIONS ── */
function getDimensions() {
  const q = QUALITIES.find(x => x.id === selectedQuality);
  const r = RATIOS.find(x => x.id === selectedRatio);
  const w = Math.round(q.w * r.scaleW / 64) * 64;
  const h = Math.round(q.h * r.scaleH / 64) * 64;
  return { w, h, q };
}

/* ── GENERATE ── */
async function handleGenerate() {
  const prompt = promptEl.value.trim();
  if (!prompt) { showToast('Please enter a prompt first', 'error'); promptEl.focus(); return; }
  if (isGenerating) return;

  isGenerating = true;
  currentPrompt = prompt;
  setLoadingState(true);

  const style     = STYLES.find(s => s.id === selectedStyle);
  const { w, h, q } = getDimensions();
  const negPr     = negPromptEl.value.trim();
  const seed      = Math.floor(Math.random() * 9999999);

  /* Build enriched prompt with quality-level suffix */
  const qualitySuffix = q.isBanana
    ? 'ultra HD 4K, 8K quality, maximum detail, flawless rendering, nano banana ultra resolution, award-winning digital art'
    : q.id === '2k'
    ? 'ultra detailed, 2K resolution, high fidelity, sharp crisp details'
    : q.id === 'hd'
    ? 'high definition, sharp focus, detailed rendering'
    : '';

  let fullPrompt = `${prompt}, ${style.suffix}`;
  if (qualitySuffix) fullPrompt += `, ${qualitySuffix}`;
  if (negPr) fullPrompt += `, (avoid: ${negPr})`;

  const encoded = encodeURIComponent(fullPrompt);
  const url = `${POLLINATIONS_BASE}${encoded}?width=${w}&height=${h}&seed=${seed}&model=${MODEL}&nologo=true&enhance=true`;

  loadingMeta.textContent = `Generating ${w}×${h} · ${q.name} · ${style.label}`;
  animateLoadingBar();
  cycleLoadingText();

  try {
    await loadImage(url);
    currentImgUrl = url;
    showResult(url, prompt, style, q, w, h);
    addToGallery(url, prompt, style, q, w, h);
    showToast(`✦ ${q.name} image ready!`, 'success');
  } catch (err) {
    console.error(err);
    showEmptyState();
    showToast('Generation failed. Please try again.', 'error');
  } finally {
    isGenerating = false;
    setLoadingState(false);
  }
}

/* ── LOAD IMAGE ── */
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload  = () => resolve(url);
    img.onerror = () => reject(new Error('Image failed to load'));
    img.src = url;
    setTimeout(() => reject(new Error('Timeout')), 90000);
  });
}

/* ── STATE MANAGEMENT ── */
function setLoadingState(on) {
  genBtn.disabled = on;
  if (on) {
    genBtnText.classList.add('hidden');
    genBtnLoading.classList.remove('hidden');
    showPanel('loading');
  } else {
    genBtnText.classList.remove('hidden');
    genBtnLoading.classList.add('hidden');
  }
}

function showPanel(panel) {
  emptyState.classList.add('hidden');
  loadingState.classList.add('hidden');
  resultState.classList.add('hidden');
  document.getElementById(`${panel}-state`).classList.remove('hidden');
}

function showEmptyState() { showPanel('empty'); }

function showResult(url, prompt, style, q, w, h) {
  resultImg.src             = url;
  resultPromptTx.textContent = prompt;
  resultStyleChip.textContent = style.label;
  resultResChip.textContent   = `${q.name} · ${w}×${h}`;

  qualityBadgeOv.textContent  = `${q.icon} ${q.name} · ${w}×${h}`;
  qualityBadgeOv.className    = `quality-badge-overlay ${q.badgeClass}`;

  showPanel('result');
}

/* ── LOADING ANIMATION ── */
let loadingBarInt = null;
let loadingTxtInt = null;
let loadingProg   = 0;

function animateLoadingBar() {
  loadingProg = 0;
  loadingBar.style.width = '0%';
  clearInterval(loadingBarInt);
  loadingBarInt = setInterval(() => {
    const rem = 100 - loadingProg;
    loadingProg = Math.min(loadingProg + Math.random() * (rem * 0.07), 90);
    loadingBar.style.width = loadingProg + '%';
  }, 700);
}

function finishLoadingBar() {
  clearInterval(loadingBarInt);
  loadingBar.style.width = '100%';
}

function cycleLoadingText() {
  let i = 0;
  loadingText.textContent = LOADING_MSGS[0];
  clearInterval(loadingTxtInt);
  loadingTxtInt = setInterval(() => {
    i = (i + 1) % LOADING_MSGS.length;
    loadingText.textContent = LOADING_MSGS[i];
  }, 2800);
}

/* ── GALLERY ── */
function addToGallery(url, prompt, style, q, w, h) {
  finishLoadingBar();
  clearInterval(loadingTxtInt);

  const item = { url, prompt, style: style.label, quality: q.name, qualityIcon: q.icon, res: `${w}×${h}`, isBanana: q.isBanana, id: Date.now() };
  galleryHistory.unshift(item);
  const card = createGalleryCard(item);
  galleryGrid.insertBefore(card, galleryGrid.firstChild);
  updateGalleryVisibility();
}

function createGalleryCard(item) {
  const card = document.createElement('div');
  card.className = 'gallery-item';
  card.innerHTML = `
    <img src="${item.url}" alt="${escapeHtml(item.prompt)}" loading="lazy" />
    <div class="gallery-item-overlay">
      <div style="display:flex;gap:4px;flex-wrap:wrap">
        <span class="gallery-item-style">${escapeHtml(item.style)}</span>
        <span class="gallery-item-quality">${item.qualityIcon} ${escapeHtml(item.quality)}</span>
      </div>
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
  card.querySelector('.gallery-dl-btn').addEventListener('click', e => {
    e.stopPropagation();
    downloadImage(item.url, item.prompt);
  });
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
  galleryEmpty.classList.toggle('hidden', galleryHistory.length > 0);
}

/* ── DOWNLOAD ── */
async function downloadImage(url, prompt) {
  try {
    const res  = await fetch(url);
    const blob = await res.blob();
    const bUrl = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = bUrl;
    a.download = `imagix-${slugify(prompt).slice(0, 40)}-${Date.now()}.jpg`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(bUrl);
    showToast('⬇ Downloading HD image…', 'success');
  } catch {
    window.open(url, '_blank');
    showToast('Opening in new tab', 'success');
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
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
}

/* ── HELPERS ── */
function slugify(str) { return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function escapeHtml(str) { return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

/* ── BOOT ── */
document.addEventListener('DOMContentLoaded', init);
