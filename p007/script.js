
// modelo das tarefas: `id`, `texto`, `concluida`

const estado = {
    tarefas: [],
    abaAtiva: "todas"
}

const seletores = {
    infoTopo: document.querySelector(".title-info p"),
    input: document.querySelector("#itarefa"),
    btnAdd: document.querySelector(".bt-add-tarefa"),
    spanErro: document.querySelector(".erro"),
    botoesAbas: document.querySelectorAll(".areas button"),
    conteudos: document.querySelectorAll(".conteudo")
}

//Função gerarId

function gerarId(){
    if (crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

//Função normalizarTexto

function normalizarTexto(texto){
    return texto.trim().toLowerCase();
}

// alternar abas

seletores.botoesAbas.forEach(botao =>{
    botao.addEventListener("click", ()=>{
        mudarAba(botao.dataset.aba)
    })
})

function mudarAba(idAba){
    estado.abaAtiva = idAba;
    seletores.botoesAbas.forEach(botao =>{
        botao.classList.toggle("ativo", botao.dataset.aba === idAba)
    })
    seletores.conteudos.forEach(conteudo =>{
        conteudo.classList.toggle("show", conteudo.id === idAba)
    })
}

//Criar Card Tarefa

function criarCardTarefa(tarefa){

}