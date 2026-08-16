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
].map(([date, title]) => ({ id:`daily-${date}`, title, date, type:"text", category:"note", author:"archive", project:"japan-expedition", file:`documents/notes/daily/${date}.md` }));

const AOKIGAHARA_DOSSIER = {
    id:"aokigahara-dossier",
    title:"AOKIGAHARA — PROCEDURAL AMBIENT PENTALOGY",
    date:"2026",
    type:"project",
    category:"project",
    author:"eli",
    project:"aokigahara",
    file:"projects/aokigahara/index.html"
};

const ARCHIVE = {
    videos:[{ id:"eli-test-video", title:"DOCUMENTATION / JULIA BARANYUK", date:"2026", type:"video", category:"video", author:"julia", file:"media/video/eli.mp4" }],
    photos:[{ id:"cover1", title:"COVER 01", date:"TEST", type:"image", category:"photo", author:"shared", file:"media/photo/cover1.png" }],
    notes:[
        ...DAILY_NOTES,
        { id:"first-jihanki", title:"FIRST JIHANKI", date:"2026-07-22", type:"text", category:"note", author:"shared", file:"documents/notes/first-jihanki.md" },
        { id:"archive-rotation", title:"ARCHIVE ROTATION", date:"2026", type:"text", category:"note", author:"shared", file:"documents/notes/archive-rotation.md" },
        { id:"expedition-0722", title:"EXPEDITION 2026-07-22", date:"2026-07-22", type:"text", category:"note", author:"shared", file:"documents/notes/expedition-2026-07-22.md" }
    ],
    yokai:[{ id:"fuji-six-yokai", title:"富士山六体妖怪", date:"2026", type:"text", category:"yokai", author:"eli", project:"fuji-yokai", file:"documents/yokai/fuji-six-yokai.md" }],
    music:[
        { id:"moonlit-koto-curse", title:"Moonlit Koto Curse", date:"TEST", type:"audio", category:"music", author:"eli", file:"media/music/Moonlit%20Koto%20Curse.mp3" },
        { id:"fuji-sonicpi-01", title:"FUJI SONIC PI 01", date:"2026", type:"audio", category:"music", author:"eli", project:"aokigahara", file:"media/music/fuji-sonicpi-01.mp3" },
        { id:"fuji-sonicpi-02", title:"FUJI SONIC PI 02", date:"2026", type:"audio", category:"music", author:"eli", project:"aokigahara", file:"media/music/fuji-sonicpi-02.mp3" },
        { id:"fuji-sonicpi-03", title:"FUJI SONIC PI 03", date:"2026", type:"audio", category:"music", author:"eli", project:"aokigahara", file:"media/music/fuji-sonicpi-03.mp3" },
        { id:"fuji-sonicpi-04", title:"FUJI SONIC PI 04", date:"2026", type:"audio", category:"music", author:"eli", project:"aokigahara", file:"media/music/fuji-sonicpi-04.mp3" }
    ],
    sound:[{ id:"hellyea", title:"HELLYEA", date:"TEST FIELD RECORDING", type:"audio", category:"sound", author:"shared", file:"media/sound/hellyea.wav" }],
    text:[{ id:"fuji-six-yokai-script", title:"FUJI SIX YOKAI — SCRIPT", date:"2026", type:"text", category:"text", author:"eli", project:"fuji-yokai", file:"documents/scripts/fuji-six-yokai-script.md" }],
    projects:[AOKIGAHARA_DOSSIER],
    other:[]
};

window.ARCHIVE = ARCHIVE;
window.JIHANKI_ARCHIVE = Object.values(ARCHIVE).flat();

/* Shared JIHANKI media styling. Loaded here so the existing single-page
   machine architecture does not need to be rearranged. */
const mediaStyle=document.createElement("style");
mediaStyle.textContent=`
#artifact-body{min-width:0;overflow-wrap:anywhere}
#artifact-body audio.artifact-audio,#artifact-body video.artifact-video,#artifact-body .markdown-audio audio{display:block;width:100%;max-width:620px;margin:18px auto;padding:8px;border:1px solid rgba(255,255,255,.13);background:#050505;filter:grayscale(1) contrast(.9);border-radius:0;box-shadow:inset 0 0 18px rgba(255,255,255,.025),0 0 16px rgba(0,0,0,.65)}
#artifact-body video.artifact-video{max-height:65vh;object-fit:contain}
#artifact-body audio.artifact-audio{height:48px}
#artifact-body .markdown-audio{margin:18px 0;padding:10px 12px;border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.025)}
#artifact-body .markdown-audio-label{font-size:10px;letter-spacing:.1em;color:#aaa;margin-bottom:7px}
#artifact-body audio::-webkit-media-controls-panel,#artifact-body video::-webkit-media-controls-panel{background:#111}
#artifact-body audio::-webkit-media-controls-current-time-display,#artifact-body audio::-webkit-media-controls-time-remaining-display{color:#aaa}
#artifact-body .artifact-media{display:block;max-width:100%;max-height:65vh;margin:16px auto;border:1px solid rgba(255,255,255,.12);filter:grayscale(.2) contrast(.95)}
#artifact-body .project-frame{display:block;width:100%;height:min(72vh,760px);border:1px solid rgba(255,255,255,.1);background:#050505}
`;
document.head.appendChild(mediaStyle);

/* Seamless JIHANKI ambient loop + foreground-media ducking. */
(function(){
 const SOUND={button:"media/sound/jihanki-sfx/button-sound.wav",coin:"media/sound/jihanki-sfx/entering-money.wav",home:"media/sound/jihanki-sfx/homebutton.wav",loop:"media/sound/jihanki-sfx/jihanki-music-loop.wav"};
 let ctx,buffer,source,gain,loading,started=false,muted=false,foreground=null,lastSFX=0;
 const ac=()=>{if(!ctx){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;ctx=new C()}return ctx};
 const load=()=>buffer?Promise.resolve(buffer):loading||(loading=fetch(SOUND.loop,{cache:"force-cache"}).then(r=>r.arrayBuffer()).then(b=>ac().decodeAudioData(b)).then(b=>buffer=b).finally(()=>loading=null));
 async function start(){const c=ac();if(!c)return;try{await c.resume();const b=await load();if(started)return;gain=c.createGain();gain.gain.value=muted?0:.10;gain.connect(c.destination);source=c.createBufferSource();source.buffer=b;source.loop=true;source.loopStart=0;source.loopEnd=b.duration;source.connect(gain);source.start(0);started=true}catch(_){}}
 function duck(v){muted=v;if(gain&&ctx)gain.gain.setTargetAtTime(v?0:.10,ctx.currentTime,.015)}
 function sfx(n){const now=Date.now();if(now-lastSFX<45)return;lastSFX=now;const a=new Audio(SOUND[n]);a.volume=n==="coin"?.55:.4;a.play().catch(()=>{})}
 function bindMedia(root=document){root.querySelectorAll("audio,video").forEach(el=>{el.addEventListener("play",()=>{foreground=el;duck(true)});el.addEventListener("pause",()=>{if(foreground===el){foreground=null;duck(false)}});el.addEventListener("ended",()=>{if(foreground===el){foreground=null;duck(false)}})})}
 document.addEventListener("pointerdown",e=>{start();const b=e.target.closest?.("button");if(!b)return;if(b.id==="coin-button")sfx("coin");else if(b.id==="home-button")sfx("home");else sfx("button")},{passive:true});document.addEventListener("keydown",start,{passive:true});window.JIHANKI_AUDIO={start,duck,bindMedia};
})();
`;
