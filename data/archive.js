/*
    JIHANKI CATALOGUE

    Canonical item format:
      id       stable identifier
      title    display name
      date     date / era label
      type     video | image | audio | text
      category video | photo | note | yokai | music | sound | text | other
      file     path to media/document

    Long text lives in documents/*.md.
*/

const ARCHIVE = {
    videos: [
        {
            id: "eli-test-video",
            title: "ELI / TEST VIDEO",
            date: "TEST",
            type: "video",
            category: "video",
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
            file: "documents/notes/first-jihanki.md"
        },
        {
            id: "archive-rotation",
            title: "ARCHIVE ROTATION",
            date: "2026",
            type: "text",
            category: "note",
            file: "documents/notes/archive-rotation.md"
        },
        {
            id: "expedition-0722",
            title: "EXPEDITION 2026-07-22",
            date: "2026-07-22",
            type: "text",
            category: "note",
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
            file: "media/music/Moonlit%20Koto%20Curse.mp3",
            artist: "TEST"
        }
    ],

    sound: [
        {
            id: "hellyea",
            title: "HELLYEA",
            date: "TEST FIELD RECORDING",
            type: "audio",
            category: "sound",
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
            file: "documents/scripts/fuji-six-yokai-script.md"
        }
    ],

    other: [
        {
            id: "unindexed",
            title: "???",
            date: "UNINDEXED",
            type: "text",
            category: "other",
            text: "This memory has not been catalogued yet.\n\nThe archive contains something with no known category."
        }
    ]
};

/* Flat catalogue for the UI loader. */
const JIHANKI_ARCHIVE = Object.values(ARCHIVE).flat();

/* Browser globals: keeps the catalogue usable by index.html and future pages. */
window.ARCHIVE = ARCHIVE;
window.JIHANKI_ARCHIVE = JIHANKI_ARCHIVE;
