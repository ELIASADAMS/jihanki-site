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
