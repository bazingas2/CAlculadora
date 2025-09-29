// ===== PARTE 1: SELECIONANDO ELEMENTOS QUE JÃ EXISTEM NO HTML =====
// Aqui estamos "pegando" elementos que jÃ¡ foram criados no arquivo HTML
// Ã‰ como se fosse uma ponte entre o HTML e o JavaScript

const enunciadoPrincipal = document.querySelector(".enunciado-principal"); // Pega a div onde aparece o texto das perguntas
const botaoPrincipal = document.querySelector(".botao-principal"); // Pega o botÃ£o que o usuÃ¡rio clica
const inputRange = document.querySelector("#input-range"); // Pega a barra deslizante (slider)
const labelRange = document.querySelector("#lenRange"); // Pega o texto que mostra a % da barra
const inputRadioSim = document.querySelector("#radio-sim"); // Pega o botÃ£o de opÃ§Ã£o "Sim"
const inputRadioNao = document.querySelector("#radio-nao"); // Pega o botÃ£o de opÃ§Ã£o "NÃ£o"
const labelRadioSim = document.querySelector("#label-radio-sim"); // Pega o texto "Sim" do botÃ£o
const labelRadioNao = document.querySelector("#label-radio-nao"); // Pega o texto "NÃ£o" do botÃ£o
const imgResultado = document.querySelector(".img-planeta"); // Pega a imagem dos planetas
const textoResultado = document.querySelector(".qtd-planetas"); // Pega onde aparece o resultado final

// ===== PARTE 2: CRIANDO NOVOS ELEMENTOS NO JAVASCRIPT =====
// Aqui estamos criando elementos HTML usando JavaScript
// Ã‰ como se estivÃ©ssemos "construindo" pedaÃ§os do HTML dentro do JS

const inputNome = document.createElement("input"); // Cria um campo de texto para o nome
const inputNumber = document.createElement("input"); // Cria um campo numÃ©rico (quantas pessoas na casa)
const inputBox = document.createElement("div"); // Cria uma caixa para organizar os botÃµes de rÃ¡dio
const divRadio1 = document.createElement("div"); // Cria uma div para organizar o botÃ£o "NÃ£o"
const divRadio2 = document.createElement("div"); // Cria uma div para organizar o botÃ£o "Sim"
const divResultado = document.createElement("div"); // Cria uma div para mostrar o resultado final

// ===== PARTE 3: ADICIONANDO CLASSES CSS AOS ELEMENTOS =====
// Classes CSS servem para aplicar estilos (cores, tamanhos, etc.) aos elementos
// Ã‰ como dar uma "identidade visual" para cada elemento

inputRange.classList.add("input-range"); // Aplica estilo CSS na barra deslizante
inputBox.classList.add("input-box"); // Aplica estilo CSS na caixa dos botÃµes de rÃ¡dio
divResultado.classList.add("resultado-div"); // Aplica estilo CSS na Ã¡rea do resultado

// ===== PARTE 4: CONFIGURANDO PROPRIEDADES DOS INPUTS =====
// Aqui definimos como os campos de entrada devem se comportar

inputNome.type = "text"; // Define que o campo do nome aceita texto
inputNumber.type = "number"; // Define que o campo aceita apenas nÃºmeros
inputNumber.value = "1"; // Define o valor inicial como 1
inputNumber.min = 1; // Define que o valor mÃ­nimo Ã© 1 (nÃ£o pode ser negativo)

// ===== PARTE 5: VARIÃVEIS PARA CONTROLAR O QUESTIONÃRIO =====
// Essas variÃ¡veis guardam informaÃ§Ãµes importantes durante o questionÃ¡rio

