const valorPressao =
document.getElementById("valorPressao");

const barraPressao =
document.getElementById("barraPressao");

const mensagemErro =
document.getElementById("mensagemErro");

const loading =
document.getElementById("loading");

const statusBadge =
document.getElementById("statusBadge");

const statusPressao =
document.getElementById("statusPressao");

if(pressao < 40){

    barraPressao.className =
    "progress-bar bg-success";

    statusPressao.innerText =
    "PRESSÃO NORMAL";

    statusPressao.className =
    "status-operacao normal";

}
else if(pressao < 80){

    barraPressao.className =
    "progress-bar bg-warning";

    statusPressao.innerText =
    "ATENÇÃO - PRESSÃO ELEVADA";

    statusPressao.className =
    "status-operacao alerta";

}
else{

    barraPressao.className =
    "progress-bar bg-danger";

    statusPressao.innerText =
    "RISCO CRÍTICO DE PRESSÃO";

    statusPressao.className =
    "status-operacao critico";

}

async function monitorarPressao(){

    try{

        // Fase 1 - Preparação

        loading.classList.remove("d-none");

        mensagemErro.classList.add("d-none");

        valorPressao.style.opacity = "0.5";

        statusBadge.className =
        "badge bg-warning";

        statusBadge.innerText =
        "CARREGANDO";

        // Fase 2 - Requisição

        const resposta =
        await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
        );

        // Fase 3 - Validação

        if(!resposta.ok){

            throw new Error(
            "Falha na comunicação com o servidor."
            );

        }

        // Fase 4 - Processamento

        const dados =
        await resposta.json();

        const pressao =
        dados.id * 35;

        // Fase 5 - Interface

        valorPressao.innerText =
        pressao + " BAR";

        valorPressao.classList.remove("offline");
        valorPressao.classList.add("online");

        statusBadge.className =
        "badge bg-success";

        statusBadge.innerText =
        "ONLINE";

        barraPressao.style.width =
        pressao + "%";

        if(pressao < 40){

            barraPressao.className =
            "progress-bar bg-success";

        }
        else if(pressao < 80){

            barraPressao.className =
            "progress-bar bg-warning";

        }
        else{

            barraPressao.className =
            "progress-bar bg-danger";

        }

    }
    catch(erro){

        // Fase 6 - Tratamento de Erro

        mensagemErro.classList.remove("d-none");

        mensagemErro.innerText =
        "ERRO: " + erro.message;

        valorPressao.innerText =
        "OFFLINE";

        valorPressao.classList.add("offline");

        statusBadge.className =
        "badge bg-danger";

        statusBadge.innerText =
        "OFFLINE";

        barraPressao.style.width = "0%";

    }
    finally{

        // Fase 7 - Finalização

        loading.classList.add("d-none");

        valorPressao.style.opacity = "1";

    }
}
