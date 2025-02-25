<?php
session_start();
include "php/connection.php";

header("Content-Type: application/json");

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["error" => "Usuario no autenticado"]);
    exit();
}

$usuario_id = $_SESSION['usuario_id'];
$partida_id = $_POST['partida_id'];
$letra = strtolower($_POST['letra']); // Convertir la letra a minúscula para evitar errores de comparación

// Obtener la partida actual
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

// Obtener la palabra completa
$stmt = $conn->prepare("SELECT palabra FROM palabras WHERE id = ?");
$stmt->bind_param("i", $palabra_id);
$stmt->execute();
$resultado = $stmt->get_result();
$palabra = strtolower($resultado->fetch_assoc()['palabra']); // Convertir a minúscula
$stmt->close();

$palabraArray = str_split($palabra);
$letrasAcertadas = str_split($letras_adivinadas);

// Si la letra ya se adivinó antes, no hacer nada
if (in_array($letra, $letrasAcertadas)) {
    echo json_encode(["error" => "Letra ya ingresada"]);
    exit();
}

// Si la letra está en la palabra, agregarla a las letras adivinadas
if (in_array($letra, $palabraArray)) {
    $letras_adivinadas .= $letra; // Agregar la letra correcta
} else {
    $intentos_restantes--; // Solo descontar intentos si la letra es incorrecta
}

// Construir la palabra con guiones y letras descubiertas
$palabraMostrada = "";
$palabraAdivinada = true; // Se asumirá que la palabra se ha adivinado

foreach ($palabraArray as $letraPalabra) {
    if (strpos($letras_adivinadas, $letraPalabra) !== false) {
        $palabraMostrada .= $letraPalabra . " ";
    } else {
        $palabraMostrada .= "_ ";
        $palabraAdivinada = false; // Todavía hay letras por adivinar
    }
}

// Determinar el estado del juego
if ($intentos_restantes <= 0) {
    $estado = "perdido";
} elseif ($palabraAdivinada) {
    $estado = "ganado";
} else {
    $estado = "jugando";
}

// Actualizar la base de datos con los cambios
$stmt = $conn->prepare("UPDATE partidas SET letras_adivinadas = ?, intentos_restantes = ?, estado = ? WHERE id = ?");
$stmt->bind_param("sisi", $letras_adivinadas, $intentos_restantes, $estado, $partida_id);
$stmt->execute();
$stmt->close();

echo json_encode([
    "success" => true,
    "letras_adivinadas" => $letras_adivinadas,
    "palabra_mostrada" => trim($palabraMostrada),
    "palabra_completa" => $palabra,
    "intentos_restantes" => $intentos_restantes,
    "estado" => $estado
]);
?>
