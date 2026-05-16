const bancoAnimes = [
    {
        nome: "Hunter x Hunter (2011)",
        genero: "Ação / Aventura",
        nota: 9.1,
        censura: 12,
        linkImagem: "https://www.youtube.com/embed/d6kBeWjGq7A", // Link de vídeo (Embed iframe)
        resumo: "Gon Freecss descobre que seu pai, que ele acreditava estar morto, está vivo e é um lendário Hunter. Para encontrá-lo, Gon decide fazer o perigoso Exame Hunter.",
        curiosidade: "O autor Yoshihiro Togashi é casado com Naoko Takeuchi, a criadora mundialmente famosa de Sailor Moon.",
        episodios: 148 // Atende ao critério de nota > 9 E episódios > 100
    },
    {
        nome: "Attack on Titan",
        genero: "Ação / Drama",
        nota: 9.0,
        censura: 16,
        linkImagem: "https://images.justwatch.com/poster/305510619/s284/attack-on-titan.webp", // Link de imagem externa
        resumo: "Num mundo onde a humanidade vive cercada por muralhas gigantescas para se proteger de titãs humanoides devoradores de homens, a paz é quebrada após uma brecha catastrófica.",
        curiosidade: "O design e comportamento assustador dos titãs puramente irracionais foram inspirados em clientes bêbados que o autor atendeu em um cybercafé.",
        episodios: 87
    },
    {
        nome: "Chainsaw Man",
        genero: "Ação / Sobrenatural",
        nota: 8.5,
        censura: 18,
        linkImagem: "https://images.justwatch.com/poster/301540307/s284/chainsaw-man.webp",
        resumo: "Denji é um jovem que vive na miséria absoluta pagando as dívidas de seu falecido pai. Após fundir-se com seu cão-demônio Pochita, ele ganha a habilidade de transformar partes de seu corpo em motosserras.",
        curiosidade: "O autor Tatsuki Fujimoto é assumidamente obcecado por filmes ocidentais, enchendo a abertura do anime com dezenas de referências cinematográficas diretas.",
        episodios: 12
    },
    {
        nome: "Demon Slayer: Kimetsu no Yaiba",
        genero: "Ação / Fantasia",
        nota: 8.7,
        censura: 14,
        linkImagem: "https://images.justwatch.com/poster/241088487/s284/demon-slayer-kimetsu-no-yaiba.webp",
        resumo: "Tanjiro Kamado se torna um caçador de demônios após sua família ser massacrada por uma criatura maligna e sua irmã mais nova, Nezuko, ser transformada em um demônio.",
        curiosidade: "O estilo de animação de respiração de água foi baseado diretamente em pinturas clássicas japonesas do período Ukiyo-e, especificamente de Katsushika Hokusai.",
        episodios: 55
    }
];

// 2. Lógica do Motor do Catálogo - Variáveis globais de estado mutável declaradas usando 'let'
let idadeUsuarioAtual = 18; 

// Função responsável por renderizar dinamicamente o catálogo baseado no estado de idade informado
function renderizarCatalogo(idade) {
    const catalogContainer = document.getElementById("anime-catalog");
    
    // Limpa a visualização interna do contêiner antes de repopulá-lo
    catalogContainer.innerHTML = "";

    bancoAnimes.forEach(anime => {
        // Criando elemento do card
        const card = document.createElement("article");
        card.className = "anime-card";

        // LÓGICA 1: Operador Ternário decidindo a classe de estilo de cor do card com base na nota
        const classeNota = anime.nota >= 9.0 ? "card-high-rating" : "card-standard-rating";
        card.classList.add(classeNota);

        // LÓGICA 2: Operador Ternário gerando uma mensagem personalizada de classificação
        const mensagemClassificacao = anime.nota >= 9.0 ? "Aclamado pela Crítica" : "Altamente Recomendado";

        // LÓGICA 3: Porta Lógica (&&) - Aplica classe 'premium' apenas se nota > 9 E episódios > 100
        if (anime.nota > 9.0 && anime.episodios > 100) {
            card.classList.add("premium");
        }

        // LÓGICA 4: Dinâmica de Aula (Controle de Censura)
        // Se a idade do usuário for menor que a censura do anime, ativa o estado restrito
        const isRestrito = idade < anime.censura;
        if (isRestrito) {
            card.classList.add("restricted");
        }

        // Tratamento do tipo de mídia: verifica se é link do youtube (embed) para usar iframe, senão usa tag img
        const midiaHTML = anime.linkImagem.includes("youtube.com") 
            ? `<iframe src="${anime.linkImagem}" title="${anime.nome}" allowfullscreen></iframe>`
            : `<img src="${anime.linkImagem}" alt="Poster oficial do anime ${anime.nome}" loading="lazy">`;

        // Construção estrutural interna e injeção do HTML do card
        card.innerHTML = `
            <div class="restricted-overlay">
                <p>Conteúdo Restrito</p>
                <span style="font-size: 0.8rem; color: #787c99;">Classificação: ${anime.censura} anos</span>
            </div>

            <div class="card-media">
                ${midiaHTML}
            </div>

            <div class="card-info">
                <h2>${anime.nome}</h2>
                
                <div class="badge-group">
                    <span class="badge badge-genre">${anime.genero}</span>
                    <span class="badge badge-rating">★ ${anime.nota.toFixed(1)}</span>
                    <span class="badge badge-censorship">Censura: ${anime.censura}+</span>
                    <span class="badge badge-episodes">${anime.episodios} Eps</span>
                </div>

                <p style="font-size: 0.8rem; color: #00ffcc; font-weight: bold; margin-bottom: 8px;">
                    ${mensagemClassificacao}
                </p>

                <p class="card-summary">${anime.resumo}</p>

                <div class="card-trivia">
                    <strong>Você sabia?</strong>
                    <p>${anime.curiosidade}</p>
                </div>
            </div>
        `;

        // Insere o card montado dentro do grid do catálogo
        catalogContainer.appendChild(card);
    });
}

// 3. Captura de Eventos Interativos da Interface
document.getElementById("btn-update-age").addEventListener("click", () => {
    const inputIdade = document.getElementById("user-age");
    
    // Atualização do estado global mutável tratado via let
    idadeUsuarioAtual = parseInt(inputIdade.value) || 0;
    
    // Dispara novamente a renderização com o novo estado de restrição
    renderizarCatalogo(idadeUsuarioAtual);
});

// Inicialização imediata do catálogo ao carregar a página pela primeira vez
window.addEventListener("DOMContentLoaded", () => {
    renderizarCatalogo(idadeUsuarioAtual);
});