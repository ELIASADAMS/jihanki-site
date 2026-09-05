# JIHANKI — Interactive Archive

**JIHANKI (自販機)** is a web-based interactive archive presented as a Japanese vending machine interface.

It combines an experimental physical-machine UI with an archive of texts, sounds, music, photographs, scripts, and project documentation collected around the JIHANKI / Japan project.

The site is intentionally built as a lightweight static web application: no framework, no build step, and no backend are required.

## Origin — SAIKONEON / Lake Saiko

JIHANKI began at **SAIKONEON**, an artist-in-residence on the shore of Lake Saiko in Yamanashi, Japan, during the July 2026 Japan stay of **Ilya Minin (Eli) and Julia Baranyuk**.

The project grew out of nighttime walks, field observation, and encounters with ordinary infrastructure around Saiko. The first JIHANKI encounter was a vending machine seen at night near SAIKONEON. In the darkness, the machine stopped feeling like a simple commercial device and began to read as an isolated illuminated object — a small interface between a person and an otherwise quiet landscape.

That observation became the conceptual seed of the archive. The physical vending machines encountered around Saiko became a model for the website itself: instead of accepting money and returning a drink or snack, the digital machine accepts interaction and returns a fragment of memory.

The project therefore grew directly from the place and the journey rather than being designed as a generic archive independently of them.

SAIKONEON describes itself as a space for research, creation, collaboration, and exchange between creators from different fields, situated in the natural environment around Lake Saiko and Mount Fuji. The JIHANKI project belongs to that particular environment: lake, forest, roads, tunnels, small settlements, shrines, and isolated infrastructure all became part of the archive's source material.

Official residency site: https://saikoneon.com/

The original field note is preserved in:

```text
documents/notes/first-jihanki.md
```

## Credits

**JIHANKI — Interactive Archive**  
Concept, archive, interface, documentation and development: **Ilya Minin (Eli)**  
Origin / field experience: **SAIKONEON, Lake Saiko, Japan**  
Japan stay / shared field experience: **Julia Baranyuk**

## Features

* Interactive vending-machine interface
* Fixed internal machine coordinate system with responsive proportional scaling
* Touch and mouse interaction
* Archive/catalogue system
* Markdown documents rendered directly inside the machine screen
* Audio playback
* Background JIHANKI music loop
* Interface sound effects
* Project notes, scripts, yokai documentation, and Sonic Pi material
* Local media archive
* Works as a static site and can be served with any basic HTTP server

## Project Structure

```text
JIHANKI/
├── assets/
│   └── jihanki.png
│
├── css/
│   ├── machine.css
│   └── screen.css
│
├── data/
│   ├── archive.js
│   └── README.md
│
├── documents/
│   ├── notes/
│   │   ├── archive-rotation.md
│   │   ├── expedition-2026-07-22.md
│   │   └── first-jihanki.md
│   │
│   ├── projects/
│   │   └── fuji-sonicpi.md
│   │
│   ├── scripts/
│   │   └── fuji-six-yokai-script.md
│   │
│   └── yokai/
│       └── fuji-six-yokai.md
│
├── media/
│   ├── music/
│   ├── photo/
│   ├── sound/
│   │   └── jihanki-sfx/
│   │       ├── button-sound.wav
│   │       ├── entering-money.wav
│   │       ├── homebutton.wav
│   │       └── jihanki-music-loop.wav
│   └── video/
│
├── index.html
├── info.md
└── README.md
```

## Architecture

The application is intentionally simple.

### `index.html`

The main application and vending-machine interface live here.

It contains the machine UI, screen logic, interaction handling, archive display, audio behaviour, and responsive positioning.

### `data/archive.js`

This is the archive catalogue.

It defines which documents and media are available to the JIHANKI interface and connects catalogue entries with their actual files.

### `documents/`

Long-form archive material lives here as Markdown.

Documents are separated by purpose:

* `notes/` — field notes, observations, and project records
* `projects/` — individual creative/technical projects
* `scripts/` — video and production scripts
* `yokai/` — yokai-related research and documentation

Markdown files are loaded dynamically and displayed inside the JIHANKI screen.

### `media/`

Actual media assets are kept separately from the archive metadata.

```text
media/
├── music/     # music and Sonic Pi renders
├── photo/     # photographs and archive imagery
├── sound/     # sound effects and interface audio
└── video/     # video material
```

## JIHANKI Interface

The vending machine is designed around a fixed internal coordinate system so that the physical proportions and interaction coordinates remain stable across different screen sizes.

The machine scales proportionally rather than being independently stretched in width and height.

This is especially important on phones, where the machine must remain correctly mapped to its visual buttons and screen.

## Audio

The interface uses a small set of dedicated JIHANKI sounds:

* `button-sound.wav` — interface interaction
* `entering-money.wav` — vending-machine interaction
* `homebutton.wav` — home/navigation interaction
* `jihanki-music-loop.wav` — continuous background ambience

The background loop is designed to continue seamlessly while archive material is explored.

Archive audio can play independently while the interface ambience remains underneath it at a lower level.

## Adding an Archive Entry

Add the actual document or media file first.

For a Markdown document, place it somewhere under `documents/`, for example:

```text
documents/notes/my-new-entry.md
```

Then add the corresponding entry to:

```text
data/archive.js
```

Example:

```javascript
{
    id: "my-new-entry",
    title: "MY NEW ENTRY",
    date: "2026-08-14",
    type: "text",
    textFile: "documents/notes/my-new-entry.md"
}
```

The catalogue entry provides the metadata; the Markdown file remains the actual archive content.

## Current Archive Material

The repository currently contains material related to:

* The SAIKONEON / Lake Saiko origin of the JIHANKI project
* The first JIHANKI encounter
* The July 2026 Japan expedition
* Archive rotation / catalogue behaviour
* Fuji-related Sonic Pi experiments
* The Fuji Six Great Yokai project
* Video scripts and research
* Experimental music
* Photographic material
* JIHANKI interface sounds

The Fuji Sonic Pi project is represented by:

```text
documents/projects/fuji-sonicpi.md
```

with four associated audio renders in:

```text
media/music/
├── fuji-sonicpi-01.mp3
├── fuji-sonicpi-02.mp3
├── fuji-sonicpi-03.mp3
└── fuji-sonicpi-04.mp3
```

## Running Locally

Do not open `index.html` directly with `file://`.

Use a local HTTP server instead.

### Python

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

Any other static HTTP server can be used as well.

## Design Principle

JIHANKI is not intended to behave like a conventional documentation website.

The repository is the underlying archive, while the vending machine is the interface through which the archive is experienced.

The separation is therefore intentional:

```text
ARCHIVE DATA
     ↓
data/archive.js
     ↓
DOCUMENTS / MEDIA
     ↓
JIHANKI INTERFACE
     ↓
USER EXPERIENCE
```

The machine should remain visually and spatially stable while the archive itself continues to grow.

## Development Notes

There is no framework or compilation pipeline.

When modifying the project:

1. Keep the machine's internal coordinate system intact.
2. Keep archive metadata in `data/archive.js`.
3. Keep long-form text in Markdown files under `documents/`.
4. Keep binary media under `media/`.
5. Avoid introducing duplicate application logic.
6. Test the interface through an HTTP server rather than `file://`.
7. Check both desktop and phone-sized layouts after changes.

## Status

**Experimental / actively developed.**

JIHANKI is a living archive and interface. Its contents, visual design, sounds, documents, and interaction model are expected to evolve as new material is added.
