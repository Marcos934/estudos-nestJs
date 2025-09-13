import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskEntity } from 'src/task/entities/tasnk.entity';
import { CreateTaskDto } from './DTO/create-task-dto';
import { UpdateTaskDto } from './DTO/update-task-dto';
import { PaginationDto } from '../app/common/dto/pagination.dto';


@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}


    @Get() 
    getTasks(@Query() paginationDto?: PaginationDto): any {
        return this.taskService.getTasks(paginationDto);
    }

    @Get('findOne/:id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
        return this.taskService.findOne(id);
    }

    @Post('/create')
   createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        return this.taskService.createTask(createTaskDto);
    }

    @Patch('updateTask/:id')
    updateTask(@Param('id') id: number, @Body() UpdateTaskDto: UpdateTaskDto ) : Promise<TaskEntity> {
        return this.taskService.updateTask(id, UpdateTaskDto);
    }

    @Delete('deleteTask/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
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
