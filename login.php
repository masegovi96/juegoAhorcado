<?php
include("./php/connection.php");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $usuario = $_POST['usuario'];
    $contrasena = $_POST['contrasena'];

    try {
        if (empty($usuario) || empty($contrasena)) {
            throw new Exception("Por favor, llena todos los campos");
        }


        $stmt = $conn->prepare("SELECT id, contrasena FROM usuarios WHERE nombre = ?");
        if (!$stmt) {
            throw new Exception("Error en la consulta: " . $conn->error);
        }
        $stmt->bind_param('s', $usuario);
        $stmt->execute();
        $stmt->store_result();
        
        if ($stmt->num_rows == 0) {
            throw new Exception("El usuario no existe");
        }

        $stmt->bind_result($id, $hashed_password);
        $stmt->fetch();
        $stmt->close();

        // Verificar la contraseña
        if (!password_verify($contrasena, $hashed_password)) {
            throw new Exception("Contraseña incorrecta");
        }


        session_start();
        $_SESSION['usuario_id'] = $id;
        $_SESSION['usuario_nombre'] = $usuario;

        echo json_encode(["success" => true, "message" => "Inicio de sesión exitoso"]);
        exit();

    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
        exit();
    }
}
?>
