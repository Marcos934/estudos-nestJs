import { HttpException, HttpStatus, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { TaskEntity } from 'src/task/entities/tasnk.entity';
import { CreateTaskDto } from './DTO/create-task-dto';
import { UpdateTaskDto } from './DTO/update-task-dto';

@Injectable()
export class TaskService {
    private tasks: TaskEntity[] = [
        {
            id: 1,
            name: 'Jogar o lixo',
            description: 'Jogar o lixo na lixeira até 12h',
            completed: false,
        },
    ];

    // Classe privada para buscar o index da task 
    private findTaskIndex(id: number): number {
        const taskIndex = this.tasks.findIndex(task => task.id === Number(id));
        if (taskIndex < 0) {
            throw new NotFoundException("Task não encontrada");
        }
        return taskIndex;
    }


    getTasks(): TaskEntity[] { 
        return this.tasks;
    }

    findOne(id: number): TaskEntity {
        const taskIndex = this.findTaskIndex(id);
        return this.tasks[taskIndex];
    }

    createTask(createTaskDto: CreateTaskDto): CreateTaskDto  {
        const newId = this.tasks.length + 1;
        const newTask = {
            id: newId,
            ...createTaskDto,
            completed: false

        };

        this.tasks.push(newTask);
        return newTask;
    }

    updateTask(id: number, updateTaskDto): UpdateTaskDto {   
        const taskIndex = this.findTaskIndex(id);
        this.tasks[taskIndex] = {
            ...this.tasks[taskIndex],
            ...UpdateTaskDto,
        }
        return this.tasks[taskIndex];
    }

    deleteTask(id: number): TaskEntity[]  {
        const taskIndex = this.findTaskIndex(id);
        this.tasks.splice(taskIndex, 1);
        return this.tasks;
    }


    // getMeunome(nome: string, sobrenome?: string): string {
    //     return "Meu nome é " + nome + " " + (sobrenome ?? '');
    // }

    // findOne(id: number): string {
    //     return `acha a task ${id}`;
    // }

}
