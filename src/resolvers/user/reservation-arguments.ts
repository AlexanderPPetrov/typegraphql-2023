import { MaxLength, MinLength, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { UserInput } from "./user-arguments";

@InputType()
export class BaseReservationInput {

  @Field()
  dayFrom: Date;

  @Field()
  dayTo: Date;

  @Field()
  @MinLength(2)
  reservationType: string;

}

@InputType()
export class CreateReservationInput extends BaseReservationInput {
 
  @Field()
  user: UserInput;
}

