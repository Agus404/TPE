"use strict"
document.addEventListener('DOMContentLoaded', () => {

    function selectTab(id) {
        document.querySelectorAll(".nav-element").forEach((item) => item.classList.remove("selected"));
        document.querySelectorAll(`#${id}`).forEach((item) => item.classList.add("selected"));
    }

    function cargarCaptcha() {
        const btnRecargar = document.querySelector("#btn-recargar");
        let feedback = document.querySelector(".feedback");
        btnRecargar.addEventListener("click", generateCaptcha);
        generateCaptcha();
        function generateCaptcha() {
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

        const form = document.querySelector("#form");
        form.addEventListener("submit", enviar);
        function enviar(e) {
            e.preventDefault();
            feedback.innerHTML = "Enviado";
        }
    }

    async function loadContent(id) {
        // const container = document.querySelector("main");
        const container = document.querySelector("#load");
        container.innerHTML = `Cargando ${id}...`;
        // let url = id+".html";
        try {
            let response = await fetch(`${id}.html`);
            if (response.ok) {
                let content = await response.text();
                container.innerHTML = content;
                if (id == 'contact')
                    cargarCaptcha();
            } else {
                container.innerHTML = "Página no encontrada";
            }
        } catch (error) {
            container.innerHTML = "Error de conexión";
        }
    }

    function push(event) {
        let id = event.target.id;
        selectTab(id);
        loadContent(id);
        window.history.pushState({ id }, id, `${id}`);
    }

    // window.onload = (event) =>{
    window["home"].addEventListener("click", (event) => push(event));
    window["about"].addEventListener("click", (event) => push(event));
    window["contact"].addEventListener("click", (event) => push(event));
    // };

    window.addEventListener("popstate", (event) => {
        let stateId = event.state.id;
        selectTab(stateId);
        loadContent(stateId);
    });

    selectTab("home");
    loadContent("home");
    window.history.pushState("home", "home", "/home");
});