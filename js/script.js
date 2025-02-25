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
    $("#register-form")
      .off("submit")
      .on("submit", function (e) {
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
          },
        });
      });

    // AJAX para inicio de sesión
    $("#login-form")
      .off("submit")
      .on("submit", function (e) {
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
          },
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
  const palabraContainer = document.querySelector(".palabra-container");

  if (divBotones && divJuego && iniciarButton) {
    iniciarButton.addEventListener("click", function (event) {
      event.preventDefault();
      divBotones.style.display = "none";
      divJuego.style.display = "block";
      document.body.style.backgroundImage = "none";
      iniciarPartida(); // Llamar a la función correcta
    });
  }

  function iniciarPartida() {
    fetch("palabra_aleatoria.php") // Asegurarse de que se llama al archivo correcto
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data); // DEPURACIÓN

        if (data.success) {
          // Guardar el ID de la partida en sessionStorage
          sessionStorage.setItem("partida_id", data.partida_id);

          // Mostrar intentos restantes y asegurarse de que sea visible
          const intentosElemento = document.querySelector(
            "#intentos-restantes"
          );
          if (intentosElemento) {
            intentosElemento.textContent = `Intentos restantes: ${data.intentos_restantes}`;
            intentosElemento.style.display = "block";
          } else {
            console.error(
              "Elemento #intentos-restantes no encontrado en el DOM"
            );
          }

          // Pintar la palabra oculta
          if (data.palabra) {
            pintarPalabra(data.palabra);
          } else {
            console.error("No se recibió la palabra correctamente.");
          }

          // Generar el teclado virtual
          generarTeclado();
        } else {
          console.error("Error al crear la partida:", data.error);
        }
      })
      .catch((error) => console.error("Error en la solicitud AJAX:", error));
  }

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

  function pintarPalabra(palabra) {
    palabraContainer.innerHTML = "";
    palabra.split("").forEach(() => {
      const span = document.createElement("span");
      span.textContent = "_ ";
      palabraContainer.appendChild(span);
    });
  }

  function verificarLetra(letra) {
    const partida_id = sessionStorage.getItem("partida_id");

    fetch("verificar_letra.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `partida_id=${partida_id}&letra=${letra}`,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          document.querySelector(
            "#intentos-restantes"
          ).textContent = `Intentos restantes: ${data.intentos_restantes}`;

          if (data.estado === "perdido") {
            dibujarAhorcado(0); // Dibuja el último paso
            setTimeout(() => alert("¡Perdiste!"), 500);
          } else if (data.estado === "ganado") {
            alert("¡Ganaste! Felicidades.");
          } else {
            dibujarAhorcado(data.intentos_restantes); // Actualizar dibujo
          }
        }
      });
  }
  // Dibujar el ahorcado según los intentos fallidos
  const canvas = document.querySelector(".stick");
  const ctx = canvas.getContext("2d");

  // Array para almacenar qué partes del ahorcado ya se han dibujado
  let partesDibujadas = [];

  function dibujarAhorcado(intentosRestantes) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";

    // Limpiar solo cuando se inicia el primer dibujo
    if (intentosRestantes === 5) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      partesDibujadas = []; // Resetear partes dibujadas
    }

    // Definir las partes del ahorcado
    const partes = [
      () => {
        // Base
        ctx.beginPath();
        ctx.moveTo(20, 180);
        ctx.lineTo(80, 180);
        ctx.stroke();
        // Poste
        ctx.beginPath();
        ctx.moveTo(50, 180);
        ctx.lineTo(50, 20);
        ctx.stroke();

      },
      () => {
        // Barra superior y cuerda
        ctx.beginPath();
        ctx.moveTo(50, 20);
        ctx.lineTo(120, 20);
        ctx.moveTo(120, 20);
        ctx.lineTo(120, 40);
        ctx.stroke();
      },
      () => {
        // Cabeza
        ctx.beginPath();
        ctx.arc(120, 50, 10, 0, Math.PI * 2);
        ctx.stroke();
      },
      () => {
        // Cuerpo
        ctx.beginPath();
        ctx.moveTo(120, 60);
        ctx.lineTo(120, 100);
        ctx.stroke();
      },
      () => {
        // Brazos
        ctx.beginPath();
        ctx.moveTo(120, 70);
        ctx.lineTo(110, 90);
        ctx.moveTo(120, 70);
        ctx.lineTo(130, 90);
        ctx.stroke();
      },
      () => {
        // Piernas (Juego terminado)
        ctx.beginPath();
        ctx.moveTo(120, 100);
        ctx.lineTo(110, 130);
        ctx.moveTo(120, 100);
        ctx.lineTo(130, 130);
        ctx.stroke();
        setTimeout(() => alert("¡Perdiste!"), 500);
      },
    ];

    // Dibujar cada parte hasta alcanzar los intentos fallidos
    for (let i = 0; i < 6 - intentosRestantes; i++) {
      if (!partesDibujadas.includes(i)) {
        partes[i]();
        partesDibujadas.push(i);
      }
    }
  }
});
