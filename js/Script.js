// Funções para alterar cores do site

//Variaveis globais
const page = document.querySelector("html");
const colorModeBtn = document.getElementById("colorModeBtn");
let animationEnabled = true;

function pauseAnimations() {
    const pauseBtn = document.getElementById("pauseBgBtn");
    const video = document.getElementById("backgroundVideo");
    const borderPhoto = document.getElementById("imgBorder");
    const myPhoto = document.getElementById("myPhoto");

    if (animationEnabled) {
        // Desativa animação: pausa vídeo, esconde, mostra imagem
        video.pause();
        pauseBtn.textContent = "Despausar animações";
        borderPhoto.classList.remove("girarBorda");
        borderPhoto.classList.add("bordaEstatica");
        myPhoto.classList.remove("antiGirar");
    }
    else {
        // Ativa animação: mostra vídeo e remove imagem
        video.play();
        pauseBtn.textContent = "Pausar animações";
        borderPhoto.classList.add("girarBorda");
        borderPhoto.classList.remove("bordaEstatica");
        myPhoto.classList.add("antiGirar");
    }

    animationEnabled = !animationEnabled;
}
//Função que aplica a coloração padrão
colorModeBtn.addEventListener("click", function() {

    page.classList.toggle("dark-mode");
    page.classList.toggle("light-mode");

    // Altera o texto do botão e salva a preferência no sessionStorage
    if (page.classList.contains("light-mode")) {
        colorModeBtn.textContent = "Modo Escuro";
        sessionStorage.setItem("colorMode", "light-mode");
    } else {
        colorModeBtn.textContent = "Modo Claro";
        sessionStorage.setItem("colorMode", "dark-mode");
    }
});

// Função que verifica o modo de cor salvo no localStorage e aplica ao carregar a página
function checkColorMode() {
    const savedMode = sessionStorage.getItem("colorMode");
    if (savedMode) {
        page.classList.remove("light-mode", "dark-mode");
        page.classList.add(savedMode);
    }

    if (page.classList.contains("light-mode")) {
        colorModeBtn.textContent = "Modo Escuro";
    } else {
        colorModeBtn.textContent = "Modo Claro";
    }
}

// Funções de interações com o site

// Função para alterar o texto descritivo dos filtros
function renameDescryption(filterType) {
    // Array com os textos padrão dos filtros
    const textsForFilter = {
        all: "Aqui estão os meus principais projetos:",
        frontend: "Projetos focados em interfaces visuais usando HTML, CSS e JavaScript:",
        backend: "Projetos com lógica de servidor, banco de dados e APIs (Back-End):",
        fullstack: "Projetos que envolvem tanto o Front-End quanto o Back-End:",
        logica: "Projetos com foco em lógica, algoritmos e estruturas de dados:",
        automacao: "Projetos de automação e scripts para tarefas repetitivas e produtividade:",
        desktop: "Projetos de aplicações com interface gráfica para uso em computador (Desktop):",
        mobile: "Projetos de aplicativos desenvolvidos para dispositivos móveis (Android):",
    };
    // Variável com o parágrafo onde o texto será alterado
    let filText = document.getElementById("filterDescription");

    // Preenche o parágrafo com o texto referente ao botão selecionado
    filText.textContent = textsForFilter[filterType] || "Texto não disponível para esse filtro.";
}

// Função para filtrar os cards com base no botão clicado
function filterCards(filterType) {
    // Variável das cartas
    let cards = document.querySelectorAll(".card-item");

    // Assim que o botão é pressionado, chama a função de alterar o texto descritivo passando o valor do botão como parametro
    renameDescryption(filterType);

    // Para cada carta no site, verifica se é do tipo selecionado
    cards.forEach(card => {
        let cardType = card.getAttribute("data-filter");
        
        // Se o filtro selecionado for igual a "all", ou o data-filter do card for igual ao selecionado, mostra a carta
        if (filterType === "all" || cardType === filterType) {
            card.classList.remove("hide");
        }
        // Se for diferente, esconde o card
        else {
            card.classList.add("hide");
        }
    });
}

// Chama a função de importar o JSON ao carregar a página
document.addEventListener('DOMContentLoaded', checkColorMode);