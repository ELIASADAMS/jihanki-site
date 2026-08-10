function showArchive(type) {

    const items = ARCHIVE[type] || [];

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
            item.type === "music" || item.type === "sound" ? "▶ " :
            item.type === "video" ? "▣ " :
            item.type === "photo" ? "□ " :
            "· ";

        button.innerHTML = `
            ${icon}${String(index + 1).padStart(2, "0")}
            &nbsp;${escapeHTML(item.title)}
            <small>${escapeHTML(item.date || "")}</small>
        `;

        button.addEventListener("click", () => openArchiveItem(item));

        container.appendChild(button);
    });
}

async function openArchiveItem(item) {

    if (item.type === "music" || item.type === "sound") {
        openAudio(item);
        return;
    }

    if (item.type === "video") {
        openVideo(item);
        return;
    }

    if (item.type === "photo") {
        openPhoto(item);
        return;
    }

    if (item.textFile) {
        await openMarkdownFile(item);
        return;
    }

    openText(item);
}

async function openMarkdownFile(item) {

    try {

        const response = await fetch(item.textFile);

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
                `${item.textFile}\n\n` +
                `${error.message}\n\n` +
                `Run JIHANKI through a local HTTP server:\n` +
                `python -m http.server 8000`,
        });
    }
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
