import { CreateUserInput, EditUserInput, UserModel } from '../schema/user.schema'
import bcryptjs from 'bcryptjs'
import { PaginationInput } from '../schema/pagination.schema'
import { ObjectId } from 'mongodb'


export class UserService {

  async createUser(user: CreateUserInput) {
    const userData = { ...user, password: bcryptjs.hashSync(user.password, 10) }
    return UserModel.create(userData)
  }

  async getUsers({ page, perPage }: PaginationInput) {
    const skipCount = (page - 1) * perPage
    const [total, items] = await Promise.all([
      UserModel.countDocuments(),
      UserModel.find({}).skip(skipCount).limit(perPage).lean(),
    ])
    const hasMore = page * perPage < total

    return {
      total,
      items,
      hasMore,
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
