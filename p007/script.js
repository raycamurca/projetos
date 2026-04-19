// add tarefa

const input = document.querySelector("#input-tarefa");
const btAddTarefa = document.querySelector(".bt-add-tarefa");
const display = document.querySelector(".area-display");

btAddTarefa.addEventListener("click", ()=>{
    const inputValue = input.value;
    if(inputValue === "") return;

    if(!display.classList.contains("tarefa-on")){
        display.classList.add("tarefa-on");
        display.innerHTML = `
            <div class="card-tarefa">
                <div class="icon-tarefa">
                    <div class="icon-circulo"><i class="fa-regular fa-circle"></i></div>
                    <div class="tarefa">${inputValue}</div>
                </div>
                <div class="icons">
                    <div class="edit">
                        <i class="fa-solid fa-pen"></i>
                    </div>
                    <div class="apagar">
                        <i class="fa-regular fa-trash-can"></i>
                    </div>
                </div>
            </div>
        `
    } else {
        display.innerHTML += `
        <div class="card-tarefa">
            <div class="icon-tarefa">
                <div class="icon-circulo"><i class="fa-regular fa-circle"></i></div>
                <div class="tarefa">${inputValue}</div>
            </div>
            <div class="icons">
                <div class="edit">
                    <i class="fa-solid fa-pen"></i>
                </div>
                <div class="apagar">
                    <i class="fa-regular fa-trash-can"></i>
                </div>
            </div>
        </div>`
    }

    console.log(display.children.length);

    const btApagar = document.querySelectorAll(".apagar");

    btApagar.forEach(icon => {
        icon.addEventListener("click", ()=>{
            const cardTarefa = icon.closest(".card-tarefa");
            cardTarefa.remove();
            if(display.children.length === 0){
                display.classList.remove("tarefa-on")
                display.innerHTML = `
                <div class="icon-msg">
                    <i class="fa-solid fa-check"></i>
                </div>

                <div class="msg-principal">
                    <h2>Sua lista está vazia</h2>
                </div>

                <div class="msg-secundaria">
                    <p>Adicione sua primeira tarefa para começar.</p>
                </div>`
            }
        })
    });

    input.value = "";
    input.focus()
})

// apagar tarefa

