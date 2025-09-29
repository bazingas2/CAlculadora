const enunciadoPrincipal = document.querySelector(".enunciado-principal");
const botaoPrincipal = document.querySelector(".botao-principal");
const inputRange = document.querySelector("#input-range");
const labelRange = document.querySelector("#lenRange");
const inputRadioSim = document.querySelector("#radio-sim");
const inputRadioNao = document.querySelector("#radio-nao");
const labelRadioSim = document.querySelector("#label-radio-sim");
const labelRadioNao = document.querySelector("#label-radio-nao");
const imgResultado = document.querySelector(".img-planeta");
const textoResultado = document.querySelector(".qtd-planetas");

const inputNome = document.createElement("input");
const inputNumber = document.createElement("input");
const inputBox = document.createElement("div");
const divRadio1 = document.createElement("div");
const divRadio2 = document.createElement("div");
const divResultado = document.createElement("div");

inputRange.classList.add("input-range");
inputBox.classList.add("input-box");
divResultado.classList.add("resultado-div");

inputNome.type = "text";
inputNumber.type = "number";
inputNumber.value = "1";
inputNumber.min = 1;

const respostas = [];
let paginaAtual = 0;
let resultadoFinal = 0;
let qtdPlanetas;
let nome;
let segundos = 0;
let atualizaTimer;
let timer;
let pontos = [];

seletorPagina();

function criaTimer() {
  timer = new Date(segundos * 1000);
}

botaoPrincipal.addEventListener("click", function (evento) {
  evento.preventDefault();

  if (paginaAtual === 1) {
    atualizaTimer = setInterval(() => {
      segundos++;
      criaTimer();
    }, 1000);
  }

  if (paginaAtual === 6) {
    clearInterval(atualizaTimer);
  }
});

botaoPrincipal.addEventListener("click", function (evento) {
  evento.preventDefault();
  paginaAtual++;

  if (paginaAtual === 8) paginaAtual = 0;

  if (!inputNome.value && paginaAtual === 2) {
    paginaAtual = 1;
    alert("Ops, informe o seu nome antes de continuar!");
  }

  if (paginaAtual === 3) {
    respostas[0] = Number(inputRange.value);
  } else if (paginaAtual === 4) {
    respostas[1] = Number(inputRange.value);
  } else if (paginaAtual === 5) {
    respostas[2] = Number(inputNumber.value);
  } else if (paginaAtual === 6) {
    respostas[3] = inputRadioSim.checked ? 1 : 0;
  } else if (paginaAtual === 7) {
    respostas[4] = Number(inputRange.value);
  }

  seletorPagina();
});

inputNome.addEventListener("change", () => {
  nome = inputNome.value;
});

labelRange.innerHTML = inputRange.value + "%";

inputRange.addEventListener("input", () => {
  labelRange.innerHTML = `${inputRange.value}%`;
});

function seletorPagina() {
  if (paginaAtual === 0) {
    resultadoFinal = 0;
    enunciadoPrincipal.innerHTML = `Olá! Vamos calcular sua pegada ecológica?`;
    botaoPrincipal.innerHTML = "Iniciar";

  } else if (paginaAtual === 1) {
    enunciadoPrincipal.innerHTML = "";
    enunciadoPrincipal.appendChild(inputNome);
    inputNome.value = "";
    inputNome.classList.add("input-text");
    inputNome.setAttribute("placeholder", "Digite o seu nome:");
    botaoPrincipal.innerHTML = "Continuar";

  } else if (paginaAtual === 2) {
    enunciadoPrincipal.innerHTML = `${nome}, com que frequência você consome produtos de origem animal?`;
    inputRange.value = "50";
    labelRange.innerHTML = "50%";
    enunciadoPrincipal.appendChild(inputRange);
    enunciadoPrincipal.appendChild(labelRange);
    botaoPrincipal.innerHTML = "Continuar";

  } else if (paginaAtual === 3) {
    inputRange.value = "50";
    labelRange.innerHTML = "50%";
    enunciadoPrincipal.innerHTML = `${nome}, dos alimentos que consome, qual a porcentagem de comida não processada, não embalada ou cultivada localmente?`;
    enunciadoPrincipal.appendChild(inputRange);
    enunciadoPrincipal.appendChild(labelRange);
    botaoPrincipal.innerHTML = "Continuar";

  } else if (paginaAtual === 4) {
    enunciadoPrincipal.innerHTML = `${nome}, quantas pessoas moram na sua residência?`;
    enunciadoPrincipal.appendChild(inputNumber);
    inputNumber.value = 1;
    inputNumber.classList.add("input-number");
    botaoPrincipal.innerHTML = "Continuar";

  } else if (paginaAtual === 5) {
    enunciadoPrincipal.innerHTML = `${nome}, você tem energia elétrica em casa?`;
    enunciadoPrincipal.appendChild(inputBox);
    inputBox.appendChild(divRadio1);
    inputBox.appendChild(divRadio2);
    divRadio1.appendChild(inputRadioNao);
    divRadio2.appendChild(inputRadioSim);
    divRadio1.appendChild(labelRadioNao);
    divRadio2.appendChild(labelRadioSim);
    divRadio1.classList.add("radio");
    divRadio2.classList.add("radio");
    botaoPrincipal.innerHTML = "Continuar";

  } else if (paginaAtual === 6) {
    enunciadoPrincipal.innerHTML = `${nome}, com que frequência viaja de avião anualmente?`;
    inputRange.value = "50";
    labelRange.innerHTML = "50%";
    enunciadoPrincipal.appendChild(inputRange);
    enunciadoPrincipal.appendChild(labelRange);
    botaoPrincipal.innerHTML = "Continuar";

  } else if (paginaAtual === 7) {
    calculaResultado();
    enunciadoPrincipal.innerHTML = `<p class="descricao-resultado">Aqui está sua pegada ecológica, ${nome}!</p>`;
    enunciadoPrincipal.appendChild(divResultado);
    divResultado.appendChild(imgResultado);
    divResultado.appendChild(textoResultado);
    textoResultado.innerHTML = `${qtdPlanetas} planetas.`;
    enunciadoPrincipal.innerHTML += `<p class="descricao-resultado">Como seria se todos no mundo vivessem como você?</p>`;
    enunciadoPrincipal.innerHTML += `<p class="descricao-resultado">Você demorou ${adicionaZeroTempo(
      timer.getMinutes()
    )}:${adicionaZeroTempo(timer.getSeconds())}s para responder esse questionário.</p>`;
    botaoPrincipal.innerHTML = "Refazer";
    enunciadoPrincipal.style.width = "100%";
    botaoPrincipal.style.marginBottom = "20px";
  }
}

function calculaResultado() {
  pontos[0] = Math.floor(respostas[0] / 20) * 5;
  let i = Math.floor(respostas[1] / 20);
  pontos[1] = (5 - i) * 5;

  if (respostas[2] <= 2) pontos[2] = 5;
  else if (respostas[2] <= 5) pontos[2] = 10;
  else pontos[2] = 20;

  pontos[3] = respostas[3] * 20;
  pontos[4] = Math.floor(respostas[4] / 20) * 5;

  resultadoFinal = 0;
  for (let j = 0; j < 5; j++) {
    resultadoFinal += pontos[j];
  }

  qtdPlanetas = Math.floor(resultadoFinal / 20);
}

function adicionaZeroTempo(numero) {
  return numero < 10 ? `0${numero}` : numero;
}