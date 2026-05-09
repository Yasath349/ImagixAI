/* ─── RESET & VARIABLES ─────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:          #050508;
  --bg2:         #0c0c14;
  --bg3:         #0a0a12;
  --surface:     rgba(255,255,255,0.04);
  --surface2:    rgba(255,255,255,0.07);
  --surface3:    rgba(255,255,255,0.10);
  --border:      rgba(255,255,255,0.08);
  --border2:     rgba(160,100,255,0.35);

  --purple:      #a855f7;
  --purple-dim:  #7c3aed;
  --purple-glow: rgba(168,85,247,0.4);
  --pink:        #f472b6;
  --cyan:        #22d3ee;
  --gold:        #fbbf24;
  --green:       #4ade80;
  --banana:      #facc15;

  --text:        #f0eeff;
  --text-dim:    #8b85a8;
  --text-dimmer: #504a6e;

  --radius-sm:   8px;
  --radius-md:   14px;
  --radius-lg:   20px;
  --radius-xl:   28px;
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Space Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ─── BACKGROUND ────────────────────────────────────── */
.bg-grid {
  position: fixed; inset: 0; z-index: 0;
  background-image:
    linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
}
.orb { position: fixed; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; }
.orb-1 { width: 600px; height: 600px; top: -200px; right: -150px; background: radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%); }
.orb-2 { width: 450px; height: 450px; bottom: -120px; left: -120px; background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%); }
.orb-3 { width: 350px; height: 350px; top: 45%; left: 35%; background: radial-gradient(circle, rgba(250,204,21,0.06) 0%, transparent 70%); }

/* ─── TOAST ─────────────────────────────────────────── */
.toast {
  position: fixed; bottom: 32px; left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: rgba(15,10,35,0.97);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border2);
  color: var(--text); padding: 12px 24px;
  border-radius: 100px; font-size: 13px;
  opacity: 0; transition: all 0.3s; z-index: 9999;
  white-space: nowrap; pointer-events: none;
  box-shadow: 0 0 30px rgba(168,85,247,0.2), 0 8px 32px rgba(0,0,0,0.6);
}
.toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
.toast.success { border-color: rgba(74,222,128,0.35); }
.toast.error   { border-color: rgba(248,113,113,0.4); }

/* ─── HEADER ────────────────────────────────────────── */
.header {
  position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center; gap: 20px;
  padding: 14px 40px;
  background: rgba(5,5,8,0.88);
  backdrop-filter: blur(28px);
  border-bottom: 1px solid var(--border);
}
.logo { display: flex; align-items: center; gap: 10px; }
.logo-icon { font-size: 22px; color: var(--purple); filter: drop-shadow(0 0 10px var(--purple)); }
.logo-text { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
.logo-ai { color: var(--purple); }

.nav-pills { display: flex; gap: 4px; margin-left: auto; }
.nav-pill {
  padding: 6px 16px; border-radius: 100px;
  font-size: 12px; letter-spacing: 0.05em; cursor: pointer;
  transition: all 0.2s; color: var(--text-dim);
  border: none; background: none; font-family: 'Space Mono', monospace;
}
.nav-pill:hover { color: var(--text); background: var(--surface2); }
.nav-pill.active { background: var(--purple); color: #fff; box-shadow: 0 0 20px var(--purple-glow); }

.header-right { display: flex; align-items: center; gap: 10px; }

.model-tag {
  display: flex; align-items: center; gap: 6px;
  padding: 5px 12px;
  background: rgba(250,204,21,0.08);
  border: 1px solid rgba(250,204,21,0.25);
  border-radius: 100px; font-size: 11px;
  color: var(--banana); letter-spacing: 0.05em;
}
.header-badge {
  display: flex; align-items: center; gap: 6px;
  font-size: 11px; color: var(--text-dim);
  padding: 5px 12px;
  border: 1px solid var(--border);
  border-radius: 100px;
}
.pulse-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--green); box-shadow: 0 0 8px var(--green);
  animation: pdot 2s infinite;
}
@keyframes pdot { 0%,100%{opacity:1} 50%{opacity:.4} }

