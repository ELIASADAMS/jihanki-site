const artifact = document.getElementById("artifact");
const artifactContent = document.getElementById("artifact-content");

const JIHANKI_SOUNDS = {
    button: "media/sound/jihanki-sfx/button-sound.wav",
    coin: "media/sound/jihanki-sfx/entering-money.wav",
    home: "media/sound/jihanki-sfx/homebutton.wav",
    loop: "media/sound/jihanki-sfx/jihanki-music-loop.wav"
};

let jihankiLoop = null;
let audioUnlocked = false;
let foregroundAudio = null;

function initJihankiAudio() {
    if (jihankiLoop) return;

    jihankiLoop = new Audio(JIHANKI_SOUNDS.loop);
    jihankiLoop.loop = true;
    jihankiLoop.volume = 0.12;
    jihankiLoop.preload = "auto";
}

function startBackgroundLoop() {
    initJihankiAudio();

    if (!jihankiLoop.paused) return;

    jihankiLoop.play()
        .then(() => { audioUnlocked = true; })
        .catch(() => {
            // Mobile browsers require a user gesture before audio can start.
            audioUnlocked = false;
        });
}

function playSFX(name) {
    startBackgroundLoop();

    const src = JIHANKI_SOUNDS[name];
    if (!src) return;

    const sound = new Audio(src);
    sound.volume = name === "coin" ? 0.65 : 0.42;
    sound.play().catch(() => { });
}

function duckBackground() {
    if (!jihankiLoop) return;
    jihankiLoop.volume = 0.035;
}

function restoreBackground() {
    if (!jihankiLoop) return;
    jihankiLoop.volume = 0.12;
}

function showArtifact() {
    artifact.classList.add("active");
    artifact.setAttribute("aria-hidden", "false");
    playSFX("button");
}

function closeArtifact() {
    if (foregroundAudio) {
        foregroundAudio.pause();
        foregroundAudio = null;
    }

    restoreBackground();

    artifact.classList.remove("active");
    artifact.setAttribute("aria-hidden", "true");
    artifactContent.innerHTML = "";
}

function openAudio(item) {
    duckBackground();

    artifactContent.innerHTML = `
        <div class="artifact-title">${escapeHTML(item.title)}</div>
        <div class="artifact-meta">${escapeHTML(item.artist || item.author || item.date || "")}</div>

        <audio controls autoplay class="artifact-audio">
            <source src="${item.file}">
        </audio>
    `;

    foregroundAudio = artifactContent.querySelector("audio");
    if (foregroundAudio) {
        foregroundAudio.addEventListener("play", duckBackground);
        foregroundAudio.addEventListener("pause", restoreBackground);
        foregroundAudio.addEventListener("ended", restoreBackground);
    }

    showArtifact();
}

function openVideo(item) {
    duckBackground();

    artifactContent.innerHTML = `
        <div class="artifact-title">${escapeHTML(item.title)}</div>

        <video controls autoplay class="artifact-video">
            <source src="${item.file}" type="video/mp4">
        </video>
    `;

    foregroundAudio = artifactContent.querySelector("video");
    if (foregroundAudio) {
        foregroundAudio.addEventListener("play", duckBackground);
        foregroundAudio.addEventListener("pause", restoreBackground);
        foregroundAudio.addEventListener("ended", restoreBackground);
    }

    showArtifact();
}

function openPhoto(item) {
    artifactContent.innerHTML = `
        <img
            src="${item.file}"
            class="artifact-photo"
            alt="${escapeHTML(item.title)}"
        >
        <div class="artifact-meta">${escapeHTML(item.title)}</div>
    `;

    showArtifact();
}

function openText(item) {
    artifactContent.innerHTML = `
        <div class="artifact-title">${escapeHTML(item.title)}</div>
        <div class="artifact-meta">${escapeHTML(item.author || item.date || "")}</div>
        <div class="artifact-text">
            ${item.isHTML
            ? item.text
            : escapeHTML(item.text || "").replace(/\n/g, "<br>")
        }
        </div>
    `;

    showArtifact();
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
