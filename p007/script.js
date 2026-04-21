// navegação

const btNav = document.querySelectorAll(".areas button");
const conteudos = document.querySelectorAll(".conteudo");

btNav.forEach(botao =>{
    botao.addEventListener("click", ()=>{
        // botao ativo
        btNav.forEach(b => b.classList.remove("ativo"));
        botao.classList.add("ativo");
        
        // conteudo ativo
        conteudos.forEach(conteudo => conteudo.classList.remove("show"));
        const idNav = botao.getAttribute("conteudo-id");
        const conteudoSelecionado = document.getElementById(idNav);
        conteudoSelecionado.classList.add("show");
    })
})

// adicionar tarefa

const msgVazioTodos = document.querySelector(".conteudo-todos");
const msgVazioPendentes = document.querySelector(".conteudo-pendentes");

const input = document.querySelector("#itarefa");
const btAddTarefa = document.querySelector(".bt-add-tarefa")

btAddTarefa.addEventListener("click", ()=>{
    const inputValue = input.value;
    if(inputValue.trim() === "") return;

    const displayTodas = document.querySelector("#todas");
    displayTodas.appendChild(criarTarefa(inputValue));
    
    const displayPendentes = document.querySelector("#pendentes");
    displayPendentes.appendChild(criarTarefa(inputValue));

    verificarListaVaziaTodos();
    verificarListaVaziaPendentes();
})


const criarTarefa = (value)=>{
    
    const cardTarefa = document.createElement("div");
    cardTarefa.setAttribute("class", "card-tarefa pendente");

    const tarefa = document.createElement("div");
    tarefa.setAttribute("class", "tarefa");
    cardTarefa.appendChild(tarefa);

    const cardIconConcluido = document.createElement("div");
    cardIconConcluido.setAttribute("class", "card-icon-concluido");
    tarefa.appendChild(cardIconConcluido);

    const iconConcluido = document.createElement("i");
    iconConcluido.setAttribute("class", "fa-regular fa-circle");
    cardIconConcluido.appendChild(iconConcluido);

    const nomeTarefa = document.createElement("p");
    nomeTarefa.setAttribute("class", "descricao")
    nomeTarefa.innerHTML = value;
    tarefa.appendChild(nomeTarefa);

    const cardDelete = document.createElement("div");
    cardDelete.setAttribute("class", "card-delete");
    cardTarefa.appendChild(cardDelete);

    const iconDelete = document.createElement("i");
    iconDelete.setAttribute("class", "fa-regular fa-trash-can");
    cardDelete.appendChild(iconDelete);


     // Deletar tarefa
    iconDelete.addEventListener("click", () => {
        const texto = nomeTarefa.textContent;

        const cards = document.querySelectorAll(".card-tarefa");

        cards.forEach(card => {
            const desc = card.querySelector(".descricao").textContent;

            if(desc === texto){
                card.remove(); // remove TODOS iguais
            }
        });
        
        verificarListaVaziaTodos();
        verificarListaVaziaPendentes();
    });

    return cardTarefa
}

const verificarListaVaziaTodos = ()=>{
    const cards = document.querySelectorAll(".card-tarefa").length;
    if(cards === 0){
        return msgVazioTodos.style.display = "flex";
    }else {
       return msgVazioTodos.style.display = "none";
    }
}

const verificarListaVaziaPendentes = ()=>{
    const cardsPendentes = document.querySelectorAll(".pendente").length;
    if(cardsPendentes === 0){
        return msgVazioPendentes.style.display = "flex";
    }else {
       return msgVazioPendentes.style.display = "none";
    }
}