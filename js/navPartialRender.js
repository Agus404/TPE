"use strict"
document.addEventListener('DOMContentLoaded', () => {

    function selectTab(id) {
        document.querySelectorAll(".nav-element").forEach((item) => item.classList.remove("selected"));
        document.querySelector(`#${id}`).classList.add("selected");
    }

    function cargarButtons() {
        const btnAbout = document.querySelector(".btn-about");
        btnAbout.addEventListener("click", (event) =>push(event.target.getAttribute("data-href")));

        const btnContact = document.querySelector(".btn-contact");
        btnContact.addEventListener("click", (event) =>push(event.target.getAttribute("data-href")));
    }

    async function loadContent(id) {
        const container = document.querySelector("#load");
        container.innerHTML = `<h1 class="loading">Cargando ${id}...</h1>`;
        try {
            let response = await fetch(`${id}.html`);
            if (response.ok) {
                let content = await response.text();
                container.innerHTML = content;
                if (id ==="home")
                    cargarButtons();
                if (id === 'contact')
                    cargarCaptcha();
                if (id === 'about')
                    cargarTabla();
            } else {
                container.innerHTML = '<h1 class="loading">Página no encontrada</h1>';
            }
        } catch (error) {
            container.innerHTML = '<h1 class="loading">Error de conexión</h1>';
        }
    }

    function push(id) {
        selectTab(id);
        loadContent(id);
        window.history.pushState({ id }, id, `${id}`);
    }

    
    window["home"].addEventListener("click", (event) => push(event.target.getAttribute("data-href")));
    window["about"].addEventListener("click", (event) => push(event.target.getAttribute("data-href")));
    window["contact"].addEventListener("click", (event) => push(event.target.getAttribute("data-href")));

    window.addEventListener("popstate", (event) => {
        let stateId = event.state.id;
        selectTab(stateId);
        loadContent(stateId);
    });

    push('home');
});