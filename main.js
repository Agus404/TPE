"use strict"
const navList = document.querySelector(".nav-list");
const navToggle = document.querySelector(".nav-toggle");
let toggleIcon = document.querySelector(".material-symbols-outlined");
navToggle.addEventListener("click", () => {
    navList.classList.toggle("nav-open");
    let iconOpen = toggleIcon.getAttribute("data-open");
    
    if (iconOpen=="false") {
        toggleIcon.innerHTML="close";
        toggleIcon.setAttribute('data-open', true);
    } else {
        toggleIcon.innerHTML="menu";
        toggleIcon.setAttribute('data-open',false);
    }
});