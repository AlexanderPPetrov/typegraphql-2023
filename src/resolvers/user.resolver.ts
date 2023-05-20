import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { UserService } from '../services/user.service'
import { BaseUserInput, CreateUserInput, User } from '../schema/user.schema'
import { ObjectId } from 'mongodb'

@Resolver()
export class UserResolver {

  constructor(private userService: UserService) {
    this.userService = new UserService()
  }

    @Query(() => [User])
  async users():Promise<User[]> {
    return this.userService.getUsers()
  }

  @Query(() => User)
    async user(@Arg('_id') _id: string):Promise<User> {
      return this.userService.getUser(_id)
    }

  @Mutation(() => User)
  async createUser(@Arg('user') user: CreateUserInput):Promise<User> {
    return this.userService.createUser(user)
  }

  @Mutation(() => User)
  async deleteUser(@Arg('_id') _id: ObjectId):Promise<User> {
    return this.userService.deleteUser(_id)
  }
  @Mutation(() => User)
  async updateUser(@Arg('_id') _id: string,
                   @Arg('user') user: BaseUserInput):Promise<User> {
    return this.userService.updateUser(_id, user)
  }
}
