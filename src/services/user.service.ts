import { CreateUserInput, EditUserInput, UserModel } from '../schema/user.schema'
import bcryptjs from 'bcryptjs'
import { PaginationInput } from '../schema/pagination.schema'
import { ObjectId } from 'mongodb'


export class UserService {

  async createUser(user: CreateUserInput) {
    const userData = { ...user, password: bcryptjs.hashSync(user.password, 10) }
    return UserModel.create(userData)
  }

  async getUsers({ currentPage, perPage }: PaginationInput) {
    const skipCount = (currentPage - 1) * perPage
    const [total, results] = await Promise.all([
      UserModel.countDocuments(),
      UserModel.find({}).skip(skipCount).limit(perPage).lean(),
    ])
    const totalPages = Math.ceil(total / perPage)

    return {
      total,
      results,
      totalPages,
      currentPage,
    }
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

}
