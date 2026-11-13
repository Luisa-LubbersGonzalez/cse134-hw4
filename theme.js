const themeKey = "theme";

// use localStorage to save selected theme
// Handle failues when using localStorage with try/catch
function getSavedTheme() {
    try {
        return localStorage.getItem(themeKey);
    } catch (e) {
        console.error("Error reading saved theme:", e);
        return null;
    }
}

// Handle failues when using localStorage with try/catch
function saveTheme(theme) {
    try {
        localStorage.setItem(themeKey, theme);
    } catch (e) {
        console.error("Error saving theme:", e);
    }
}

//Apply selected theme even if saving fails
function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
}

let currentTheme = getSavedTheme();
if (currentTheme !== "dark") {
    currentTheme = "light";
}
applyTheme(currentTheme);

document.addEventListener("DOMContentLoaded", function () {
    const themeToggleButton = document.querySelector("#theme-toggle");

    if (themeToggleButton === null) {
        return;
    }

    function updateButtonText() {
        if (currentTheme === "dark") {
            themeToggleButton.textContent = "Switch to Light Theme";
        } else {
            themeToggleButton.textContent = "Switch to Dark Theme";
        }
    }

    updateButtonText();
    themeToggleButton.hidden = false;

    // add event listener to toggle the theme switch functionality
    themeToggleButton.addEventListener("click", function () {
        if (currentTheme === "dark") {
            currentTheme = "light";
        } else {
            currentTheme = "dark";
        }

        //View Transition API
        if (document.startViewTransition) {
            document.startViewTransition(function () {
                applyTheme(currentTheme);
                updateButtonLabel();
            });
        } else {
            applyTheme(currentTheme);
            updateButtonLabel();
        }
        saveTheme(currentTheme);
    });
})