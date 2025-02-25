// Función que se ejecuta cuando el documento está completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Obtener elementos del DOM para login y registro
  const loginDiv = document.querySelector("#login");
  const registerDiv = document.querySelector("#register");
  const toRegisterLink = document.querySelector("#to-register");
  const toLoginLink = document.querySelector("#to-login");

  // Alternar entre los formularios de login y registro
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
    $("#register-form")
      .off("submit")
      .on("submit", function (e) {
        e.preventDefault();

        // Obtener valores de los campos
        let usuario = $("#registrar-Usuario").val().trim();
        let contrasena = $("#registrar-Contrasena").val().trim();
        let confirmarContrasena = $("#confirmar-Contrasena").val().trim();

        // Validaciones antes de enviar el formulario
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

        // Enviar datos al servidor mediante AJAX
        $.ajax({
          url: "registro.php",
          type: "POST",
          dataType: "json",
          data: { usuario: usuario, contrasena: contrasena },
          success: function (response) {
            mostrarModal(response.message);

            if (response.success) {
              $("#register-form")[0].reset(); // Limpiar formulario
              $("#register").hide(); // Ocultar formulario de registro
              $("#login").show(); // Mostrar formulario de login
            }
          },
          error: function () {
            mostrarModal("Ocurrió un error inesperado. Inténtalo nuevamente.");
          },
        });
      });

    // AJAX para inicio de sesión
    $("#login-form")
      .off("submit")
      .on("submit", function (e) {
        e.preventDefault();

        // Obtener valores de los campos
        let usuario = $("#Usuario").val().trim();
        let contrasena = $("#Contrasena").val().trim();

        // Validaciones antes de enviar el formulario
        if (usuario === "" || contrasena === "") {
          mostrarModal("Por favor, ingresa tu usuario y contraseña.");
          return;
        }

        // Enviar datos al servidor mediante AJAX
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
          },
        });
      });

    // Función para mostrar un modal con un mensaje
    function mostrarModal(mensaje) {
      $("#mensajeTexto").text(mensaje);
      var modal = new bootstrap.Modal(document.getElementById("mensajeModal"));
      modal.show();
    }
  });

  // Función para cerrar sesión
  const logoutButton = document.querySelector(".logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      window.location.href = "logout.php"; // Redirige al cerrar sesión
    });
  }

  // Elementos del juego
  const divBotones = document.querySelector("#botones");
  const divJuego = document.querySelector("#juego");
  const iniciarButton = document.querySelector("#iniciar-juego");
  const tecladoDiv = document.querySelector(".teclado");
  const palabraContainer = document.querySelector(".palabra-container");
  const intentosElemento = document.querySelector("#intentos-restantes");

  // Evento para iniciar el juego
  if (divBotones && divJuego && iniciarButton) {
    iniciarButton.addEventListener("click", function (event) {
      event.preventDefault();
      divBotones.style.display = "none"; // Ocultar botones
      divJuego.style.display = "block"; // Mostrar el área de juego
      document.body.style.backgroundImage = "none";
      iniciarPartida(); // Llamar a la función que inicia la partida
    });
  }

  // Función para obtener la palabra aleatoria y empezar el juego
  function iniciarPartida() {
    fetch("palabra_aleatoria.php") // Obtener palabra desde el servidor
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data); // Debug en consola

        if (data.success) {
          // Guardar el ID de la partida en sessionStorage
          sessionStorage.setItem("partida_id", data.partida_id);

          // Mostrar intentos restantes
          if (intentosElemento) {
            intentosElemento.textContent = `Intentos restantes: ${data.intentos_restantes}`;
            intentosElemento.style.display = "block";
          }

          // Pintar la palabra oculta en pantalla
          if (data.palabra) {
            pintarPalabra(data.palabra);
          }

          // Generar el teclado virtual
          generarTeclado();
        }
      })
      .catch((error) => console.error("Error en la solicitud AJAX:", error));
  }

  // Función para generar el teclado virtual
  function generarTeclado() {
    tecladoDiv.innerHTML = ""; // Limpiar teclado antes de generarlo
    const letras = "QWERTYUIOPASDFGHJKLÑZXCVBNM".split("");

    letras.forEach((letra) => {
      const button = document.createElement("button");
      button.innerHTML = letra;
      button.classList.add("tecla");

      button.addEventListener("click", () => {
        button.style.backgroundColor = "black";
        button.disabled = true;

        // Llamar a la función para verificar la letra
        verificarLetra(letra);
      });

      tecladoDiv.appendChild(button);
    });
  }

  // Función para mostrar la palabra con guiones
  function pintarPalabra(palabra) {
    palabraContainer.innerHTML = "";
    palabra.split("").forEach(() => {
      const span = document.createElement("span");
      span.textContent = "_ ";
      palabraContainer.appendChild(span);
    });
  }

  // Función para verificar si la letra es correcta
  function verificarLetra(letra) {
    const partida_id = sessionStorage.getItem("partida_id");

    fetch("verificar_letra.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `partida_id=${partida_id}&letra=${letra}`
    })
      .then(response => response.json())
      .then(data => {
        console.log("Respuesta del servidor:", data); // Debug en consola

        if (data.success) {
          // Actualizar intentos restantes
          intentosElemento.textContent = `Intentos restantes: ${data.intentos_restantes}`;

          // Actualizar la palabra con las letras acertadas
          actualizarPalabra(data.palabra_mostrada);

          // Si perdió
          if (data.estado === "perdido") {
            setTimeout(() => {
              alert(`¡Perdiste! La palabra era: ${data.palabra_completa}`);
              divJuego.style.display = "none";
              intentosElemento.style.display = "none";
              divBotones.style.display = "block";
            }, 500);
          }
          // Si ganó
          else if (data.estado === "ganado") {
            setTimeout(() => {
              alert("¡Ganaste! Felicidades.");
              divJuego.style.display = "none";
              intentosElemento.style.display = "none";
              divBotones.style.display = "block";
            }, 500);
          }
        }
      })
      .catch(error => console.error("Error en la solicitud AJAX:", error));
  }

  // Función para actualizar la palabra en pantalla
  function actualizarPalabra(palabra) {
    palabraContainer.innerHTML = palabra.split(" ").map(letra => `<span>${letra}</span>`).join(" ");
  }
});
