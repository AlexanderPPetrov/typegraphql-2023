import { UserModel } from '../schema/user.schema'

export class UserService {
  async getUsers() {
    return UserModel.find({}).lean()
  }
}