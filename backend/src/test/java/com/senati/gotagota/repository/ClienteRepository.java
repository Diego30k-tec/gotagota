package com.senati.gotagota.repository;


import com.senati.gotagota.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//Anotacion @repository INTERFAZ COMO LA CAPA DE ACCESO A LA BASE DE DATOA
@Repository

public interface ClienteRepository extends JpaRepository<Cliente, Long>{
    //no necesitamos escribir nada aqui
    // JpaRepository ya tiene todo lo basico

}
