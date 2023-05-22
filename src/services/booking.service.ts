import { PaginationInput } from '../schema/pagination.schema'
import { PaginationService } from './pagination.service'
import { BookingInput, BookingModel } from '../schema/booking.schema'

export class BookingService {
  async getBookings(paginatedInput: PaginationInput) {
    const userPaginationServices = new PaginationService(BookingModel, 'user')
    return userPaginationServices.getPaginatedItems(paginatedInput)
  }
  async getBooking(_id: string) {
    const booking = await BookingModel.findById(_id).populate('user').lean()
    return booking
  }
  async createBooking(booking: BookingInput) {
    return BookingModel.create(booking)
  }
  async deleteBooking(_id: string) {
    return BookingModel.findByIdAndRemove(_id)
  }
  async updateBooking(_id: string, booking: BookingInput) {
    return BookingModel.findByIdAndUpdate(_id, booking, { new: true })
  }
}