import { Resolver, Query, Arg, Args, Mutation, Authorized } from 'type-graphql'
import { PaginationInput } from '../schema/pagination.schema'
import { UserRole } from '../enums/user-role'
import { BookingService } from '../services/booking.service'
import { Booking, BookingInput, PaginatedBookingResponse } from '../schema/booking.schema'

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
  async createBooking(@Arg('booking') booking: BookingInput):Promise<Booking> {
    return this.bookingService.createBooking(booking)
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
