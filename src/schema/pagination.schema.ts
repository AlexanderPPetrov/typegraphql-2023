import { ArgsType, ClassType, Field, Int, ObjectType } from 'type-graphql'
import { IsInt, IsPositive } from 'class-validator'
@ArgsType()
export class PaginationInput {
    @Field(() => Int, { defaultValue: 1, nullable: true })
    @IsInt()
    @IsPositive()
      page?: number

    @Field(() => Int, { defaultValue: 10, nullable: true })
    @IsInt()
    @IsPositive()
      limit?: number
}

export default function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
    @ObjectType()
  abstract class PaginatedResponseClass {
        @Field(type => [TItemClass])
          items: TItem[]

        @Field(type => Int)
          totalPages: number
        @Field(type => Int)
          totalItems: number
        @Field(type => Int)
          page: number
    }

    return PaginatedResponseClass
}