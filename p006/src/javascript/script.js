// Icon Olho

const iconsSenha = document.querySelectorAll(".icon-senha");

iconsSenha.forEach(icon => {
    icon.addEventListener("click", ()=>{
        const inputSenha = icon.previousElementSibling;
        inputSenha.type === "password" ? inputSenha.type = "text" : inputSenha.type = "password";
        icon.classList.toggle("fa-eye");
        icon.classList.toggle("fa-eye-slash");
    })
});

// validações

const msgObg = "Este campo é obrigatório!"

const validarNome = (value)=>{
    const validador = {
        valido: true,
        msgErro: null
    }

    const label = "Nome"

    if(value === ""){
        validador.valido = false,
        validador.msgErro = msgObg;
        return validador
    }

    const min = 3
    if(value.length < min){
        validador.valido = false,
        validador.msgErro = `${label} mín. ${min} caracteres!`
        return validador
    }

    const regex = /\d/;
    if(regex.test(value)){
        validador.valido = false,
        validador.msgErro = `${label} não pode conter números!`
        return validador
    }
    
    return validador
}

const validarSobrenome = (value)=>{
    const validador = {
        valido: true,
        msgErro: null
    }

    const label = "Sobrenome"

    if(value === ""){
        validador.valido = false,
        validador.msgErro = msgObg;
        return validador
    }

    const min = 3
    if(value.length < min){
        validador.valido = false,
        validador.msgErro = `${label} mín. ${min} caracteres!`
        return validador
    }

    const regex = /\d/;
    if(regex.test(value)){
        validador.valido = false,
        validador.msgErro = `${label} não pode conter números!`
        return validador
    }
    
    return validador
}


const validarNascimento = (value)=>{
    const validador = {
        valido: true,
        msgErro: null
    }

    if(value === ""){
        validador.valido = false;
        validador.msgErro = msgObg;
        return validador
    }

    const hoje = new Date();
    const nasc = new Date(value);
    const anoAtual = new Date().getFullYear();
    const anoNascimento = new Date(value).getFullYear();
    let menosUmSeculo = anoAtual - 100;

    if(anoNascimento > anoAtual || anoNascimento < menosUmSeculo || nasc > hoje){
        validador.valido = false;
        validador.msgErro = `Data inválida!`
        return validador
    }
 
    return validador
}

const validarEmail = (value)=>{
    const validador = {
        valido: true,
        msgErro: null
    }

    const label = "Email"

    if(value == ""){
        validador.valido = false;
        validador.msgErro = msgObg;
        return validador
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regexEmail.test(value)){
        validador.valido = false;
        validador.msgErro = `${label} Inválido!`
        return validador
    }

    return validador
}

const validarSenha = (value)=>{
    const validador = {
        valido: true,
        msgErro: null
    }

    const label = "Senha"

    if(value === ""){
        validador.valido = false;
        validador.msgErro = msgObg;
        return validador
    }

    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/;
    if(!regexSenha.test(value)){
        validador.valido = false;
        validador.msgErro = `${label} inválida. Use 7+ caracteres com maiúscula, minúscula, número e símbolo!`
        return validador
    }

    

    return validador
}

const confirmarSenha = (value) => {
    const validador = {
        valido: true,
        msgErro: null
    }

    const label = "Senha"

    if(value === ""){
        validador.valido = false;
        validador.msgErro = `Confirme a sua ${label}!`
        return validador
    }

    const senha = document.querySelector("#isenha").value;

    if(value !== senha){
        validador.valido = false;
        validador.msgErro = `As ${label}s não coincidem!`
        return validador
    }

    return validador
}

// campos

const campos = [
    {
        id: "#inome",
        validador: validarNome
    },
    {
        id: "#isobrenome",
        validador: validarSobrenome
    },
    {
        id: "#inascimento",
        validador: validarNascimento
    },
    {
        id: "#iemail",
        validador: validarEmail
    },
    {
        id: "#isenha",
        validador: validarSenha
    },
    {
        id: "#iconfirmar",
        validador: confirmarSenha
    }
];

// form

const form = document.querySelector(".form");

form.addEventListener("submit", (el)=>{
    el.preventDefault();

    const iconErro = '<i class="fa-solid fa-circle-xmark"></i>'


    campos.forEach(campo =>{
        let input = document.querySelector(campo.id);
        let inputValue = input.value;
        let divInput = input.closest(".div-input")
        let span = (input.closest(".div-input").lastElementChild);
        span.innerHTML = ``;

        const resultado = campo.validador(inputValue);
    
        if(!resultado.valido){
            span.innerHTML = `${iconErro} ${resultado.msgErro}`;
            divInput.classList.remove("valido");
            divInput.classList.add("invalido");
        } else{
            divInput.classList.remove("invalido")
            divInput.classList.add("valido");
        }
    })

    const radioSelecionado = document.querySelector('input[name="sexo"]:checked');
    const divRadio = document.querySelector(".div-radio p");
    const spanGenero = document.querySelector(".genero");
    if (radioSelecionado) {
        divRadio.classList.add("valido");
        divRadio.classList.remove("invalido");
        spanGenero.innerHTML = ``
    } else {
        divRadio.classList.add("invalido");
        divRadio.classList.remove("valido");
        spanGenero.innerHTML = `${iconErro} ${msgObg}`
    }
})