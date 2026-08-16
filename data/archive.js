/* JIHANKI ARCHIVE + MEDIA RUNTIME */

const DAILY_NOTES = [
    ["2026-07-20", "DEPARTURE / SHEREMETYEVO"],
    ["2026-07-21", "HANEDA / SHINJUKU / KAWAGUCHIKO"],
    ["2026-07-22", "FIRST JIHANKI"],
    ["2026-07-23", "MOTOSUKO / LANDSCAPE"],
    ["2026-07-24", "DREAMTONICS / MIKU"],
    ["2026-07-25", "ONSEN YURARI"],
    ["2026-07-26", "AOKIGAHARA / RYUGU CAVE"],
    ["2026-07-29", "KOYODAI LOOP"],
    ["2026-07-31", "GAKUPO BIRTHDAY"],
    ["2026-08-01", "FUJISAN"],
    ["2026-08-02", "HANABI"],
    ["2026-08-03", "AIRCRAFT MUSEUM"]
].map(([date, title]) => ({
    id: `daily-${date}`,
    title,
    date,
    type: "text",
    category: "note",
    author: "archive",
    project: "japan-expedition",
    file: `documents/notes/daily/${date}.md`
}));

const ARCHIVE = {
    videos: [{ id:"eli-test-video", title:"DOCUMENTATION / JULIA BARANYUK", date:"2026", type:"video", category:"video", author:"julia", file:"media/video/eli.mp4" }],
    photos: [{ id:"cover1", title:"COVER 01", date:"TEST", type:"image", category:"photo", author:"shared", file:"media/photo/cover1.png" }],
    notes: [
        ...DAILY_NOTES,
        { id:"first-jihanki", title:"FIRST JIHANKI", date:"2026-07-22", type:"text", category:"note", author:"shared", file:"documents/notes/first-jihanki.md" },
        { id:"archive-rotation", title:"ARCHIVE ROTATION", date:"2026", type:"text", category:"note", author:"shared", file:"documents/notes/archive-rotation.md" },
        { id:"expedition-0722", title:"EXPEDITION 2026-07-22", date:"2026-07-22", type:"text", category:"note", author:"shared", file:"documents/notes/expedition-2026-07-22.md" }
    ],
    yokai: [{ id:"fuji-six-yokai", title:"富士山六体妖怪", date:"2026", type:"text", category:"yokai", author:"eli", project:"fuji-yokai", file:"documents/yokai/fuji-six-yokai.md" }],
    music: [{ id:"moonlit-koto-curse", title:"Moonlit Koto Curse", date:"TEST", type:"audio", category:"music", author:"eli", file:"media/music/Moonlit%20Koto%20Curse.mp3" }],
    sound: [{ id:"hellyea", title:"HELLYEA", date:"TEST FIELD RECORDING", type:"audio", category:"sound", author:"shared", file:"media/sound/hellyea.wav" }],
    text: [{ id:"fuji-six-yokai-script", title:"FUJI SIX YOKAI — SCRIPT", date:"2026", type:"text", category:"text", author:"eli", project:"fuji-yokai", file:"documents/scripts/fuji-six-yokai-script.md" }],
    projects: [{ id:"fuji-sonicpi", title:"エリ・ミニン / 青木ヶ原", date:"2026", type:"text", category:"project", author:"eli", project:"fuji-sonicpi", file:"documents/projects/fuji-sonicpi.md" }],
    other: []
};

const JIHANKI_ARCHIVE = Object.values(ARCHIVE).flat();
window.ARCHIVE = ARCHIVE;
window.JIHANKI_ARCHIVE = JIHANKI_ARCHIVE;

const archiveStyle = document.createElement("style");
archiveStyle.textContent = `
#screen-content .archive{height:100%;max-height:100%;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.38) rgba(255,255,255,.04);padding-right:7px}
#screen-content .archive::-webkit-scrollbar{width:5px;display:block}
#screen-content .archive::-webkit-scrollbar-track{background:rgba(255,255,255,.035)}
#screen-content .archive::-webkit-scrollbar-thumb{background:rgba(255,255,255,.34);border-radius:0}
#screen-content .archive-item{touch-action:manipulation}
#artifact-body,#artifact-content{min-height:0}
.markdown-rendered{overflow-wrap:anywhere}
.markdown-rendered strong{font-weight:700}.markdown-rendered em{font-style:italic}.markdown-rendered p{margin:0 0 14px}
.markdown-rendered h1,.markdown-rendered h2,.markdown-rendered h3{margin:18px 0 9px;line-height:1.25}
.markdown-rendered ul,.markdown-rendered ol{padding-left:22px;margin:0 0 14px}.markdown-rendered li{margin:4px 0}
.markdown-rendered hr{border:0;border-top:1px solid rgba(255,255,255,.12);margin:18px 0}
.markdown-image{display:block;max-width:100%;max-height:300px;object-fit:contain;margin:0 0 16px}.markdown-audio{margin:10px 0 18px}.markdown-audio-label{margin-bottom:6px}.markdown-audio audio{width:100%}.markdown-link{color:inherit;text-decoration:underline}
`;
document.head.appendChild(archiveStyle);

