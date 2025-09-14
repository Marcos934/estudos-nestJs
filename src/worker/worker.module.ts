import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { WorkerConsumer } from './worker.consumer';
import { TaskWorkerService } from './task-worker.service';

@Module({
  imports: [PrismaModule, RabbitMQModule],
  providers: [WorkerConsumer, TaskWorkerService],
})
export class WorkerModule {}
