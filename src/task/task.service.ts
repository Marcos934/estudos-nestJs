import { HttpException, HttpStatus, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { TaskEntity } from 'src/task/entities/tasnk.entity';

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

    findOne(id: number): any {
        const taskIndex = this.findTaskIndex(id);
        return this.tasks[taskIndex];
    }

    createTask(body: TaskEntity): TaskEntity[]  {
        this.tasks.push(body);
        return this.tasks;
    }

    updateTask(id: number, task: any): TaskEntity[] {
        const taskIndex = this.findTaskIndex(id);

        this.tasks[taskIndex] = {
            ...this.tasks[taskIndex],
            ...task,
        }
        return this.tasks;
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