/* ─── HERO ───────────────────────────────────────────── */
.hero {
  position: relative; z-index: 1;
  text-align: center;
  padding: 72px 24px 44px;
}
.hero-tag {
  font-size: 10px; letter-spacing: 0.22em;
  color: var(--purple); margin-bottom: 20px;
}
.hero-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(34px, 5.5vw, 68px);
  font-weight: 800; line-height: 1.06;
  letter-spacing: -2px; margin-bottom: 20px;
}
.hero-title em {
  font-style: normal;
  background: linear-gradient(135deg, var(--banana) 0%, var(--purple) 50%, var(--pink) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.hero-sub { font-size: 15px; color: var(--text-dim); max-width: 520px; margin: 0 auto 24px; }
.hero-pills { display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; }
.hpill {
  padding: 6px 16px; border-radius: 100px;
  border: 1px solid var(--border);
  background: var(--surface); color: var(--text-dim);
  font-size: 12px; letter-spacing: 0.05em;
}
.hpill.banana {
  border-color: rgba(250,204,21,0.3);
  background: rgba(250,204,21,0.06);
  color: var(--banana);
}

/* ─── GENERATOR LAYOUT ──────────────────────────────── */
.generator-wrap {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
  max-width: 1280px; margin: 0 auto 80px; padding: 0 24px;
}

/* ─── GEN CARD ──────────────────────────────────────── */
.gen-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 32px;
  backdrop-filter: blur(20px);
  display: flex; flex-direction: column; gap: 26px;
}
.gen-card:focus-within { border-color: rgba(168,85,247,0.28); }

.field-label {
  display: block; font-size: 10px; font-weight: 700;
  letter-spacing: 0.15em; color: var(--text-dimmer); margin-bottom: 10px;
}
.field-label-note { font-weight: 400; color: var(--text-dimmer); text-transform: none; letter-spacing: 0; font-size: 10px; }
.optional { font-weight: 400; color: var(--text-dimmer); }

/* PROMPT */
.prompt-box {
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: var(--radius-md); transition: border-color 0.2s, box-shadow 0.2s;
}
.prompt-box:focus-within {
  border-color: var(--purple-dim);
  box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
}
textarea {
  width: 100%; background: transparent; border: none; outline: none;
  color: var(--text); font-family: 'Space Mono', monospace;
  font-size: 13px; line-height: 1.7; padding: 16px; resize: none;
}
textarea::placeholder { color: var(--text-dimmer); }
.prompt-actions {
  display: flex; gap: 4px; padding: 8px 10px;
  border-top: 1px solid var(--border); justify-content: flex-end;
}
.icon-btn {
  display: flex; align-items: center; gap: 5px;
  background: none; border: none; cursor: pointer;
  color: var(--text-dimmer); padding: 5px 10px;
  border-radius: var(--radius-sm); font-size: 11px;
  font-family: 'Space Mono', monospace; transition: all 0.15s;
}
.icon-btn svg { width: 13px; height: 13px; }
.icon-btn:hover { color: var(--text); background: var(--surface2); }

.chips-label { font-size: 10px; color: var(--text-dimmer); margin: 10px 0 7px; letter-spacing: 0.05em; }
.chips { display: flex; flex-wrap: wrap; gap: 7px; }
.chip {
  padding: 5px 12px; background: var(--surface2);
  border: 1px solid var(--border); border-radius: 100px;
  font-size: 11px; color: var(--text-dim); cursor: pointer;
  transition: all 0.15s; font-family: 'Space Mono', monospace;
}
.chip:hover { border-color: var(--border2); color: var(--purple); background: rgba(168,85,247,0.08); }

/* ─── QUALITY SELECTOR ──────────────────────────────── */
.quality-grid {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px;
  margin-bottom: 10px;
}
.quality-btn {
  display: flex; flex-direction: column; align-items: center;
  gap: 4px; padding: 10px 6px;
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: var(--radius-md); cursor: pointer;
  transition: all 0.2s; position: relative; overflow: hidden;
}
.quality-btn::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, transparent, rgba(168,85,247,0.05));
  opacity: 0; transition: opacity 0.2s;
}
.quality-btn:hover::before { opacity: 1; }
.quality-btn:hover { border-color: var(--border2); transform: translateY(-2px); }
.quality-btn.active {
  border-color: var(--purple);
  background: rgba(168,85,247,0.1);
  box-shadow: 0 0 20px rgba(168,85,247,0.25);
}
.quality-btn.active .q-icon { filter: drop-shadow(0 0 6px var(--purple)); }
.quality-btn.active .q-name { color: var(--purple); }
.quality-btn.ultra-4k {
  border-color: rgba(250,204,21,0.3);
  background: rgba(250,204,21,0.04);
}
.quality-btn.ultra-4k:hover { border-color: rgba(250,204,21,0.6); }
.quality-btn.ultra-4k.active {
  border-color: var(--banana);
  background: rgba(250,204,21,0.1);
  box-shadow: 0 0 24px rgba(250,204,21,0.3);
}
.quality-btn.ultra-4k.active .q-name { color: var(--banana); }
.q-icon { font-size: 18px; line-height: 1; }
.q-name { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; color: var(--text-dim); letter-spacing: 0.05em; }
.q-res  { font-size: 9px; color: var(--text-dimmer); font-family: 'Space Mono', monospace; }
.q-badge {
  position: absolute; top: 4px; right: 4px;
  font-size: 7px; padding: 1px 5px;
  background: rgba(250,204,21,0.15); color: var(--banana);
  border: 1px solid rgba(250,204,21,0.3); border-radius: 100px;
  font-family: 'Space Mono', monospace; letter-spacing: 0.05em;
}