const respostas = [5]; // Array que vai guardar as respostas do usuÃ¡rio (inicialmente tem 1 elemento)
let paginaAtual = 0; // Controla em qual pergunta estamos (comeÃ§a em 0 = tela inicial)
let resultadoFinal; // Vai guardar o total de pontos no final
let qtdPlanetas; // Vai guardar quantos planetas seriam necessÃ¡rios
let nome; // Vai guardar o nome que o usuÃ¡rio digitou
let segundos = 0; // Contador de tempo em segundos
let atualizaTimer; // VariÃ¡vel que controla o timer
let timer; // Objeto para formatar o tempo
let pontos = [5]; // Array que guarda a pontuaÃ§Ã£o de cada pergunta

// ===== PARTE 6: INICIANDO O QUESTIONÃRIO =====
seletorPagina(); // Chama a funÃ§Ã£o que mostra a tela inicial

// ===== PARTE 7: FUNÃ‡ÃƒO PARA CRIAR O TIMER =====
// Esta funÃ§Ã£o transforma os segundos em um formato de tempo (minutos:segundos)
function criaTimer() {
  timer = new Date(segundos * 1000); // Cria um objeto Date baseado nos segundos
}

// ===== PARTE 8: PRIMEIRO EVENT LISTENER DO BOTÃƒO =====
// Este "ouvinte" Ã© responsÃ¡vel por controlar o timer
// Event Listener = "fica escutando" quando algo acontece (neste caso, clique no botÃ£o)

botaoPrincipal.addEventListener("click", function (evento) {
  evento.preventDefault(); // Impede o comportamento padrÃ£o do botÃ£o (nÃ£o recarregar a pÃ¡gina)

  // Se estamos na pÃ¡gina 1 (primeira pergunta), inicia o cronÃ´metro
  if (paginaAtual === 1) {
    atualizaTimer = setInterval(function () {
      // setInterval = executa algo repetidamente
      segundos++; // Adiciona 1 segundo
      criaTimer(); // Atualiza o formato do timer
    }, 1000); // Executa a cada 1000ms (1 segundo)
  }

  // Se estamos na pÃ¡gina 6 (Ãºltima pergunta), para o cronÃ´metro
  if (paginaAtual === 6) {
    clearInterval(atualizaTimer); // Para o timer
  }
});

// ===== PARTE 9: SEGUNDO EVENT LISTENER DO BOTÃƒO (PRINCIPAL) =====
// Este Ã© o "cÃ©rebro" do questionÃ¡rio - controla a navegaÃ§Ã£o entre as pÃ¡ginas

botaoPrincipal.addEventListener("click", function (evento) {
  evento.preventDefault(); // NÃ£o recarrega a pÃ¡gina

  paginaAtual++; // AvanÃ§a para a prÃ³xima pÃ¡gina (+1)

  // Se chegou na pÃ¡gina 8, volta para o inÃ­cio (pÃ¡gina 0)
  if (paginaAtual === 8) {
    paginaAtual = 0; // Reinicia o questionÃ¡rio
  }

  // VALIDAÃ‡ÃƒO: Verifica se o usuÃ¡rio digitou o nome antes de continuar
  if (!inputNome.value && paginaAtual === 2) {
    // Se nÃ£o tem nome E estÃ¡ tentando ir para pÃ¡gina 2
    paginaAtual = 1; // Volta para a pÃ¡gina 1
    alert("Ops, informe o seu nome antes de continuar!"); // Mostra mensagem de erro
  }

  // ===== COLETANDO AS RESPOSTAS DE CADA PÃGINA =====
  // Quando o usuÃ¡rio clica "Continuar", salvamos a resposta da pÃ¡gina atual

  if (paginaAtual === 3) {
    // Pergunta sobre consumo de carne - salva o valor da barra deslizante
    respostas[0] = Number(inputRange.value); // Number() converte texto em nÃºmero
  } else if (paginaAtual === 4) {
    // Pergunta sobre alimentos nÃ£o processados - salva o valor da barra
    respostas[1] = Number(inputRange.value);
  } else if (paginaAtual === 5) {
    // Pergunta sobre quantas pessoas na casa - salva o nÃºmero digitado
    respostas[2] = Number(inputNumber.value);
  } else if (paginaAtual === 6) {
    // Pergunta sobre energia elÃ©trica - verifica qual botÃ£o foi marcado
    if (inputRadioSim.checked) {
      // Se o botÃ£o "Sim" estÃ¡ marcado
      respostas[3] = 1; // Salva 1
    } else {
      // Se nÃ£o (botÃ£o "NÃ£o" marcado)
      respostas[3] = 0; // Salva 0
    }
  } else if (paginaAtual === 7) {
    // Pergunta sobre viagens de aviÃ£o - salva o valor da barra
    respostas[4] = Number(inputRange.value);
  }

  seletorPagina(); // Atualiza a tela para mostrar a prÃ³xima pergunta
});

