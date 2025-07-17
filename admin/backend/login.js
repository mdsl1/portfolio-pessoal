require('dotenv').config();

let usuario = document.getElementById("usuario");
let senha = document.getElementById("senha");

function validarLogin() {

    if (usuario.value === "" || senha.value === "") {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    // Simulação de validação de login
    if (usuario.value === process.env.usuario && senha.value === prosses.env.senha) {
        alert("Login bem-sucedido!");
        // Redirecionar para a área administrativa
        window.location.href = "/admin/dashboard";
    } else {
        alert("Usuário ou senha incorretos.");
    }
}