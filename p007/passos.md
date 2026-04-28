# Passo a passo da logica JavaScript (`script.js`)

Este documento cobre somente a logica da lista de tarefas.

Fluxo da aplicacao:
- adicionar tarefa
- marcar/desmarcar como concluida
- deletar tarefa
- filtrar em 3 abas (`todas`, `pendentes`, `concluidas`)

Regra principal:
- toda tarefa sempre pertence a aba `todas`
- `pendentes` mostra apenas `concluida === false`
- `concluidas` mostra apenas `concluida === true`

## Checklist de implementacao

### 1) Estruturar estado da aplicacao
- [X] **Objetivo tecnico:** centralizar os dados da tela em um unico estado.
- [X] **O que fazer na logica:**
  - criar `estado` com `tarefas: []` e `abaAtiva: "todas"`
  - definir modelo da tarefa: `id`, `texto`, `concluida`
- [X] **Resultado esperado:** toda mudanca da interface depende apenas de `estado`.

### 2) Mapear seletores do DOM
- [X] **Objetivo tecnico:** evitar consultas repetidas ao DOM.
- [X] **O que fazer na logica:**
  - selecionar input, botao adicionar e span de erro
  - selecionar botoes de abas (`data-aba`)
  - selecionar containers `#todas`, `#pendentes`, `#concluidas`
  - selecionar texto de resumo do topo
- [X] **Resultado esperado:** os seletores ficam organizados no topo do arquivo.

### 3) Criar utilitarias
- [X] **Objetivo tecnico:** reaproveitar regras comuns.
- [X] **O que fazer na logica:**
  - criar `gerarId()` com `crypto.randomUUID()` e fallback
  - criar `normalizarTexto(texto)` com `trim()` e `toLowerCase()`
- [X] **Resultado esperado:** ids unicos e comparacao de texto padronizada.

### 4) Implementar troca de abas
- [X] **Objetivo tecnico:** controlar visual e estado da aba ativa.
- [X] **O que fazer na logica:**
  - criar `mudarAba(idAba)`
  - atualizar `estado.abaAtiva`
  - alternar classe `ativo` nos botoes
  - alternar classe `show` nos conteudos
- [X] **Resultado esperado:** apenas a aba selecionada fica visivel.

### 5) Criar card de tarefa
- [ ] **Objetivo tecnico:** padronizar a criacao dos cards.
- [ ] **O que fazer na logica:**
  - criar `criarCardTarefa(tarefa)`
  - montar card com descricao, acao de alternar e acao de excluir
  - adicionar `data-id` no card
  - usar `data-action="alternar"` e `data-action="excluir"`
  - aplicar visual de concluida quando `tarefa.concluida` for `true`
- [ ] **Resultado esperado:** cada tarefa vira um elemento pronto para interacao.

### 6) Implementar renderizacao principal
- [ ] **Objetivo tecnico:** redesenhar a tela sempre que o estado mudar.
- [ ] **O que fazer na logica:**
  - criar `renderizar()`
  - limpar as listas antes de desenhar novamente
  - percorrer `estado.tarefas` e distribuir:
    - sempre em `todas`
    - em `pendentes` se `concluida === false`
    - em `concluidas` se `concluida === true`
  - chamar `atualizarResumoTopo()`
  - chamar `atualizarMensagensVazias()`
- [ ] **Resultado esperado:** conteudo das abas sempre sincronizado com o estado.

### 7) Atualizar resumo do topo
- [ ] **Objetivo tecnico:** exibir contadores corretos.
- [ ] **O que fazer na logica:**
  - criar `atualizarResumoTopo()`
  - calcular total pendente e total concluida
  - atualizar texto do topo (ex.: `2 pendentes · 1 concluida`)
- [ ] **Resultado esperado:** resumo reflete o estado atual apos qualquer acao.

### 8) Atualizar mensagens de vazio
- [ ] **Objetivo tecnico:** mostrar feedback quando nao houver itens.
- [ ] **O que fazer na logica:**
  - criar `atualizarMensagensVazias()`
  - exibir mensagem de `todas` quando `estado.tarefas.length === 0`
  - exibir mensagem de `pendentes` quando nao houver pendentes
  - exibir mensagem de `concluidas` quando nao houver concluidas
- [ ] **Resultado esperado:** cada aba mostra o estado vazio correto.

### 9) Adicionar tarefa
- [ ] **Objetivo tecnico:** incluir novas tarefas com validacao.
- [ ] **O que fazer na logica:**
  - criar `adicionarTarefa()`
  - validar campo vazio
  - validar duplicidade com `normalizarTexto()`
  - inserir em `estado.tarefas` com `concluida: false`
  - limpar input, focar input e chamar `renderizar()`
- [ ] **Resultado esperado:** nova tarefa aparece em `todas` e `pendentes`.

### 10) Marcar/desmarcar tarefa como concluida
- [ ] **Objetivo tecnico:** alterar estado da tarefa sem perder dados.
- [ ] **O que fazer na logica:**
  - criar `alternarConclusao(idTarefa)`
  - inverter valor de `concluida` da tarefa alvo
  - chamar `renderizar()`
- [ ] **Resultado esperado:**
  - ao concluir, sai de `pendentes` e entra em `concluidas`
  - ao desmarcar, sai de `concluidas` e volta para `pendentes`

### 11) Deletar tarefa
- [ ] **Objetivo tecnico:** remover tarefa por id.
- [ ] **O que fazer na logica:**
  - criar `removerTarefa(idTarefa)`
  - filtrar `estado.tarefas` removendo o id informado
  - chamar `renderizar()`
- [ ] **Resultado esperado:** tarefa removida de todas as abas.

### 12) Implementar delegacao de eventos dos cards
- [ ] **Objetivo tecnico:** manter eventos funcionando apos cada render.
- [ ] **O que fazer na logica:**
  - criar `tratarCliqueLista(evento)`
  - localizar `data-action` clicado
  - localizar `idTarefa` no card pai
  - chamar `alternarConclusao()` ou `removerTarefa()`
  - registrar listener nos containers `todas`, `pendentes` e `concluidas`
- [ ] **Resultado esperado:** acoes dos cards funcionam sem criar listeners por item.

### 13) Conectar eventos gerais
- [ ] **Objetivo tecnico:** ligar a logica aos controles da tela.
- [ ] **O que fazer na logica:**
  - no clique do botao, chamar `adicionarTarefa()`
  - no Enter do input, chamar `adicionarTarefa()`
  - no clique das abas (`data-aba`), chamar `mudarAba(idAba)`
- [ ] **Resultado esperado:** interface responde aos comandos principais.

### 14) Inicializar aplicacao
- [ ] **Objetivo tecnico:** iniciar interface consistente.
- [ ] **O que fazer na logica:**
  - executar `mudarAba(estado.abaAtiva)`
  - executar `renderizar()`
- [ ] **Resultado esperado:** app inicia na aba `todas` com estado sincronizado.

## Regras finais da renderizacao

- toda mudanca de estado deve terminar com `renderizar()`
- `todas` sempre recebe todas as tarefas
- `pendentes` recebe somente tarefas nao concluidas
- `concluidas` recebe somente tarefas concluidas