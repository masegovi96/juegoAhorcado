<?php
include("./php/connection.php");

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $usuario = $_POST['usuario'];
    $contrasena = $_POST['contrasena'];

    try {
        // Aquí valido si los campos están vacíos
        if(empty($usuario) || empty($contrasena)){
            throw new Exception("Por favor, llena todos los campos");
        }

        // Aquí valido si el usuario ya existe en la base de datos
        $stmt = $conn -> prepare("SELECT * FROM usuarios WHERE nombre = ?");
        if (!$stmt) {
            throw new Exception("Error en la consulta: " . $conn->error);
        }
        $stmt -> bind_param('s', $usuario);
        $stmt -> execute();
        $stmt -> store_result();
        if($stmt -> num_rows > 0){
            throw new Exception("El usuario ya existe");
        }
        $stmt -> close();

        // Se prepara la consulta para insertar el registro en la base de datos
        $stmt = $conn -> prepare("INSERT INTO usuarios (nombre, contrasena, fecha_registro) VALUES (?, ?, NOW())");
        if (!$stmt) {
            throw new Exception("Error en la consulta: " . $conn->error);
        }

        //Se 
        $hashed_password = password_hash($contrasena, PASSWORD_DEFAULT);

        $stmt -> bind_param('ss', $usuario, $hashed_password);
        $stmt -> execute();
        if ($stmt->affected_rows <= 0) {
           throw new Exception("Error al registrar el usuario");
        }
        echo "Usuario registrado correctamente";
        $stmt -> close();

    } catch (Exception $e) {
        echo $e->getMessage();
        exit(); 
    }
}
?>