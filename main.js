"use strict"
document.addEventListener('DOMContentLoaded', () => {
    
    // TEMA OSCURO / TEMA CLARO
    const storageTheme = localStorage.getItem('localTheme');
    const systemColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const newTheme = storageTheme ?? systemColorScheme;
    document.documentElement.setAttribute('data-theme', newTheme);

    const btnTheme = document.querySelector("#btn-theme");
    const root = document.documentElement;
    btnTheme.addEventListener("click", toggleTheme);

    function toggleTheme() {
        let theme = root.getAttribute("data-theme");
        if (theme == 'light') {
            theme = 'dark';
        } else {
            theme = 'light';
        }
        root.setAttribute("data-theme", theme);
        localStorage.setItem('localTheme', theme);
    }

    //OCULTAR NAV EN MOBILE
    const navList = document.querySelector(".nav-list");
    const navToggle = document.querySelector(".nav-toggle");
    let toggleIcon = document.querySelector(".material-symbols-outlined");
    navToggle.addEventListener("click", () => {
        navList.classList.toggle("nav-open");
        let iconOpen = toggleIcon.getAttribute("data-open");

        if (iconOpen == "false") {
            toggleIcon.innerHTML = "close";
            toggleIcon.setAttribute('data-open', true);
        } else {
            toggleIcon.innerHTML = "menu";
            toggleIcon.setAttribute('data-open', false);
        }
    });
})
