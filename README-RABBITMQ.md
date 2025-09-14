# Instruções de Execução do RabbitMQ

Siga estes passos para executar a aplicação com o RabbitMQ:

1.  **Inicie o RabbitMQ:**

    ```bash
    docker-compose up -d
    ```

2.  **Execute as Migrations do Prisma:**

    ```bash
    npx prisma migrate dev
    ```

3.  **Inicie o Servidor NestJS:**

    ```bash
    npm run start:dev
    ```