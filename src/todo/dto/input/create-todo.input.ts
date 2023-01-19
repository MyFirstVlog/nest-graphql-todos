import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";


@InputType() //Decotamos la clase que va tener los datos para crear el nuevo dto
export class CreateTodoInput {

    @Field(() => String, {description: "What needs to be done"})
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    description!: string;
}