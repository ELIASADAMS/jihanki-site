/* JIHANKI ARCHIVE + MEDIA RUNTIME */

const DAILY_NOTES = [
  ["2026-07-20","DEPARTURE / SHEREMETYEVO"],["2026-07-21","HANEDA / SHINJUKU / KAWAGUCHIKO"],["2026-07-22","FIRST JIHANKI"],["2026-07-23","MOTOSUKO / LANDSCAPE"],["2026-07-24","DREAMTONICS / MIKU"],["2026-07-25","ONSEN YURARI"],["2026-07-26","AOKIGAHARA / RYUGU CAVE"],["2026-07-29","KOYODAI LOOP"],["2026-07-31","GAKUPO BIRTHDAY"],["2026-08-01","FUJISAN"],["2026-08-02","HANABI"],["2026-08-03","AIRCRAFT MUSEUM"]
].map(([date,title])=>({id:`daily-${date}`,title,date,type:"text",category:"note",author:"archive",project:"japan-expedition",file:`documents/notes/daily/${date}.md`}));

const AOKIGAHARA_DOSSIER={id:"aokigahara-dossier",title:"AOKIGAHARA — PROCEDURAL AMBIENT PENTALOGY",date:"2026",type:"project",category:"project",author:"eli",project:"aokigahara",file:"projects/aokigahara/index.html"};

const ARCHIVE={
 videos:[{id:"eli-test-video",title:"DOCUMENTATION / JULIA BARANYUK",date:"2026",type:"video",category:"video",author:"julia",file:"media/video/eli.mp4"}],
 photos:[{id:"cover1",title:"COVER 01",date:"TEST",type:"image",category:"photo",author:"shared",file:"media/photo/cover1.png"}],
 notes:[...DAILY_NOTES,{id:"first-jihanki",title:"FIRST JIHANKI",date:"2026-07-22",type:"text",category:"note",author:"shared",file:"documents/notes/first-jihanki.md"},{id:"archive-rotation",title:"ARCHIVE ROTATION",date:"2026",type:"text",category:"note",author:"shared",file:"documents/notes/archive-rotation.md"},{id:"expedition-0722",title:"EXPEDITION 2026-07-22",date:"2026-07-22",type:"text",category:"note",author:"shared",file:"documents/notes/expedition-2026-07-22.md"}],
 yokai:[{id:"fuji-six-yokai",title:"富士山六体妖怪",date:"2026",type:"text",category:"yokai",author:"eli",project:"fuji-yokai",file:"documents/yokai/fuji-six-yokai.md"}],
 music:[
  {id:"moonlit-koto-curse",title:"Moonlit Koto Curse",date:"TEST",type:"audio",category:"music",author:"eli",file:"media/music/Moonlit%20Koto%20Curse.mp3"},
  {id:"fuji-sonicpi-01",title:"FUJI SONIC PI 01",date:"2026",type:"audio",category:"music",author:"eli",project:"aokigahara",file:"media/music/fuji-sonicpi-01.mp3"},
  {id:"fuji-sonicpi-02",title:"FUJI SONIC PI 02",date:"2026",type:"audio",category:"music",author:"eli",project:"aokigahara",file:"media/music/fuji-sonicpi-02.mp3"},
  {id:"fuji-sonicpi-03",title:"FUJI SONIC PI 03",date:"2026",type:"audio",category:"music",author:"eli",project:"aokigahara",file:"media/music/fuji-sonicpi-03.mp3"},
  {id:"fuji-sonicpi-04",title:"FUJI SONIC PI 04",date:"2026",type:"audio",category:"music",author:"eli",project:"aokigahara",file:"media/music/fuji-sonicpi-04.mp3"}
 ],
 sound:[{id:"hellyea",title:"HELLYEA",date:"TEST FIELD RECORDING",type:"audio",category:"sound",author:"shared",file:"media/sound/hellyea.wav"}],
 text:[{id:"fuji-six-yokai-script",title:"FUJI SIX YOKAI — SCRIPT",date:"2026",type:"text",category:"text",author:"eli",project:"fuji-yokai",file:"documents/scripts/fuji-six-yokai-script.md"}],
 projects:[AOKIGAHARA_DOSSIER],other:[]
};
window.ARCHIVE=ARCHIVE;window.JIHANKI_ARCHIVE=Object.values(ARCHIVE).flat();

