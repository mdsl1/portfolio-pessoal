//Variaveis globais
let page = document.querySelector("html");

//Função que ao iniciar o site aplica a coloração padrão
function startPage(){
    page.classList.add("defaultMode")
}
//Função que aplica a coloração padrão
function defaultMode(){
    page.classList.remove("lightMode", "colorBlindMode");
    page.classList.add("defaultMode");
}
//Função que aplica a coloração escura
function lightMode(){
    page.classList.remove("defaultMode", "colorBlindMode");
    page.classList.add("lightMode");
}
//Função que aplica a coloração adaptada para daltônicos
function colorBlindMode(){
    page.classList.remove("defaultMode", "lightMode");
    page.classList.add("colorBlindMode");
}
window.onload = function(){
    startPage();
}