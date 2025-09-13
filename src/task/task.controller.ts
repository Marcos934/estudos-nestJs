import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskEntity } from 'src/task/entities/tasnk.entity';


@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}


    @Get() 
    getTasks(): TaskEntity[] {
        return this.taskService.getTasks();
    }

    @Get('findOne/:id')
    findOne(@Param('id') id: number): TaskEntity[]  {
        return this.taskService.findOne(id);
    }

    @Post('/create')
    createTask(@Body() task: TaskEntity): TaskEntity[] {
        return this.taskService.createTask(task);
    }

    @Patch('updateTask/:id')
    updateTask(@Param('id') id: number, @Body() task: any): any {
        return this.taskService.updateTask(id, task);
    }

    @Delete('deleteTask/:id')
    deleteTask(@Param('id') id: number): any {
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
