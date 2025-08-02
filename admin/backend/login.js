async function validarLogin() {
    
    let login = document.getElementById("login").value;
    let senha = document.getElementById("senha").value;

    if (login === "" || senha === "") {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    try { // https://api-portfolio-qs3s.onrender.com/auth/login
        const response = await fetch('http://localhost:3000/auth/login' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'/*,
                'api-secret' : 'mdsl1.100%ViruZ' */
            },//JSON.stringify({ login, senha })
            body: {
                "login":"mdsl1",
                "senha": "100%ViruZ"
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }

        // Pega os dados da API e armazena na variável tecnologias
        const result = await response.json();

        /*/ Verifica se houve erro no login
        if ("erro" in result) {
            alert("Usuário ou senha incorretos. Por segurança, tente novamente.");
        }
        else {
            alert("Login bem-sucedido!");
            // Redirecionar para a área administrativa
            window.location.href = "../index.html";
        }*/

    } catch (erro) {
        console.error('Erro ao carregar dados da API:', erro);
    }
}

// Pega o botão de enviar mensagem pelo ID
let btnLogin = document.getElementById("btnLogin");
// Adiciona um evento de clique ao botão de enviar mensagem
btnLogin.addEventListener("click", (event) => {
    event.preventDefault(); // Previne o comportamento padrão do botão de submit
    validarLogin(); // Chama a função para enviar o formulário
});