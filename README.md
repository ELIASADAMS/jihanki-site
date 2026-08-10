# JIHANKI — COMPLETE FIXED STARTER

This is a complete runnable starter.

IMPORTANT: The previous sample ZIP was incomplete. It contained only the
new archive/document files and accidentally omitted `index.html` and the
core application files. That is why replacing the whole project with it
broke the site.

This package fixes that mistake.

## Files

```text
JIHANKI/
├── assets/
│   └── jihanki.png              <-- PUT YOUR REAL PNG HERE
├── css/
│   ├── archive.css
│   ├── base.css
│   ├── machine.css
│   └── screen.css
├── data/
│   └── archive.js
├── documents/
│   ├── notes/
│   ├── scripts/
│   └── yokai/
├── js/
│   ├── app.js
│   ├── archive.js
│   ├── machine.js
│   └── player.js
├── media/
│   ├── music/
│   ├── photo/
│   ├── sound/
│   └── video/
└── index.html
```

## VERY IMPORTANT

Replace:

```text
assets/jihanki.png
```

with your actual JIHANKI PNG.

The machine is kept in a fixed 429 x 786 coordinate system internally,
but the whole object scales proportionally. This prevents the PNG from
being cropped on different phone aspect ratios.

## Test it

Do NOT double-click index.html.

Run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## How the archive works

`data/archive.js` = catalogue / metadata.

`documents/*.md` = actual long-form archive text.

`media/*` = actual media.

Example:

```javascript
{
    id: "first-jihanki",
    title: "FIRST JIHANKI",
    date: "2026-07-22",
    type: "text",
    textFile: "documents/notes/first-jihanki.md"
}
```

The archive JavaScript fetches the Markdown file and renders it in the
JIHANKI screen.

Keep the original `Yokais.odt` as your master project document. Curate
individual pieces into Markdown when they become archive entries.
