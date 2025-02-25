<?php
session_start();
include "php/connection.php";

header("Content-Type: application/json");

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["error" => "Usuario no autenticado"]);
    exit();
}

$usuario_id = $_SESSION['usuario_id'];
$partida_id = $_POST['partida_id'];
$letra = $_POST['letra'];

$stmt = $conn->prepare("SELECT palabra_id, letras_adivinadas, intentos_restantes FROM partidas WHERE id = ? AND usuario_id = ?");
$stmt->bind_param("ii", $partida_id, $usuario_id);
$stmt->execute();
$resultado = $stmt->get_result();
$partida = $resultado->fetch_assoc();
$stmt->close();

if (!$partida) {
    echo json_encode(["error" => "No se encontró la partida"]);
    exit();
}

$palabra_id = $partida['palabra_id'];
$letras_adivinadas = $partida['letras_adivinadas'];
$intentos_restantes = $partida['intentos_restantes'];

$stmt = $conn->prepare("SELECT palabra FROM palabras WHERE id = ?");
$stmt->bind_param("i", $palabra_id);
$stmt->execute();
$resultado = $stmt->get_result();
$palabra = $resultado->fetch_assoc()['palabra'];
$stmt->close();

if (strpos($palabra, $letra) !== false) {
    $letras_adivinadas .= $letra;
} else {
    $intentos_restantes--;
}

if ($intentos_restantes <= 0) {
    $estado = "perdido";
} elseif (strspn($palabra, $letras_adivinadas) == strlen($palabra)) {
    $estado = "ganado";
} else {
    $estado = "jugando";
}

$stmt = $conn->prepare("UPDATE partidas SET letras_adivinadas = ?, intentos_restantes = ?, estado = ? WHERE id = ?");
$stmt->bind_param("sisi", $letras_adivinadas, $intentos_restantes, $estado, $partida_id);
$stmt->execute();
$stmt->close();

echo json_encode([
    "success" => true,
    "letras_adivinadas" => $letras_adivinadas,
    "intentos_restantes" => $intentos_restantes,
    "estado" => $estado
]);
?>
