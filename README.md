# Catálogo de Produtos - Desafio Técnico Agilean

Projeto desenvolvido para o processo seletivo de estágio em Desenvolvimento Full Stack.
A aplicação consiste em um sistema de gerenciamento de produtos, integrando uma API .NET a um frontend em React.

## Tecnologias Utilizadas

### Backend
* **Runtime:** .NET 8.0
* **ORM:** Entity Framework Core (Code First)
* **Banco de Dados:** SQLite (escolhido pela portabilidade e facilidade de execução para avaliação do projeto, sem necessidade de configuração externa)

### Frontend
* **Biblioteca Principal:** React 18 com Vite
* **Estilização:** Tailwind CSS (garantindo agilidade e fidelidade ao guia visual)
* **Consumo de API:** Axios

---

## Decisões Técnicas

### 1. Por que organizou o código dessa forma?
No **Frontend**, adotei a arquitetura **Feature-Based** (`src/features/products`). Agrupar componentes, páginas e serviços por funcionalidade garante que o projeto seja modular. Se o sistema crescer, novos módulos podem ser adicionados sem poluir a raiz do projeto. No **Backend**, utilizei uma estrutura baseada em **Features e Camadas de Responsabilidade**. Em vez de uma pasta única, separei a lógica de domínio dentro de `Features/Produtos`, utilizando o padrão **Service Layer** para desacoplar a lógica de negócio dos Controllers. A camada de `Infrastructure` foi isolada para gerenciar o contexto do banco de dados e as Migrations do Entity Framework Core, garantindo uma arquitetura limpa e de fácil manutenção.

### 2. Separação de Responsabilidades
A estrutura foi desenhada para manter o código limpo (Clean Code):

#### Frontend (React)
* **Roteamento:** O arquivo `App.jsx` é responsável apenas por renderizar a página principal da aplicação, mantendo a raiz do projeto desacoplada da regra de negócio da feature.
* **Páginas de Funcionalidade:** A `ProductsPage.jsx` centraliza a gestão de dados, estados (filtros, modais) e chamadas de API.
* **Componentes Puros:** Componentes como `ProductCard` e `ProductModal` são "puros" e focados exclusivamente em exibição, para garantir que sejam previsíveis e fáceis de testar.

#### Backend (.NET)
* **Controllers:** Responsáveis apenas por receber as requisições HTTP e retornar as respostas (Status Codes), delegando o processamento para a camada de serviço.
* **Services (Service Layer):** Camada onde reside a lógica de negócio e as regras de manipulação de dados, desacoplando o Controller do acesso direto ao banco.
* **Infrastructure (Data):** Centraliza a configuração do contexto do Entity Framework e o gerenciamento do ciclo de vida das Migrations.

### 3. Principais Desafios 
* **Refatoração de Arquitetura e Gestão de Dependências:** Durante o desenvolvimento, optei por migrar de uma estrutura simples para uma arquitetura baseada em funcionalidades (*Feature-Based*). O principal desafio técnico foi gerenciar a integridade das importações relativas e garantir que o desacoplamento dos componentes não gerasse efeitos colaterais na comunicação entre as páginas e os serviços da API.
* **Sincronização de Filtros e Estados Complexos:** A implementação da lógica de filtros combinados (busca por nome, categoria e status de disponibilidade) exigiu um cuidado especial com a sincronização do estado do React. O desafio foi garantir que a interface reagisse de forma fluida e precisa à combinação dessas múltiplas condições, respeitando as regras de visualização para produtos inativos e com estoque baixo.

### 4. O que eu faria diferente com mais tempo
* **TypeScript:** Implementaria tipagem forte em todo o projeto para evitar erros em tempo de execução e melhorar a manutenção a longo prazo.
* **Testes Automatizados:** Adicionaria testes unitários no Backend (xUnit) e testes de componentes no Frontend (Vitest/React Testing Library).
* **Path Aliases:** Configuraria atalhos de caminho (ex: `@api/*`) no Vite para simplificar as importações e tornar o código ainda mais limpo.

---

## Funcionalidades Implementadas

* **CRUD Completo:** Listagem, busca, criação, edição e exclusão de produtos (API e Interface).
* **Guia Visual:** Implementação fiel à paleta de cores, tipografia e espaçamentos sugeridos.
* **Feedback Visual:** Badges dinâmicas para estoque baixo (< 10 unidades), esgotado e indicadores para itens inativos (opacity 0.6).
* **Segurança na Exclusão:** Modal de confirmação que exibe o nome do produto antes da remoção definitiva.

---

## Instruções de Instalação e Execução

### Pré-requisitos
* SDK do .NET 8.0 ou superior
* Node.js (versão LTS)

### Passos para Execução
1. **Clone o repositório:**
   `git clone https://github.com/MROR21/desafio-agilean.git`

2. **Backend (.NET):**
   * Navegue até a pasta `AgileanBack`.
   * Execute: `dotnet run`
   * A API estará disponível em `http://localhost:5142`

3. **Frontend (React):**
   * Navegue até a pasta `AgileanFront`.
   * Instale as dependências: `npm install`
   * Inicie a aplicação: `npm run dev`
   * Acesse o link: `http://localhost:5173`
   * Essa configuração pode ser encontrada no arquivo: `src/api/api.js`
