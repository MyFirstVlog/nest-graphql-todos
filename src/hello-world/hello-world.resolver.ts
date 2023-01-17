import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query(() => String, {description: "Hola mundo esto es lo que retorna"}) //Apesar de que devuelve un string hay reiterarlo en el decorador
    helloWorld(): string{
        return 'Hola mundo';
    }

    @Query(() => Float, {name: 'randomNumber'}) //* Propio de graphql
    getRandomNumber(){
        return Math.random()*100;
    }

    @Query(() => Int, {name: 'randomFromZeroTo', description: 'From zero to argument(not included) and default "to" number is 10' })
    getRandomFromZeroTo(@Args('to', {nullable: true,type: () => Int}) to: number = 10): number{ // El valor que recibira de graphql como argumento, en este caso, "to", nullable es lo que hace que el valor del arg sea obligaotrio o no
        return Math.floor((Math.random() * to));
    }
}