const style=document.createElement("style");style.textContent=`
#artifact-body{min-width:0;overflow-wrap:anywhere}
#artifact-body audio.artifact-audio,#artifact-body video.artifact-video,#artifact-body .markdown-audio audio{display:block;width:100%;max-width:620px;margin:18px auto;padding:7px;border:1px solid rgba(255,255,255,.13);background:#050505;filter:grayscale(1) contrast(.9);border-radius:0;box-shadow:inset 0 0 18px rgba(255,255,255,.025),0 0 16px rgba(0,0,0,.65)}
#artifact-body audio.artifact-audio{height:48px}#artifact-body video.artifact-video{max-height:65vh;object-fit:contain}
#artifact-body .markdown-audio{margin:18px 0;padding:10px 12px;border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.025)}
#artifact-body .markdown-audio-label{font-size:10px;letter-spacing:.1em;color:#aaa;margin-bottom:7px}
#artifact-body audio::-webkit-media-controls-panel,#artifact-body video::-webkit-media-controls-panel{background:#111}
#artifact-body audio::-webkit-media-controls-current-time-display,#artifact-body audio::-webkit-media-controls-time-remaining-display{color:#aaa}
#artifact-body .artifact-media{display:block;max-width:100%;max-height:65vh;margin:16px auto;border:1px solid rgba(255,255,255,.12);filter:grayscale(.2) contrast(.95)}
#artifact-body .project-frame{display:block;width:100%;height:min(72vh,760px);border:1px solid rgba(255,255,255,.1);background:#050505}
.markdown-rendered{line-height:1.65;overflow-wrap:anywhere}.markdown-rendered h1,.markdown-rendered h2,.markdown-rendered h3{line-height:1.25}.markdown-rendered strong{font-weight:700}.markdown-rendered em{font-style:italic}.markdown-image{display:block;max-width:100%;max-height:65vh;margin:16px auto}.markdown-link{color:#ddd;text-decoration:underline}
`;document.head.appendChild(style);

