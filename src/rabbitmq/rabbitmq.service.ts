import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async onModuleInit() {
    await this.connect();
  }

  private async connect() {
    this.connection = await amqp.connect('amqp://admin:admin@localhost:5672');
    this.channel = await this.connection.createChannel();
  }

  async publish(queue: string, message: any) {
    if (!this.channel) {
      await this.connect();
    }
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }
}
