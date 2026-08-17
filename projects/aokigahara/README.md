# AOKIGAHARA — Procedural Ambient Pentalogy

This directory is a self-contained project dossier inside JIHANKI.

```text
projects/
└── aokigahara/
    ├── index.html       # presentation / interactive dossier
    ├── data.js          # project state / metadata
    ├── aokigahara.css   # project-only presentation styling
    ├── renders/         # future MP3 renders
    ├── notes/           # future detailed documentation
    └── images/          # future project visuals
```

The main JIHANKI archive remains responsible for discovering and opening the project. The AOKIGAHARA dossier is intentionally isolated so its layout, navigation and project-specific presentation can evolve without changing the JIHANKI machine coordinate system.

Current public audio files remain in `media/music/` and are referenced by `data.js`. New project-specific renders can later be placed in `renders/` and added there without changing the dossier structure.
