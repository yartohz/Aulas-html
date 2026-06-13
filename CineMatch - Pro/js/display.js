// Captura dos elementos do HTML de catálogo
const gridFilmes = document.getElementById('grid-filmes');
const spanTotalMinutos = document.getElementById('total-minutos');

/**
 * Função principal para ler o localStorage e desenhar os cards no ecrã
 */
function renderizarCatalogo() {
    // 1. Procura a lista de filmes guardada ou cria um array vazio se não existir
    const catalogo = JSON.parse(localStorage.getItem('catalogoFilmes')) || [];

    // Proteção: se o elemento do grid não existir nesta página, interrompe a execução
    if (!gridFilmes) return;

    // Limpa o contentor para evitar a duplicação de cards antigos ao recarregar
    gridFilmes.innerHTML = '';

    // 2. CÁLCULO DE ESTATÍSTICAS (Uso obrigatório do método .reduce() exigido pelo SENAI)
    const totalMinutos = catalogo.reduce((acumulador, filme) => {
        return acumulador + filme.duracao;
    }, 0);

    // Atualiza o painel lateral (<aside>) com o valor real recalculado
    if (spanTotalMinutos) {
        spanTotalMinutos.textContent = totalMinutos;
    }

    // CASO O CATÁLOGO ESTIVER VAZIO: Exibe uma mensagem amigável ao utilizador
    if (catalogo.length === 0) {
        gridFilmes.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #A0A0A0; font-family: var(--fonte-textos);">
                <p>A sua videoteca está vazia. Vá à página de Cadastro para adicionar filmes!</p>
            </div>
        `;
        return;
    }

    // 3. RENDERIZAÇÃO DINÂMICA (Uso do forEach exigido pelo SENAI)
    // O segundo parâmetro 'index' guarda a posição exata (0, 1, 2...) do filme no array
    catalogo.forEach((filme, index) => {
        // Cria a tag <article class="card"> exigida nos requisitos
        const card = document.createElement('article');
        card.classList.add('card');

        // Monta a estrutura interna do card injetando as variáveis do objeto
        card.innerHTML = `
            <img src="${filme.capaUrl}" alt="Capa do filme ${filme.titulo}" class="capa-filme">
            <h3 class="titulo-filme" title="${filme.titulo}">${filme.titulo}</h3>
            
            <div class="trailer-container">
                <iframe 
                    width="100%" 
                    height="180" 
                    src="${filme.trailerUrl}" 
                    title="Trailer de ${filme.titulo}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            
            <div class="card-footer">
                <span class="badge-duracao">🕒 ${filme.duracao} min</span>
                <button class="btn-eliminar" onclick="excluirFilme(${index})">Excluir</button>
            </div>
        `;

        // Coloca o card dentro da <section id="grid-filmes">
        gridFilmes.appendChild(card);
    });
}

/**
 * 4. FUNÇÃO PARA EXCLUIR UM FILME (Tornada global via objeto window)
 * @param {number} index - A posição do filme que será removido do array
 */
window.excluirFilme = function(index) {
    // Janela de confirmação para evitar cliques acidentais do utilizador
    if (confirm("Tem a certeza de que deseja remover este filme da sua videoteca?")) {
        
        // Passo A: Recupera o catálogo atual do localStorage
        let catalogo = JSON.parse(localStorage.getItem('catalogoFilmes')) || [];
        
        // Passo B: Remove o item específico do array usando o método splice
        // O primeiro parâmetro é a posição (index) e o segundo diz quantos itens apagar (1)
        catalogo.splice(index, 1);
        
        // Passo C: Atualiza o localStorage com o novo array modificado
        localStorage.setItem('catalogoFilmes', JSON.stringify(catalogo));
        
        // Passo D: Força o ecrã a redesenhar-se imediatamente
        // Isto vai atualizar os cards visíveis e recalcular os minutos no .reduce()
        renderizarCatalogo();
    }
}

// Garante que a listagem corre assim que o HTML da página carregar por completo
document.addEventListener('DOMContentLoaded', renderizarCatalogo);

// Função para renderizar os filmes
function renderizarCatalogo() {
    const catalogo = JSON.parse(localStorage.getItem('catalogoFilmes')) || [];

    // Limpa o grid antes de injetar
    gridFilmes.innerHTML = '';

    // Uso de .reduce() para calcular o total de minutos assistidos
    const totalMinutos = catalogo.reduce((acumulador, filme) => {
        return acumulador + filme.duracao;
    }, 0);

    // Atualiza a estatística na tela
    spanTotalMinutos.textContent = totalMinutos;

    // Uso de forEach para injetar os artigos (cards)
    catalogo.forEach(filme => {
        const card = document.createElement('article');
        card.classList.add('card');

        // Estrutura do card com a imagem e o iframe do trailer
        card.innerHTML = `
            <img src="${filme.capaUrl}" alt="Capa do filme ${filme.titulo}" class="capa-filme">
            <h3 class="titulo-filme">${filme.titulo}</h3>
            <div class="trailer-container">
                <iframe width="100%" height="200" 
                    src="https://www.youtube.com/embed/${filme.trailerId}" 
                    title="Trailer de ${filme.titulo}" 
                    frameborder="0" allowfullscreen>
                </iframe>
            </div>
            <p>Duração: ${filme.duracao} min</p>
        `;

        gridFilmes.appendChild(card);
    });
}

// Executa a função ao carregar a página
document.addEventListener('DOMContentLoaded', renderizarCatalogo);