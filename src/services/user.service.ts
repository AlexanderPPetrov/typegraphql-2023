import { CreateUserInput, EditUserInput, User, UserModel } from '../schema/user.schema'
import bcryptjs from 'bcryptjs'
import { PaginationInput } from '../schema/pagination.schema'
import { ObjectId } from 'mongodb'
import { getToken } from '../utils/token'
import { AppError } from '../utils/error'
import { ErrorCodes } from '../constants/error-codes'
import { PaginationService } from './pagination.service'


export class UserService {

  async createUser(user: CreateUserInput) {
    const userData = { ...user, password: bcryptjs.hashSync(user.password, 10) }
    return UserModel.create(userData)
  }

  async getUsers(paginationInput: PaginationInput) {
    const userPaginationService = new PaginationService(User)
    return userPaginationService.paginate(paginationInput)
  }

  getUser(_id: ObjectId) {
    return UserModel.findById(_id)
  }

  deleteUser(_id: ObjectId) {
    return UserModel.findByIdAndRemove(_id)
  }

  updateUser(user: EditUserInput) {
    const userData = user.password ? { ...user, password: bcryptjs.hashSync(user.password, 10) } : user
    return UserModel.findByIdAndUpdate(user._id, userData, { new: true })
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email })
    if(!user) {
      throw AppError('Wrong email or password', ErrorCodes.BAD_USER_INPUT)
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password)

    if(!isPasswordValid) {
      throw AppError('Wrong email or password', ErrorCodes.BAD_USER_INPUT)
    }

    return getToken(user._id, user.roles)
  }
}
