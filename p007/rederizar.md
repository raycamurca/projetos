A função `renderizar()` é o **coração da aplicação**.
Ela é responsável por **desenhar novamente a tela inteira** sempre que algo muda.

Pensa assim:

* adicionou tarefa → precisa atualizar a tela
* concluiu tarefa → precisa atualizar a tela
* deletou tarefa → precisa atualizar a tela

Então a função `renderizar()` serve para:

> "olhar o estado atual e reconstruir o que aparece na interface"

---

# Como pensar a função `renderizar()`

Ela segue uma lógica simples:

1. limpar as listas
2. percorrer as tarefas
3. decidir onde cada tarefa vai
4. colocar os cards nas abas corretas
5. atualizar informações extras

---

# Estrutura mental da renderização

Imagine que você tem isso:

```js
estado.tarefas = [
  { id: 1, texto: "Estudar", concluida: false },
  { id: 2, texto: "Treinar", concluida: true }
]
```

Sua tela precisa ficar:

### todas

* Estudar
* Treinar

### pendentes

* Estudar

### concluidas

* Treinar

---

# Passo 1 — limpar tudo antes

Primeiro você apaga o conteúdo antigo.

Porque senão vai duplicar.

Exemplo:

```js
containerTodas.innerHTML = "";
containerPendentes.innerHTML = "";
containerConcluidas.innerHTML = "";
```

---

## Por que limpar?

Porque você vai desenhar tudo novamente.

Sem limpar:

```txt
Render 1:
Estudar

Render 2:
Estudar
Estudar
```

Duplicaria.

---

# Passo 2 — percorrer as tarefas

Agora você pega todas as tarefas.

```js
estado.tarefas.forEach(tarefa => {

});
```

Aqui você passa por cada item.

---

# Passo 3 — criar card da tarefa

Para cada tarefa você cria um card.

```js
const card = criarCardTarefa(tarefa);
```

Isso retorna algo assim:

```html
<div class="card-tarefa">
  tarefa
</div>
```

---

# Passo 4 — adicionar sempre em "todas"

Regra principal:

> toda tarefa sempre vai para "todas"

```js
containerTodas.appendChild(card);
```

---

# Passo 5 — verificar se está concluída

Agora decide onde mais ela vai.

---

## Se NÃO concluída

```js
if (!tarefa.concluida) {
   containerPendentes.appendChild(
      criarCardTarefa(tarefa)
   );
}
```

---

## Se concluída

```js
if (tarefa.concluida) {
   containerConcluidas.appendChild(
      criarCardTarefa(tarefa)
   );
}
```

---

# Passo 6 — atualizar informações extras

Depois da renderização:

```js
atualizarResumoTopo();
atualizarMensagensVazias();
```

---

# Fluxo visual completo

```txt
renderizar()

↓

limpa listas

↓

percorre estado.tarefas

↓

cria card

↓

coloca em todas

↓

verifica concluida

↓

manda para pendentes ou concluidas

↓

atualiza resumo

↓

atualiza mensagens vazias
```

---

# Estrutura completa da função

```js
function renderizar() {

  // limpar listas
  containerTodas.innerHTML = "";
  containerPendentes.innerHTML = "";
  containerConcluidas.innerHTML = "";

  // percorrer tarefas
  estado.tarefas.forEach(tarefa => {

    // criar card
    const cardTodas = criarCardTarefa(tarefa);

    // sempre vai para todas
    containerTodas.appendChild(cardTodas);

    // pendentes
    if (!tarefa.concluida) {
      const cardPendente = criarCardTarefa(tarefa);
      containerPendentes.appendChild(cardPendente);
    }

    // concluidas
    if (tarefa.concluida) {
      const cardConcluida = criarCardTarefa(tarefa);
      containerConcluidas.appendChild(cardConcluida);
    }

  });

  atualizarResumoTopo();
  atualizarMensagensVazias();
}
```

---

# Forma mais fácil de entender

Imagine:

```txt
estado = banco de dados
renderizar = desenhista da tela
```

Toda vez que algo muda:

```txt
estado muda
↓

renderizar lê o estado
↓

reconstrói a interface
```

---

# Regra de ouro

Nunca mexa diretamente no HTML.

Sempre:

```txt
muda estado
↓

renderizar()
```

---

Exemplo:

```js
estado.tarefas.push(novaTarefa);

renderizar();
```

---

Isso deixa sua aplicação organizada e profissional.