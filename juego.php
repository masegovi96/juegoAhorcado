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
    </div>
    <div class="juego" id="juego" style="display: none;">
        <div class="body-stick">
            <canvas class="stick" style="display: none;"></canvas>
        </div>
        <div class="palabra-container">

        </div>
        <div class="buttom-interface">
            <div class="teclado"></div>
        </div>
    </div>
    <script src="js/script.js"></script>
</body>
</html>