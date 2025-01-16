## Estrutura do Projeto / Arquitetura

A pasta `src` do projeto está estruturada de modo a apresentar uma
[Scream Architecture](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html). Ela é baseada em _features_, mas com itens globais organizados por função.

Para sua definição, foram utilizados príncipios de 3 referências:

- [React Bulletproof - Project Structure](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)
- [Profy - Evolution of a React folder structure and why to group by features right away](https://profy.dev/article/react-folder-structure)
- [Josh W. Comeau - Delightful React File/Directory Structure](https://www.joshwcomeau.com/react/file-structure/)

A estrutura ainda não é definitiva, e pode ser alterada durante a etapa de codificação, em que serão apresentadas mais a frente no texto observações sobre dicas de alterações que podem se fazer necessárias.

### Exemplos

Partindo do _root level_, a pasta `src` é organizada inicialmente da seguinte maneira:

```sh
src/
|
+-- api/                      # declarações de requests para todos os endpoints da API
|
+-- app/                      # camada de aplicação, contendo:
|   |
|   +-- pages/                # páginas do app, que são componentes que renderizam para cada rota declarada
|   +-- router/               # lista de declaração de rotas e configuração do router da aplicação
|   +-- App.tsx               # componente principal da aplicação
|   +-- provider.tsx          # provider que envolve toda a aplicação com providers globais
|
+-- assets/                   # arquivos estáticos como imagens, icones, fontes, etc
|
+-- components/               # componentes compartilhados utilizados em toda a aplicação
|
+-- components/ui/            # componentes primitivos feitos pela biblioteca de componentes
|
+-- config/                   # configurações globais, variáveis de ambiente, constantes, singletons globais, etc
|
+-- features/                 # módulos baseados nas features do projeto
|
+-- helpers/                  # funções ou classes que auxiliam no projeto e tem uso específico para o mesmo
|
+-- hooks/                    # hooks globais que podem ser utlizados em toda a aplicação
|
+-- lib/                      # bibliotecas reutilizáveis já configuradas para a aplicação
|
+-- stores/                   # stores de state globais
|
+-- testing/                  # mocks e utilitários para testes
|
+-- types/                    # tipos utilizados por mais de um módulo ou por toda a aplicação
|
+-- utils/                    # funções ou classes de uso comum que realizam operações genéricas. Ex: funções que estariam presentes em libs como lodash, Remeda, etc
```

**Observações:**

- Caso perceba-se que a pasta api não tenha requests que dependam um do outro, é possível movê-la para cada feature, organizando-a para requests específicos da mesma
- Sempre que possível, é recomendado colocar os tipos próximos dos itens que os utilizam, ou seja, no mesmo arquivo ou pasta. A pasta global `types` é necessária apenas para tipos **realmente** globais.

---

Recomenda-se focar o máximo possível de código na pasta `features`, que é organizada de maneira parecida com a `src` em alguns aspectos:

```sh
src/features/example/
|
+-- components/                # componentes com escopo apenas para uma feature
|
+-- hooks/                     # hooks com escopo apenas para uma feature
|
+-- queries.ts                 # api custom hooks relacionados a uma feature
|
+-- stores/ || store.ts        # arquivos de state stores para apenas uma feature, ou apenas um arquivo de store caso apenas uma seja necessária
|
+-- types/ || types.ts         # arquivos de tipos utilizados apenas em uma feature, ou apenas um arquivo caso sejam poucos tipos ou tipos mais genéricos
|
+-- helpers/ || helpers.ts     # arquivos de funções ou classes auxiliadoras para uma feature, ou apenas um arquivo caso sejam poucos helpers ou helpers mais gerais
```

**Observações:**

- É mais provável e mais recomendado que se utilize a versão de arquivo dos itens `store`, `types` e `helpers` sempre quando possível.

---

Os componentes, independentes se globais ou de features, com exceção apenas dos componentes primitivos da pasta `ui`, devem ser criados como uma pasta. Diferentemente dos outros níveis, a estrutura do componente deve ser o máximo possível _flat_, ou seja, evitando pastas aninhadas:

```sh
src/features/example/components/ExampleComponent/
|
+-- AnotherComponent.tsx                   # componente filho que ajuda a formar o componente principal
|
+-- ExampleComponent.constants.ts          # constantes utilizadas pelo componente principal e componentes filhos
|
+-- ExampleComponent.helpers.ts            # funções ou classes auxiliadoras utilizadas pelo componente principal e componentes filhos
|
+-- ExampleComponent.store.ts              # state store utilizada pelo componente principal e componentes filhos
|
+-- ExampleComponent.test.ts               # testes específicos para o componente
|
+-- ExampleComponent.tsx                   # componente principal, o qual dá nome à pasta
|
+-- ExampleComponent.types.ts              # tipos utilizados apenas no componente principal e componentes filhos
|
+-- index.ts                               # exporta o componente default do arquivo de componente principal e todos os outros exports existentes nele (loaders, etc)
|
+-- useExampleHook.ts                      # hook com escopo apenas para o componente principal e/ou filhos
```

**Observações:**

- Componentes filhos que são relacionados uns com os outros devem começar com o mesmo nome, por exemplo: Sidebar.tsx, SidebarHeader.tsx, SidebarLinks.tsx, SidebarFooter.tsx, etc.

---

O objetivo da estrutura escolhida é equilibrar a organização por _features_, que ajuda a separar as camadas de lógica da aplicação, com a organização por função, que é útil para escopos maiores no projeto, ao mesmo tempo que evita _deep nesting_, ou seja, muitas pastas dentro de outras pastas, o que dificultaria a manutenção do código.

Outra vantagem, é que dessa forma o fluxo de informação é unidirecional, com ela fluindo apenas de _features_ e de itens globais para a aplicação e não ao contrário, como mostra em [React Bulletproof - Project Structure](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md).
