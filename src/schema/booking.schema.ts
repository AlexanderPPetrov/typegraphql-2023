import { Field, InputType, ObjectType } from 'type-graphql'
import { BaseModel } from './model.schema'
import { getModelForClass, prop as Prop, Ref } from '@typegoose/typegoose'
import PaginatedResponse from './pagination.schema'
import { IsDate, MinLength } from 'class-validator'
import { User } from './user.schema'
import { Types } from 'mongoose'
import { ObjectIdScalar } from '../object-id.scalar'

@ObjectType()
export class Booking extends BaseModel {

    @Field()
    @Prop({ required: true })
      place: string

    @Field()
    @Prop({ required: true })
      description: string

    @Field(() => Date)
    @Prop({ required: true })
      bookingDate: Date

    @Field(() => User)
    @Prop({ ref: User, required: true })
      user: Ref<User, Types.ObjectId>
}

export const BookingModel = getModelForClass(Booking,
  { schemaOptions: { timestamps: true },
  })

@InputType()
export class BookingInput {
    @Field()
    @MinLength(3)
      place: string
    @MinLength(3)
    @Field()
      description: string
    @IsDate()
    @Field(() => Date)
      bookingDate: Date
}

@ObjectType()
export class PaginatedBookingResponse extends PaginatedResponse(Booking){}
