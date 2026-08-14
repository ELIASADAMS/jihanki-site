/*
 * JIHANKI CATALOGUE
 *
 * Add one object here whenever a new archive item is added.
 * Long-form writing belongs in .md files; media belongs in media/.
 *
 * Canonical item fields:
 * id       stable unique id
 * title    display title
 * date     date / era label
 * type     video | image | audio | text
 * category video | photo | note | yokai | music | sound | text | project | other
 * author   eli | julia | shared
 * project  optional project id
 * file     local media path OR markdown file
 * link     optional external URL (e.g. Bandcamp)
 */

const ARCHIVE = {
    videos: [
        {
            id: "eli-test-video",
            title: "ELI / TEST VIDEO",
            date: "TEST",
            type: "video",
            category: "video",
            author: "eli",
            file: "media/video/eli.mp4"
        }
    ],

    photos: [
        {
            id: "cover1",
            title: "COVER 01",
            date: "TEST",
            type: "image",
            category: "photo",
            author: "shared",
            file: "media/photo/cover1.png"
        }
    ],

    notes: [
        {
            id: "first-jihanki",
            title: "FIRST JIHANKI",
            date: "2026-07-22",
            type: "text",
            category: "note",
            author: "shared",
            file: "documents/notes/first-jihanki.md"
        },
        {
            id: "archive-rotation",
            title: "ARCHIVE ROTATION",
            date: "2026",
            type: "text",
            category: "note",
            author: "shared",
            file: "documents/notes/archive-rotation.md"
        },
        {
            id: "expedition-0722",
            title: "EXPEDITION 2026-07-22",
            date: "2026-07-22",
            type: "text",
            category: "note",
            author: "shared",
            file: "documents/notes/expedition-2026-07-22.md"
        }
    ],

    yokai: [
        {
            id: "fuji-six-yokai",
            title: "富士山六体妖怪",
            date: "2026",
            type: "text",
            category: "yokai",
            author: "eli",
            project: "fuji-yokai",
            file: "documents/yokai/fuji-six-yokai.md"
        }
    ],

    music: [
        {
            id: "moonlit-koto-curse",
            title: "Moonlit Koto Curse",
            date: "TEST",
            type: "audio",
            category: "music",
            author: "eli",
            file: "media/music/Moonlit%20Koto%20Curse.mp3"
        }
    ],

    sound: [
        {
            id: "hellyea",
            title: "HELLYEA",
            date: "TEST FIELD RECORDING",
            type: "audio",
            category: "sound",
            author: "shared",
            file: "media/sound/hellyea.wav"
        }
    ],

    text: [
        {
            id: "fuji-six-yokai-script",
            title: "FUJI SIX YOKAI — SCRIPT",
            date: "2026",
            type: "text",
            category: "text",
            author: "eli",
            project: "fuji-yokai",
            file: "documents/scripts/fuji-six-yokai-script.md"
        }
    ],

    projects: [
        {
            id: "fuji-sonicpi",
            title: "FUJI / SONIC PI",
            date: "2026",
            type: "text",
            category: "project",
            author: "eli",
            project: "fuji-sonicpi",
            file: "documents/projects/fuji-sonicpi.md"
        }
    ],

    other: []
};

const JIHANKI_ARCHIVE = Object.values(ARCHIVE).flat();

window.ARCHIVE = ARCHIVE;
window.JIHANKI_ARCHIVE = JIHANKI_ARCHIVE;

/* ================================================================
   JIHANKI RUNTIME PATCH

   index.html currently contains the physical machine UI and its
   original interaction code. This runtime is loaded by index.html
   through data/archive.js, so we keep archive behaviour here without
   disturbing the carefully mapped 429 x 932 machine geometry.

   Responsibilities:
   - real Markdown rendering inside the artifact window
   - relative image/audio/link resolution
   - foreground archive audio
   - JIHANKI ambient loop
   - interface SFX
================================================================ */