// ===== PARTE 10: ESCUTANDO MUDANÃ‡AS NO CAMPO DO NOME =====
// Quando o usuÃ¡rio digita o nome, salva na variÃ¡vel 'nome'
inputNome.addEventListener("change", function () {
  nome = inputNome.value; // Pega o que foi digitado e guarda na variÃ¡vel
});

// ===== PARTE 11: CONFIGURAÃ‡ÃƒO INICIAL DA BARRA DESLIZANTE =====
labelRange.innerHTML = inputRange.value + "%"; // Mostra o valor inicial da barra (50%)

// ===== PARTE 12: ESCUTANDO MUDANÃ‡AS NA BARRA DESLIZANTE =====
// Quando o usuÃ¡rio move a barra, atualiza o texto que mostra a porcentagem
inputRange.addEventListener("input", function () {
  labelRange.innerHTML = `${inputRange.value}%`; // Template literal para mostrar o valor + %
});

// ===== PARTE 13: FUNÃ‡ÃƒO PRINCIPAL - CONTROLA QUAL TELA MOSTRAR =====
// Esta Ã© a funÃ§Ã£o mais importante! Ela decide o que aparece na tela baseado na pÃ¡gina atual

function seletorPagina() {
  // ===== PÃGINA 0: TELA INICIAL =====
  if (paginaAtual === 0) {
    resultadoFinal = 0; // Zera o resultado (para quando reinicia)
    enunciadoPrincipal.innerHTML = `OlÃ¡! Vamos calcular sua pegada ecolÃ³gica? `; // Mensagem de boas-vindas
    botaoPrincipal.innerHTML = "Iniciar"; // Texto do botÃ£o

    // ===== PÃGINA 1: PERGUNTA DO NOME =====
  } else if (paginaAtual === 1) {
    enunciadoPrincipal.innerHTML = ""; // Limpa o conteÃºdo anterior
    enunciadoPrincipal.appendChild(inputNome); // Adiciona o campo de texto na tela
    inputNome.value = ""; // Limpa o campo (se tiver algo digitado)
    inputNome.classList.add("input-text"); // Aplica o estilo CSS
    inputNome.setAttribute("placeholder", "Digite o seu nome:"); // Texto de ajuda no campo
    botaoPrincipal.innerHTML = "Continuar"; // Muda o texto do botÃ£o

    // ===== PÃGINA 2: PERGUNTA SOBRE CONSUMO DE CARNE =====
  } else if (paginaAtual === 2) {
    enunciadoPrincipal.innerHTML = `${nome}, com que frequÃªncia vocÃª consome produtos de origem animal?`; // Pergunta personalizada com o nome
    inputRange.value = "50"; // Define a barra no meio (50%)
    labelRange.innerHTML = "50%"; // Mostra 50% no texto
    enunciadoPrincipal.appendChild(inputRange); // Adiciona a barra na tela
    enunciadoPrincipal.appendChild(labelRange); // Adiciona o texto da porcentagem
    botaoPrincipal.innerHTML = "Continuar";

    // ===== PÃGINA 3: PERGUNTA SOBRE ALIMENTOS NÃƒO PROCESSADOS =====
  } else if (paginaAtual === 3) {
    inputRange.value = "50"; // Reseta a barra para 50%
    labelRange.innerHTML = "50%";
    enunciadoPrincipal.innerHTML = `${nome}, dos alimentos que consome, qual a percentagem de comida nÃ£o processada, nÃ£o embalada ou cultivada localmente?`;
    enunciadoPrincipal.appendChild(inputRange); // Reutiliza a mesma barra deslizante
    enunciadoPrincipal.appendChild(labelRange);
    botaoPrincipal.innerHTML = "Continuar";

    // ===== PÃGINA 4: PERGUNTA SOBRE QUANTAS PESSOAS NA CASA =====
  } else if (paginaAtual === 4) {
    enunciadoPrincipal.innerHTML = `${nome}, quantas pessoas residem no teu agregado familiar?`;
    enunciadoPrincipal.appendChild(inputNumber); // Adiciona o campo numÃ©rico
    inputNumber.value = 1; // Valor padrÃ£o: 1 pessoa
    inputNumber.classList.add("input-number"); // Aplica estilo CSS
    botaoPrincipal.innerHTML = "Continuar";

    // ===== PÃGINA 5: PERGUNTA SOBRE ENERGIA ELÃ‰TRICA =====
  } else if (paginaAtual === 5) {
    enunciadoPrincipal.innerHTML = `${nome}, vocÃª tem energia elÃ©trica em casa?`;

    // Montando a estrutura dos botÃµes de rÃ¡dio (Sim/NÃ£o)
    enunciadoPrincipal.appendChild(inputBox); // Caixa principal
    inputBox.appendChild(divRadio1); // Div do "NÃ£o"
    inputBox.appendChild(divRadio2); // Div do "Sim"
    divRadio1.appendChild(inputRadioNao); // BotÃ£o "NÃ£o"
    divRadio2.appendChild(inputRadioSim); // BotÃ£o "Sim"
    divRadio1.appendChild(labelRadioNao); // Texto "NÃ£o"
    divRadio2.appendChild(labelRadioSim); // Texto "Sim"
    divRadio1.classList.add("radio"); // Estilo CSS para "NÃ£o"
    divRadio2.classList.add("radio"); // Estilo CSS para "Sim"
    botaoPrincipal.innerHTML = "Continuar";

    // ===== PÃGINA 6: PERGUNTA SOBRE VIAGENS DE AVIÃƒO =====
  } else if (paginaAtual === 6) {
    enunciadoPrincipal.innerHTML = `${nome}, com que frequÃªncia viaja de aviÃ£o anualmente?`;
    inputRange.value = "50"; // Reseta a barra para 50%
    labelRange.innerHTML = "50%";
    enunciadoPrincipal.appendChild(inputRange); // Reutiliza a barra deslizante
    enunciadoPrincipal.appendChild(labelRange);
    botaoPrincipal.innerHTML = "Continuar";

    // ===== PÃGINA 7: TELA DE RESULTADO =====
  } else if (paginaAtual === 7) {
    calculaResultado(); // Chama a funÃ§Ã£o que faz os cÃ¡lculos

    // Montando a tela de resultado
    enunciadoPrincipal.innerHTML = `<p class="descricao-resultado">Aqui estÃ¡ sua pegada ecolÃ³gica, ${nome}!</p>`;
    enunciadoPrincipal.appendChild(divResultado); // Adiciona a div do resultado
    divResultado.appendChild(imgResultado); // Adiciona a imagem dos planetas
    divResultado.appendChild(textoResultado); // Adiciona o texto com o nÃºmero
    textoResultado.innerHTML = `${qtdPlanetas} planetas.`; // Mostra quantos planetas

    // Adiciona textos explicativos
    enunciadoPrincipal.innerHTML += `<p class="descricao-resultado">Como seria se todos no mundo vivessem como vocÃª?</p>`;
    enunciadoPrincipal.innerHTML += `<p class="descricao-resultado">VocÃª demorou ${adicionaZeroTempo(
      timer.getMinutes() // Pega os minutos do timer
    )}:${adicionaZeroTempo(
      timer.getSeconds() // Pega os segundos do timer
    )}s para responder esse questionÃ¡rio.</p>`;

    botaoPrincipal.innerHTML = "Refazer"; // BotÃ£o para recomeÃ§ar
    enunciadoPrincipal.style.width = "100%"; // Ajusta a largura
    botaoPrincipal.style.marginBottom = "20px"; // Adiciona espaÃ§o embaixo do botÃ£o
  }
}

