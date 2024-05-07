"use strict"
const navList = document.querySelector(".nav-list");
const navToggle = document.querySelector(".nav-toggle");
navToggle.addEventListener("click", () => {
    navList.classList.toggle("hidden-mobile");
    navToggle.classList.toggle("nav-open");
});