package com.senati.gotagota.controller;
import com.senati.gotagota.entity.Cliente;
import com.senati.gotagota.service.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//3 ANOTACIONES
//Indica que esta clase maneja peticiones HTTPS y DEVUELVE JSON
@RestController
// Define la URL Base de todos los END-POINT de esta clase
@RequestMapping("api/clientes")
// Esta anotacion permite que el front-end pueda llamar a esta API
// Si no ponemos esto, el navegador bloquea las peticiones por politicas CORS
@CrossOrigin(origins = "*") //si esto no esta los demas no funciona
public class ClienteController {
    //DECLARAMOS UNA VARIABLE DEFINIDA
    // Inyectamos el servicio para acceder a la logica del negocio
    private final ClienteService clienteService;
    public ClienteController(ClienteService clienteService){
        this.clienteService = clienteService;
    }
    //GET /api/clientes -> devuelve todos los clientes en formato JSON /consultas
    @GetMapping
    public List<Cliente> listar() {return clienteService.listarTodos();}

    @PostMapping
    public ResponseEntity<Cliente> crear(@RequestBody Cliente cliente){
        return ResponseEntity.ok(clienteService.crearCliente(cliente));//se crea el metodo crearCliente
    }
    //void no retorna

    // DELETE /api/clientes/{id} -> elimina un cliente por su ID Metodo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id){
        clienteService.eliminarCliente(id);
        return ResponseEntity.noContent().build();
    }


    // PUT / Recibe los PUT para acualizar
    @PutMapping("/{id}")    //variable en la URL //Spring captura ese valor y en cuentra el cliente
                                    //el numero de la url       //toma el JSON y lo
                                    // y lo almacena en id      //convierte en objeto JAVA
    public ResponseEntity<Cliente> actualizar(@PathVariable Long id, @RequestBody Cliente cliente) {
        // Nos aseguramos de que el ID de la URL sea el mismo que el del objeto
        cliente.setId(id);
        return ResponseEntity.ok(clienteService.actualizarCliente(cliente));
    }

}

