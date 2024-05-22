"use strict"
document.addEventListener('DOMContentLoaded', () => {

    const btnRecargar = document.querySelector("#btn-recargar");
    let feedback = document.querySelector(".feedback");
    btnRecargar.addEventListener("click",generateCaptcha);
    generateCaptcha();
    function generateCaptcha() {
        document.querySelector("#captcha").value="";
        const randomChar = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let codigoCaptcha = "";
        for (let i = 0; i < 5; i++) {
            codigoCaptcha += randomChar[Math.floor(Math.random() * randomChar.length)];
        }
        document.querySelector(".preview").innerHTML=codigoCaptcha;
        
        const btnComprobar = document.querySelector("#btn-comprobar");
        btnComprobar.addEventListener("click", () => {
            const btnSubmit = document.querySelector("#btn-submit");
            let captcha = document.querySelector("#captcha").value;
            if (captcha==codigoCaptcha) {
                feedback.innerHTML="Captcha correcto";
                feedback.style.color = 'green';
                btnSubmit.disabled=false;
                btnComprobar.disabled=true;
                btnRecargar.disabled=true;
            } else {
                feedback.innerHTML="Captcha incorrecto";
                feedback.style.color = 'red';
            }
        });
    }

    const form = document.querySelector("#form");
    form.addEventListener("submit",enviar);
    function enviar(e) {
        e.preventDefault();
        feedback.innerHTML="Enviado";
    }

});