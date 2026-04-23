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

    criarTarefa(inputValue)
    addTarefa();
    deletarTarefa();
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

    return displayTodas.appendChild(divCardTarefa);
}

// Função adicionar tarefa

const msgPadraoVaziaTodas = document.querySelector(".conteudo-todos");
const displayTodas = document.querySelector("#todas");
const msgPadraoVaziaPendentes = document.querySelector(".conteudo-pendentes");
const displayPendentes = document.querySelector("#pendentes");
const msgPadraoVaziaConcluidas = document.querySelector(".conteudo-concluido");
const displayConcluidas = document.querySelector("#concluidas");

const addTarefa = (value) => {

    const novaTarefa = criarTarefa(value);

    const todasTarefas = document.querySelectorAll(".card-tarefa");

    todasTarefas.forEach(tarefa =>{
        tarefa.appendChild(displayTodas)
    })

    // if(novaTarefa.classList.contains("card-tarefa")){
    //     msgPadraoVaziaTodas.style.display = "none";
    //     displayTodas.appendChild(novaTarefa);
    // }
    
    // if(novaTarefa.classList.contains("pendente")){
    //     msgPadraoVaziaPendentes.style.display = "none";
    //     displayPendentes.appendChild(novaTarefa.cloneNode(true));
    // }

    // if(novaTarefa.classList.contains("concluida")){
    //     msgPadraoVaziaConcluidas.style.display = "none";
    //     displayConcluidas.appendChild(novaTarefa.cloneNode(true))
    // }

    teste();
    
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

const verificarMsg = () =>{
    const cardsTarefas = document.querySelectorAll(".card-tarefa");
    if(cardsTarefas.length === 0){
        msgPadraoVaziaTodas.style.display = "flex";
    }

    const cardsPendentes = document.querySelectorAll(".pendente");
    if(cardsPendentes.length === 0){
        msgPadraoVaziaPendentes.style.display = "flex";
    }

    const cardsConcluidas = document.querySelectorAll(".concluida");
    if(cardsConcluidas.length === 0){
        msgPadraoVaziaConcluidas.style.display = "flex";
    }
}

const teste = () => {
    const iconsCircle = document.querySelectorAll(".circulo");
    
    iconsCircle.forEach(icon =>{
        icon.addEventListener("click", ()=>{
            const cardPaiIcon = icon.closest(".card-tarefa");
            if(icon.classList.contains("fa-circle")){
                icon.classList.remove("fa-circle");
                icon.classList.add("fa-circle-check");
                icon.classList.add("marcado");
                cardPaiIcon.classList.remove("pendente");
                cardPaiIcon.classList.add("concluida");
            }else{
                icon.classList.remove("fa-circle-check");
                icon.classList.add("fa-circle");
                icon.classList.remove("marcado");
                cardPaiIcon.classList.remove("concluida");
                cardPaiIcon.classList.add("pendente");
            }
        })
    })
}