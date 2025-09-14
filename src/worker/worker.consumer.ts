import { Injectable, OnModuleInit } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import * as amqp from 'amqplib';

import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { TaskWorkerService } from './task-worker.service';
import { CreateTaskDto } from '../task/DTO/create-task-dto';

@Injectable()
export class WorkerConsumer implements OnModuleInit {
  constructor(
    private readonly taskWorkerService: TaskWorkerService,
  ) {}

  async onModuleInit() {
    await this.startConsuming();
  }

  private async startConsuming() {
    const amqpUrl = 'amqp://admin:admin@localhost:5672';
    console.log('WORKER: Attempting to connect to RabbitMQ at', amqpUrl);

    try {
      const connection = await amqp.connect(amqpUrl);

      connection.on('error', (err) => {
        console.error('WORKER: RabbitMQ connection error', err);
      });

      connection.on('close', () => {
        console.error('WORKER: RabbitMQ connection closed! Retrying in 5 seconds...');
        setTimeout(() => this.startConsuming(), 5000);
      });

      console.log('WORKER: RabbitMQ connection successful.');
      const channel = await connection.createChannel();
      console.log('WORKER: Channel created.');

      const queue = 'tasks_create_queue';
      await channel.assertQueue(queue, { durable: false });
      console.log('WORKER: Queue asserted. Waiting for messages in queue: %s', queue);

      channel.consume(queue, async (msg) => {
        if (msg !== null) {
          try {
            const messageObject = JSON.parse(msg.content.toString());
            console.log('WORKER: Received message:', messageObject);

            const createTaskDto = plainToInstance(CreateTaskDto, messageObject);
            const errors = await validate(createTaskDto);

            if (errors.length > 0) {
              console.error('WORKER: Validation failed:', errors);
              channel.nack(msg, false, false);
              return;
            }

            await this.taskWorkerService.createTask(createTaskDto);
            channel.ack(msg);
            console.log('WORKER: Message processed and acknowledged.');
          } catch (error) {
            console.error('WORKER: Error processing message:', error);
            channel.nack(msg, false, false);
          }
        }
      });
    } catch (error) {
      console.error('WORKER: FAILED to connect to RabbitMQ.', error.message);
      console.log('WORKER: Retrying in 5 seconds...');
      setTimeout(() => this.startConsuming(), 5000);
    }
  }
}
