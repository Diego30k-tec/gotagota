// EVENTOS EN JAVASCRIPT (CLICK, CARGAR, KEY,)
document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:8080/api/clientes')
        .then(response => response.json())
        .then(data => {

            // Buscamos el ID que pusimos en el HTML y le asignamos el tamaño del array 'data'
            document.getElementById('totalClientes').innerText = data.length;

            //console.log('Datos:', data);
            const elemento = document.getElementById("table-cliente")
            //elemento.innerHTML = JSON.stringify(data);
            //console.log(elemento)

            //DOM -> <tbody id="table-cliente">
            for (let i = 0; i < data.length; i++) {
                //console.log(data[i]) Muestra en la consola
                //(data[i]) muestra en forma de array
                let cliente = data[i]
                // alt + 96
                let fila = `
                            <tr>
                            <td>${cliente.id}</td>
                            <td>${cliente.nombre}</td>
                            <td>${cliente.apellido}</td>
                            <td>${cliente.dni}</td>
                            <td>${cliente.telefono}</td>
                            <td>${cliente.direccion}</td>
                            <td>
                                <!-- Editar (outline azul) -->
                                <button 
                                    class="btn btn-outline-primary btn-sm"
                                    id="btnEditar"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalEditarCliente"
                                    data-idcli=${cliente.id}
                                    data-nomcli=${cliente.nombre}
                                    data-apellcli=${cliente.apellido}
                                    data-dnicli=${cliente.dni}
                                    data-telfcli=${cliente.telefono}
                                    data-direcli="${cliente.direccion}"
                                    >
                                    <i class="fa-solid fa-pen-to-square"></i> Editar
                                </button>

                                <!-- Eliminar (outline rojo) -->
                                <button id="btnEliminar" data-idcliente = ${cliente.id} class="btn btn-outline-danger btn-sm">
                                    <i class="fa-solid fa-trash"></i> Eliminar
                                </button>
                            </td>
                            </tr>
                            `
                elemento.innerHTML += fila
                //console.log(data[i]) //muestra lso datos en la consola
            }
        })

        //DOM (document object model) Dar la accion al boton de guardar clientes
        const btnSaveCliente = document.getElementById("btn-crearcliente")
        btnSaveCliente.addEventListener("click", guardarCliente);

});

//EVENTO DE CLICK EN JAVASCRIPT
//Creamos una variable que almacene el DOM de ese elemento del boton
document.addEventListener("click", function(e){
    const btnDelete = e.target.closest("#btnEliminar");
    if (btnDelete) { //TRUE o 1
        alert("Eliminando...")
        const id = btnDelete.dataset.idcliente;
        //fetch("http://localhost:8080/api/clinetes/${id}"
        fetch(`http://localhost:8080/api/clientes/${id}`, {
            method: 'DELETE'
        })

        .then(response => {
            if (response.ok) {
                alert('Cliente eliminado correctamente')
                location.reload(); //Recargala pagina para reflejar los cambios
            } else{
                alert('Error al eliminarel cliente');
            }})

    }
});

//GET and POST los traemos con Json
// CREAMOS UNA FUNCION BASICA
function guardarCliente() {
    const nombre = document.getElementById("c_nombre").value;
    const apellido = document.getElementById("c_apellido").value;
    const dni = document.getElementById("c_dni").value;
    const telefono = document.getElementById("c_telefono").value;
    const direccion = document.getElementById("c_direccion").value;
        fetch(`http://localhost:8080/api/clientes`, {
            method: 'POST',
            headers :{"Content-Type":"application/json"},
            body: JSON.stringify({nombre, apellido, dni, telefono, direccion})
        }).then(response => {
            console.log(response) // Mensaje en la consola (209)
            if (response.ok) {
                location.reload()
            }else{
                alert("Error: no se pudo guardar")
            }
        });
}

//Funcion para poner los datos en el input del FORMULARIO actualizar
document.addEventListener('click', function (e) {
    
    // Verificamos si el clic fue en un botón de editar (buscando los atributos data)
    if (e.target.closest('#btnEditar')) {
        const btnEditar = e.target.closest('#btnEditar');

        // Extraemos los datos que guardaste en los atributos data-
        const id_cli = btnEditar.dataset.idcli;
        const nom_cli = btnEditar.dataset.nomcli;
        const apell_cli = btnEditar.dataset.apellcli;
        const dni_cli = btnEditar.dataset.dnicli;
        const telf_cli = btnEditar.dataset.telfcli;
        const dire_cli = btnEditar.dataset.direcli;

        // Rellenamos el formulario usando los IDs que pusiste en el HTML
        document.getElementById('c_u_id').value = id_cli;
        document.getElementById('c_u_nombre').value = nom_cli;
        document.getElementById('c_u_apellido').value = apell_cli;
        document.getElementById('c_u_dni').value = dni_cli;
        document.getElementById('c_u_telefono').value = telf_cli;
        document.getElementById('c_u_direccion').value = dire_cli;
        
        // Si necesitas el ID para actualizar luego, guárdalo en una variable global
        // o en un campo oculto en el formulario.
        console.log("Formulario cargado para el cliente:", nom_cli);

    }
});

//Funcion actualizar datos
// Buscamos el botón de "Actualizar" por su ID
const btnActualizar = document.getElementById("btn-Editarcliente");

btnActualizar.addEventListener("click", function() {    //El boton actualizar
    // 1. Capturamos el ID oculto y los valores de los inputs
    const idCliente = document.getElementById('c_u_id').value;

    const objetoCliente = {
        id: idCliente,
        nombre: document.getElementById('c_u_nombre').value,
        apellido: document.getElementById('c_u_apellido').value,
        dni: document.getElementById('c_u_dni').value,
        telefono: document.getElementById('c_u_telefono').value,
        direccion: document.getElementById('c_u_direccion').value
    };

    // 2. Enviamos el "paquete" a Spring Boot usando PUT (quiero actualizar algo que ya existe)
    fetch('http://localhost:8080/api/clientes/' + idCliente, {  //dirección exacta de la casa //es como poner el número de departamento
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' // Le avisamos que enviamos un JSON
        },
        body: JSON.stringify(objetoCliente) // Convertimos el objeto a texto
    })
    .then(res => {  //Respuesta del servidor
        if (res.ok) {
            alert("¡Cliente actualizado con éxito!");
            location.reload(); // Recarga la página para refrescar la tabla
        } else {
            alert("Error al actualizar. Revisa la consola.");
        }
    })
    .catch(error => console.error("Error:", error));
});