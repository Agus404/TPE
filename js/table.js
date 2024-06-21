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
                    tabla.innerHTML += `<tr><td>${id}</td><td>${categoria}</td><td>${servicio}</td><td>$${costo}</td><td><button type="button" class="btn-eliminar">X</button></td></tr>`
                    total+=element.costo;
                }
                tabla.innerHTML+=`<tr><td></td><td></td><td>TOTAL:  $${total}</td><td></td><td></td></tr>`
            } else {
                console.log("Página no encontrada");
            }
        } catch (error) {
            console.log("Error de conexión");
        }
    }
    
    async function agregarElemento() {
        let url = new URL('https://6671f0a2e083e62ee43d9e57.mockapi.io/tpe/services');
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
        let listaServicio = document.querySelector("#service").value;
        let i = 0;
        while (objetosServicios[i].servicio!=listaServicio) {
            i++;
        }
        
        let objeto = {
            "servicio": objetosServicios[i].servicio,
            "categoria": objetosServicios[i].categoria,
            "costo": objetosServicios[i].costo
        }
        
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
                obtenerTabla();
            }
         } catch (error) {
            console.log(error);
         }   
    }

    function cargarTabla() {
        obtenerTabla();
        const btnAgregar = document.querySelector("#btn-agregar");
        btnAgregar.addEventListener("click", agregarElemento);
    }
