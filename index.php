<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./css/style.css">
  <title>Ahorcado</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Bienvenido al Ahorcado</h1>
    </div>
    
    <!-- Formulario de Inicio de Sesion -->
    <div class="form-container" id="login">
      <h2>Iniciar Sesion</h2>
      <form>
        <div class="form-group">
          <input type="text" placeholder="Usuario" id="Usuario" required>
        </div>
        <div class="form-group">
          <input type="password" placeholder="Contraseña" id="Contrasena" required>
        </div>
        <div class="form-group">
          <button type="submit">Entrar</button>
        </div>
      </form>
      <div class="links">
        <a href="#" id="to-register">Crear Cuenta</a>
      </div>
    </div>

    <!-- Formulario de Registro -->
    <div class="form-container" id="register" style="display: none;">
      <h2>Registrarse</h2>
      <form id="register-form">
        <div class="form-group">
          <input type="text" placeholder="Usuario" id="registrar-Usuario" required>
        </div>
        <div class="form-group">
          <input type="password" placeholder="Contraseña" id="registrar-Contrasena" required>
        </div>
        <div class="form-group">
          <input type="password" placeholder="Confirmar Contraseña" id="confirmar-Contrasena" required>
        </div>
        <div class="form-group">
          <button type="submit">Registrarse</button>
        </div>
      </form>
      <div class="links">
        <a href="#" id="to-login">Ya tengo cuenta</a>
      </div>
    </div>
  </div>

<!-- Enlace al archivo JavaScript -->
<script src="./js/script.js"></script>
</body>
</html>
