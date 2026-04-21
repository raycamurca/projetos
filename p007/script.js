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

const input = document.querySelector("#itarefa");
const btAddTarefa = document.querySelector(".bt-add-tarefa")

btAddTarefa.addEventListener("click", ()=>{
    const inputValue = input.value;
    if(inputValue.trim() === "") return;
    
})