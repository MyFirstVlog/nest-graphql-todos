import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType({description: "todo quick aggregations"})
export class AggregationsType {

    @Field(() => Int)
    total: number;

    @Field(() => Int)
    pending: number;

    @Field(() => Int)
    completed: number;

    @Field(() => Int, {deprecationReason: "Must user completed instead"})
    totalTodos: number;
}