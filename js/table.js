"use strict"
const url = new URL('https://6671f0a2e083e62ee43d9e57.mockapi.io/tpe/services');
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
    "servicio": "Marketing y campañas publicitarias",
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

async function obtenerTabla() {
    const tabla = document.querySelector("#tabla-presupuesto");
    // tabla.innerHTML = `Cargando...`;
    try {
        let res = await fetch(url);
        if (res.ok) {
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
            // tabla.innerHTML += `<tr><td></td><td></td><td></td><td>TOTAL:  $${total}</td><td></td></tr>`;
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
            obtenerTabla();
        }
    } catch (error) {
        console.log(error);
    }
}

async function agregarCategoria(cat) {
    // let categoria = objeto.categoria;
    // alert(cat);
    // document.querySelectorAll(`.${categoria}`).forEach((item) => agregarElemento(obtenerObjeto(objetosServicios)));

    // for (const element of objetosServicios) {
    //     alert(objetosServicios[element].servicio);
    //     if (objetosServicios[element].categoria == cat) {
    //         alert(objetosServicios[element].servicio);
    //         agregarElemento(objetosServicios[element]);
    //     }
    // }

    for (let index = 0; index < objetosServicios.length; index++) {
        const element = objetosServicios[index];
        if (element.categoria==cat) {
            await agregarElemento(element);
            // try {
            //     let res = await fetch(url, {
            //        'method': 'POST',
            //         'headers': { 'Content-Type': 'application/json' },
            //         'body': JSON.stringify(element) 
            //     });
            //     if (res.status == 201) {
            //         console.log(`Agregado ${element.servicio}`);
            //     }
            // } catch (error) {
            //     console.log(error);
            // }
        }
    }
    // obtenerTabla();
}

async function eliminarElemento(event) {
    let id = event.target.getAttribute("data-id");
    alert(id);
    try {
        let res = await fetch(`${url}/${id}`, {
            'method': 'DELETE',
        });
        if (res.status === 200) {
            obtenerTabla();
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
            obtenerTabla();
        }
    } catch (error) {
        console.log("Error");
    }
}

function cargarTabla() {
    obtenerTabla();
    const btnAgregar = document.querySelector("#btn-agregar");
    btnAgregar.addEventListener("click", () => { agregarElemento(obtenerObjeto()) });
    const btnAgregarCategoria = document.querySelector("#btn-agregar-categoria");
    btnAgregarCategoria.addEventListener("click", () => { agregarCategoria(obtenerObjeto(objetosServicios).categoria) });
    // setTimeout(() =>{
    //     let btnEliminar = document.querySelectorAll(".btn-eliminar");
    //     btnEliminar.forEach(btn => { btn.addEventListener("click",eliminarElemento);});
    //     document.querySelectorAll(".btn-eliminar").forEach(btn => { btn.addEventListener("click",eliminarElemento);});
    // },1000);
}
