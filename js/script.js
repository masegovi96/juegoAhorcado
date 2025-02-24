//Función que se ejecuta cuando el documento está listo
document.addEventListener("DOMContentLoaded", function () {
  const loginDiv = document.querySelector("#login");
  const registerDiv = document.querySelector("#register");
  const toRegisterLink = document.querySelector("#to-register");
  const toLoginLink = document.querySelector("#to-login");

  // Alternar entre formularios de login y registro
  if (toRegisterLink && toLoginLink) {
    toRegisterLink.addEventListener("click", function (event) {
      event.preventDefault();
      loginDiv.style.display = "none";
      registerDiv.style.display = "block";
    });

    toLoginLink.addEventListener("click", function (event) {
      event.preventDefault();
      loginDiv.style.display = "block";
      registerDiv.style.display = "none";
    });
  }

  // AJAX para registro de usuario
  $(document).ready(function () {
    $("#register-form").off("submit").on("submit", function (e) {
      e.preventDefault();

      let usuario = $("#registrar-Usuario").val().trim();
      let contrasena = $("#registrar-Contrasena").val().trim();
      let confirmarContrasena = $("#confirmar-Contrasena").val().trim();

      // Validaciones
      if (usuario === "" || contrasena === "" || confirmarContrasena === "") {
        mostrarModal("Por favor, llena todos los campos.");
        return;
      }

      if (contrasena.length < 6) {
        mostrarModal("La contraseña debe tener al menos 6 caracteres.");
        return;
      }

      if (contrasena !== confirmarContrasena) {
        mostrarModal("Las contraseñas no coinciden.");
        return;
      }

      // Enviar datos al servidor
      $.ajax({
        url: "registro.php",
        type: "POST",
        dataType: "json",
        data: { usuario: usuario, contrasena: contrasena },
        success: function (response) {
          mostrarModal(response.message);

          if (response.success) {
            $("#register-form")[0].reset(); // Limpiar formulario
            $("#register").hide(); // Ocultar registro
            $("#login").show(); // Mostrar login
          }
        },
        error: function () {
          mostrarModal("Ocurrió un error inesperado. Inténtalo nuevamente.");
        }
      });
    });

    // AJAX para inicio de sesión
    $("#login-form").off("submit").on("submit", function (e) {
      e.preventDefault();

      let usuario = $("#Usuario").val().trim();
      let contrasena = $("#Contrasena").val().trim();

      // Validaciones
      if (usuario === "" || contrasena === "") {
        mostrarModal("Por favor, ingresa tu usuario y contraseña.");
        return;
      }

      // Enviar datos al servidor
      $.ajax({
        url: "login.php",
        type: "POST",
        dataType: "json",
        data: { usuario: usuario, contrasena: contrasena },
        success: function (response) {
          mostrarModal(response.message);
          if (response.success) {
            window.location.href = "juego.php"; // Redirigir si el login es exitoso
          }
        },
        error: function () {
          mostrarModal("Ocurrió un error inesperado. Inténtalo nuevamente.");
        }
      });
    });

    function mostrarModal(mensaje) {
      $("#mensajeTexto").text(mensaje);
      var modal = new bootstrap.Modal(document.getElementById("mensajeModal"));
      modal.show();
    }
  });

  // Inicio del juego
  const divBotones = document.querySelector("#botones");
  const divJuego = document.querySelector("#juego");
  const iniciarButton = document.querySelector("#iniciar-juego");
  const tecladoDiv = document.querySelector(".teclado");
  const letras = "QWERTYUIOPASDFGHJKLÑZXCVBNM".split("");
  const palabraContainer = document.querySelector(".palabra-container");

  if (divBotones && divJuego && iniciarButton) {
    iniciarButton.addEventListener("click", function (event) {
      event.preventDefault();
      divBotones.style.display = "none";
      divJuego.style.display = "block";
      document.body.style.backgroundImage = "none";
      iniciarJuego();
    });
  }

  function iniciarJuego() {
    obtenerPalabra();
    generarTeclado();
  }

  function generarTeclado() {
    tecladoDiv.innerHTML = ""; // Limpiar teclado antes de generarlo
    letras.forEach((letra) => {
      const button = document.createElement("button");
      button.innerHTML = letra;
      button.classList.add("tecla");

      button.addEventListener("click", () => {
        button.style.backgroundColor = "black";
        button.disabled = true;
      });

      tecladoDiv.appendChild(button);
    });
  }

  function obtenerPalabra() {
    fetch("palabra_aleatoria.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.palabra) {
          pintarPalabra(data.palabra);
        } else {
          console.error("Error al obtener la palabra", data.error);
        }
      })
      .catch((error) =>
        console.error("Error al obtener la palabra", error)
      );
  }

  function pintarPalabra(palabra) {
    palabraContainer.innerHTML = "";
    palabra.split("").forEach(() => {
      const span = document.createElement("span");
      span.textContent = "_ ";
      palabraContainer.appendChild(span);
    });
  }
});
