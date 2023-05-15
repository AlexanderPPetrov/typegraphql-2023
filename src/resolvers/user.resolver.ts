import { Resolver, Query, Mutation, Arg, Authorized, Args } from 'type-graphql'
import { User, CreateUserInput, EditUserInput, PaginatedUserResponse } from '../schema/user.schema'
import { UserRole } from '../enums/user-role'
import { UserService } from '../services/user.service'
import { PaginationInput } from '../schema/pagination.schema'
import { ObjectId } from 'mongodb'

@Resolver()
export class UserResolver {

  constructor(private userService: UserService) {
    this.userService = new UserService()
  }

  @Query(returns => PaginatedUserResponse)
  async users(@Args()paginationInput : PaginationInput):Promise<PaginatedUserResponse> {
    return this.userService.getUsers(paginationInput)
  }

  @Query(returns => User)
  async user(@Arg('_id') _id: ObjectId):Promise<User> {
    return this.userService.getUser(_id)
  }


  @Mutation(returns => User)
  async createUser(@Arg('user') user: CreateUserInput):Promise<User> {
    return this.userService.createUser(user)
  }

  @Authorized([UserRole.SUPER_ADMIN])
  @Mutation(returns => User)
  async deleteUser(@Arg('_id') _id: ObjectId):Promise<User> {
    return this.userService.deleteUser(_id)
  }

  @Mutation(returns => User)
  async updateUser(@Arg('user') user: EditUserInput):Promise<User> {
    return this.userService.updateUser(user)
  }

}
