import { Controller, Get } from '@nestjs/common';
import { get } from 'http';

@Controller('task')
export class TaskController {


    @Get() 
    getTasks(): string {
        return 'Lista de tarefas';
    }


}
