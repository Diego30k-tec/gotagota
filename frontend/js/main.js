// EVENTOS EN JAVASCRIPT (CLICK, CARGAR, KEY,)
document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:8080/api/clientes')
        .then(response => response.json())
        .then(data => {

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
                            <td>${cliente.apellido}</td>
                            <td>${cliente.nombre}</td>
                            <td>${cliente.dni}</td>
                            <td>${cliente.telefono}</td>
                            <td>${cliente.direccion}</td>
                            <td>
                                <!-- Editar (outline azul) -->
                                <button class="btn btn-outline-primary btn-sm">
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

    