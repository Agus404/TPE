"use strict"
function generateCaptcha() {
    let feedback = document.querySelector(".feedback");
    document.querySelector("#captcha").value = "";
    const randomChar = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let codigoCaptcha = "";
    for (let i = 0; i < 5; i++) {
        codigoCaptcha += randomChar[Math.floor(Math.random() * randomChar.length)];
    }
    document.querySelector(".preview").innerHTML = codigoCaptcha;

    const btnComprobar = document.querySelector("#btn-comprobar");
    btnComprobar.addEventListener("click", () => {
        const btnSubmit = document.querySelector("#btn-submit");
        const btnRecargar = document.querySelector("#btn-recargar");
        let captcha = document.querySelector("#captcha").value;
        if (captcha == codigoCaptcha) {
            feedback.innerHTML = "Captcha correcto";
            feedback.style.color = 'green';
            btnSubmit.disabled = false;
            btnComprobar.disabled = true;
            btnRecargar.disabled = true;
        } else {
            feedback.innerHTML = "Captcha incorrecto";
            feedback.style.color = 'red';
        }
    });
}

function enviar(e) {
    e.preventDefault();
    const form = document.querySelector("#form");
    let formData = new FormData(form);
    let nombre = formData.get("nombre");
    let email = formData.get("email");
    let observaciones = formData.get("observaciones");
    console.log(`Nombre: ${nombre}. Email: ${email}. Observaciones: ${observaciones}.`);
    document.querySelector(".feedback").innerHTML = "Enviado";
}

function cargarCaptcha() {
    document.querySelector("#btn-recargar").addEventListener("click", generateCaptcha);
    generateCaptcha();
    document.querySelector("#form").addEventListener("submit", (enviar));
}