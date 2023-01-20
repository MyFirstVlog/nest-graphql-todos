import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/input/create-todo.input';
import { UpdateTodoInput } from './dto/input';
import { StatusArgs } from './dto/args/status.args';

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
        {
            id: 4,
            description: "Piedra del alma",
            done: false,
        },
    ];

    get totalTodos(){
        return this.todos.length;
    }

    get completedTodos(){
        return this.findAll({status: true}).length;
    }

    get pendingTodos(){
        return this.findAll({status: false}).length;
    }

    findAll(statusArgs: StatusArgs): Todo[]{
        console.log('este es el valor del status en los  finad all');
        const {status} = statusArgs;

        if(status !== undefined) return this.todos.filter(todo => todo.done === status)
        
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

    createTodo(createTodoInput: CreateTodoInput): Todo{

        const todo = new Todo();

        todo.description = createTodoInput.description;
        todo.id = Math.max(...this.todos.map(todo => todo.id), 0) +1;

        this.todos.push(todo);

        return todo;
    }

    updateTodo(updateTodoInput: UpdateTodoInput): Todo{
        
        const {id, description, done} = updateTodoInput;
        const todoToUpdate = this.findOne(id);

        if(description) todoToUpdate.description = description;
        if(done !== undefined) todoToUpdate.done = done;

        this.todos = this.todos.map(todo => (todo.id === id) ? todoToUpdate : todo);

        return todoToUpdate;
    }

    removeTodo(id: number){
        const todo = this.findOne(id);

        this.todos = this.todos.filter(todo => todo.id !== id);

        return true;
    }

}


