import * as amqp from 'amqplib';

async function publishTestMessages() {
  console.log('Connecting to RabbitMQ...');
  const connection = await amqp.connect('amqp://admin:admin@localhost:5672');
  const channel = await connection.createChannel();
  const queue = 'tasks_queue';

  const messages = [
    { name: 'Task 1: Comprar pão', description: 'Na padaria da esquina' },
    { name: 'Task 2: Abastecer o carro', description: 'Posto Ipiranga' },
    { name: 'Task 3: Pagar a conta de luz', description: 'Pelo aplicativo do banco' },
  ];

  // Simulate creating tasks and getting an ID from the database
  let taskIdCounter = Math.floor(Math.random() * 1000);

  for (const task of messages) {
    const messagePayload = {
      // In a real scenario, this would be the ID from the database
      taskId: taskIdCounter++,
      action: 'PROCESS_TASK',
      createdAt: new Date(),
      taskData: task, // Including original data for context
    };

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(messagePayload)));
    console.log(`[x] Sent message for task: ${task.name}`);
  }

  setTimeout(() => {
    connection.close();
    console.log('Connection closed.');
    process.exit(0);
  }, 500);
}

publishTestMessages();
