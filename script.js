/* =====================================================
   JIHANKI
   MOBILE ARCHIVE SYSTEM
===================================================== */


const screen =
    document.getElementById("screen-content");

const products =
    document.querySelectorAll(".product");

const homeButton =
    document.getElementById("home-button");

const coinButton =
    document.getElementById("coin-button");

const dispenserMessage =
    document.getElementById("dispenser-message");

const artifact =
    document.getElementById("artifact");

const artifactContent =
    document.getElementById("artifact-content");

const artifactClose =
    document.getElementById("artifact-close");


/* =====================================================
   ARCHIVE
===================================================== */

const archive = {

    videos: [

        {
            title:
                "富士山六体妖怪",

            subtitle:
                "Six Great Yokai of Mount Fuji",

            date:
                "2026.08.07",

            type:
                "VIDEO",

            text:
                "A fictional documentary about six yokai said to inhabit the Fuji region."
        },

        {
            title:
                "UNO-MISAKI",

            subtitle:
                "The Tunnel Is a Recording Device",

            date:
                "2026",

            type:
                "DOCUMENTATION",

            text:
                "The walls remember footsteps, coins, engines and voices."
        },

        {
            title:
                "KAGOME KAGOME",

            subtitle:
                "Playground Ritual",

            date:
                "2026",

            type:
                "MV",

            text:
                "A transformation of a children's game into a digital ritual."
        }

    ],


    photos: [

        {
            title:
                "SAIKO / NIGHT",

            date:
                "2026.07.22"
        },

        {
            title:
                "AOKIGAHARA",

            date:
                "2026.07.23"
        },

        {
            title:
                "UNO-MISAKI",

            date:
                "2026"
        },

        {
            title:
                "FUJI SUMMIT",

            date:
                "2026.08.01"
        }

    ],


    notes: [

        {
            title:
                "FIRST JIHANKI",

            date:
                "2026.07.22",

            text:
                "A vending machine glowing alone in darkness. It felt less like a shop and more like an object waiting to be discovered."
        },

        {
            title:
                "ARCHIVE ROTATION",

            date:
                "2026",

            text:
                "At night, the archive is overwritten. The same place can contain several layers of time."
        },

        {
            title:
                "PIEZOELECTRIC MEMORY",

            date:
                "2026",

            text:
                "The walls of the tunnel behave like a recording device. Coins, footsteps and engines become traces of another time."
        }

    ],


    yokai: [

        "上葉山",
        "水好鬼",
        "須賀山",
        "江花師",
        "下津賀",
        "保外神"

    ]

};


/* =====================================================
   UTILITIES
===================================================== */

function clearScreen() {

    screen.innerHTML = "";

}


function header(title) {

    return `

        <div class="screen-header">

            <span class="screen-title">
                ${title}
            </span>

            <span class="screen-status">
                ONLINE
            </span>

        </div>

    `;

}


/* =====================================================
   HOME
===================================================== */

function home() {

    clearScreen();

    screen.innerHTML = `

        <div class="boot">

            <div class="boot-japanese">
                自販機
            </div>

            <div class="boot-title">
                JIHANKI
            </div>

            <div class="boot-subtitle">
                MEMORY ARCHIVE
            </div>

            <div class="boot-loading">
                SELECT A MEMORY
            </div>

        </div>

    `;

}


/* =====================================================
   VIDEO
===================================================== */

function showVideos() {

    clearScreen();

    screen.innerHTML =
        header("VIDEO ARCHIVE");


    archive.videos.forEach(item => {

        const element =
            document.createElement("div");

        element.className =
            "archive-item";

        element.innerHTML = `

            ▶ ${item.title}

            <small>
                ${item.subtitle}
                ·
                ${item.date}
            </small>

        `;

        element.addEventListener(
            "click",
            () => openArtifact(item)
        );

        screen.appendChild(element);

    });

}


/* =====================================================
   PHOTOS
===================================================== */

function showPhotos() {

    clearScreen();

    screen.innerHTML =
        header("PHOTO ARCHIVE");


    archive.photos.forEach(item => {

        const element =
            document.createElement("div");

        element.className =
            "archive-item";

        element.innerHTML = `

            ▣ ${item.title}

            <small>
                ${item.date}
            </small>

        `;

        element.addEventListener(
            "click",
            () => openArtifact(item)
        );

        screen.appendChild(element);

    });

}


/* =====================================================
   NOTES
===================================================== */