.quality-desc-bar {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px;
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: var(--radius-sm); font-size: 11px;
  color: var(--text-dim); transition: border-color 0.2s;
  min-height: 40px;
}
.quality-desc-bar.active-banana { border-color: rgba(250,204,21,0.25); }
.quality-desc-bar.active-purple { border-color: rgba(168,85,247,0.25); }

/* ─── CONTROLS ──────────────────────────────────────── */
.controls-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.control-group { display: flex; flex-direction: column; }
.control-group.full-width { grid-column: 1 / -1; }
.style-grid, .ratio-grid { display: flex; flex-wrap: wrap; gap: 6px; }
.style-btn, .ratio-btn {
  padding: 6px 12px; background: var(--surface2);
  border: 1px solid var(--border); border-radius: var(--radius-sm);
  color: var(--text-dim); font-family: 'Space Mono', monospace;
  font-size: 11px; cursor: pointer; transition: all 0.15s;
}
.style-btn:hover, .ratio-btn:hover { border-color: var(--border2); color: var(--text); }
.style-btn.active, .ratio-btn.active {
  background: rgba(168,85,247,0.15); border-color: var(--purple);
  color: var(--purple); box-shadow: 0 0 12px rgba(168,85,247,0.2);
}
.neg-input {
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: var(--radius-md); color: var(--text);
  padding: 12px 16px; font-family: 'Space Mono', monospace;
  font-size: 12px; outline: none; width: 100%; transition: border-color 0.2s, box-shadow 0.2s;
}
.neg-input::placeholder { color: var(--text-dimmer); }
.neg-input:focus { border-color: var(--purple-dim); box-shadow: 0 0 0 3px rgba(124,58,237,0.15); }

/* ─── META BAR ──────────────────────────────────────── */
.meta-bar {
  display: flex; align-items: center; gap: 14px;
  padding: 12px 16px;
  background: var(--bg3); border: 1px solid var(--border);
  border-radius: var(--radius-md); flex-wrap: wrap;
}
.meta-item { display: flex; flex-direction: column; gap: 2px; }
.meta-label { font-size: 8px; letter-spacing: 0.15em; color: var(--text-dimmer); }
.meta-val { font-size: 11px; color: var(--text-dim); }
.meta-val.meta-purple { color: var(--purple); }
.meta-val.meta-green { color: var(--green); }
.meta-sep { color: var(--text-dimmer); font-size: 16px; line-height: 1; }

/* ─── GENERATE BUTTON ───────────────────────────────── */
.gen-btn {
  width: 100%; padding: 17px;
  background: linear-gradient(135deg, var(--purple-dim), var(--purple));
  border: none; border-radius: var(--radius-md);
  color: #fff; font-family: 'Syne', sans-serif;
  font-size: 15px; font-weight: 700; letter-spacing: 0.05em;
  cursor: pointer; position: relative; overflow: hidden;
  transition: all 0.2s; box-shadow: 0 4px 28px rgba(124,58,237,0.45);
}
.gen-btn::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
  opacity: 0; transition: opacity 0.2s;
}
.gen-btn:hover::before { opacity: 1; }
.gen-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 36px rgba(124,58,237,0.55); }
.gen-btn:active { transform: translateY(0); }
.gen-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.gen-btn-text, .gen-btn-loading {
  display: flex; align-items: center; justify-content: center; gap: 10px;
}
.btn-icon { width: 18px; height: 18px; }
.hidden { display: none !important; }
.spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
  border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ─── OUTPUT PANEL ──────────────────────────────────── */
