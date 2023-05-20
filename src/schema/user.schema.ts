import { ObjectId } from 'mongoose'
import { Field, ObjectType, registerEnumType } from 'type-graphql'
import { getModelForClass, prop as Prop } from '@typegoose/typegoose'
import { UserRole } from '../enums/user-role'
import { ObjectIdScalar } from '../object-id.scalar'

registerEnumType(UserRole, {
  name: 'UserRole',
})
@ObjectType()
export class User {

    @Field(() => ObjectIdScalar)
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
    @Prop()
    @Field({ nullable:true })
      occupation?:string
    @Prop({ type: [String], enum: UserRole, default: [UserRole.USER] })
  @Field(() => [UserRole])
      roles: UserRole[]
}

export const UserModel = getModelForClass(User,
  { schemaOptions: { timestamps: true },
  })