function esc(v){return String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
function safeURL(v,base){if(/^(javascript|data):/i.test(v))return "#";try{return new URL(v,base).href}catch(_){return v}}
function mdInline(text,base){let s=esc(text),stash=[];const put=x=>{const k=`@@J${stash.length}@@`;stash.push(x);return k};s=s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,(_,a,p)=>put(`<img class="markdown-image" src="${esc(safeURL(p,base))}" alt="${esc(a)}">`));s=s.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(_,a,p)=>{const u=safeURL(p,base),ext=p.split("?")[0].toLowerCase();if(/\.(mp3|wav|ogg|m4a|aac|flac)$/.test(ext))return put(`<div class="markdown-audio"><div class="markdown-audio-label">${esc(a)}</div><audio controls preload="metadata" src="${esc(u)}"></audio></div>`);return put(`<a class="markdown-link" href="${esc(u)}" target="_blank" rel="noopener noreferrer">${a}</a>`)});s=s.replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*\n]+?)\*\*/g,"<strong>$1</strong>").replace(/__([^_\n]+?)__/g,"<strong>$1</strong>").replace(/\*([^*\n]+?)\*/g,"<em>$1</em>").replace(/_([^_\n]+?)_/g,"<em>$1</em>");return s.replace(/@@J(\d+)@@/g,(_,i)=>stash[+i])}
function mdRender(md,base){const lines=String(md).replace(/\r\n?/g,"\n").split("\n");let out="",para=[],list=null;const flush=()=>{if(para.length){out+=`<p>${mdInline(para.join(" "),base)}</p>`;para=[]}};const close=()=>{if(list)out+=`</${list}>`;list=null};for(const raw of lines){const l=raw.trim();if(!l){flush();close();continue}if(/^---+$/.test(l)){flush();close();out+="<hr>";continue}const h=l.match(/^(#{1,6})\s+(.*)$/);if(h){flush();close();out+=`<h${h[1].length}>${mdInline(h[2],base)}</h${h[1].length}>`;continue}const ul=l.match(/^[-*+]\s+(.*)$/),ol=l.match(/^\d+\.\s+(.*)$/);if(ul||ol){flush();const type=ul?"ul":"ol",item=(ul||ol)[1];if(list!==type){close();out+=`<${type}>`;list=type}out+=`<li>${mdInline(item,base)}</li>`;continue}close();para.push(l)}flush();close();return out}
function bindForegroundMedia(root){root.querySelectorAll("audio,video").forEach(el=>{el.addEventListener("play",()=>window.JIHANKI_AUDIO?.duck(true));el.addEventListener("pause",()=>window.JIHANKI_AUDIO?.duck(false));el.addEventListener("ended",()=>window.JIHANKI_AUDIO?.duck(false))})}

window.openItem=async function(item){
  if(!item)return;
  window.JIHANKI_AUDIO?.start();
  const artifact=document.getElementById("artifact"),content=document.getElementById("artifact-content");
  if(!artifact||!content)return;
  content.innerHTML=`<h1 class="artifact-title">${esc(item.title||"UNTITLED")}</h1><div class="artifact-meta">${[item.author,item.date,item.category||item.type].filter(Boolean).map(esc).join(" / ")}</div><div id="artifact-body">LOADING MEMORY...</div>`;
  artifact.classList.add("open");artifact.setAttribute("aria-hidden","false");
  const body=document.getElementById("artifact-body"),file=item.file||"",ext=file.split("?")[0].split(".").pop().toLowerCase(),type=String(item.type||item.category||"").toLowerCase();
  if(type==="project"){body.innerHTML=`<iframe class="project-frame" src="${esc(file)}" title="${esc(item.title)}"></iframe>`;return}
  if(type==="image"||type==="photo"||/^(png|jpe?g|webp|gif)$/.test(ext)){body.innerHTML=`<img class="artifact-media" src="${esc(file)}" alt="${esc(item.title)}">`;return}
  if(type==="audio"||type==="music"||type==="sound"||/^(mp3|wav|ogg|m4a|aac|flac)$/.test(ext)){body.innerHTML=`<audio class="artifact-audio" controls autoplay playsinline src="${esc(file)}"></audio>`;bindForegroundMedia(body);return}
  if(type==="video"||/^(mp4|webm|mov)$/.test(ext)){body.innerHTML=`<video class="artifact-video" controls autoplay playsinline src="${esc(file)}"></video>`;bindForegroundMedia(body);return}
  try{const r=await fetch(file,{cache:"no-cache"});if(!r.ok)throw new Error(`HTTP ${r.status}`);const base=new URL("./",new URL(file,location.href)).href;body.innerHTML=`<div class="artifact-text markdown-rendered">${mdRender(await r.text(),base)}</div>`;bindForegroundMedia(body)}catch(e){body.innerHTML=`<div class="artifact-text"><strong>MEMORY COULD NOT BE READ.</strong><br><br>${esc(file)}<br>${esc(e.message)}</div>`}
};

/* Ambient JIHANKI loop + UI SFX. AudioContext is started only after user interaction. */
(function(){
  const S={button:"media/sound/jihanki-sfx/button-sound.wav",coin:"media/sound/jihanki-sfx/entering-money.wav",home:"media/sound/jihanki-sfx/homebutton.wav",loop:"media/sound/jihanki-sfx/jihanki-music-loop.wav"};
  let c,b,g,src,loadP,started=false;
  const ac=()=>{if(!c){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;c=new C}return c};
  const load=()=>b?Promise.resolve(b):loadP||(loadP=fetch(S.loop,{cache:"force-cache"}).then(r=>{if(!r.ok)throw new Error("loop unavailable");return r.arrayBuffer()}).then(x=>ac().decodeAudioData(x)).then(x=>b=x).finally(()=>loadP=null));
  async function start(){const x=ac();if(!x)return;try{await x.resume();const y=await load();if(started)return;g=x.createGain();g.gain.value=.10;g.connect(x.destination);src=x.createBufferSource();src.buffer=y;src.loop=true;src.loopStart=0;src.loopEnd=y.duration;src.connect(g);src.start();started=true}catch(_){} }
  function duck(v){if(g&&c)g.gain.setTargetAtTime(v?0:.10,c.currentTime,.015)}
  function sfx(n){const a=new Audio(S[n]);a.volume=n==="coin"?.55:.4;a.play().catch(()=>{})}
  window.JIHANKI_AUDIO={start,duck,sfx};
})();

/*
  Runtime repair.
  index.html contains an older inline renderer. Its handlers would
  otherwise interpret project HTML as plain text and escape Markdown.
  We keep the existing machine CSS/coordinates untouched and replace
  only the interactive handlers after the archive data has loaded.
*/
(function(){
  function init(){
    const screen=document.getElementById("screen-content"),artifact=document.getElementById("artifact"),content=document.getElementById("artifact-content");
    if(!screen||!artifact||!content)return;
    artifact.classList.remove("open");artifact.setAttribute("aria-hidden","true");content.innerHTML="";
    const items=()=>window.JIHANKI_ARCHIVE||[];
    const categoryItems=cat=>items().filter(item=>{const c=String(item.category||item.type||"").toLowerCase();if(cat==="note")return c==="note"||c==="notes";if(cat==="yokai")return c==="yokai"||c==="妖怪";if(cat==="text")return c==="text"||c==="document";if(cat==="other")return !["video","photo","image","note","notes","yokai","妖怪","music","audio","sound","text","document","project"].includes(c);return c===cat});
    const showHome=()=>{screen.innerHTML=`<div class="boot"><div class="boot-japanese">自販機</div><div class="boot-title">JIHANKI</div><div class="boot-subtitle">MEMORY ARCHIVE</div><div class="boot-loading">SELECT A MEMORY</div></div>`};
    const showCategory=cat=>{const list=categoryItems(cat),title=cat==="yokai"?"妖怪":cat.toUpperCase();screen.innerHTML=`<div class="archive"><div class="archive-header"><span class="archive-title">${esc(title)}</span><span class="archive-status">${list.length} ITEMS</span></div>${list.length?list.map((item,i)=>`<button class="archive-item" data-archive-id="${esc(item.id||"")}" type="button">${String(i+1).padStart(2,"0")}&nbsp;&nbsp;${esc(item.title||"UNTITLED")}${item.date?`<small>${esc(item.date)}</small>`:""}</button>`).join(""):`<div class="archive-item">NO MEMORY RECORDED</div>`}</div>`};

    /* Cloning removes the old inline listeners without touching styling. */
    document.querySelectorAll(".product,#coin-button,#home-button,#memory-button,#artifact-close").forEach(old=>old.replaceWith(old.cloneNode(true)));
    document.querySelectorAll(".product").forEach(button=>button.addEventListener("click",()=>{window.JIHANKI_AUDIO?.start();window.JIHANKI_AUDIO?.sfx("button");showCategory(button.dataset.category)}));
    document.getElementById("coin-button")?.addEventListener("click",()=>{window.JIHANKI_AUDIO?.start();window.JIHANKI_AUDIO?.sfx("coin");screen.innerHTML=`<div class="boot"><div class="boot-title">COIN ACCEPTED</div><div class="boot-subtitle">MEMORY ACCESS ENABLED</div><div class="boot-loading">SELECT A MEMORY</div></div>`});
    document.getElementById("home-button")?.addEventListener("click",()=>{window.JIHANKI_AUDIO?.start();window.JIHANKI_AUDIO?.sfx("home");showHome()});
    document.getElementById("memory-button")?.addEventListener("click",()=>{window.JIHANKI_AUDIO?.start();window.JIHANKI_AUDIO?.sfx("button");const list=items();if(list.length)window.openItem(list[list.length-1])});
    document.getElementById("artifact-close")?.addEventListener("click",()=>{artifact.classList.remove("open");artifact.setAttribute("aria-hidden","true");content.querySelectorAll("audio,video").forEach(m=>{try{m.pause()}catch(_){}});window.JIHANKI_AUDIO?.duck(false);content.innerHTML=""});
    artifact.addEventListener("click",e=>{if(e.target===artifact)document.getElementById("artifact-close")?.click()});
    screen.addEventListener("click",e=>{const b=e.target.closest(".archive-item[data-archive-id]");if(!b)return;const item=items().find(x=>String(x.id)===String(b.dataset.archiveId));if(item)window.openItem(item)});
    showHome();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
