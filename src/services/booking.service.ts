import { PaginationInput } from '../schema/pagination.schema'
import { PaginationService } from './pagination.service'
import { BookingInput, BookingModel } from '../schema/booking.schema'

export class BookingService {
  async getBookings(paginatedInput: PaginationInput) {
    const userPaginationServices = new PaginationService(BookingModel)
    return userPaginationServices.getPaginatedItems(paginatedInput)
  }
  async getBooking(_id: string) {
    return BookingModel.findById(_id).lean()
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