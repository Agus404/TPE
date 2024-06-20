"use strict"
document.addEventListener('DOMContentLoaded', () => {

    function selectTab(id) {
        document.querySelectorAll(".nav-element").forEach((item) => item.classList.remove("selected"));
        document.querySelectorAll(`#${id}`).forEach((item) => item.classList.add("selected"));
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
                if (id === 'contact')
                    cargarCaptcha();
                if (id === 'about')
                    cargarTabla();
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