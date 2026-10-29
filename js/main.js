
/* =========================================
   SG COLLECTION
   File: js/main.js
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const introScreen = document.getElementById("introScreen");
    const enterButton = document.getElementById("enterButton");
    const glassesStage = document.getElementById("glassesStage");

    // Check that the required elements exist.
    if (!introScreen || !enterButton || !glassesStage) {
        console.error("SG Collection: Required elements were not found.");
        return;
    }

    let isEntering = false;

    enterButton.addEventListener("click", () => {
        // Prevent repeated clicks during the animation.
        if (isEntering) return;

        isEntering = true;
        enterButton.disabled = true;

        // Start the sunglasses split animation.
        introScreen.classList.add("is-entering");

        // Continue to the shop after the transition.
        window.setTimeout(() => {
            window.location.href = "shop.html";
        }, 1000);
    });

    // Allow clicking the sunglasses image to enter the shop.
    glassesStage.addEventListener("click", () => {
        if (!isEntering) {
            enterButton.click();
        }
    });

    // Keyboard accessibility for the sunglasses image.
    glassesStage.setAttribute("tabindex", "0");
    glassesStage.setAttribute("role", "button");
    glassesStage.setAttribute("aria-label", "Explore the SG Collection");

    glassesStage.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();

            if (!isEntering) {
                enterButton.click();
            }
        }
    });
});
