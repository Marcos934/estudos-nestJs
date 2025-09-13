import { Controller, Get, Param, Query } from '@nestjs/common';
import { TaskService } from './task.service';


@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}


    @Get() 
    getTasks(): string {
        return this.taskService.getTasks();
    }

    @Get('nome/:nome')
    getMeunome( @Param('nome') nome:string): string {
        return this.taskService.getMeunome(nome);
    }


    @Get('nome')
    getMeunomeQ(
        @Query('nome') nome: string,
        @Query('sobrenome') sobrenome?: string
    ): string {
        return this.taskService.getMeunome(nome, sobrenome);
    }



}
