/**
 * Mini-fábrica 1: Calcula o percentual de conclusão do álbum.
 * @param {number} total 
 * @param {number} coladas 
 * @returns {number} Porcentagem formatada com uma casa decimal
 */
function calcularPorcentagem(total, coladas) {
    if (total === 0) return 0; // Evita divisão por zero
    let porcentagem = (coladas / total) * 100;
    return Number(porcentagem.toFixed(1)); // Retorna como número com 1 casa decimal
}

/**
 * Mini-fábrica 2: Calcula quantas figurinhas faltam para completar o álbum.
 * @param {number} total 
 * @param {number} coladas 
 * @returns {number} Quantidade de faltantes
 */
function calcularFaltantes(total, coladas) {
    let faltantes = total - coladas;
    return faltantes < 0 ? 0 : faltantes; // Garante que não retorne número negativo
}

/**
 * Mini-fábrica 3 (Caixa Preta): Retorna a mensagem motivacional com base na porcentagem.
 * @param {number} porcentagem 
 * @returns {string} Mensagem motivacional
 */
function gerarStatusMensagem(porcentagem) {
    if (porcentagem < 50) {
        return "O álbum está no início, bora trocar!"; [cite= 35, 36]
    } else if (porcentagem >= 50 && porcentagem < 100) {
        return "Falta pouco! Mais da metade já foi!"; [cite= 37, 38]
    } else {
        return "ÁLBUM COMPLETO! Você é um mestre colecionador!"; [cite= 37, 38]
    }
}

/**
 * DESAFIO EXTRA (Opcional): Calcula o investimento mínimo restante.
 * Sabendo que 5 figurinhas = R$ 5,00, logo, cada figurinha custa R$ 1,00.
 * @param {number} faltantes 
 * @returns {number} Custo estimado em Reais
 */
function calcularCustoEstimado(faltantes) {
    // 1 pacotinho = R$ 5,00 por 5 figurinhas. Custo unitário ideal = R$ 1,00 por figurinha.
    let custoMinimo = faltantes * 1.00; [cite= 72]
    return custoMinimo;
}

/**
 * Função Principal: Disparada pelo clique do botão no HTML.
 * Lê as entradas, invoca as mini-fábricas e atualiza o DOM.
 */
function atualizarPainel() {
    // 1. Captura e conversão dos dados vindos dos inputs para Number [Escopo Local]
    let totalFigurinhas = Number(document.getElementById("inputTotal").value); [cite= 52]
    let figurinhasColadas = Number(document.getElementById("inputColadas").value); [cite= 52]
    let figurinhasRepetidas = Number(document.getElementById("inputRepetidas").value); [cite= 52]

    // Validação simples para evitar campos vazios ou inconsistentes
    if (totalFigurinhas <= 0 || figurinhasColadas < 0) {
        alert("Por favor, insira valores válidos para o total e as figurinhas coladas.");
        return;
    }
    if (figurinhasColadas > totalFigurinhas) {
        alert("O número de figurinhas coladas não pode ser maior que o total do álbum!");
        return;
    }

    // 2. Invocação das mini-fábricas (passando argumentos e guardando retornos)
    let progressoPercentual = calcularPorcentagem(totalFigurinhas, figurinhasColadas);
    let totalFaltantes = calcularFaltantes(totalFigurinhas, figurinhasColadas);
    let mensagemStatus = gerarStatusMensagem(progressoPercentual);
    let custoRestante = calcularCustoEstimado(totalFaltantes);

    // 3. Exibição dos resultados formatados na div de saída
    let painel = document.getElementById("painelResultado");
    painel.style.display = "block"; // Torna a div visível
    
    painel.innerHTML = `
        <p><strong>Progresso:</strong> ${progressoPercentual}%</p>
        <p><strong>Faltam:</strong> ${totalFaltantes} figurinhas</p>
        <p><strong>Repetidas:</strong> ${figurinhasRepetidas}</p>
        <p><em>"${mensagemStatus}"</em></p>
        <hr>
        <p style="color: #2e7d32;"><strong>💰 Custo Mínimo Estimado:</strong> R$ ${custoRestante.toFixed(2)}</p>
    `;
}