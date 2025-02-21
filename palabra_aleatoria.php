<?php
    include "php/connection.php";

    $stmt = $conn -> prepare("SELECT palabra FROM palabras ORDER BY RAND () LIMIT 1");
    $stmt -> execute();
    $resultado = $stmt -> get_result();
    $fila = $resultado -> fetch_assoc();

    if($fila){
        echo json_encode(["palabra" => $fila["palabra"]]);
    }else{
        echo json_encode(["error" => "No se pudo obtener la palabra"]);
    }

    $stmt -> close();
?>