(function installRuntime(){
    const SOUND={button:"media/sound/jihanki-sfx/button-sound.wav",coin:"media/sound/jihanki-sfx/entering-money.wav",home:"media/sound/jihanki-sfx/homebutton.wav",loop:"media/sound/jihanki-sfx/jihanki-music-loop.wav"};
    let ctx=null,buffer=null,source=null,gain=null,loading=null,started=false,muted=false,foreground=null,lastSFX=0;

    function audioContext(){if(!ctx){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;ctx=new C()}return ctx}
    async function loadLoop(){if(buffer)return buffer;if(loading)return loading;loading=fetch(SOUND.loop,{cache:"force-cache"}).then(r=>{if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.arrayBuffer()}).then(b=>audioContext().decodeAudioData(b)).then(b=>{buffer=b;return b}).finally(()=>{loading=null});return loading}
    async function startLoop(){const c=audioContext();if(!c)return;try{await c.resume();const b=await loadLoop();if(started)return;gain=c.createGain();gain.gain.value=muted?0:.10;gain.connect(c.destination);source=c.createBufferSource();source.buffer=b;source.loop=true;source.loopStart=0;source.loopEnd=b.duration;source.connect(gain);source.start(0);started=true}catch(_){} }
    function muteAmbient(value){muted=value;if(gain&&ctx)gain.gain.setTargetAtTime(value?0:.10,ctx.currentTime,.015)}
    function sfx(name){const now=Date.now();if(now-lastSFX<45)return;lastSFX=now;const a=new Audio(SOUND[name]);a.volume=name==="coin"?.55:.40;a.play().catch(()=>{})}
    function stopForeground(){if(foreground){try{foreground.pause()}catch(_){}foreground=null}muteAmbient(false)}
    function escapeHTML(v){return String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
    function safeURL(path,base){const raw=String(path||"").trim();if(/^(javascript|data):/i.test(raw))return "#";try{return new URL(raw,base).href}catch(_){return raw}}

    function inlineMD(text,base){
        let s=escapeHTML(text),tokens=[];const token=x=>{const id=`@@JIHIKI${tokens.length}@@`;tokens.push(x);return id};
        s=s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,(_,alt,p)=>token(`<img class="markdown-image" src="${escapeHTML(safeURL(p,base))}" alt="${escapeHTML(alt)}">`));
        s=s.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(_,label,p)=>{const href=safeURL(p,base),lower=p.split("?")[0].toLowerCase();if(/\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(lower))return token(`<div class="markdown-audio"><div class="markdown-audio-label">${label}</div><audio controls preload="metadata" src="${escapeHTML(href)}"></audio></div>`);return token(`<a class="markdown-link" href="${escapeHTML(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`)})
        s=s.replace(/`([^`]+)`/g,(_,x)=>token(`<code>${x}</code>`));s=s.replace(/\*\*([^*\n]+?)\*\*/g,"<strong>$1</strong>");s=s.replace(/__([^_\n]+?)__/g,"<strong>$1</strong>");s=s.replace(/\*([^*\n]+?)\*/g,"<em>$1</em>");s=s.replace(/_([^_\n]+?)_/g,"<em>$1</em>");return s.replace(/@@JIHIKI(\d+)@@/g,(_,i)=>tokens[Number(i)])
    }

    function markdownToHTML(markdown,base){
        const lines=String(markdown).replace(/\r\n?/g,"\n").split("\n");let html="",paragraph=[],list=null;
        const flush=()=>{if(paragraph.length){html+=`<p>${inlineMD(paragraph.join(" "),base)}</p>`;paragraph=[]}};const close=()=>{if(list)html+=`</${list}>`;list=null};
        for(const raw of lines){const line=raw.trim();if(!line){flush();close();continue}if(/^---+$/.test(line)){flush();close();html+="<hr>";continue}const h=line.match(/^(#{1,6})\s+(.*)$/);if(h){flush();close();const n=h[1].length;html+=`<h${n}>${inlineMD(h[2],base)}</h${n}>`;continue}const u=line.match(/^[-*+]\s+(.*)$/);if(u){flush();if(list!=="ul"){close();html+="<ul>";list="ul"}html+=`<li>${inlineMD(u[1],base)}</li>`;continue}const o=line.match(/^\d+\.\s+(.*)$/);if(o){flush();if(list!=="ol"){close();html+="<ol>";list="ol"}html+=`<li>${inlineMD(o[1],base)}</li>`;continue}close();paragraph.push(line)}flush();close();return html
    }

    function bindAudio(){document.querySelectorAll("#artifact-body audio").forEach(a=>{a.addEventListener("play",()=>{foreground=a;muteAmbient(true)});a.addEventListener("pause",()=>{if(foreground===a)muteAmbient(false)});a.addEventListener("ended",()=>{if(foreground===a){foreground=null;muteAmbient(false)}})})}
    async function openMarkdown(item,body){try{const r=await fetch(item.file,{cache:"no-cache"});if(!r.ok)throw new Error(`HTTP ${r.status}`);const md=await r.text(),doc=new URL(item.file,location.href),base=new URL("./",doc).href;body.innerHTML=`<div class="artifact-text markdown-rendered">${markdownToHTML(md,base)}</div>`;bindAudio()}catch(e){body.innerHTML=`<div class="artifact-text"><strong>MEMORY COULD NOT BE READ.</strong><br><br>${escapeHTML(item.file)}<br>${escapeHTML(e.message)}</div>`}}

    window.openItem=async function(item){
        if(!item)return;sfx("button");stopForeground();startLoop();const artifact=document.getElementById("artifact"),content=document.getElementById("artifact-content");if(!artifact||!content)return;
        const title=escapeHTML(item.title||"UNTITLED"),meta=[item.author,item.date,item.category||item.type].filter(Boolean).map(escapeHTML).join(" / ");content.innerHTML=`<h1 class="artifact-title">${title}</h1><div class="artifact-meta">${meta}</div><div id="artifact-body">LOADING MEMORY...</div>`;artifact.classList.add("open");artifact.setAttribute("aria-hidden","false");
        const body=document.getElementById("artifact-body"),type=String(item.type||item.category||"").toLowerCase(),file=item.file||"",ext=file.split("?")[0].split(".").pop().toLowerCase();
        if(type==="image"||type==="photo"||/^(png|jpe?g|webp|gif)$/.test(ext)){body.innerHTML=`<img class="artifact-media" src="${escapeHTML(file)}" alt="${title}">`;return}
        if(type==="audio"||type==="music"||type==="sound"||/^(mp3|wav|ogg|m4a|aac|flac)$/.test(ext)){body.innerHTML=`<audio class="artifact-audio" controls autoplay playsinline src="${escapeHTML(file)}"></audio>`;foreground=body.querySelector("audio");muteAmbient(true);foreground.addEventListener("play",()=>muteAmbient(true));foreground.addEventListener("pause",()=>muteAmbient(false));foreground.addEventListener("ended",()=>{foreground=null;muteAmbient(false)});return}
        if(type==="video"||/^(mp4|webm|mov)$/.test(ext)){body.innerHTML=`<video class="artifact-video" controls autoplay playsinline src="${escapeHTML(file)}"></video>`;foreground=body.querySelector("video");muteAmbient(true);foreground.addEventListener("play",()=>muteAmbient(true));foreground.addEventListener("pause",()=>muteAmbient(false));foreground.addEventListener("ended",()=>{foreground=null;muteAmbient(false)});return}
        await openMarkdown(item,body)
    };

    document.addEventListener("pointerdown",e=>{startLoop();const b=e.target.closest&&e.target.closest("button");if(!b)return;if(b.id==="coin-button")sfx("coin");else if(b.id==="home-button")sfx("home");else sfx("button")},{passive:true});
    document.addEventListener("keydown",()=>startLoop(),{passive:true});
    window.JIHANKI_AUDIO={start:startLoop,mute:()=>muteAmbient(true),unmute:()=>muteAmbient(false)};
})();