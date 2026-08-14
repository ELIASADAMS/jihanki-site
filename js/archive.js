function showArchive(type) {
    const baseItems = ARCHIVE[type] || [];
    const items = type === "other"
        ? [...baseItems, ...(ARCHIVE.projects || [])]
        : baseItems;

    screenContent.innerHTML = `
        <div class="archive">
            <div class="archive-header">
                <span class="archive-title">${escapeHTML(type.toUpperCase())}</span>
                <span class="archive-status">${items.length} ITEMS</span>
            </div>
        </div>
    `;

    const container = screenContent.querySelector(".archive");

    if (!items.length) {
        container.insertAdjacentHTML("beforeend", `<div class="screen-message">NO MEMORY FOUND</div>`);
        return;
    }

    items.forEach((item, index) => {
        const button = document.createElement("button");
        button.className = "archive-item";

        const icon =
            item.type === "audio" ? "▶ " :
            item.type === "video" ? "▣ " :
            item.type === "image" ? "□ " :
            item.category === "project" ? "△ " :
            "· ";

        button.innerHTML = `${icon}${String(index + 1).padStart(2, "0")}&nbsp;${escapeHTML(item.title)}<small>${escapeHTML(item.author || "")} ${item.date ? " / " + item.date : ""}</small>`;
        button.addEventListener("click", () => openArchiveItem(item));
        container.appendChild(button);
    });
}

async function openArchiveItem(item) {
    if (item.type === "audio") return openAudio(item);
    if (item.type === "video") return openVideo(item);
    if (item.type === "image") return openPhoto(item);

    if (item.documentation) return openMarkdownPath(item.documentation, item);
    if (item.file && /\.md$/i.test(item.file)) return openMarkdownPath(item.file, item);
    if (item.textFile) return openMarkdownPath(item.textFile, item);

    openText(item);
}

async function openMarkdownPath(path, item) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const markdown = await response.text();
        const documentURL = new URL(path, window.location.href);
        const baseURL = new URL("./", documentURL).href;

        openText({
            ...item,
            text: markdownToHTML(markdown, baseURL),
            isHTML: true
        });
    } catch (error) {
        openText({
            ...item,
            text: `ARCHIVE READ ERROR\n\n${path}\n\n${error.message}`
        });
    }
}

async function openMarkdownFile(item) {
    const path = item.documentation || item.file || item.textFile;
    await openMarkdownPath(path, item);
}

function markdownToHTML(markdown, baseURL) {
    const lines = markdown.replace(/\r\n/g, "\n").split("\n");
    let html = "";
    let paragraph = [];
    let inUL = false;
    let inOL = false;

    function flushParagraph() {
        if (!paragraph.length) return;
        html += `<p>${inlineMarkdown(paragraph.join(" "), baseURL)}</p>`;
        paragraph = [];
    }

    function closeLists() {
        if (inUL) { html += "</ul>"; inUL = false; }
        if (inOL) { html += "</ol>"; inOL = false; }
    }

    for (const raw of lines) {
        const line = raw.trim();
        if (!line) { flushParagraph(); continue; }

        if (/^---+$/.test(line)) {
            flushParagraph(); closeLists(); html += "<hr>"; continue;
        }

        const heading = line.match(/^(#{1,3})\s+(.*)$/);
        if (heading) {
            flushParagraph(); closeLists();
            const level = heading[1].length;
            html += `<h${level}>${inlineMarkdown(heading[2], baseURL)}</h${level}>`;
            continue;
        }

        const unordered = line.match(/^[-*]\s+(.*)$/);
        if (unordered) {
            flushParagraph();
            if (inOL) { html += "</ol>"; inOL = false; }
            if (!inUL) { html += "<ul>"; inUL = true; }
            html += `<li>${inlineMarkdown(unordered[1], baseURL)}</li>`;
            continue;
        }

        const ordered = line.match(/^\d+\.\s+(.*)$/);
        if (ordered) {
            flushParagraph();
            if (inUL) { html += "</ul>"; inUL = false; }
            if (!inOL) { html += "<ol>"; inOL = true; }
            html += `<li>${inlineMarkdown(ordered[1], baseURL)}</li>`;
            continue;
        }

        closeLists();
        paragraph.push(line);
    }

    flushParagraph();
    closeLists();
    return html;
}

function resolveMarkdownURL(path, baseURL) {
    try { return new URL(path, baseURL).href; }
    catch { return path; }
}

function inlineMarkdown(text, baseURL) {
    let value = escapeHTML(text);

    value = value.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, path) => {
        const src = resolveMarkdownURL(path, baseURL);
        return `<img class="markdown-image" src="${src}" alt="${alt}">`;
    });

    value = value.replace(/\[([^\]]+)\]\(([^)]+\.(?:mp3|wav|ogg|m4a))\)/gi, (_, label, path) => {
        const src = resolveMarkdownURL(path, baseURL);
        return `<div class="markdown-audio"><div>${label}</div><audio controls preload="metadata" src="${src}"></audio></div>`;
    });

    value = value.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, path) => {
        const href = /^https?:\/\//i.test(path) ? path : resolveMarkdownURL(path, baseURL);
        return `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    });

    value = value.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    value = value.replace(/\*(.+?)\*/g, "<em>$1</em>");
    return value;
}
