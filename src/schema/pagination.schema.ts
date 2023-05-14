import { ArgsType, Field, Int, ObjectType } from 'type-graphql'
import { IsInt, IsPositive } from 'class-validator'
@ArgsType()
export class PaginationInput {
    @Field(() => Int)
    @IsInt()
    @IsPositive()
      page: number

    @Field(() => Int)
    @IsInt()
    @IsPositive()
      perPage: number
}

@ObjectType()
export class PaginationResponse<T> {
    @Field(() => Int)
      total: number

    @Field(() => [T])
      items: T[]
}
