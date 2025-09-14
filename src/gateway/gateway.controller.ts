import { Controller, Post, Body, HttpCode, Get, Param, NotFoundException } from '@nestjs/common';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { CreateTaskDto } from '../task/DTO/create-task-dto';
import { GatewayService } from './gateway.service';

@Controller('tasks')
export class GatewayController {
  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private readonly gatewayService: GatewayService,
  ) {}

  @Post('create')
  @HttpCode(202) // Status "Accepted" - Aceito para processamento
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    await this.rabbitMQService.publish('tasks_create_queue', createTaskDto);
    return { message: 'Task received and queued for processing.' };
  }

  @Get()
  async getTasks() {
    return this.gatewayService.getTasks();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.gatewayService.findOne(Number(id));
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }
}