// ===== PARTE 14: FUNÃ‡ÃƒO QUE CALCULA O RESULTADO =====
// Esta funÃ§Ã£o pega todas as respostas e calcula quantos planetas seriam necessÃ¡rios

function calculaResultado() {
  // ===== CÃLCULO 1: CONSUMO DE CARNE =====
  // Divide a resposta por 20, arredonda para baixo e multiplica por 5
  // Quanto mais carne, mais pontos (pior para o meio ambiente)
  pontos[0] = Math.floor(respostas[0] / 20) * 5;

  // ===== CÃLCULO 2: ALIMENTOS NÃƒO PROCESSADOS =====
  let i = Math.floor(respostas[1] / 20); // Calcula em qual faixa estÃ¡
  pontos[1] = (5 - i) * 5; // Inverte a lÃ³gica: mais alimentos naturais = menos pontos

  // ===== CÃLCULO 3: QUANTAS PESSOAS NA CASA =====
  // Menos pessoas = mais pontos (cada pessoa usa mais recursos)
  if (respostas[2] <= 2) {
    // AtÃ© 2 pessoas
    pontos[2] = 5;
  } else if (respostas[2] <= 5) {
    // De 3 a 5 pessoas
    pontos[2] = 10;
  } else {
    // Mais de 5 pessoas
    pontos[2] = 20;
  }

  // ===== CÃLCULO 4: ENERGIA ELÃ‰TRICA =====
  // Se tem energia (resposta = 1), ganha 20 pontos. Se nÃ£o tem (0), ganha 0 pontos
  pontos[3] = respostas[3] * 20;

  // ===== CÃLCULO 5: VIAGENS DE AVIÃƒO =====
  // Mesmo cÃ¡lculo da carne: mais viagens = mais pontos
  pontos[4] = Math.floor(respostas[4] / 20) * 5;

  // ===== SOMA TOTAL DOS PONTOS =====
  // Loop que percorre todos os pontos e soma no resultado final
  for (let i = 0; i < 5; i++) {
    resultadoFinal += pontos[i]; // += significa: pega o valor atual e soma mais este
  }

  // ===== CONVERSÃƒO EM PLANETAS =====
  // Divide o total por 20 e arredonda para baixo para saber quantos planetas
  qtdPlanetas = Math.floor(resultadoFinal / 20);
}

// ===== PARTE 15: FUNÃ‡ÃƒO AUXILIAR PARA FORMATAR O TEMPO =====
// Esta funÃ§Ã£o garante que nÃºmeros menores que 10 apareÃ§am com zero na frente (ex: 05, 09)

function adicionaZeroTempo(numero) {
  if (numero < 10) {
    // Se o nÃºmero Ã© menor que 10
    return `0${numero}`; // Adiciona um zero na frente
  } else {
    // Se nÃ£o
    return numero; // Retorna o nÃºmero normal
  }
}

// ===== FIM DO CÃ“DIGO =====
// O questionÃ¡rio funciona em um ciclo:
// 1. UsuÃ¡rio clica no botÃ£o
// 2. A resposta Ã© salva no array 'respostas'
// 3. A pÃ¡gina avanÃ§a (paginaAtual++)
// 4. seletorPagina() mostra a nova tela
// 5. Processo se repete atÃ© chegar no resultado