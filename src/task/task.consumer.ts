import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskConsumer implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.startConsuming();
  }

  private async startConsuming() {
    const connection = await amqp.connect('amqp://admin:admin@localhost:5672');
    const channel = await connection.createChannel();
    const queue = 'tasks_queue';

    await channel.assertQueue(queue, { durable: false });

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const message = JSON.parse(msg.content.toString());
        console.log('Received message:', message);

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        await this.prisma.task.update({
          where: { id: message.taskId },
          data: { completed: true },
        });

        console.log(`Task ${message.taskId} processed and completed.`);
        channel.ack(msg);
      }
    });
  }
}
