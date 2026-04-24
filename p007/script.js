// icone erro e spanErro

const iconErro = '<i class="fa-solid fa-circle-xmark"></i>';
const spanErro = document.querySelector(".erro");

// Controle das tabs (navegação)

const btTabs = document.querySelectorAll(".areas button");

btTabs.forEach(botao =>{
    botao.addEventListener("click", ()=>{
        btTabs.forEach(tab =>{
            tab.classList.remove("ativo");
        })
        botao.classList.add("ativo");

        const conteudos = document.querySelectorAll(".conteudo");
        conteudos.forEach(conteudo => conteudo.classList.remove("show"));
        
        const tabId = botao.getAttribute("conteudo-id");
        const tabAtiva = document.getElementById(tabId);
        tabAtiva.classList.add("show");
    })
})

// click do botao adicionar

const btAddTarefa = document.querySelector(".bt-add-tarefa");
const input = document.querySelector("#itarefa");

btAddTarefa.addEventListener("click", ()=>{
    spanErro.innerHTML = "";
    const inputValue = input.value.trim();
    if(inputValue === ""){
        return spanErro.innerHTML = `${iconErro} Nome da tarefa obrigatório`
    };

    const tarefas = [...document.querySelectorAll(".descricao")];

    const tarefaExiste = tarefas.some(tarefa => {
        return tarefa.innerHTML === inputValue;
    })

    if(tarefaExiste){
        return spanErro.innerHTML = `${iconErro} A tarefa já existe`
    }

    const novaTarefa = criarTarefa(inputValue);
    addTarefa(novaTarefa);
    deletarTarefa();
    
    // addTarefa(inputValue);
})

// Função criar tarefa

const criarTarefa = (value) => {
    const divCardTarefa = document.createElement("div");
    divCardTarefa.setAttribute("class", "card-tarefa pendente");

    const divTarefa = document.createElement("div");
    divTarefa.setAttribute("class", "tarefa");
    divCardTarefa.appendChild(divTarefa);

    const divCardIcon = document.createElement("div"); 
    divCardIcon.setAttribute("class", "card-icon");
    divTarefa.appendChild(divCardIcon);

    const iCirculo = document.createElement("i");
    iCirculo.setAttribute("class", "fa-regular fa-circle circulo");
    divCardIcon.appendChild(iCirculo);

    const pDescricao = document.createElement("p");
    pDescricao.setAttribute("class", "descricao");
    pDescricao.innerHTML = value;
    divTarefa.appendChild(pDescricao);

    const divCardDelete = document.createElement("div");
    divCardDelete.setAttribute("class", "card-delete");
    divCardTarefa.appendChild(divCardDelete);

    const iLixeira = document.createElement("i");
    iLixeira.setAttribute("class", "fa-regular fa-trash-can");
    divCardTarefa.appendChild(iLixeira);

    return divCardTarefa
}

// Função adicionar tarefa

const msgPadraoVaziaTodas = document.querySelector(".conteudo-todos");
const displayTodas = document.querySelector("#todas");
const msgPadraoVaziaPendentes = document.querySelector(".conteudo-pendentes");
const displayPendentes = document.querySelector("#pendentes");

const addTarefa = (value) => {
    msgPadraoVaziaTodas.style.display = "none";
    displayTodas.appendChild(value);
    msgPadraoVaziaPendentes.style.display = "none";
    displayPendentes.appendChild(value.cloneNode(true));
    totalPendentesConcluidas();
}

// Função deletar Tarefa

const deletarTarefa = () =>{
    const iconsDelete = document.querySelectorAll(".fa-trash-can");
    iconsDelete.forEach(icon => {
        icon.addEventListener("click", ()=>{
            const cardRemoveAtual = icon.closest(".card-tarefa");
            const descricaoAtual = cardRemoveAtual.childNodes[0].lastChild;
            const descricoes = document.querySelectorAll(".descricao");
            descricoes.forEach(el => {
                if(el.innerHTML === descricaoAtual.innerHTML){
                    const cardRemoveIgual = el.closest(".card-tarefa");
                    cardRemoveAtual.remove();
                    cardRemoveIgual.remove();
                }
            });
            verificarMsg();      
        })
    })
}

// Função msg Padrão
const msgPadraoVaziaConcluidas = document.querySelector(".conteudo-concluido");

const verificarMsg = () =>{
    const cardsTarefas = document.querySelectorAll(".card-tarefa");
    const cardsPendentes = document.querySelectorAll(".pendente");
    const cardsConcluidas = document.querySelectorAll(".concluida");
    
    if(cardsTarefas.length === 0){
        msgPadraoVaziaTodas.style.display = "flex";
    }

    if(cardsPendentes.length === 0){
        msgPadraoVaziaPendentes.style.display = "flex";
    }

    if(cardsConcluidas.length === 0){
        msgPadraoVaziaConcluidas.style.display = "flex";
    }
}

const totalPendentesConcluidas = () => {
    const tarefasPendentes = document.querySelectorAll(".pendente");
    const tarefasConcluidas = document.querySelectorAll(".concluida");
    const info = document.querySelector(".title-info p");
    info.innerHTML = `${tarefasPendentes.length/2} pendentes · ${tarefasConcluidas.length/2} concluídas`
}