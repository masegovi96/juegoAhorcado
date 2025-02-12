<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/style.css">
  <title>Ahorcado</title>
</head>
<body>

  <div class="container">
    <h1> Ahorcado </h1>

    <!-- Formulario de Inicio de Sesion -->
    <div id="login">
      <h2>Iniciar Sesion</h2>
      <form>
        <input type="text" placeholder="Usuario" required>
        <input type="password" placeholder="Contraseña" required>
        <button type="submit">Entrar</button>
      </form>
      <div class="links">
        <button href="javascript:void(0)" onclick="toggleForm()">Crear Cuenta</button>
      </div>
    </div>

    <!-- Formulario de Registro -->
    <div id="register" style="display: none;">
      <h2>Registrarse</h2>
      <form>
        <input type="text" placeholder="Usuario" required>
        <input type="password" placeholder="Contraseña" required>
        <input type="password" placeholder="Confirmar Contraseña" required>
        <button type="submit">Registrarse</button>
      </form>
      <div class="links">
        <button href="javascript:void(0)" onclick="toggleForm()">Ya tengo cuenta</button>
      </div>
    </div>
  </div>

  <script>
    function toggleForm() {
      const loginForm = document.getElementById('login');
      const registerForm = document.getElementById('register');

      loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
      registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
    }
  </script>

</body>
</html>
