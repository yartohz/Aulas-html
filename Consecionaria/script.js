class Carro {

    constructor(marca, modelo, ano){
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
    }

    buzinar(){
        alert(`${this.modelo}: Biiiii Biiii!`);
    }

}

function atualizarPreview(){
    const marca = document.getElementById("marca").value;
    document.getElementById("preview").textContent = marca;
}

function fabricarCarro(){

    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const ano = Number(document.getElementById("ano").value);

    if(marca === "" || modelo === "" || ano === ""){
        alert("Preencha todos os campos!");
        return;
    }

    const novoCarro = new Carro(marca, modelo, ano);

    const card = document.createElement("div");
    card.classList.add("carro");

    card.innerHTML = `
        <h3>${novoCarro.marca}</h3>
        <p>Modelo: ${novoCarro.modelo}</p>
        <p>Ano: ${novoCarro.ano}</p>
    `;

    card.onclick = function(){
        novoCarro.buzinar();
    };

    document.getElementById("patio").appendChild(card);

    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("ano").value = "";
    document.getElementById("preview").textContent = "---";
}