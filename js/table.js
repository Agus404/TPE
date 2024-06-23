"use strict"
const url = new URL('https://6671f0a2e083e62ee43d9e57.mockapi.io/tpe/services');
// let page = 1;
const objetosServicios = [{
    "servicio": "Estrategia de marca",
    "categoria": "Estrategia",
    "costo": 300
},
{
    "servicio": "Estrategia de producto",
    "categoria": "Estrategia",
    "costo": 200
},
{
    "servicio": "Estrategias de contenido",
    "categoria": "Estrategia",
    "costo": 100
},
{
    "servicio": "Investigacion y análisis",
    "categoria": "Estrategia",
    "costo": 200
},
{
    "servicio": "Identidad de marca",
    "categoria": "Branding",
    "costo": 250
},
{
    "servicio": "Narrativa de marca",
    "categoria": "Branding",
    "costo": 150
},
{
    "servicio": "Dirección creativa",
    "categoria": "Branding",
    "costo": 150
},
{
    "servicio": "Identidad audiovisual",
    "categoria": "Branding",
    "costo": 100
},
{
    "servicio": "Campañas publicitarias",
    "categoria": "Branding",
    "costo": 150
},
{
    "servicio": "Productos digitales",
    "categoria": "Digital",
    "costo": 350
},
{
    "servicio": "Posicionamiento digital",
    "categoria": "Digital",
    "costo": 250
},
{
    "servicio": "Diseño UI/UX",
    "categoria": "Digital",
    "costo": 200
},
{
    "servicio": "Desarrollo web",
    "categoria": "Digital",
    "costo": 300
},
{
    "servicio": "Desarrollo de aplicaciones",
    "categoria": "Digital",
    "costo": 350
}];

async function obtenerTabla(urlTabla) {
    // const urlParams = new URL(urlTabla);
    // urlParams.searchParams.append('page', page);
    // urlParams.searchParams.append('limit', 10);
    
    try {
        let res = await fetch(urlTabla);
        if (res.ok) {
            const tabla = document.querySelector("#tabla-presupuesto");
            tabla.innerHTML = ' ';
            let json = await res.json();
            let total = 0;
            for (const element of json) {
                let servicio = element.servicio;
                let categoria = element.categoria;
                let costo = element.costo;
                let id = element.id;
                tabla.innerHTML += `<tr><td>${id}</td><td>${categoria}</td><td>${servicio}</td><td>$${costo}</td><td><button type="button" class="btn-eliminar btn-table" data-id="${id}">X</button><button type="button" class="btn-modificar btn-table" data-id="${id}">◄</button></td></tr>`
                total += costo;
            }
            document.querySelector("#total").innerHTML=`TOTAL: $${total}`;
            let btnEliminar = document.querySelectorAll(".btn-eliminar");
            btnEliminar.forEach(btn => { btn.addEventListener("click", eliminarElemento); });
            let btnModificar = document.querySelectorAll(".btn-modificar");
            btnModificar.forEach(btn => { btn.addEventListener("click", modificarElemento); });
        } else {
            console.log("Página no encontrada");
        }
    } catch (error) {
        console.log("Error de conexión");
    }
}

function obtenerObjeto() {
    let listaServicio = document.querySelector("#service").value;
    let i = 0;
    while (objetosServicios[i].servicio != listaServicio) {
        i++;
    }

    let objeto = {
        "servicio": objetosServicios[i].servicio,
        "categoria": objetosServicios[i].categoria,
        "costo": objetosServicios[i].costo
    }

    return objeto;
}

async function agregarElemento(objeto) {
    let requestOptions = {
        'method': 'POST',
        'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify(objeto)
    }

    try {
        let res = await fetch(url, requestOptions);
        if (res.status == 201) {
            obtenerTabla(url);
        }
    } catch (error) {
        console.log(error);
    }
}

async function agregarCategoria(cat) {

    for (let index = 0; index < objetosServicios.length; index++) {
        const element = objetosServicios[index];
        if (element.categoria==cat) {
            await agregarElemento(element);
        }
    }
}

async function eliminarElemento(event) {
    let id = event.target.getAttribute("data-id");
    try {
        let res = await fetch(`${url}/${id}`, {
            'method': 'DELETE',
        });
        if (res.status === 200) {
            obtenerTabla(url);
        }
    } catch (error) {
        console.log("Error");
    }
}

async function modificarElemento(event){
    let id = event.target.getAttribute("data-id");
    let requestOptions = {
        'method': 'PUT',
        'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify(obtenerObjeto(objetosServicios))
    }

    try {
        let res = await fetch(`${url}/${id}`, requestOptions);
        if (res.status === 200){
            obtenerTabla(url);
        }
    } catch (error) {
        console.log("Error");
    }
}

function filter(event) {
    let id = event.target.getAttribute("data-filter")
    document.querySelectorAll(".tag").forEach((item) => item.classList.remove("selected"));
    if (id==" ") {
        document.querySelector("#reset-tags").classList.add("hidden");
        obtenerTabla(url);
    } else {
        document.querySelector("#reset-tags").classList.remove("hidden");
        event.target.classList.add("selected");
        const params = new URL(url);
        params.searchParams.append('categoria', id);
        obtenerTabla(params);
    }
}

// function actualizarPage(event) {
//     const id = event.target.id;
//     if (id=='prev' && page>1)
//         page--;
//     if (id=='next')
//         page++;
//     obtenerTabla(url);
// }

function cargarTabla() {
    obtenerTabla(url);
    const btnAgregar = document.querySelector("#btn-agregar");
    btnAgregar.addEventListener("click", () => { agregarElemento(obtenerObjeto()) });
    const btnAgregarCategoria = document.querySelector("#btn-agregar-categoria");
    btnAgregarCategoria.addEventListener("click", () => { agregarCategoria(obtenerObjeto(objetosServicios).categoria) });
    const btnFilter = document.querySelectorAll(".tag");
    btnFilter.forEach((btn) => btn.addEventListener("click", filter));
    // const btnPagination = document.querySelectorAll(".btn-pagination");
    // btnPagination.forEach((item) => item.addEventListener("click",actualizarPage));
}
