import { ArgsType, Field, InputType, ObjectType, registerEnumType } from 'type-graphql'
import { getModelForClass, prop as Prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { UserRole } from '../enums/user-role'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'
import PaginatedResponse from './pagination.schema'


registerEnumType(UserRole, {
  name: 'UserRole',
})

@ObjectType()
export class User {

    @Field()
  readonly _id: ObjectId

    @Prop({ required: true })
    @Field()
      firstName: string

    @Prop({ required: true })
    @Field()
      lastName: string

    @Prop({ required: true })
    @Field()
      email: string

    @Prop({ required: true })
    @Field()
      password: string

  @Field(() => [UserRole])
  @Prop({ type: [String], enum: UserRole, default: [UserRole.USER] })
    roles?: UserRole[]

}

@ObjectType()
export class PaginatedUserResponse extends PaginatedResponse(User) {}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } })


@InputType()
export class CreateUserInput {
  @Field()
  @MaxLength(30)
    firstName: string

  @Field()
  @MaxLength(30)
    lastName: string

  @Field()
  @IsEmail()
    email: string

  @Field()
  @MinLength(6)
    password: string
}

@InputType()
export class EditUserInput {
  @Field()
  @IsNotEmpty()
    _id: ObjectId

  @Field({ nullable: true })
  @MaxLength(30)
    firstName?: string

  @Field({ nullable: true })
  @MaxLength(30)
    lastName?: string

  @Field({ nullable: true })
  @IsEmail()
    email?: string

  @Field({ nullable: true })
  @MinLength(6)
    password?: string
}

@ArgsType()
export class UserLoginArguments {
  @Field()
  @IsEmail()
    email: string

  @Field()
  @MinLength(6)
    password: string
}

