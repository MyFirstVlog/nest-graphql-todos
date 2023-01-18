import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {

    private todos: Todo[] = [
        {
            id: 1,
            description: "Piedra del alma",
            done: false,
        },
        {
            id: 2,
            description: "Piedra del espacio",
            done: true,
        },
        {
            id: 3,
            description: "Piedra del poder",
            done: false,
        },
    ]

    findAll(): Todo[]{
        return this.todos;
    }

    findOne(id: number): Todo{

        console.log({id});
        
        const todo = this.todos.find(todo => todo.id === id);

        console.log({todo});

        if(!todo) throw new NotFoundException(`Todo with id ${id} not found`);

        console.log("llegue");
        
        return todo;
    }

}


