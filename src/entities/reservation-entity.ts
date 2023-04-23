import { ObjectType, Field } from "type-graphql";
import { prop as Prop, getModelForClass, modelOptions, Severity } from "@typegoose/typegoose"
import { ObjectId } from "mongodb"
import { UserRoles } from "../resolvers/user/user-roles";
import { User } from "./user-entity";

@modelOptions({ options: { allowMixed: Severity.ALLOW } })


@ObjectType()
export class Reservation {

  @Field()
  readonly _id: ObjectId;

  @Prop({required: true})
  @Field()
  dayFrom: Date;

  @Prop({required: true})
  @Field()
  dayTo: Date;

  @Prop({required: true})
  @Field()
  reservationType: string;

  @Field()
  @Prop({ required: true})
  user: User

}

export const ReservationModel = getModelForClass(Reservation, { schemaOptions: { timestamps: true }})