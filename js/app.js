document.addEventListener("DOMContentLoaded", () => {

    bindMachineControls();

    document
        .getElementById("artifact-close")
        .addEventListener("click", closeArtifact);

    document
        .getElementById("artifact")
        .addEventListener("click", event => {

            if (event.target.id === "artifact") {
                closeArtifact();
            }
        });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeArtifact();
        }
    });

});
