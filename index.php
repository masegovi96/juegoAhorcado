
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./css/style.css">
  <title>Ahorcado</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  
  <!-- Bootstrap 5 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="contenedor">
    <div class="header">
      <h1>Bienvenido al Ahorcado</h1>
    </div>
    
    <!-- Formulario de Inicio de Sesion -->
    <div class="form-container" id="login">
      <h2>Iniciar Sesión</h2>
      <form id="login-form">
        <div class="form-group">
          <input type="text" placeholder="Usuario" id="Usuario" class="Usuario" required>
        </div>
        <div class="form-group">
          <input type="password" placeholder="Contraseña" id="Contrasena" class="Contrasena" required>
        </div>
        <div class="form-group">
          <button type="submit" class="boton">Entrar</button>
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
          <button class="boton" type="submit">Registrarse</button>
        </div>
      </form>
      <div class="links">
        <a href="#" id="to-login">Ya tengo cuenta</a>
      </div>
    </div>
  </div>



  <!-- Modal de Confirmación -->
  <div class="modal fade" id="mensajeModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Mensaje</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p id="mensajeTexto"></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="./js/script.js"></script>
</body>
</html>