function showNotes() {

    clearScreen();

    screen.innerHTML =
        header("FIELD NOTES");


    archive.notes.forEach(item => {

        const element =
            document.createElement("div");

        element.className =
            "archive-item";

        element.innerHTML = `

            ${item.title}

            <small>
                ${item.date}
            </small>

        `;

        element.addEventListener(
            "click",
            () => openArtifact(item)
        );

        screen.appendChild(element);

    });

}


/* =====================================================
   YOKAI
===================================================== */

function showYokai() {

    clearScreen();

    screen.innerHTML =
        header("六大妖怪");


    archive.yokai.forEach(
        (name, index) => {

            const element =
                document.createElement("div");

            element.className =
                "archive-item";

            element.innerHTML = `

                ${String(index + 1).padStart(2, "0")}

               　${name}

                <small>
                    FUJI REGION
                </small>

            `;

            element.addEventListener(
                "click",
                () => {

                    openArtifact({

                        title:
                            name,

                        date:
                            "UNKNOWN",

                        text:
                            "ARCHIVE ENTRY NOT FOUND.\n\nThe machine remembers that this name existed."

                    });

                }
            );

            screen.appendChild(element);

        }
    );

}


/* =====================================================
   ARTIFACT
===================================================== */

function openArtifact(item) {

    artifactContent.innerHTML = `

        <div style="
            font-size:10px;
            letter-spacing:.15em;
            margin-bottom:15px;
        ">

            ${item.title}

        </div>


        <div style="
            font-size:7px;
            opacity:.35;
            margin-bottom:20px;
        ">

            ${item.date || ""}

        </div>


        <div style="
            font-size:10px;
            line-height:1.8;
            white-space:pre-line;
            opacity:.75;
        ">

            ${item.text || "NO DATA"}

        </div>

    `;

    artifact.classList.add("active");

}


artifactClose.addEventListener(
    "click",
    () => {

        artifact.classList.remove("active");

    }
);


/* =====================================================
   PRODUCT BUTTONS
===================================================== */

products.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const page =
                button.dataset.page;


            switch(page) {

                case "videos":
                    showVideos();
                    break;

                case "photos":
                    showPhotos();
                    break;

                case "notes":
                    showNotes();
                    break;

                case "yokai":
                    showYokai();
                    break;

            }

        }
    );

});


/* =====================================================
   HOME
===================================================== */

homeButton.addEventListener(
    "click",
    home
);


/* =====================================================
   COIN
===================================================== */

coinButton.addEventListener(
    "click",
    insertCoin
);


function insertCoin() {

    dispenserMessage.textContent =
        "READING...";

    coinButton.disabled =
        true;


    /*
        Machine reaction
    */

    document.body.classList.add(
        "machine-working"
    );


    setTimeout(() => {

        dispenserMessage.textContent =
            "ガコン";

    }, 600);


    setTimeout(() => {

        dispenseMemory();

        dispenserMessage.textContent =
            "MEMORY DISPENSED";

        coinButton.disabled =
            false;

        document.body.classList.remove(
            "machine-working"
        );

    }, 1300);

}


/* =====================================================
   RANDOM MEMORY
===================================================== */

function dispenseMemory() {

    const memories = [

        {
            title:
                "MEMORY 001",

            text:
                "A vending machine was standing alone beside the road.\n\nNo one was using it.\n\nIt was still illuminated."
        },

        {
            title:
                "MEMORY 002",

            text:
                "The sound of coins belongs to another decade."
        },

        {
            title:
                "MEMORY 003",

            text:
                "A bicycle passed through the tunnel.\n\nFor a moment, it sounded like someone riding through 2005."
        },

        {
            title:
                "MEMORY 004",

            text:
                "The machine remembers things that were never entered into its database."
        },

        {
            title:
                "MEMORY 005",

            text:
                "Do not stand on the white line."
        },

        {
            title:
                "MEMORY 006",

            text:
                "The mountain is not the background."
        },

        {
            title:
                "MEMORY 007",

            text:
                "Something in the forest is recording."
        },

        {
            title:
                "MEMORY 008",

            text:
                "The archive rotates at night."
        }

    ];


    const memory =
        memories[
            Math.floor(
                Math.random() *
                memories.length
            )
        ];


    openArtifact(memory);

}


/* =====================================================
   RANDOM MACHINE FLICKER
===================================================== */

setInterval(
    () => {

        if (
            Math.random() < .3
        ) {

            const screenElement =
                document.getElementById(
                    "screen"
                );


            screenElement.style.opacity =
                ".55";


            setTimeout(
                () => {

                    screenElement.style.opacity =
                        "1";

                },
                80
            );

        }

    },
    6000
);


/* =====================================================
   INITIAL BOOT
===================================================== */

setTimeout(
    home,
    2200
);