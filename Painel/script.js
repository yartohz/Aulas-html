function processarDados() {
    // 1. Captura os valores dos inputs [cite: 149]
    let nome = document.getElementById('nome').value;
    let n1 = document.getElementById('nota1').value;
    let n2 = document.getElementById('nota2').value;

    // 2. Converte para Number para evitar concatenação textual [cite: 150]
    let nota1 = Number(n1);
    let nota2 = Number(n2);

    // 3. Calcula a média aritmética [cite: 151]
    let media = (nota1 + nota2) / 2;

    // 4. Referencia a div de resultado
    let elementoResultado = document.getElementById('resultado');

    // 5. Exibe a mensagem na tela [cite: 152, 153]
    elementoResultado.innerHTML = `Olá ${nome}, sua média é ${media.toFixed(1)}`;

    // 6. Mensagem interna no console [cite: 154]
    console.log("Cálculo realizado com sucesso");

    // 7. DESAFIO EXTRA: Se a média for menor que 7, cor vermelha [cite: 155]
    if (media < 7) {
        elementoResultado.style.color = "red";
    } else {
        elementoResultado.style.color = "#00ff00"; // Verde para aprovados
    }
}