.output-panel {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-xl); backdrop-filter: blur(20px);
  overflow: hidden; display: flex; align-items: center;
  justify-content: center; min-height: 560px; position: relative;
}

.empty-state {
  display: flex; flex-direction: column; align-items: center;
  gap: 12px; padding: 40px; text-align: center; color: var(--text-dimmer);
}
.empty-banana { font-size: 52px; animation: bob 3s ease-in-out infinite; }
@keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
.empty-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; color: var(--text-dim); }
.empty-sub { font-size: 12px; }
.empty-pills {
  padding: 6px 16px; border-radius: 100px;
  border: 1px solid rgba(250,204,21,0.25);
  background: rgba(250,204,21,0.05);
  color: var(--banana); font-size: 11px; margin-top: 4px;
}

.loading-state {
  display: flex; flex-direction: column; align-items: center;
  gap: 16px; padding: 40px; text-align: center;
}
.loading-visual { position: relative; width: 100px; height: 100px; }
.loading-ring {
  position: absolute; inset: 0; border-radius: 50%;
  border: 2px solid transparent; border-top-color: var(--purple);
  animation: spin 1.4s linear infinite;
}
.loading-ring.r2 { inset:12px; border-top-color:var(--pink); animation-duration:1s; animation-direction:reverse; }
.loading-ring.r3 { inset:24px; border-top-color:var(--cyan); animation-duration:.8s; }
.loading-core {
  position: absolute; inset: 0; display: flex; align-items: center;
  justify-content: center; font-size: 24px;
  animation: pcr 2s infinite;
}
@keyframes pcr { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.7;transform:scale(0.9)} }
.loading-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: var(--text-dim); }
.loading-text { font-size: 11px; color: var(--text-dimmer); letter-spacing: 0.1em; }
.loading-bar-wrap { width: 200px; height: 3px; background: var(--surface2); border-radius: 100px; overflow: hidden; }
.loading-bar {
  height: 100%; width: 0%; border-radius: 100px;
  background: linear-gradient(90deg, var(--banana), var(--purple), var(--pink));
  transition: width 0.4s ease; box-shadow: 0 0 10px var(--purple);
}
.loading-meta { font-size: 10px; color: var(--text-dimmer); letter-spacing: 0.08em; }

.result-state { display: flex; flex-direction: column; width: 100%; height: 100%; }
.img-wrap { position: relative; flex: 1; overflow: hidden; min-height: 380px; }
#result-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s; }
.quality-badge-overlay {
  position: absolute; top: 12px; left: 12px;
  padding: 4px 12px; border-radius: 100px;
  font-size: 10px; font-family: 'Space Mono', monospace;
  letter-spacing: 0.08em; backdrop-filter: blur(10px);
  border: 1px solid transparent;
}
.quality-badge-overlay.qb-banana { background: rgba(250,204,21,0.2); border-color: rgba(250,204,21,0.4); color: var(--banana); }
.quality-badge-overlay.qb-purple { background: rgba(168,85,247,0.2); border-color: rgba(168,85,247,0.4); color: var(--purple); }

.img-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(5,5,8,0.9) 0%, transparent 55%);
  display: flex; align-items: flex-end; padding: 20px; gap: 10px;
  opacity: 0; transition: opacity 0.25s;
}
.img-wrap:hover .img-overlay { opacity: 1; }
.img-wrap:hover #result-img { transform: scale(1.02); }

.overlay-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 18px; background: rgba(168,85,247,0.9);
  border: none; border-radius: var(--radius-md); color: #fff;
  font-family: 'Space Mono', monospace; font-size: 12px;
  cursor: pointer; backdrop-filter: blur(10px); transition: all 0.15s;
}
.overlay-btn:hover { background: var(--purple); transform: translateY(-2px); }
.overlay-btn.secondary { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); }
.overlay-btn.secondary:hover { background: rgba(255,255,255,0.2); }
.overlay-btn svg { width: 14px; height: 14px; }

