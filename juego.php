<?php
session_start(); // Iniciar sesión

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php"); // Redirigir al login
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Ahorcado</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body class="cuerpo">
    <div class="botones" id="botones">
        <div class="boton1">
            <button class="game" id="iniciar-juego">Iniciar Juego</button>
        </div>
        <div class="record">
            <button class="score">Ver Record</button>
        </div>
        <div class="close">
            <button class="logout">Cerrar Sesión</button>
        </div>
    </div>
    <div id="intentos-restantes" style="display: none;">Intentos restantes: 6</div>
    <div class="juego" id="juego" style="display: none;">
            <canvas class="stick" width="200" height="200"></canvas>
        <div class="palabra-container">

        </div>
        <div class="buttom-interface">
            <div class="teclado"></div>
        </div>
    </div>
    <script src="js/script.js"></script>
</body>
</html>