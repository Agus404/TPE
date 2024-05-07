"use strict"
const navList = document.querySelector(".nav-list");
const navToggle = document.querySelector(".nav-toggle");
navToggle.addEventListener("click", () => {
    navList.classList.toggle("nav-open");
    navToggle.classList.toggle("nav-open");
});