function validarAcesso(){

    const nome = document.getElementById("nomeOperador").value;
    const mensagem = document.getElementById("mensagem");

    if(nome.trim() === ""){
        mensagem.innerHTML = "❌ Informe o nome do operador.";
        mensagem.style.color = "red";
    }
    else{
        mensagem.innerHTML = `✅ Bem-vindo, ${nome}!`;
        mensagem.style.color = "lime";

        document.getElementById("painel").style.display = "block";

        gerarListaMaquinas();

        setInterval(monitorarSensor, 3000);
    }
}

function gerarListaMaquinas(){

    const maquinas = [
        "Prensa 1",
        "Torno 2",
        "CNC 3",
        "Esteira 4",
        "Robô 5"
    ];

    const select = document.getElementById("maquinas");

    select.innerHTML =
        '<option value="">Selecione uma máquina</option>';

    for(let i = 0; i < maquinas.length; i++){

        let option = document.createElement("option");

        option.value = maquinas[i];
        option.textContent = maquinas[i];

        select.appendChild(option);
    }
}

function verificarStatus(){

    const maquina =
        document.getElementById("maquinas").value;

    const status =
        document.getElementById("statusMaquina");

    switch(maquina){

        case "Prensa 1":
            status.innerHTML = "🟢 Em operação";
            break;

        case "Torno 2":
            status.innerHTML = "🟡 Manutenção necessária";
            break;

        case "CNC 3":
            status.innerHTML = "🔵 Operação normal";
            break;

        case "Esteira 4":
            status.innerHTML = "🔴 Desligada";
            break;

        case "Robô 5":
            status.innerHTML = "🟢 Produção automática";
            break;

        default:
            status.innerHTML = "";
    }
}

function monitorarSensor(){

    const temperatura =
        Math.floor(Math.random() * 120);

    const visor =
        document.getElementById("temperatura");

    const situacao =
        document.getElementById("situacao");

    visor.innerHTML = temperatura + "°C";

    situacao.className = "";

    if(temperatura < 50){

        situacao.innerHTML = "✅ NORMAL";
        situacao.classList.add("normal");

    }else if(temperatura <= 80){

        situacao.innerHTML = "⚠ ALERTA";
        situacao.classList.add("alerta");

    }else{

        situacao.innerHTML =
        "🚨 PERIGO - SUPERAQUECIMENTO";

        situacao.classList.add("perigo");
    }
}