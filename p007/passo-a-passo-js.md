# Passo a passo do `script.js` (somente filtros **Todas** e **Pendentes**)

## 1) Estruture o estado da aplicacao

Crie um objeto `estado` com:

- `tarefas`: array de objetos
- `abaAtiva`: `"todas"` ou `"pendentes"`

Modelo de tarefa:

- `id`: identificador unico
- `texto`: descricao da tarefa
- `concluida`: `true` ou `false`

Exemplo:

```js
const estado = {
  tarefas: [],
  abaAtiva: "todas",
};
```

## 2) Separe todos os seletores no topo

No inicio do arquivo, pegue os elementos que serao usados:

- input de tarefa
- botao adicionar
- span de erro
- paragrafo de resumo do topo
- botoes da area de filtros
- containers das abas (`#todas` e `#pendentes`)
- mensagens padrao (lista vazia e tudo em dia)

## 3) Crie funcoes utilitarias pequenas

### `gerarId()`

Gera um identificador unico para cada tarefa.

- primeiro tenta `crypto.randomUUID()`
- se nao existir, usa fallback com data + numero aleatorio

### `normalizarTexto(texto)`

Padroniza o texto para comparar duplicidade.

- aplica `trim()`
- aplica `toLowerCase()`

## 4) Controle de abas

### `mudarAba(idAba)`

Responsavel por alternar visualmente entre filtros e guardar a aba atual no estado.

O que faz:

- atualiza `estado.abaAtiva`
- adiciona/remove classe `ativo` nos botoes
- adiciona/remove classe `show` nas secoes `.conteudo`

## 5) Criacao do card de tarefa

### `criarCardTarefa(tarefa)`

Monta e retorna o elemento `.card-tarefa` para uma tarefa.

O que monta:

- icone de status
- descricao
- icone de lixeira

Boas praticas:

- usar `textContent` para descricao
- adicionar `data-id` no card
- usar `data-action="alternar"` no icone de status
- usar `data-action="excluir"` no icone de lixeira

Se `tarefa.concluida === true`, aplicar visual de concluida (icone marcado e texto riscado).

## 6) Renderizacao principal

### `renderizar()`

Funcao central da tela. Sempre que o estado muda, esta funcao redesenha a lista.

Fluxo:

1. limpar cards atuais de `#todas` e `#pendentes`
2. percorrer `estado.tarefas`
3. sempre adicionar card em `#todas`
4. adicionar em `#pendentes` somente se `concluida === false`
5. chamar `atualizarResumoTopo()`
6. chamar `atualizarMensagensVazias()`

## 7) Resumo do topo

### `atualizarResumoTopo()`

Atualiza o texto abaixo de "Minhas tarefas" com contagem real.

Exemplo:

`"2 pendentes · 1 concluidas"`

## 8) Mensagens padrao

### `atualizarMensagensVazias()`

Mostra/esconde as mensagens de estado vazio:

- em `#todas`: mostrar quando `estado.tarefas.length === 0`
- em `#pendentes`: mostrar quando nao houver tarefas pendentes

## 9) Adicionar tarefa

### `adicionarTarefa()`

Executada no clique do botao `+` e no Enter do input.

Fluxo:

1. limpa erro antigo
2. valida campo vazio
3. valida duplicidade com `normalizarTexto()`
4. adiciona no `estado.tarefas` com `{ id, texto, concluida: false }`
5. limpa input
6. foca input
7. chama `renderizar()`

## 10) Remover tarefa

### `removerTarefa(idTarefa)`

Remove uma tarefa pelo `id` e redesenha a tela.

- usa `filter`
- chama `renderizar()`

## 11) Marcar/desmarcar concluida

### `alternarConclusao(idTarefa)`

Inverte o valor `concluida` da tarefa selecionada e redesenha a tela.

- usa `map`
- chama `renderizar()`

## 12) Tratar cliques da lista com delegacao de eventos

### `tratarCliqueLista(evento)`

Evita criar listener em cada card novo.

O que faz:

- identifica o elemento com `data-action`
- pega o `id` da tarefa no card pai
- se acao for `"excluir"`, chama `removerTarefa(idTarefa)`
- se acao for `"alternar"`, chama `alternarConclusao(idTarefa)`

Registrar essa funcao nos containers `#todas` e `#pendentes`.

## 13) (Opcional) Edicao por duplo clique

### `tratarDuploClique(evento)`

Permite editar descricao ao dar duplo clique no texto da tarefa.

Fluxo:

- encontra `.descricao`
- abre `prompt`
- valida vazio/duplicidade
- atualiza no estado
- chama `renderizar()`

## 14) Inicializacao no fim do arquivo

No final do `script.js`, execute:

1. `mudarAba(estado.abaAtiva)`
2. `renderizar()`

Assim a tela sempre inicia consistente.

---

## Ordem recomendada de implementacao

1. seletores + `estado`
2. utilitarias (`gerarId`, `normalizarTexto`)
3. `mudarAba`
4. `criarCardTarefa`
5. `renderizar`
6. `atualizarResumoTopo` e `atualizarMensagensVazias`
7. `adicionarTarefa`
8. `removerTarefa` e `alternarConclusao`
9. `tratarCliqueLista` + listeners (click, enter, filtros)
10. inicializacao final

## Erros para evitar

- nao usar `cloneNode` para simular filtros
- nao comparar tarefas com `innerHTML`
- nao dividir contagem por 2
- nao recriar listeners a cada render