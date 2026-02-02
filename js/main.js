// Função para buscar os dados da API na rota de Projetos
async function carregarProjetos() {
    try {
        // Faz uma requisição para a API para buscar os projetos | https://deandrea-pushed-lynette.ngrok-free.dev/projetos
        const response = await fetch('https://api-portfolio-qs3s.onrender.com/projetos', {
            method: 'GET',
            /* Usado para consumir API localmente
            headers: {
                "ngrok-skip-browser-warning": "true" // Temporário
            }*/
        });
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }

        // Pega os dados da API e armazena na variável projetos
        const projetos = await response.json();
        // Chama a função para criar os cards com os projetos
        await createCards(projetos);

        // Chama a função para finalizar o preloader após carregar os projetos
        finalizarPreloader();

    } catch (erro) {
        console.error('Erro ao carregar dados da API:', erro);
    }
}

// Função para buscar os dados da API na rota de Tecnologias
async function carregarTecnologias() {
    try {
        // Faz uma requisição para a API para buscar as tecnologias | https://deandrea-pushed-lynette.ngrok-free.dev/tecnologias/show
        const response = await fetch('https://api-portfolio-qs3s.onrender.com/tecnologias/show', {
            method: 'GET',
            /* Usado para consumir API localmente
            headers: {
                "ngrok-skip-browser-warning": "true" // Temporário
            }*/
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }
        // Pega os dados da API e armazena na variável tecnologias
        const tecnologias = await response.json();
        // Chama a função para criar os botões de tecnologias
        createTechBtn(tecnologias);
        
        // Chama a função para carregar os projetos após carregar as tecnologias
        carregarProjetos();

    } catch (erro) {
        console.error('Erro ao carregar dados da API:', erro);
    }
}

// Função que cria e insere os cards
async function createCards(projetos) {
    // Pega o container onde serão inseridos os cards e limpa eles inicialmente
    const container = document.getElementById("cardContainer");
    container.innerHTML = '';

    // Depois, para cada objeto no json, cria e preenche o card
    projetos.forEach(projeto => {
        // Cria uma div e atribui as classes e data-filters
        let card = document.createElement('div');
        card.className = `col-10 col-lg-5 mb-4 card-item`;
        card.setAttribute('data-filter', projeto.tipo);

        // Valores SVG para os ícones de celular e desktop
        let celularSvg =`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60.01 60.01" xml:space="preserve"><g><path d="M40.224,0H19.785c-3.584,0-6.5,2.893-6.5,6.449v47.113c0,3.554,2.916,6.448,6.5,6.448h20.438c3.584,0,6.501-2.894,6.501-6.448V6.449C46.725,2.893,43.808,0,40.224,0z M44.576,53.562c0,2.37-1.952,4.299-4.352,4.299H19.785c-2.399,0-4.351-1.929-4.351-4.299V6.449h0.001c0-2.371,1.952-4.299,4.351-4.299h20.438c2.399,0,4.352,1.928,4.352,4.299C44.577,6.449,44.577,53.562,44.576,53.562z M42.366,6.315h-24.72c-0.297,0-0.537,0.24-0.537,0.537v41.753c0,0.296,0.24,0.538,0.537,0.538h24.72c0.297,0,0.538-0.241,0.538-0.538V6.852C42.903,6.555,42.663,6.315,42.366,6.315zM41.829,48.067H18.182V7.389h23.646C41.828,7.389,41.828,48.067,41.829,48.067z M30.006,50.038c-1.811,0-3.285,1.473-3.285,3.284s1.474,3.284,3.285,3.284s3.283-1.474,3.283-3.284C33.289,51.511,31.817,50.038,30.006,50.038z M30.006,55.531c-1.219,0-2.21-0.991-2.21-2.209s0.991-2.21,2.21-2.21c1.218,0,2.209,0.992,2.209,2.21C32.215,54.54,31.224,55.531,30.006,55.531zM26.451,4.204c0-0.219,0.214-0.396,0.478-0.396h6.151c0.264,0,0.477,0.177,0.477,0.396S33.345,4.6,33.081,4.6H26.93C26.667,4.6,26.452,4.423,26.451,4.204z"/></g></svg>`;
        let pcSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 270.729 270.729" xml:space="preserve"><g><path d="M0,55.529v124.822c0,14.763,12.1,26.771,26.974,26.771h78.03c-0.005,0.494-0.031,0.977,0.113,1.465c0.026,0.111,2.77,10.568-2.924,19.376c-0.58,0.903-0.769,1.911-0.764,2.919H80.626c-2.176,0-3.94,2.478-3.94,5.538c0,3.06,1.764,5.548,3.94,5.548h109.476c2.173,0,3.937-2.488,3.937-5.548c0-3.061-1.764-5.538-3.937-5.538h-19.896c0.005-1.008-0.179-2.016-0.766-2.919c-5.67-8.776-2.972-19.191-2.919-19.392c0.135-0.482,0.109-0.966,0.109-1.449h77.12c14.876,0,26.977-12.005,26.977-26.771V55.529c0-14.761-12.106-26.77-26.977-26.77H26.974C12.1,28.76,0,40.768,0,55.529zM158.758,230.872h-45.891c5.026-9.926,3.684-20.052,2.924-23.749h40.042C155.078,210.82,153.734,220.946,158.758,230.872zM259.557,55.529v124.822c0,8.609-7.092,15.602-15.815,15.602H26.974c-8.719,0-15.809-7.003-15.809-15.602V55.529c0-8.606,7.089-15.604,15.809-15.604h216.767C252.465,39.925,259.557,46.923,259.557,55.529z"/><path d="M25.717,54.072v106.18c0,1.602,1.289,2.893,2.888,2.893h213.503c1.597,0,2.893-1.291,2.893-2.893V54.072c0-1.596-1.296-2.887-2.893-2.887H28.61C27.012,51.186,25.717,52.481,25.717,54.072z M31.494,56.964h207.727v100.407H31.494V56.964z"/><path d="M138.626,172.578c-4.913,0-8.91,4-8.91,8.913s3.997,8.908,8.91,8.908c4.914,0,8.915-3.995,8.915-8.908C147.546,176.578,143.54,172.578,138.626,172.578z M138.626,186.379c-2.693,0-4.878-2.189-4.878-4.883c0-2.692,2.186-4.882,4.878-4.882c2.693,0,4.883,2.189,4.883,4.882C143.514,184.189,141.319,186.379,138.626,186.379z"/></g></svg>`;

        // Cria um "HTML" temporário para armazenar todas as tecnologias registradas no json
        let tecnologiasHTML = '';
        // Pega todos os valores do objeto json.technologies, aplica as classes e adiciona em um parágrafo. Por fim, armazena na váriavel temporária
        Object.values(projeto.tecnologias).forEach(tech => {
            tecnologiasHTML += `<p class="usedTech m-0">${tech}</p>`;
        });

        // Cria definitivamente o card com todos os dados do json já validados e verificados, e insere no container dos cards
        card.innerHTML = `
            <div class="card text-center">
                <img class="card-img-top" src="${projeto.img}" alt="Imagem do projeto ${projeto.title}">
                <div class="card-body">
                    <h5 class="card-title">${projeto.titulo}</h5>
                    <p class="card-text">${projeto.descricao}</p>

                    <div class="d-flex justify-content-center my-3 align-items-center gap-2">
                        <p class="m-0">Adaptado para:</p>
                        <!-- Se o projeto for adaptado para a plataforma, insere o SVG correspondente, caso contrário, não insere nada -->
                        ${projeto.adaptado_para.includes("Celular") ? celularSvg : ''}
                        ${projeto.adaptado_para.includes("Desktop") ? pcSvg : ''}
                    </div>

                    <div class="d-flex justify-content-center my-3 gap-2">
                    <!-- Se o link for diferente de n/a, Insere a tag <a> com o valor correspondente, caso contrário, não insere nada -->
                        ${projeto.link_website !== "n/a" ? `<a class="card-link site-link btn" href="${projeto.link_website}" target="_blank">Ver site</a>` : ''}
                        ${projeto.link_github !== "n/a" ? `<a class="card-link github-link btn" href="${projeto.link_github}" target="_blank">GitHub</a>` : ''}
                    </div>

                    <div class="d-flex flex-wrap justify-content-center my-2 gap-1">
                        ${tecnologiasHTML}
                    </div>
                </div>
            </div>
        `;

        // Adiciona o card ao container
        container.appendChild(card);
    });
}

// Função que cria e insere os botões de tecnologias
function createTechBtn(tecnologias) {
    // Pega o container onde serão inseridos os botões e limpa ele inicialmente
    const container = document.getElementById("techDescriptionContainer");
    container.innerHTML = '';

    // Cria um botão para cada tecnologia no array
    tecnologias.forEach(tech => { 
        let btn = document.createElement("a");

        // Define os atributos do botão
        btn.setAttribute("tabindex", "0");
        btn.setAttribute("role", "button");
        btn.setAttribute("data-bs-toggle", "popover");
        btn.setAttribute("data-bs-trigger", "focus");
        btn.setAttribute("title", tech.nome);
        btn.setAttribute("data-bs-content", tech.descricao);

        btn.innerHTML = `<img class="techIcon" src="${tech.icone_tech}"/>`;

        // Adiciona o botão ao container
        container.appendChild(btn);
    });

    // Ativa os popovers nos novos elementos
    ativarPopovers();
}

// Função que ativa os popovers do Bootstrap
function ativarPopovers() {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach(el => new bootstrap.Popover(el));
}

// Função que insere os dados do formulário no banco de dados
async function enviarFormulario() {
    // Pega os valores dos campos do formulário
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let assunto = document.getElementById("assunto").value;
    let mensagem = document.getElementById("mensagem").value;

    // Verifica se os campos estão preenchidos
    if (!nome || !email || !assunto || !mensagem) {
        showAlert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        // Faz uma requisição POST para a API com os dados do formulário | https://deandrea-pushed-lynette.ngrok-free.dev/mensagem
        const response = await fetch('https://api-portfolio-qs3s.onrender.com/mensagem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //"ngrok-skip-browser-warning": "true" / Temporário
            },
            body: JSON.stringify({ nome, email, assunto, mensagem })
        });

        // Se a resposta não for OK, lança um erro
        if (!response.ok) {
            throw new Error('Erro ao enviar o formulário');
        }

        // Limpa os campos do formulário após o envio
        document.getElementById("nome").value = '';
        document.getElementById("email").value = '';
        document.getElementById("assunto").value = '';
        document.getElementById("mensagem").value = '';

        // Mostra uma mensagem de sucesso
        showAlert("Mensagem enviada com sucesso. Obrigado pelo contato!");

    } catch (erro) {
        console.error('Erro ao enviar o formulário:', erro);
        showAlert("Ocorreu um erro ao enviar a mensagem. Por segurança, tente novamente mais tarde.");
    }
}