(function installJihankiRuntime() {
    const SOUND = {
        button: "media/sound/jihanki-sfx/button-sound.wav",
        coin: "media/sound/jihanki-sfx/entering-money.wav",
        home: "media/sound/jihanki-sfx/homebutton.wav",
        loop: "media/sound/jihanki-sfx/jihanki-music-loop.wav"
    };

    let ambient = null;
    let foreground = null;
    let audioReady = false;
    let lastSFX = 0;

    function getAmbient() {
        if (!ambient) {
            ambient = new Audio(SOUND.loop);
            ambient.loop = true;
            ambient.preload = "auto";
            ambient.volume = 0.10;
        }
        return ambient;
    }

    function unlockAudio() {
        const loop = getAmbient();

        if (!loop.paused) {
            audioReady = true;
            return;
        }

        loop.play().then(() => {
            audioReady = true;
        }).catch(() => {
            // Browser autoplay policy: retry on the next user gesture.
            audioReady = false;
        });
    }

    function playSFX(name) {
        unlockAudio();

        const now = Date.now();
        if (now - lastSFX < 45) return;
        lastSFX = now;

        const src = SOUND[name];
        if (!src) return;

        const sfx = new Audio(src);
        sfx.preload = "auto";
        sfx.volume = name === "coin" ? 0.55 : 0.40;
        sfx.play().catch(() => {});
    }

    function duckAmbient() {
        if (ambient) ambient.volume = 0.025;
    }

    function restoreAmbient() {
        if (ambient) ambient.volume = 0.10;
    }

    function stopForeground() {
        if (!foreground) return;
        try { foreground.pause(); } catch (_) {}
        foreground = null;
        restoreAmbient();
    }

    function resolveURL(path, baseURL) {
        try {
            return new URL(path, baseURL).href;
        } catch (_) {
            return path;
        }
    }

    function safeURL(path, baseURL) {
        const raw = String(path || "").trim();
        if (/^javascript:/i.test(raw)) return "#";
        if (/^data:/i.test(raw)) return "#";
        return resolveURL(raw, baseURL);
    }

    function inlineMarkdown(source, baseURL) {
        let value = escapeHTML(source);
        const tokens = [];

        function token(html) {
            const id = `@@JHKTOKEN${tokens.length}@@`;
            tokens.push(html);
            return id;
        }

        // Protect media and links before emphasis processing.
        value = value.replace(
            /!\[([^\]]*)\]\(([^)]+)\)/g,
            (_, alt, path) => {
                const src = safeURL(path, baseURL);
                return token(
                    `<img class="markdown-image" src="${escapeHTML(src)}" alt="${escapeHTML(alt)}">`
                );
            }
        );

        value = value.replace(
            /\[([^\]]+)\]\(([^)]+)\)/g,
            (_, label, path) => {
                const href = safeURL(path, baseURL);
                const lower = path.split("?")[0].toLowerCase();

                if (/\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(lower)) {
                    return token(`
                        <div class="markdown-audio">
                            <div class="markdown-audio-label">${label}</div>
                            <audio controls preload="metadata" src="${escapeHTML(href)}"></audio>
                        </div>
                    `);
                }

                return token(
                    `<a class="markdown-link" href="${escapeHTML(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`
                );
            }
        );

        value = value.replace(/`([^`]+)`/g, (_, code) =>
            token(`<code>${code}</code>`)
        );

        // Strong first, then emphasis.
        value = value.replace(/\*\*([^*\n]+?)\*\*/g, "<strong>$1</strong>");
        value = value.replace(/__([^_\n]+?)__/g, "<strong>$1</strong>");
        value = value.replace(/\*([^*\n]+?)\*/g, "<em>$1</em>");
        value = value.replace(/_([^_\n]+?)_/g, "<em>$1</em>");

        return value.replace(/@@JHKTOKEN(\d+)@@/g, (_, index) => tokens[Number(index)]);
    }

    function markdownToHTML(markdown, baseURL) {
        const lines = String(markdown || "")
            .replace(/\r\n?/g, "\n")
            .split("\n");

        let html = "";
        let paragraph = [];
        let list = null;

        function flushParagraph() {
            if (!paragraph.length) return;
            html += `<p>${inlineMarkdown(paragraph.join(" "), baseURL)}</p>`;
            paragraph = [];
        }

        function closeList() {
            if (list === "ul") html += "</ul>";
            if (list === "ol") html += "</ol>";
            list = null;
        }

        for (const raw of lines) {
            const line = raw.trim();

            if (!line) {
                flushParagraph();
                closeList();
                continue;
            }

            if (/^---+$/.test(line)) {
                flushParagraph();
                closeList();
                html += "<hr>";
                continue;
            }

            const heading = line.match(/^(#{1,6})\s+(.*)$/);
            if (heading) {
                flushParagraph();
                closeList();
                const level = heading[1].length;
                html += `<h${level}>${inlineMarkdown(heading[2], baseURL)}</h${level}>`;
                continue;
            }

            const ul = line.match(/^[-*+]\s+(.*)$/);
            if (ul) {
                flushParagraph();
                if (list !== "ul") {
                    closeList();
                    html += "<ul>";
                    list = "ul";
                }
                html += `<li>${inlineMarkdown(ul[1], baseURL)}</li>`;
                continue;
            }

            const ol = line.match(/^\d+\.\s+(.*)$/);
            if (ol) {
                flushParagraph();
                if (list !== "ol") {
                    closeList();
                    html += "<ol>";
                    list = "ol";
                }
                html += `<li>${inlineMarkdown(ol[1], baseURL)}</li>`;
                continue;
            }

            closeList();
            paragraph.push(line);
        }

        flushParagraph();
        closeList();
        return html;
    }

    function bindMarkdownAudio() {
        const body = document.getElementById("artifact-body");
        if (!body) return;

        body.querySelectorAll("audio").forEach(audio => {
            audio.addEventListener("play", () => {
                foreground = audio;
                duckAmbient();
            });
            audio.addEventListener("pause", () => {
                if (foreground === audio) restoreAmbient();
            });
            audio.addEventListener("ended", () => {
                if (foreground === audio) {
                    foreground = null;
                    restoreAmbient();
                }
            });
        });
    }

    async function openMarkdownItem(item) {
        const file = item.file || item.documentation;
        if (!file) return false;

        const body = document.getElementById("artifact-body");
        if (!body) return false;

        try {
            const response = await fetch(file, { cache: "no-cache" });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const markdown = await response.text();
            const documentURL = new URL(file, window.location.href);
            const baseURL = new URL("./", documentURL).href;

            body.innerHTML = `<div class="artifact-text markdown-rendered">${markdownToHTML(markdown, baseURL)}</div>`;
            bindMarkdownAudio();
            return true;
        } catch (error) {
            body.innerHTML = `<div class="artifact-text"><strong>MEMORY COULD NOT BE READ.</strong><br><br>${escapeHTML(file)}<br>${escapeHTML(error.message)}</div>`;
            return false;
        }
    }

    // Replace the original inline text reader after archive.js has loaded.
    window.openItem = async function(item) {
        if (!item) return;

        playSFX("button");
        stopForeground();

        const artifact = document.getElementById("artifact");
        const content = document.getElementById("artifact-content");
        if (!artifact || !content) return;

        const title = escapeHTML(item.title || "UNTITLED");
        const meta = [item.author, item.date, item.category || item.type]
            .filter(Boolean)
            .map(escapeHTML)
            .join(" / ");

        content.innerHTML = `
            <h1 class="artifact-title">${title}</h1>
            <div class="artifact-meta">${meta}</div>
            <div id="artifact-body">LOADING MEMORY...</div>
        `;

        artifact.classList.add("open");
        artifact.setAttribute("aria-hidden", "false");

        const type = String(item.type || item.category || "").toLowerCase();
        const file = item.file || "";
        const extension = file.split("?")[0].split(".").pop().toLowerCase();
        const body = document.getElementById("artifact-body");

        if (type === "image" || type === "photo" || /^(png|jpe?g|webp|gif)$/i.test(extension)) {
            body.innerHTML = `<img class="artifact-media" src="${escapeHTML(file)}" alt="${title}">`;
            return;
        }

        if (type === "audio" || type === "music" || type === "sound" || /^(mp3|wav|ogg|m4a|aac|flac)$/i.test(extension)) {
            body.innerHTML = `<audio class="artifact-audio" controls autoplay playsinline src="${escapeHTML(file)}"></audio>`;
            foreground = body.querySelector("audio");
            if (foreground) {
                duckAmbient();
                foreground.addEventListener("pause", restoreAmbient);
                foreground.addEventListener("ended", () => {
                    foreground = null;
                    restoreAmbient();
                });
            }
            return;
        }

        if (type === "video" || /^(mp4|webm|mov)$/i.test(extension)) {
            body.innerHTML = `<video class="artifact-video" controls autoplay playsinline src="${escapeHTML(file)}"></video>`;
            foreground = body.querySelector("video");
            if (foreground) {
                duckAmbient();
                foreground.addEventListener("pause", restoreAmbient);
                foreground.addEventListener("ended", () => {
                    foreground = null;
                    restoreAmbient();
                });
            }
            return;
        }

        await openMarkdownItem(item);
    };

    // Start ambient audio only after an actual user gesture.
    document.addEventListener("pointerdown", event => {
        unlockAudio();

        const target = event.target.closest && event.target.closest("button");
        if (!target) return;

        if (target.id === "coin-button") playSFX("coin");
        else if (target.id === "home-button") playSFX("home");
        else playSFX("button");
    }, { passive: true });

    document.addEventListener("keydown", () => unlockAudio(), { passive: true });

    // Make dynamically-created archive links/audio feel like part of the machine.
    const style = document.createElement("style");
    style.textContent = `
        .markdown-rendered { white-space: normal !important; }
        .markdown-rendered strong { font-weight: 700; color: rgba(255,255,255,.94); }
        .markdown-rendered em { font-style: italic; color: rgba(255,255,255,.82); }
        .markdown-rendered code {
            padding: 1px 4px;
            background: rgba(255,255,255,.06);
            border: 1px solid rgba(255,255,255,.08);
        }
        .markdown-rendered p { margin: 0 0 13px; }
        .markdown-rendered h1,
        .markdown-rendered h2,
        .markdown-rendered h3,
        .markdown-rendered h4,
        .markdown-rendered h5,
        .markdown-rendered h6 {
            margin: 18px 0 8px;
            font-weight: 400;
            line-height: 1.25;
        }
        .markdown-rendered h1 { font-size: 1.45em; }
        .markdown-rendered h2 { font-size: 1.25em; }
        .markdown-rendered h3 { font-size: 1.1em; }
        .markdown-rendered ul,
        .markdown-rendered ol { margin: 0 0 14px; padding-left: 22px; }
        .markdown-rendered li { margin: 4px 0; }
        .markdown-rendered hr { border: 0; border-top: 1px solid rgba(255,255,255,.12); margin: 18px 0; }
        .markdown-image {
            display: block;
            width: 100%;
            max-height: 280px;
            object-fit: contain;
            margin: 0 0 16px;
            background: #000;
        }
        .markdown-audio {
            margin: 8px 0 18px;
            padding: 8px;
            border: 1px solid rgba(255,255,255,.12);
            background: rgba(255,255,255,.025);
        }
        .markdown-audio-label {
            margin-bottom: 6px;
            font-size: .82em;
            letter-spacing: .06em;
        }
        .markdown-audio audio { display:block; width:100%; height:32px; }
        .markdown-link {
            color: rgba(255,255,255,.95);
            text-decoration: underline;
            text-underline-offset: 3px;
        }
    `;
    document.head.appendChild(style);

    // Expose for debugging from the browser console.
    window.JIHANKI_AUDIO = {
        start: unlockAudio,
        button: () => playSFX("button"),
        coin: () => playSFX("coin"),
        home: () => playSFX("home")
    };
})();
