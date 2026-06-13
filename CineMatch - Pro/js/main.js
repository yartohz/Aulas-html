// Criação da classe exigida
// 1. Criação da Classe exigida no regulamento
class Filme {
    constructor(titulo, capaUrl, trailerInput, duracao) {
        this.titulo = titulo;
        this.capaUrl = capaUrl;
        this.trailerUrl = this.converterParaEmbed(trailerInput); // Trata qualquer entrada
        this.duracao = parseInt(duracao) || 0;
    }

    converterParaEmbed(input) {
        let videoId = "";
        input = input.trim();
        
        // Se o usuário colou o link padrão do navegador
        if (input.includes("youtube.com/watch?v=")) {
            videoId = input.split("v=")[1].split("&")[0];
        } 
        // Se colou o link encurtado do botão compartilhar (youtu.be)
        else if (input.includes("youtu.be/")) {
            videoId = input.split("youtu.be/")[1].split("?")[0];
        } 
        // Se colou um link de YouTube Shorts
        else if (input.includes("youtube.com/shorts/")) {
            videoId = input.split("shorts/")[1].split("?")[0];
        } 
        // Se colou o link que já era embed
        else if (input.includes("youtube.com/embed/")) {
            return input;
        } 
        // Se não caiu em nenhum, significa que o usuário digitou apenas o ID puro (11 caracteres)
        else {
            videoId = input;
        }
        
        // Retorna a URL exata que o <iframe> precisa para funcionar
        return `https://www.youtube.com/embed/${videoId}`;
    }
}

// 2. Captura do Formulário
const formFilme = document.getElementById('form-filme');

if (formFilme) {
    formFilme.addEventListener('submit', function(evento) {
        evento.preventDefault(); // Impede a página de recarregar

        // Captura dos valores dos inputs do teu HTML
        const titulo = document.getElementById('titulo').value.trim();
        const capaUrl = document.getElementById('capaUrl').value.trim();
        const trailerId = document.getElementById('trailerId').value.trim(); // Aceita link completo ou ID
        const duracao = document.getElementById('duracao').value;

        // Criação da instância da classe
        const novoFilme = new Filme(titulo, capaUrl, trailerId, duracao);

        // Recupera o catálogo atual do localStorage ou cria um array vazio se não existir
        let catalogo = JSON.parse(localStorage.getItem('catalogoFilmes')) || [];

        // Adiciona o novo filme à lista
        catalogo.push(novoFilme);

        // Guarda a lista atualizada de volta no localStorage convertida em String JSON
        localStorage.setItem('catalogoFilmes', JSON.stringify(catalogo));

        // Limpa o formulário e avisa o utilizador
        formFilme.reset();
        alert(`O filme "${novoFilme.titulo}" foi adicionado com sucesso ao catálogo!`);
    });
}
// Evento onsubmit para salvar dados
formFilme.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evita o recarregamento da página

    // Capturando os valores dos inputs
    const titulo = document.getElementById('titulo').value;
    const capaUrl = document.getElementById('capaUrl').value;
    const trailerId = document.getElementById('trailerId').value;
    const duracao = document.getElementById('duracao').value;

    // Instanciando um novo filme
    const novoFilme = new Filme(titulo, capaUrl, trailerId, duracao);

    // Lendo o localStorage atual (ou array vazio se não existir)
    let catalogo = JSON.parse(localStorage.getItem('catalogoFilmes')) || [];

    // Adicionando o novo filme ao array
    catalogo.push(novoFilme);

    // Salvando o array atualizado no localStorage
    localStorage.setItem('catalogoFilmes', JSON.stringify(catalogo));

    // Limpando o formulário
    formFilme.reset();
    alert('Filme salvo com sucesso!');
});