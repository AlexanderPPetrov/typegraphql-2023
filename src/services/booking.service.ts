import { PaginationInput } from '../schema/pagination.schema'
import { PaginationService } from './pagination.service'
import { BookingInput, BookingModel } from '../schema/booking.schema'
import { Types } from 'mongoose'

export class BookingService {
  async getBookings(paginatedInput: PaginationInput) {
    const userPaginationServices =
        new PaginationService(
          {
            model: BookingModel,
            populate: 'user',
          })
    return userPaginationServices.getPaginatedItems(paginatedInput)
  }
  async getBooking(_id: string) {
    return BookingModel.findById(_id).populate('user').lean()
  }
  async createBooking(booking: BookingInput, user: Types.ObjectId) {
    const bookingWithUser = { ...booking, user }
    const createdBooking = await BookingModel.create(bookingWithUser)
    return createdBooking.populate('user')
  }
  async deleteBooking(_id: string) {
    return BookingModel.findByIdAndRemove(_id).populate('user')
  }
  async updateBooking(_id: string, booking: BookingInput) {
    return BookingModel.findByIdAndUpdate(_id, booking, { new: true }).populate('user')
  }
}