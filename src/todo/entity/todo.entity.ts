import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType() // Este un objeto personalizado donde seespecifica los valores que se espera trabaje graphql en los queries
export class Todo {

    @Field(() => Int)
    id: number;

    @Field(() => String)
    description: string;

    @Field(() => Boolean)
    done: boolean = false;
}