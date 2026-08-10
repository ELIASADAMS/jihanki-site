const screenContent = document.getElementById("screen-content");
const memoryLabel = document.getElementById("memory-label");

function setMemoryLabel(text) {
    memoryLabel.textContent = text;
}

function homeScreen() {

    closeArtifact();

    screenContent.innerHTML = `
        <div class="boot">
            <div class="boot-title">自販機</div>
            <div>MEMORY ARCHIVE</div>
            <div class="boot-line">INSERT COIN / SELECT MEMORY</div>
        </div>
    `;

    setMemoryLabel("MEMORY");
}

function coinAnimation() {

    setMemoryLabel("READING");

    screenContent.innerHTML = `
        <div class="screen-message">
            INSERTED<br>
            COIN ACCEPTED
        </div>
    `;

    setTimeout(() => {
        homeScreen();
    }, 900);
}

function bindMachineControls() {

    document.querySelectorAll("[data-action]").forEach(button => {

        button.addEventListener("click", () => {

            const action = button.dataset.action;

            if (action === "home") {
                homeScreen();
                return;
            }

            if (action === "coin") {
                coinAnimation();
                return;
            }

            showArchive(action);
            setMemoryLabel(action.toUpperCase());
        });
    });
}
