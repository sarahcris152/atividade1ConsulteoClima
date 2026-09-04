let campoCidade = document.querySelector("#cidade");
let elementoMensagem = document.querySelector("#mensagem");
let elementoCidades = document.querySelector("#cidades");
let elementoPrevisao = document.querySelector("#previsao");

campoCidade.addEventListener("keydown", function (evento) {
  if (evento.key == "Enter") {
    buscarCidades();
  }
});

async function buscarCidades() {
  let nome = campoCidade.value;

  elementoMensagem.textContent = "Buscando...";

  let resposta = await fetch(
    `https://brasilapi.com.br/api/cptec/v1/cidade/${nome}`
  );

  let dados = await resposta.json();

  if (resposta.ok) {
    for (let i = 0; i < dados.length; i++) {
      let elementoCidade = document.createElement("p");
      elementoCidade.textContent = `${dados[i].nome} - ${dados[i].estado}`;
      elementoCidade.classList.add("cidade");
      elementoCidade.addEventListener("click", function () {
        buscarPrevisao(dados[i].id);
      });
      elementoCidades.appendChild(elementoCidade);
    }
    elementoMensagem.textContent = "";
  } else {
    elementoMensagem.textContent = dados.message;
  }
}

async function buscarPrevisao(id) {
  elementoPrevisao.textContent = "Buscando...";
  let resposta = await fetch(
    `https://brasilapi.com.br/api/cptec/v1/clima/previsao/${id}`
  );

  let dados = await resposta.json();

  if (resposta.ok) {
    elementoPrevisao.innerHTML = `
         <h2>${dados.cidade}  -  ${dados.estado}</h2>
         <div class="dia">
         <p>Data: ${dados.clima[0].data}</p>
         <p>Condição: ${dados.clima[0].condicao_desc}</p>
         <p>Temperatura mínima: ${dados.clima[0].min} °C</p>
         <p>Temperatura máxima: ${dados.clima[0].max} °C</p>
         <p>Índice UV: ${dados.clima[0].indice_uv}</p>
         </div>
         `;

    console.log(dados);
  } else {
    elementoMensagem.textContent = dados.message;
  }
}

function formatarData(data) {
  let partes = data.split("-");
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