// Função que exibe um alerta com a mensagem passada como parâmetro
function showAlert(t) {
    // Pega o elemento de alerta pelo ID
    const alerta = document.getElementById("alerta");

    // Define o texto do alerta
    alerta.textContent = t;

    if(t.includes("sucesso")) {
        // Se a mensagem incluir "sucesso", adiciona a classe de sucesso
        alerta.classList.add("alert-success");
        alerta.classList.remove("alert-warning" ,"alert-danger");
    }
    else if (t.includes("preencha")) {
        // Se a mensagem incluir "preencha", adiciona a classe de atenção
        alerta.classList.add("alert-warning");
        alerta.classList.remove("alert-danger", "alert-success");
    }
    else {
        // Caso contrário, adiciona a classe de erro
        alerta.classList.add("alert-danger");
        alerta.classList.remove("alert-warning", "alert-success");
    }

    // Exibe o alerta
    alerta.classList.remove("d-none");
    alerta.classList.add("d-block");

    // Define um timeout para esconder o alerta após 3 segundos
    setTimeout(() => {
        alerta.classList.remove("d-block");
        alerta.classList.add("d-none");
    }, 3000);
}

// Função que desativa o preloader e exibe o conteúdo principal
function finalizarPreloader() {
    const preloader = document.getElementById("preloader");
    const conteudo = document.getElementById("mainContent");

    // Adiciona classe de fade-out
    preloader.classList.add("fade-out");

    // Aguarda a transição para esconder de vez
    setTimeout(() => {
        preloader.style.display = "none";
        conteudo.style.display = "block";
    }, 1000); // corresponde à duração da transição
}

// Pega o botão de enviar mensagem pelo ID
let btnMsg = document.getElementById("btnMsg");
// Adiciona um evento de clique ao botão de enviar mensagem
btnMsg.addEventListener("click", (event) => {
    event.preventDefault(); // Previne o comportamento padrão do botão de submit
    enviarFormulario(); // Chama a função para enviar o formulário
});

// Chama a função de importar o JSON ao carregar a página
document.addEventListener('DOMContentLoaded', carregarTecnologias);