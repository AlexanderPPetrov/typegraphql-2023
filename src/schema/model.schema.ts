import { Field, ObjectType } from 'type-graphql'
import { ObjectIdScalar } from '../object-id.scalar'
import { ObjectId } from 'mongodb'

@ObjectType()
export class BaseModel {

    @Field(() => ObjectIdScalar)
  readonly _id: ObjectId
}