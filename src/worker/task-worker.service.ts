import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from '../task/DTO/create-task-dto';

@Injectable()
export class TaskWorkerService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto) {
    console.log('Worker received task, saving to database:', createTaskDto.name);
    return this.prisma.task.create({
      data: {
        name: createTaskDto.name,
        description: createTaskDto.description,
        completed: false,
        createdAt: new Date(),
      },
    });
  }
}