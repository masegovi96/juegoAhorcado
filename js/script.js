//Esta función es la encargada de ocultar o mostrar el formulario que vayamos requiriendo, ya sea el de login o el de registro.
document.addEventListener('DOMContentLoaded', function() {
    const loginDiv = document.querySelector('#login');
    const registerDiv = document.querySelector('#register');
    const toRegisterLink = document.querySelector('#to-register');
    const toLoginLink = document.querySelector('#to-login');

    //Una condición para ver si existen los div o los elementos que vamos a utilizar.
    if(toRegisterLink && toLoginLink){
        toRegisterLink.addEventListener("click", function(event){
            event.preventDefault();
            loginDiv.style.display = 'none';
            registerDiv.style.display = 'block';
        });

        toLoginLink.addEventListener("click", function(event){
            event.preventDefault();
            loginDiv.style.display = 'block';
            registerDiv.style.display = 'none';
        });
    }
});

//Función AJAX para el registro del usuario.
$(document).ready(function(){
    $('#register-form').on('submit', function(e){
        e.preventDefault();

        let usuario = $('#registrar-Usuario').val();
        let contrasena = $('#registrar-Contrasena').val();
        var confirmarContrasena = $('#confirmar-Contrasena').val();

        if(contrasena != confirmarContrasena){
            alert('Las contraseñas no coinciden');
            return;
        }

        $.ajax({
            url: 'registro.php',
            type: 'POST',
            data: {
                usuario: usuario,
                contrasena: contrasena
            },
            success: function(response){
                alert(response);
                $('#register').hide();
                $('#login').show();
            },
            error: function(response){
                alert("Error al registrar el usuario");
            }
        });
    });
});