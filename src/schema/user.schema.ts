import { ObjectType, Field, InputType, ArgsType } from 'type-graphql'
import { prop as Prop, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { UserRoles } from '../enums/user-roles'
import { IsEmail, MaxLength, MinLength, IsNotEmpty } from 'class-validator'

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

    @Field(type => [String])
    @Prop({ default: [UserRoles.USER] })
      roles?: string[]
}

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

