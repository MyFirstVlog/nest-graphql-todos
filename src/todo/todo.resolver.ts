import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTodoInput, UpdateTodoInput, StatusArgs} from './dto'

import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { AggregationsType } from './types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService
    ){}

    @Query(() => [Todo], {name: "todos"})
    findAll(
        @Args() statusArgs: StatusArgs //* aqui no se usa @Args('statusArgs') -> solo para los tipo Input O Scalars definidios por Graphql
    ): Todo[]{
        return this.todoService.findAll(statusArgs);  
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

    @Mutation(() => Boolean)
    removeTodo(
        @Args('id', {type: () => Int}) id: number
    ){
        return this.todoService.removeTodo(id);
    }

    //* Aggregations
    @Query(() => Int, {name: "totalTodos"})
    totalTodos(): number{
        return this.todoService.totalTodos;
    }

    @Query(() => Int, {name: "completedTodos"})
    completedTodos(){
        return this.todoService.completedTodos;
    }

    @Query(() => Int, {name: "pendingTodos"})
    pendingTodos(){
        return this.todoService.pendingTodos;
    }

    @Query(() => AggregationsType)
    aggregations(){
        return {
            completed: this.todoService.completedTodos,
            pending: this.todoService.pendingTodos,
            total: this.todoService.totalTodos,
            totalTodos: this.todoService.totalTodos
        }
    }


}
