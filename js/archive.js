function showArchive(type) {

    // Projects are reachable through the existing OTHER slot.
    // The physical vending-machine geometry stays unchanged.
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
        container.insertAdjacentHTML(
            "beforeend",
            `<div class="screen-message">NO MEMORY FOUND</div>`
        );
        return;
    }

    items.forEach((item, index) => {
        const button = document.createElement("button");
        button.className = "archive-item";

        const icon =
            item.type === "audio" ? "▶ " :
            item.type === "video" ? "▣ " :
            item.type === "image" ? "□ " :
            item.type === "project" ? "△ " :
            "· ";

        button.innerHTML = `
            ${icon}${String(index + 1).padStart(2, "0")}
            &nbsp;${escapeHTML(item.title)}
            <small>${escapeHTML(item.author || "")} ${item.date ? " / " + item.date : ""}</small>
        `;

        button.addEventListener("click", () => openArchiveItem(item));
        container.appendChild(button);
    });
}

async function openArchiveItem(item) {

    /*
     * HTML is a PAGE, not a text document.
     * This check deliberately happens before all Markdown/text handling.
     * It also makes the loader tolerant of older catalogue entries that
     * were accidentally marked as text.
     */
    const pagePath = item.page || item.file;

    if (
        item.type === "project" ||
        (typeof pagePath === "string" && /\.html?(?:[?#].*)?$/i.test(pagePath))
    ) {
        window.location.href = pagePath;
        return;
    }

    if (item.type === "audio") {
        openAudio(item);
        return;
    }

    if (item.type === "video") {
        openVideo(item);
        return;
    }

    if (item.type === "image") {
        openPhoto(item);
        return;
    }

    // Documentation is a Markdown file and is rendered inside JIHANKI.
    if (item.documentation) {
        await openMarkdownPath(item.documentation, item);
        return;
    }

    if (item.file && /\.md$/i.test(item.file)) {
        await openMarkdownPath(item.file, item);
        return;
    }

    // Backwards compatibility with the old catalogue format.
    if (item.textFile) {
        await openMarkdownPath(item.textFile, item);
        return;
    }

    openText(item);
}

async function openMarkdownPath(path, item) {
    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const markdown = await response.text();

        openText({
            ...item,
            text: markdownToHTML(markdown),
            isHTML: true
        });

    } catch (error) {
        openText({
            ...item,
            text:
                `ARCHIVE READ ERROR\n\n` +
                `${path}\n\n` +
                `${error.message}\n\n` +
                `Run JIHANKI through a local HTTP server:\n` +
                `python -m http.server 8000`,
        });
    }
}

// Compatibility wrapper for older code.
async function openMarkdownFile(item) {
    const path = item.documentation || item.file || item.textFile;
    await openMarkdownPath(path, item);
}

function markdownToHTML(markdown) {
    const lines = markdown.replace(/\r\n/g, "\n").split("\n");

    let html = "";
    let paragraph = [];
    let inUL = false;
    let inOL = false;

    function flushParagraph() {
        if (!paragraph.length) return;
        html += `<p>${inlineMarkdown(paragraph.join(" "))}</p>`;
        paragraph = [];
    }

    function closeLists() {
        if (inUL) {
            html += "</ul>";
            inUL = false;
        }
        if (inOL) {
            html += "</ol>";
            inOL = false;
        }
    }

    for (const raw of lines) {
        const line = raw.trim();

        if (!line) {
            flushParagraph();
            continue;
        }

        if (/^---+$/.test(line)) {
            flushParagraph();
            closeLists();
            html += "<hr>";
            continue;
        }

        const heading = line.match(/^(#{1,3})\s+(.*)$/);
        if (heading) {
            flushParagraph();
            closeLists();
            const level = heading[1].length;
            html += `<h${level}>${inlineMarkdown(heading[2])}</h${level}>`;
            continue;
        }

        const unordered = line.match(/^[-*]\s+(.*)$/);
        if (unordered) {
            flushParagraph();
            if (inOL) {
                html += "</ol>";
                inOL = false;
            }
            if (!inUL) {
                html += "<ul>";
                inUL = true;
            }
            html += `<li>${inlineMarkdown(unordered[1])}</li>`;
            continue;
        }

        const ordered = line.match(/^\d+\.\s+(.*)$/);
        if (ordered) {
            flushParagraph();
            if (inUL) {
                html += "</ul>";
                inUL = false;
            }
            if (!inOL) {
                html += "<ol>";
                inOL = true;
            }
            html += `<li>${inlineMarkdown(ordered[1])}</li>`;
            continue;
        }

        closeLists();
        paragraph.push(line);
    }

    flushParagraph();
    closeLists();
    return html;
}

function inlineMarkdown(text) {
    let value = escapeHTML(text);
    value = value.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    value = value.replace(/\*(.+?)\*/g, "<em>$1</em>");
    return value;
}
