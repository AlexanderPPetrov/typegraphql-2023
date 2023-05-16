import { ArgsType, ClassType, Field, Int, ObjectType } from 'type-graphql'
import { IsInt, IsPositive } from 'class-validator'
@ArgsType()
export class PaginationInput {
    @Field(() => Int)
    @IsInt()
    @IsPositive()
      currentPage: number

    @Field(() => Int)
    @IsInt()
    @IsPositive()
      perPage: number
}

export default function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
    @ObjectType()
  abstract class PaginatedResponseClass {
        @Field(type => [TItemClass])
          results: TItem[]

        @Field(type => Int)
          total: number

        @Field(type => Int)
          totalPages: number
        @Field(type => Int)
          currentPage: number
    }

    return PaginatedResponseClass
}