import { HttpException, HttpStatus, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { TaskEntity } from 'src/task/entities/tasnk.entity';
import { CreateTaskDto } from './DTO/create-task-dto';
import { UpdateTaskDto } from './DTO/update-task-dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from 'src/app/common/dto/pagination.dto';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }


    // private tasks: TaskEntity[] = [
    //     {
    //         id: 1,
    //         name: 'Jogar o lixo',
    //         description: 'Jogar o lixo na lixeira até 12h',
    //         completed: false,
    //         createdAt: new Date(),
    //     },
    // ];

    // Classe privada para se existe ID no banco de dados
    private async findTaskIndex(id: number) {
    const taskIndex = await this.prisma.task.findFirst({
        where: {
            id: Number(id),
        }
    });
   
    return taskIndex;
}


    async getTasks(paginationDto?: PaginationDto): Promise<TaskEntity[]> {
        console.log(paginationDto); 
        const limit = paginationDto?.limit === 0 ? 10 : paginationDto?.limit;
        const offset = paginationDto?.offset === 0 ? 0 : paginationDto?.offset;
        console.log(limit);
        // console.log(offset);

        const allTasks = await this.prisma.task.findMany(
            {
                take: limit,
                skip: offset, 
                orderBy: {
                    createdAt: 'desc',
                }
            }
        );
        return allTasks;
    }
    
    async findOne(id: number): Promise<TaskEntity> {
        const task = await this.prisma.task.findUnique({
            where: {
                id: Number(id),
            }
        });
        if (!task) {
            throw new NotFoundException("Task não encontrada");
        }
        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity>  {
        const newTask = await this.prisma.task.create({ 
            data: {
                name: createTaskDto.name,
                description: createTaskDto.description,
                completed: false,
                createdAt: new Date(),
            }
        });
        return newTask;
    }

   async updateTask(id: number, updateTaskDto: UpdateTaskDto) {   
        const taskIndex = await this.findTaskIndex(id);
        console.log(taskIndex);
        if (!taskIndex) {
            throw new NotFoundException("Task não encontrada");
        } 
        const task = await this.prisma.task.update({
            where: {
                id:taskIndex.id,
            },
            data: updateTaskDto
            
        });
        console.log(task);
        return task;
    }

    async deleteTask(id: number): Promise<TaskEntity> {
        const taskIndex = await this.findTaskIndex(id);
        if (!taskIndex) {
            throw new NotFoundException("Task não encontrada");
        }
        const task = await this.prisma.task.delete({
            where: {
                id:taskIndex.id,
            },
        });
        return task;
    }


    // getMeunome(nome: string, sobrenome?: string): string {
    //     return "Meu nome é " + nome + " " + (sobrenome ?? '');
    // }

    // findOne(id: number): string {
    //     return `acha a task ${id}`;
    // }

}
