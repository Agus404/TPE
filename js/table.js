"use strict"
    async function obtenerTabla() {
        // const container = document.querySelector("main");
        const tabla = document.querySelector("#tabla-presupuesto");
        // tabla.innerHTML = `Cargando...`;
        // let url = id+".html";
        const url = new URL('https://6671f0a2e083e62ee43d9e57.mockapi.io/tpe/services');
        tabla.innerHTML='';
        try {
            let response = await fetch(url);
            if (response.ok) {
                let json = await response.json();
                // container.innerHTML = content;
                console.log(json);
                let total=0;
                for(const element of json){
                    let servicio = element.servicio;
                    let categoria = element.categoria;
                    let costo = element.costo;
                    let id = element.id;
                    tabla.innerHTML += `<tr><td>${id}</td><td>${categoria}</td><td>${servicio}</td><td>${costo}</td><td><button type="button" class="btn-eliminar">X</button></td></tr>`
                    total+=element.costo;
                }
                tabla.innerHTML+=`<tr><td></td><td></td><td>TOTAL:  ${total}</td><td></td></tr>`
            } else {
                console.log("Página no encontrada");
            }
        } catch (error) {
            console.log("Error de conexión");
        }
    }

    async function agregarElemento() {
        let url = new URL('https://6671f0a2e083e62ee43d9e57.mockapi.io/tpe/services');
        let listaServicios = document.querySelector("#service");
        // let objeto = {
        //     "servicio": ,
        //     "categoria": ,
        //     "costo": ,
        //     "id":
        // }
        let requestOptions = {
            'method': 'POST',
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON.stringify(objeto)
         }
        
         try {
            let res = await fetch(url, requestOptions);
         
            if (res.status == 201) {
                cargarTabla();
            }
         } catch (error) {
            console.log(error);
         }   
    }

    function cargarTabla() {
        obtenerTabla();
    }
