const inputNome = document.getElementById("nome");
const inputTipo = document.getElementById("tipo");
const inputValor = document.getElementById("valor");

const btnCadastrar =
document.getElementById("btnCadastrar");

const cards =
document.getElementById("cards");

const media =
document.getElementById("media");

let sensores =
JSON.parse(
localStorage.getItem("sensores")
) || [];

class Sensor{

    constructor(nome,tipo,valor){

        this.nome = nome;
        this.tipo = tipo;
        this.valor = valor;

        this.status =
        this.verificarStatus();
    }

    verificarStatus(){

        if(
            this.tipo==="TEMPERATURA"
            &&
            this.valor > 50
        ){
            return "CRITICO";
        }

        if(
            this.tipo==="PRESSAO"
            &&
            this.valor > 100
        ){
            return "CRITICO";
        }

        if(
            this.tipo==="UMIDADE"
            &&
            (
                this.valor < 30
                ||
                this.valor > 80
            )
        ){
            return "CRITICO";
        }

        return "NORMAL";
    }
}

function salvar(){

    localStorage.setItem(

        "sensores",

        JSON.stringify(
            sensores
        )
    );
}

function cadastrarSensor(){

    const nome =
    inputNome.value
    .trim()
    .toUpperCase();

    const tipo =
    inputTipo.value;

    const valor =
    Number(
        inputValor.value
    );

    if(

        nome === ""

        ||

        isNaN(valor)

    ){

        alert("Preencha tudo");

        return;
    }

    const sensor =
    new Sensor(
        nome,
        tipo,
        valor
    );

    sensores.push(sensor);

    salvar();

    renderizar();

    limparCampos();
}

function limparCampos(){

    inputNome.value="";

    inputValor.value="";
}

function renderizar(){

    cards.innerHTML="";

    sensores.forEach(sensor=>{

        cards.innerHTML += `

        <div class="
        card
        ${sensor.status==="CRITICO"
        ? "critico"
        : ""}
        ">

        <h3>${sensor.nome}</h3>

        <p>Tipo:
        ${sensor.tipo}</p>

        <p>Valor:
        ${sensor.valor}</p>

        <p>Status:
        ${sensor.status}</p>

        </div>

        `;
    });

    calcularMedia();

    atualizarGrafico();
}

function calcularMedia(){

    if(
        sensores.length===0
    ){

        media.textContent=0;

        return;
    }

    const soma =
    sensores.reduce(

        (total,sensor)=>

        total +
        sensor.valor,

        0
    );

    const mediaFinal =
    soma /
    sensores.length;

    media.textContent =
    mediaFinal.toFixed(2);

    const criticos =
    sensores.filter(

        sensor=>

        sensor.status ===
        "CRITICO"

    );

    console.log(
        "Críticos:",
        criticos.length
    );
}

let grafico;

function atualizarGrafico(){

    const nomes =
    sensores.map(

        sensor=>sensor.nome
    );

    const valores =
    sensores.map(

        sensor=>sensor.valor
    );

    if(grafico){

        grafico.destroy();
    }

    grafico =
    new Chart(

        document
        .getElementById(
            "grafico"
        ),

        {

        type:"bar",

        data:{

            labels:nomes,

            datasets:[{

                label:
                "Valores",

                data:valores

            }]
        }

    });
}

btnCadastrar.onclick =
cadastrarSensor;

inputNome.onblur = ()=>{

inputNome.value =

inputNome.value
.trim()
.toUpperCase();

};

inputValor.onkeyup = ()=>{

console.log(
"Digitando..."
);

};

renderizar();
