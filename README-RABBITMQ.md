# Instruções de Execução - Aplicação NestJS com RabbitMQ

Siga estes passos para configurar e executar a aplicação completa.

## Pré-requisitos

- Docker e Docker Compose instalados.
- Node.js e NPM instalados.

## Passos para Execução

1.  **Iniciar o RabbitMQ com Docker:**

    O RabbitMQ é executado em um contêiner Docker. Use o `docker-compose` para iniciá-lo em segundo plano.

    ```bash
    docker-compose up -d
    ```
    *Isso irá baixar a imagem do RabbitMQ (se necessário) e iniciar o serviço. Você pode acessar a interface de gerenciamento em `http://localhost:15672` (login: `admin`, senha: `admin`).*

2.  **Instalar Dependências do Projeto:**

    Caso seja a primeira vez executando, instale as dependências.
    ```bash
    npm install
    ```

3.  **Executar as Migrations do Banco de Dados:**

    Este comando aplica as migrações do Prisma para criar as tabelas no banco de dados.

    ```bash
    npx prisma migrate dev
    ```

4.  **Iniciar a Aplicação (Gateway e Worker):**

    A aplicação é dividida em dois serviços que precisam ser executados **simultaneamente em dois terminais separados**:

    -   **Gateway**: O servidor web que recebe as requisições HTTP (`npm run start:dev`).
    -   **Worker**: O serviço que consome as mensagens da fila do RabbitMQ e processa as tarefas (`npm run start:worker`).

    ---

    **➡️ ABRA O TERMINAL 1 - Inicie o Gateway (Servidor Web):**

    ```bash
    npm run start:dev
    ```
    *O servidor estará disponível em `http://localhost:3000`.*

    ---

    **➡️ ABRA O TERMINAL 2 - Inicie o Worker (Consumidor da Fila):**

    ```bash
    npm run start:worker
    ```
    *Este terminal irá mostrar os logs do worker, incluindo a conexão com o RabbitMQ e o processamento das tarefas recebidas.*
