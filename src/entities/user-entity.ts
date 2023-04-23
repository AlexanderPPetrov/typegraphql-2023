import { ObjectType, Field } from "type-graphql";
import { prop as Prop, getModelForClass, modelOptions, Severity } from "@typegoose/typegoose"
import { ObjectId } from "mongodb"
import { UserRoles } from "../resolvers/user/user-roles";

@modelOptions({ options: { allowMixed: Severity.ALLOW } })


@ObjectType()
export class User {

  @Field()
  readonly _id: ObjectId;

  @Prop({required: false})
  @Field({nullable: true})
  avatar?: string;

  @Prop({required: false})
  @Field({nullable: true})
  dateOfBirth?: Date

  @Prop({required: true})
  @Field()
  firstName: string;

  @Prop({required: true})
  @Field()
  lastName: string;

  @Prop({required: true})
  @Field()
  email: string;

  @Prop({required: true})
  @Field()
  password: string;

  @Prop({default: 20})
  @Field()
  daysOff?: number;

  @Field(type => [String])
  @Prop({default: [UserRoles.USER]})
  roles?: string[]
}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true }})