// modelo das tarefas: `id`, `texto`, `concluida`

const estado = {
  tarefas: [],
  abaAtiva: "todas",
};

const seletores = {
  infoTopo: document.querySelector(".title-info p"),
  input: document.querySelector("#itarefa"),
  btnAdd: document.querySelector(".bt-add-tarefa"),
  spanErro: document.querySelector(".erro"),
  botoesAbas: document.querySelectorAll(".areas button"),
  conteudos: document.querySelectorAll(".conteudo"),
  abaTodas: document.querySelector("#todas"),
  abaPendentes: document.querySelector("#pendentes"),
  abaConcluidas: document.querySelector("#concluidas"),
  iconErro: '<i class="fa-solid fa-circle-xmark"></i>',
  circles: document.querySelectorAll(".fa-circle"),
};

//Função gerarId

function gerarId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

//Função normalizarTexto

function normalizarTexto(texto) {
  return texto.trim().toLowerCase();
}

// alternar abas

seletores.botoesAbas.forEach(botao => {
  botao.addEventListener("click", () => {
    mudarAba(botao.dataset.aba);
  });
});

function mudarAba(idAba) {
  estado.abaAtiva = idAba;
  seletores.botoesAbas.forEach(botao => {
    botao.classList.toggle("ativo", botao.dataset.aba === idAba);
  });
  seletores.conteudos.forEach(conteudo => {
    conteudo.classList.toggle("show", conteudo.id === idAba);
  });
}

//Criar Card Tarefa

function criarCardTarefa(tarefa) {
  const card = document.createElement("div");
  card.className = "card-tarefa";
  card.dataset.id = tarefa.id;
  card.classList.toggle("concluida", tarefa.concluida);
  card.classList.toggle("pendente", !tarefa.concluida);

  card.innerHTML = `
        <div class="tarefa">
            <button class="card-icon" data-action="alternar">
                <i aria-hidden="true"></i>
            </button>

            <p class="descricao"></p>
        </div>

        <button class="card-delete" data-action="excluir" aria-label="Excluir tarefa">
            <i class="fa-regular fa-trash-can" aria-hidden="true"></i>
        </button>
    `;

  const cardIcon = card.querySelector(".card-icon");
  cardIcon.setAttribute(
    "aria-label",
    tarefa.concluida
      ? "Marcar tarefa como pendente"
      : "Marcar tarefa como concluída"
  );
  cardIcon.setAttribute("aria-checked", String(tarefa.concluida));

  const icone = cardIcon.querySelector("i");
  icone.className = tarefa.concluida
    ? "fa-regular fa-circle-check marcado"
    : "fa-regular fa-circle";

  const descricao = card.querySelector(".descricao");
  descricao.textContent = tarefa.texto;

  return card;
}

//Função rederizar

function renderizar() {
  seletores.abaTodas.innerHTML = "";
  seletores.abaPendentes.innerHTML = "";
  seletores.abaConcluidas.innerHTML = "";

  estado.tarefas.forEach(tarefa => {
    const tarefaAtual = criarCardTarefa(tarefa);
    seletores.abaTodas.appendChild(tarefaAtual);

    if (!tarefa.concluida) {
      const cardPendente = criarCardTarefa(tarefa);
      seletores.abaPendentes.appendChild(cardPendente);
    }
    if (tarefa.concluida) {
      const cardConcluida = criarCardTarefa(tarefa);
      seletores.abaConcluidas.appendChild(cardConcluida);
    }
  });

  atualizarResumoTopo();
  atualizarMensagensVazias();
}

//Atualizar resumo do topo

function atualizarResumoTopo() {
  let totalPendentes = 0;
  let totalConcluidas = 0;
  estado.tarefas.forEach(tarefa => {
    if (!tarefa.concluida) {
      totalPendentes++;
    }
    if (tarefa.concluida) {
      totalConcluidas++;
    }
  });

  seletores.infoTopo.textContent = `${totalPendentes} pendentes · ${totalConcluidas} concluídas`;
}

//Atualizar msg vazia

function atualizarMensagensVazias() {
  if (estado.tarefas.length === 0) {
    seletores.abaTodas.innerHTML = `
            <div class="conteudo-todas">
                <div class="icon-conteudo">
                    <i class="fa-solid fa-check"></i>
                </div>
                <div class="info-one">
                    <h2>Nenhuma tarefa ainda</h2>
                </div>
                <div class="info-two">
                    <p>Adicione uma tarefa para comecar.</p>
                </div>
            </div>
        `;
  }

  const totTarefasPendentes = estado.tarefas.filter(
    tarefa => !tarefa.concluida
  ).length;

  if (totTarefasPendentes === 0) {
    seletores.abaPendentes.innerHTML = `
        <div class="conteudo-pendentes">
            <div class="icon-conteudo">
                <i class="fa-solid fa-check"></i>
            </div>
            <div class="info-one">
                <h2>Tudo em dia</h2>
            </div>
            <div class="info-two">
                <p>Mude o filtro para ver outras tarefas.</p>
            </div>
        </div>
        `;
  }

  const totTarefasConcluidas = estado.tarefas.filter(
    tarefa => tarefa.concluida
  ).length;

  if (totTarefasConcluidas === 0) {
    seletores.abaConcluidas.innerHTML = `
            <div class="conteudo-concluido">
                <div class="icon-conteudo">
                    <i class="fa-solid fa-check"></i>
                </div>
                <div class="info-one">
                    <h2>Nada concluído ainda</h2>
                </div>
                <div class="info-two">
                    <p>Mude o filtro para ver outras tarefas.</p>
                </div>
            </div>
        `;
  }
}

seletores.btnAdd.addEventListener("click", () => {
  adicionarTarefa(seletores.input);
});

//Adicionar Tarefa

function adicionarTarefa(inputTarefa) {
  seletores.spanErro.innerHTML = "";
  const tarefaValue = inputTarefa.value;
  if (normalizarTexto(tarefaValue) === "") {
    return (seletores.spanErro.innerHTML = `${seletores.iconErro} Digite uma tarefa!`);
  }

  const existeDuplicidade = estado.tarefas.some(
    tarefa => normalizarTexto(tarefa.texto) === normalizarTexto(tarefaValue)
  );

  if (existeDuplicidade) {
    return (seletores.spanErro.innerHTML = `${seletores.iconErro} A tarefa já existe`);
  }

  const tarefa = { id: gerarId(), texto: tarefaValue, concluida: false };
  estado.tarefas.push(tarefa);

  inputTarefa.value = "";
  inputTarefa.focus();

  renderizar();
}

// alternar Conclusao

function alternarConclusao(idTarefa) {
  
}
