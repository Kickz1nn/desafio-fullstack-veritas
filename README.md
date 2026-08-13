Mini Kanban de Tarefas

Desafio técnico desenvolvido para o processo seletivo da Veritas.

O projeto consiste em uma aplicação de gerenciamento de tarefas no formato Kanban, utilizando React no frontend e Go no backend. A aplicação permite criar, visualizar, editar, mover e excluir tarefas por meio de uma API REST.

Tecnologias utilizadas
React
Vite
JavaScript
Tailwind CSS
Go
Funcionalidades
Visualização de tarefas em três colunas:
A Fazer
Em Progresso
Concluídas
Criação de tarefas
Edição de tarefas
Exclusão de tarefas
Movimentação de tarefas entre colunas
Validações básicas
Comunicação entre frontend e backend através de API REST
Configuração de CORS
Como executar
Pré-requisitos
Node.js
npm
Go
Backend

Entre na pasta do backend:

cd backend

Execute o servidor:

go run .

O backend será executado em:

http://localhost:8080
Frontend

Em outro terminal, entre na pasta do frontend:

cd frontend

Instale as dependências:

npm install

Execute a aplicação:

npm run dev

O frontend será disponibilizado pelo Vite no endereço exibido no terminal, normalmente:

http://localhost:5173
API

A aplicação possui os seguintes endpoints:

Método	Endpoint	Descrição
GET	/tasks	Lista todas as tarefas
POST	/tasks	Cria uma nova tarefa
PUT	/tasks/:id	Atualiza uma tarefa
DELETE	/tasks/:id	Exclui uma tarefa
Modelo de tarefa
{
  "id": 1,
  "title": "Estudar React",
  "status": "todo"
}

Os valores possíveis para status são:

todo: A Fazer
in_progress: Em Progresso
done: Concluídas
Decisões técnicas
Frontend

O frontend foi desenvolvido utilizando React, com componentização da interface e gerenciamento do estado das tarefas através dos recursos do próprio React.

A comunicação com o backend foi centralizada no arquivo services/api.js, mantendo as requisições HTTP separadas da lógica de apresentação dos componentes.

Backend

O backend foi desenvolvido em Go utilizando uma API REST para disponibilizar as operações de gerenciamento das tarefas.

O código foi organizado separando responsabilidades entre handlers, rotas, modelos, armazenamento, validações e middleware.

Armazenamento

Foi utilizado armazenamento em memória, conforme permitido pelo escopo do desafio. A escolha mantém a implementação simples e adequada ao objetivo do MVP, sem a necessidade de configurar um banco de dados.

Estilização

Foi utilizado Tailwind CSS para a construção da interface, permitindo uma implementação rápida e responsiva dos componentes da aplicação.

User Flow

O fluxo de utilização da aplicação está disponível em:

docs/user-flow.png

O diagrama apresenta as principais ações do usuário dentro do sistema, incluindo visualização, criação, edição, movimentação e exclusão de tarefas.

Git

O desenvolvimento foi organizado utilizando branches e commits descritivos, buscando manter um histórico de alterações claro e organizado.