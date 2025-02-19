//Esta función es la encargada de ocultar o mostrar el formulario que vayamos requiriendo, ya sea el de login o el de registro.
document.addEventListener("DOMContentLoaded", function () {
  const loginDiv = document.querySelector("#login");
  const registerDiv = document.querySelector("#register");
  const toRegisterLink = document.querySelector("#to-register");
  const toLoginLink = document.querySelector("#to-login");

  //Una condición para ver si existen los div o los elementos que vamos a utilizar.
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
});

//Función para registro de usuario
$(document).ready(function () {
  $("#register-form").on("submit", function (e) {
    e.preventDefault();

    let usuario = $("#registrar-Usuario").val();
    let contrasena = $("#registrar-Contrasena").val();
    let confirmarContrasena = $("#confirmar-Contrasena").val();

    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    $.ajax({
      url: "registro.php",
      type: "POST",
      dataType: "json", // Importante para que interprete la respuesta como JSON
      data: {
        usuario: usuario,
        contrasena: contrasena,
      },
      success: function (response) {
        if (response.success) {
          alert(response.message);
          $("#register-form")[0].reset();
          $("#register").hide();
          $("#login").show();
        } else {
          alert(response.message); // Mostrar el error en el modal
        }
      },
      error: function () {
        alert("Ocurrió un error inesperado. Inténtalo nuevamente.");
      },
    });
  });
});


//Función para ocultar los contenedores para iniciar juego
document.addEventListener("DOMContentLoaded", function () {
  const divBotones = document.querySelector("#botones");
  const divJuego = document.querySelector("#juego");
  const iniciarButton = document.querySelector("#iniciar-juego");
  const tecladoDiv = document.querySelector(".teclado");
  const letras = "QWERTYUIOPASDFGHJKLÑZXCVBNM".split("");

  console.log(iniciarButton);
  if (divBotones && divJuego) {
    iniciarButton.addEventListener("click", function (event) {
      event.preventDefault();
      divBotones.style.display = "none";
      divJuego.style.display = "block";
      document.body.style.backgroundImage = "none";
      iniciarJuego();
    });
  }

  //Función principal para iniciar el juego
  function iniciarJuego() {
    generarTeclado();
  } 
  
  //Función para generar el teclado
  function generarTeclado() {
    letras.forEach((letra) => {
      const button = document.createElement("button");
      button.innerHTML = letra;
      button.classList.add("tecla");

      button.addEventListener("click", () => {
        button.style.backgroundColor = "gray";
        button.disabled = true;
      });
      tecladoDiv.appendChild(button);
    });
  }
});
