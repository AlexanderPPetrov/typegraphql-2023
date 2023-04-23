import { MaxLength, MinLength, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { ObjectId } from "mongoose";
import { ObjectIdScalar } from "../../object-id.scalar";

@InputType()
export class BaseUserInput {

  @Field({nullable: true})
  @MaxLength(30)
  firstName?: string;

  @Field({nullable: true})
  @MaxLength(30)
  lastName?: string;

  @Field({nullable: true})
  @MinLength(6)
  password?: string;
  
  @Field({nullable: true})
  dateOfBirth?: Date;

  @Field({ nullable: true })
  avatar?: string;
}

@InputType()
export class CreateUserInput extends BaseUserInput {
  @Field()
  @IsEmail()
  email: string;
}

@InputType()
export class UserInput extends CreateUserInput {
  @Field(type => ObjectIdScalar)
  _id: ObjectId
  
  @Field(type => [String])
  roles: string[]
}