.result-meta {
  padding: 16px 20px; border-top: 1px solid var(--border);
  background: rgba(5,5,8,0.7);
}
.result-prompt-label { font-size: 9px; letter-spacing: 0.15em; color: var(--text-dimmer); }
.result-prompt-text {
  font-size: 12px; color: var(--text-dim); margin: 4px 0 8px; line-height: 1.5;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.result-chips-row { display: flex; gap: 6px; flex-wrap: wrap; }
.result-chip {
  display: inline-block; padding: 3px 10px;
  background: rgba(168,85,247,0.15); border: 1px solid rgba(168,85,247,0.3);
  border-radius: 100px; font-size: 10px; color: var(--purple); letter-spacing: 0.05em;
}
.result-chip.chip-res {
  background: rgba(250,204,21,0.1); border-color: rgba(250,204,21,0.3); color: var(--banana);
}

/* ─── GALLERY ────────────────────────────────────────── */
.gallery-section {
  position: relative; z-index: 1;
  max-width: 1280px; margin: 0 auto 80px; padding: 0 24px;
}
.gallery-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
.gallery-title { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
.clear-gallery-btn {
  background: none; border: 1px solid var(--border); color: var(--text-dimmer);
  padding: 6px 14px; border-radius: 100px; font-family: 'Space Mono', monospace;
  font-size: 11px; cursor: pointer; transition: all 0.15s;
}
.clear-gallery-btn:hover { border-color: rgba(248,113,113,0.4); color: #f87171; }
.gallery-empty { text-align: center; padding: 48px; color: var(--text-dimmer); font-size: 13px; }
.gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
.gallery-item {
  position: relative; border-radius: var(--radius-md); overflow: hidden;
  cursor: pointer; background: var(--surface); border: 1px solid var(--border);
  transition: all 0.25s; animation: fadeUp 0.4s ease both;
}
@keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
.gallery-item:hover { transform: translateY(-5px); border-color: var(--border2); box-shadow: 0 0 24px rgba(168,85,247,0.2); }
.gallery-item img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; }
.gallery-item-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(5,5,8,0.92) 0%, transparent 50%);
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: 12px; gap: 5px; opacity: 0; transition: opacity 0.2s;
}
.gallery-item:hover .gallery-item-overlay { opacity: 1; }
.gallery-item-prompt { font-size: 10px; color: rgba(255,255,255,0.75); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.gallery-item-style { display: inline-block; padding: 2px 8px; background: rgba(168,85,247,0.3); border-radius: 100px; font-size: 9px; color: var(--purple); width: fit-content; }
.gallery-item-quality { display: inline-block; padding: 2px 8px; background: rgba(250,204,21,0.2); border-radius: 100px; font-size: 9px; color: var(--banana); width: fit-content; }
.gallery-dl-btn {
  position: absolute; top: 8px; right: 8px;
  background: rgba(5,5,8,0.75); border: 1px solid var(--border);
  border-radius: var(--radius-sm); padding: 6px;
  color: var(--text-dim); cursor: pointer;
  opacity: 0; transition: all 0.2s; display: flex; align-items: center;
}
.gallery-item:hover .gallery-dl-btn { opacity: 1; }
.gallery-dl-btn:hover { background: var(--purple); color: #fff; border-color: var(--purple); }
.gallery-dl-btn svg { width: 12px; height: 12px; }

/* ─── FOOTER ─────────────────────────────────────────── */
.footer {
  position: relative; z-index: 1;
  display: flex; align-items: center; justify-content: space-between;
  padding: 24px 40px; border-top: 1px solid var(--border);
  color: var(--text-dimmer); font-size: 11px; letter-spacing: 0.05em;
}

/* ─── RESPONSIVE ─────────────────────────────────────── */
@media (max-width: 960px) {
  .generator-wrap { grid-template-columns: 1fr; }
  .output-panel { min-height: 380px; }
  .quality-grid { grid-template-columns: repeat(5, 1fr); }
}
@media (max-width: 680px) {
  .header { padding: 12px 16px; }
  .hero { padding: 48px 16px 32px; }
  .generator-wrap { padding: 0 16px; }
  .gen-card { padding: 20px; gap: 20px; }
  .controls-row { grid-template-columns: 1fr; }
  .quality-grid { grid-template-columns: repeat(3, 1fr); }
  .meta-bar { gap: 10px; }
  .meta-sep { display: none; }
  .model-tag { display: none; }
  .header-badge { display: none; }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }
  .footer { flex-direction: column; gap: 8px; text-align: center; padding: 20px 16px; }
}
