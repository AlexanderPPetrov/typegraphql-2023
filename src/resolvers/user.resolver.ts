import { Resolver, Query, Arg, Args, Mutation } from 'type-graphql'
import { UserService } from '../services/user.service'
import { BaseUserInput, CreateUserInput, PaginatedUserResponse, User } from '../schema/user.schema'
import { ObjectId } from 'mongodb'
import { PaginationInput } from '../schema/pagination.schema'

@Resolver()
export class UserResolver {

  constructor(private userService: UserService) {
    this.userService = new UserService()
  }

    @Query(() => PaginatedUserResponse)
  async users(@Args()paginatedInput: PaginationInput):Promise<PaginatedUserResponse> {
    return this.userService.getUsers(paginatedInput)
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
