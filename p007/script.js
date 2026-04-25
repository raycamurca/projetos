const estado = {
    tarefas: [{
        id: gerarId(),
        texto: "Tarefa 1",
        concluida: false
    }, {
        id: gerarId(),
        texto: "Tarefa 2",
        concluida: false
    }, {
        id: gerarId(),
        texto: "Tarefa 3",
        concluida: false
    }],
    abaAtiva: "todas"
}

const seletores = {
    input: document.querySelector("#itarefa"),
    botao: document.querySelector("#bt-cell"),
    erro: document.querySelector(".erro"),
    areas: document.querySelectorAll(".areas button"),
    conteudos: document.querySelectorAll(".conteudos .conteudo"),
    resumo: document.querySelector(".resumo"),
    dica: document.querySelector(".dica")
}

const gerarId = () => {
    return crypto.randomUUID(); // retorna um id unico
}

const normalizarTexto = (texto) => {
    return texto.trim().toLowerCase();
}