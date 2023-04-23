import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql";
import { Reservation, ReservationModel } from "../../entities/reservation-entity";
import { BaseReservationInput, CreateReservationInput } from "./reservation-arguments"

@Resolver()
export class ReservationResolver {

  @Query(returns => [Reservation])
  async reservations():Promise<Reservation[]> {
    return ReservationModel.find({});
  }

  @Query(returns => Reservation)
  async reservation(@Arg("_id") _id: string):Promise<Reservation> {
    return ReservationModel.findById(_id);
  }

  @Mutation(returns => Reservation)
  async createReservation(@Arg("data") data: CreateReservationInput):Promise<Reservation> {
    
    const newReservation = new ReservationModel(data);
    await newReservation.save();
    return newReservation
  }

  //@Authorized([UserRoles.SUPER_ADMIN])
  @Mutation(returns => Reservation)
  async deleteReservation(@Arg("_id") _id: string):Promise<Reservation> {
    return ReservationModel.findByIdAndRemove(_id);
  }

  @Mutation(returns => Reservation)
  async editUser(@Arg("_id") _id: string, @Arg("data") data: BaseReservationInput):Promise<Reservation> {
    return ReservationModel.findByIdAndUpdate(_id, data, {new: true});
  }

}