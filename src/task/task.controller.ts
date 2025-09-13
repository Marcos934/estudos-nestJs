import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskEntity } from 'src/task/entities/tasnk.entity';
import { CreateTaskDto } from './DTO/create-task-dto';
import { UpdateTaskDto } from './DTO/update-task-dto';


@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}


    @Get() 
    getTasks(): TaskEntity[] {
        return this.taskService.getTasks();
    }

    @Get('findOne/:id')
    findOne(@Param('id', ParseIntPipe) id: number): TaskEntity {
        return this.taskService.findOne(id);
    }

    @Post('/create')
    createTask(@Body() createTaskDto: CreateTaskDto): CreateTaskDto {
        return this.taskService.createTask(createTaskDto);
    }

    @Patch('updateTask/:id')
    updateTask(@Param('id') id: number, @Body() UpdateTaskDto: UpdateTaskDto ) : UpdateTaskDto {
        return this.taskService.updateTask(id, UpdateTaskDto);
    }

    @Delete('deleteTask/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): any {
        return this.taskService.deleteTask(id);
    }


    // @Get('nome/:nome')
    // getMeunome( @Param('nome') nome:string): string {
    //     return this.taskService.getMeunome(nome);
    // }


    // @Get('nome')
    // getMeunomeQ(
    //     @Query('nome') nome: string,
    //     @Query('sobrenome') sobrenome?: string
    // ): string {
    //     return this.taskService.getMeunome(nome, sobrenome);
    // }



}
