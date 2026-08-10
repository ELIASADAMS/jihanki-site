const artifact = document.getElementById("artifact");
const artifactContent = document.getElementById("artifact-content");

function showArtifact() {
    artifact.classList.add("active");
    artifact.setAttribute("aria-hidden", "false");
}

function closeArtifact() {
    artifact.classList.remove("active");
    artifact.setAttribute("aria-hidden", "true");

    artifactContent.innerHTML = "";
}

function openAudio(item) {
    artifactContent.innerHTML = `
        <div class="artifact-title">${escapeHTML(item.title)}</div>
        <div class="artifact-meta">${escapeHTML(item.artist || item.date || "")}</div>

        <audio controls autoplay class="artifact-audio">
            <source src="${item.file}">
        </audio>
    `;

    showArtifact();
}

function openVideo(item) {
    artifactContent.innerHTML = `
        <div class="artifact-title">${escapeHTML(item.title)}</div>

        <video controls autoplay class="artifact-video">
            <source src="${item.file}" type="video/mp4">
        </video>
    `;

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
        <div class="artifact-meta">${escapeHTML(item.date || "")}</div>
        <div class="artifact-text">
            ${
                item.isHTML
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
