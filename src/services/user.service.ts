import { BaseUserInput, CreateUserInput, UserModel } from '../schema/user.schema'
import { ObjectId } from 'mongodb'
import { PaginationInput } from '../schema/pagination.schema'
import { PaginationService } from './pagination.service'

export class UserService {
  async getUsers(paginatedInput: PaginationInput) {
    const userPaginationServices = new PaginationService(UserModel)
    return userPaginationServices.getPaginatedItems(paginatedInput)
  }
  async getUser(_id: string) {
    return UserModel.findById(_id).lean()
  }
  async createUser(user: CreateUserInput) {
    return UserModel.create(user)
  }
  async deleteUser(_id: ObjectId) {
    return UserModel.findByIdAndRemove(_id)
  }
  async updateUser(_id: string, user: BaseUserInput) {
    return UserModel.findByIdAndUpdate(_id, user, { new: true })
  }
}