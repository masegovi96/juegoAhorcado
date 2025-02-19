<?php
include("./php/connection.php");
header("Content-Type: application/json");

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $usuario = $_POST['usuario'];
    $contrasena = $_POST['contrasena'];

    try {
        if(empty($usuario) || empty($contrasena)){
            throw new Exception("Por favor, llena todos los campos");
        }

        // Verificar si el usuario ya existe
        $stmt = $conn->prepare("SELECT * FROM usuarios WHERE nombre = ?");
        if (!$stmt) {
            throw new Exception("Error en la consulta: " . $conn->error);
        }
        $stmt->bind_param('s', $usuario);
        $stmt->execute();
        $stmt->store_result();
        
        if($stmt->num_rows > 0){
            throw new Exception("El usuario ya existe");
        }
        $stmt->close();

        // Insertar usuario
        $stmt = $conn->prepare("INSERT INTO usuarios (nombre, contrasena, fecha_registro) VALUES (?, ?, NOW())");
        if (!$stmt) {
            throw new Exception("Error en la consulta: " . $conn->error);
        }

        $hashed_password = password_hash($contrasena, PASSWORD_DEFAULT);
        $stmt->bind_param('ss', $usuario, $hashed_password);
        $stmt->execute();

        if ($stmt->affected_rows <= 0) {
            throw new Exception("Error al registrar el usuario");
        }

        $stmt->close();

        // Enviar respuesta JSON de éxito
        echo json_encode(["success" => true, "message" => "Usuario registrado correctamente"]);
        exit();

    } catch (Exception $e) {
        header("Content-Type: application/json");
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
        exit();
    }
}
?>
