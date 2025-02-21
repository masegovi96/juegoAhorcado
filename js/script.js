//Función que se ejecuta cuando el documento está listo
document.addEventListener("DOMContentLoaded", function () {
  const loginDiv = document.querySelector("#login");
  const registerDiv = document.querySelector("#register");
  const toRegisterLink = document.querySelector("#to-register");
  const toLoginLink = document.querySelector("#to-login");

  //Condicional para que en caso de que existan los elementos, se agregue el evento de tipo listener.
  if (toRegisterLink && toLoginLink) {
    //Al hacer clic en el botón, se oculta el formulario de inicio de sesión y se muestra el de registro
    toRegisterLink.addEventListener("click", function (event) {
      event.preventDefault();
      loginDiv.style.display = "none";
      registerDiv.style.display = "block";
    });

    //Al hacer clic en el botón, se oculta el formulario de registro y se muestra el de inicio de sesión
    toLoginLink.addEventListener("click", function (event) {
      event.preventDefault();
      loginDiv.style.display = "block";
      registerDiv.style.display = "none";
    });
  } //Fin del condicional

  //AJAX para procesar el registro de usuarios
  //Función para registro de usuario
$(document).ready(function () {
  $("#register-form").on("submit", function (e) {
    e.preventDefault();

    let usuario = $("#registrar-Usuario").val();
    let contrasena = $("#registrar-Contrasena").val();
    let confirmarContrasena = $("#confirmar-Contrasena").val();

    if (contrasena !== confirmarContrasena) {
      mostrarModal("Las contraseñas no coinciden");
      return;
    }


    $(document).ready(function () {
      $("#register-form").submit(function (e) {
        e.preventDefault(); // Evitar recarga

        let usuario = $("#registrar-Usuario").val().trim();
        let contrasena = $("#registrar-Contrasena").val().trim();
        let confirmarContrasena = $("#confirmar-Contrasena").val().trim();

        // Validaciones básicas
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
              $("#register-form")[0].reset();
              $("#register").hide();
              $("#login").show();
            }
          },
          error: function () {
            mostrarModal("Ocurrió un error inesperado. Inténtalo nuevamente.");
          }
        });
      });


      function mostrarModal(mensaje) {
        $("#mensajeTexto").text(mensaje);
        var modal = new bootstrap.Modal(document.getElementById('mensajeModal'));
        modal.show();
      }

      // Alternar entre formularios
      $("#to-register").click(function (e) {
        e.preventDefault();
        $("#login").hide();
        $("#register").show();
      });

      $("#to-login").click(function (e) {
        e.preventDefault();
        $("#register").hide();
        $("#login").show();
      });
    });


    // Alternar entre formularios
    $("#to-register").click(function (e) {
      e.preventDefault();
      $("#login").hide();
      $("#register").show();
    });

    $("#to-login").click(function (e) {
      e.preventDefault();
      $("#register").hide();
      $("#login").show();
    });
  });


  $(document).ready(function () {
    $("#login-form").submit(function (e) {
      e.preventDefault(); // Evitar recarga
  
      let usuario = $("#Usuario").val().trim();
      let contrasena = $("#Contrasena").val().trim();
  
      // Validaciones básicas
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
      var modal = new bootstrap.Modal(document.getElementById('mensajeModal'));
      modal.show();
    }
  });  
  
});


  

  //Inicio del juego - Se refiere a los eventos que ocurrirán cuando se inicie el el juego (Una vez que el usuario haya iniciado sesión)
  const divBotones = document.querySelector("#botones"); //Se obtiene el div con los botones de inicio de sesión y registro
  const divJuego = document.querySelector("#juego"); //Se obtiene el div con los contenedores del juego
  const iniciarButton = document.querySelector("#iniciar-juego"); //Se obtiene el botón de iniciar el juego
  const tecladoDiv = document.querySelector(".teclado"); //Se obtiene el div donde se mostrará el teclado
  const letras = "QWERTYUIOPASDFGHJKLÑZXCVBNM".split(""); //Se crea un array con las letras del teclado
  const palabraContainer = document.querySelector(".palabra-container"); //Se obtiene el contenedor donde se mostrará la palabra
  //Al momento de hacer clic en el botón de iniciar el juego, se ocultará el div con los botones, y se mostrarán los conntenedores del juego (Ahorcado, palabra, y teclado)
  if (divBotones && divJuego) {
    iniciarButton.addEventListener("click", function (event) {
      event.preventDefault();
      divBotones.style.display = "none";
      divJuego.style.display = "block";
      document.body.style.backgroundImage = "none";
      iniciarJuego(); //Se llama a la función para iniciar el juego, la cual contiene las funciones para pintar los contenedores
    });
  }
  //Función principal para iniciar el juego
  function iniciarJuego() {
    obtenerPalabra(); //Se llama a la función para obtener una palabra aleatoria
    generarTeclado(); //Se llama a la función para generar el teclado
  } 
  
  //Función para generar el teclado
  function generarTeclado() {
    //Se recorre con un for each el arreglo de letras
    letras.forEach((letra) => {
      //En cada vuelta se crea un botón con la letra correspondiente
      const button = document.createElement("button");
      button.innerHTML = letra; //Se le asigna la letra al botón
      button.classList.add("tecla"); //Se le asigna una clase al botón

      //Se agrega un evento al botón para que al hacer clic, se cambie el color del botón a gris y se deshabilite
      button.addEventListener("click", () => {
        button.style.backgroundColor = "gray"; //Se cambia el color del botón a gris
        button.disabled = true; //Se deshabilita el botón
      });
      tecladoDiv.appendChild(button); //Se agrega el botón al div del teclado
    });
  }
  
  //Función para obtener una palabra aleatoria
  function obtenerPalabra(){
    fetch("palabra_aleatoria.php")
    .then(response => response.json())
    .then(data => {
      if(data.palabra){
        pintarPalabra(data.palabra);
      }else{
        console.error("Error al obtener la palabra", data.error);
      }
    })
    .catch(error => console.error("Error al obtener la palabra", error));
  }

  //Función para pintar la palabra en el contenedor
  function pintarPalabra(palabra){
    palabraContainer.innerHTML = ""; //Se limpia el contenedor de la palabra
    //Se recorre la palabra con un for each
    palabra.split("").forEach(letra => {
      //Se crea un div para cada letra de la palabra
      const span = document.createElement("span");
      span.textContent = "_ " //Se le asigna un guión bajo a cada letra
      palabraContainer.appendChild(span); //Se agrega el div al contenedor de la palabra
    });
  }

});