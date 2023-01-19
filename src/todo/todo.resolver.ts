import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTodoInput, UpdateTodoInput} from './dto/input/'

import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';

@Resolver()
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService
    ){}

    @Query(() => [Todo], {name: "todos"})
    findAll(): Todo[]{
        return this.todoService.findAll();  
    }

    @Query(() => Todo,  {name: "todo"})
    findOne(@Args('id', {type: () => Int}) id: number): Todo{
        return this.todoService.findOne(id);
    }

    @Mutation(() => Todo)
    createTodo(   
    @Args('createTodoInput') createTodoInput: CreateTodoInput): Todo { //El type se pone si es una de las naturaleza de los objetos comunes
        console.log({createTodoInput});        
        return this.todoService.createTodo(createTodoInput);
    }

    @Mutation(() => Todo, {name: "updateTodo"})
    updateTodo(
        @Args('updateTodoInput')updateTodoInput: UpdateTodoInput
    ): Todo{ 
        return this.todoService.updateTodo(updateTodoInput);
    }

    removeTodo(){
        return [];
    }

}
