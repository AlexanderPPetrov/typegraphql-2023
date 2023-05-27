import { Resolver, Query, Arg, Args, Mutation, Authorized, Ctx } from 'type-graphql'
import { PaginationInput } from '../schema/pagination.schema'
import { UserRole } from '../enums/user-role'
import { BookingService } from '../services/booking.service'
import { Booking, BookingInput, PaginatedBookingResponse } from '../schema/booking.schema'
import { Context } from '../types/context'

@Resolver()
export class BookingResolver {

  constructor(private bookingService: BookingService) {
    this.bookingService = new BookingService()
  }

  @Query(() => PaginatedBookingResponse)
  async bookings(@Args()paginatedInput: PaginationInput):Promise<PaginatedBookingResponse> {
    return this.bookingService.getBookings(paginatedInput)
  }

  @Query(() => Booking)
  async booking(@Arg('_id') _id: string):Promise<Booking> {
    return this.bookingService.getBooking(_id)
  }

  @Mutation(() => Booking)
  async createBooking(@Ctx(){ user }: Context, @Arg('booking') booking: BookingInput):Promise<Booking> {
    return this.bookingService.createBooking(booking, user._id)
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Booking)
  async deleteBooking(@Arg('_id') _id: string):Promise<Booking> {
    return this.bookingService.deleteBooking(_id)
  }
  @Mutation(() => Booking)
  async updateBooking(@Arg('_id') _id: string,
                   @Arg('booking') booking: BookingInput):Promise<Booking> {
    return this.bookingService.updateBooking(_id, booking)
  }

}
