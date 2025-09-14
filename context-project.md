# Contexto do Projeto: API de Gerenciamento de Tarefas

Este projeto é uma API simples de gerenciamento de tarefas construída com NestJS. Ele permite que os usuários realizem operações básicas de CRUD (Criar, Ler, Atualizar, Excluir) em tarefas.

## Tecnologias Principais

- **Framework**: NestJS
- **ORM**: Prisma
- **Banco de Dados**: SQLite (conforme indicado em `prisma/schema.prisma`)
- **Linguagem**: TypeScript

## Funcionalidade Principal

A funcionalidade principal deste aplicativo é gerenciar uma lista de tarefas. A API expõe os seguintes endpoints:

- `GET /tasks`: Recupera uma lista de todas as tarefas. Suporta paginação por meio de parâmetros de consulta (`limit` e `offset`).
- `GET /tasks/findOne/:id`: Recupera uma única tarefa por seu ID exclusivo.
- `POST /tasks/create`: Cria uma nova tarefa.
- `PATCH /tasks/updateTask/:id`: Atualiza uma tarefa existente.
- `DELETE /tasks/deleteTask/:id`: Exclui uma tarefa.

## Estrutura do Projeto

- `src/app`: Contém o módulo principal da aplicação, controller e serviço, além de DTOs comuns como o de paginação.
- `src/prisma`: Contém o serviço do cliente Prisma para interação com o banco de dados.
- `src/task`: Este é o módulo de funcionalidade principal, contendo o `TaskController` para lidar com solicitações HTTP, `TaskService` para a lógica de negócios, e DTOs (`Data Transfer Objects`) para validação e transferência de dados.
- `prisma`: Este diretório contém o esquema do banco de dados (`schema.prisma`) e as migrações do banco de dados.

## Modelo de Dados

O modelo `Task` é definido em `prisma/schema.prisma` e possui os seguintes campos:

- `id`: Um identificador único para a tarefa (Inteiro, Autoincremento).
- `name`: O nome ou título da tarefa (String).
- `description`: Uma descrição mais detalhada da tarefa (String).
- `completed`: Um sinalizador booleano que indica se a tarefa está concluída ou não (Booleano, padrão: `false`).
- `createdAt`: Um carimbo de data/hora que indica quando a tarefa foi criada (DateTime, padrão: `now()`).
