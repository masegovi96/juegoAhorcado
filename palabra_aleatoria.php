<?php
session_start();
include "php/connection.php"; // Asegúrate de que este archivo tiene la conexión correcta

header("Content-Type: application/json");

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["error" => "Usuario no autenticado"]);
    exit();
}

$usuario_id = $_SESSION['usuario_id'];
$intentos_restantes = 6;
$estado = "jugando";
$fecha_inicio = date("Y-m-d H:i:s");

// Obtener una palabra aleatoria y su ID
$stmt = $conn->prepare("SELECT id, palabra FROM palabras ORDER BY RAND() LIMIT 1");
$stmt->execute();
$resultado = $stmt->get_result();
$fila = $resultado->fetch_assoc();
$stmt->close();

if (!$fila) {
    echo json_encode(["error" => "No se pudo obtener la palabra"]);
    exit();
}

$palabra_id = $fila["id"];
$palabra = $fila["palabra"];
$letras_adivinadas = "";

// Insertar la partida en la base de datos
$stmt = $conn->prepare("INSERT INTO partidas (usuario_id, palabra_id, letras_adivinadas, intentos_restantes, estado, fecha_inicio) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("iisiss", $usuario_id, $palabra_id, $letras_adivinadas, $intentos_restantes, $estado, $fecha_inicio);

if ($stmt->execute()) {
    $partida_id = $stmt->insert_id;

    echo json_encode([
        "success" => true,
        "partida_id" => $partida_id,
        "palabra" => $palabra,
        "intentos_restantes" => $intentos_restantes
    ]);
} else {
    echo json_encode(["error" => "No se pudo crear la partida", "sql_error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
