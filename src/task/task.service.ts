import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {


    getTasks(): string { 
        return 'Lista que veio do service s';
    }



    getMeunome(nome: string, sobrenome?: string): string {
        return "Meu nome é " + nome + " " + (sobrenome ?? '');
    }

    findOne(id: number): string {
        return `acha a task ${id}`;
    }

}
