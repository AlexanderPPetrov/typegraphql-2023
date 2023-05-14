import { Resolver, Query, Mutation, Arg, Authorized, Args } from 'type-graphql'
import { User, CreateUserInput, EditUserInput } from '../schema/user.schema'
import { UserRoles } from '../enums/user-roles'
import { UserService } from '../services/user.service'
import { PaginationInput, PaginationResponse } from '../schema/pagination.schema'
import { ObjectId } from 'mongodb'

@Resolver()
export class UserResolver {

  constructor(private userService: UserService) {
    this.userService = new UserService()
  }

  @Query(returns => [User])
  async users(@Args()paginationInput : PaginationInput):Promise<PaginationResponse<User>> {
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

  @Authorized([UserRoles.SUPER_ADMIN])
  @Mutation(returns => User)
  async deleteUser(@Arg('_id') _id: ObjectId):Promise<User> {
    return this.userService.deleteUser(_id)
  }

  @Mutation(returns => User)
  async updateUser(@Arg('user') user: EditUserInput):Promise<User> {
    return this.userService.updateUser(user)
  }

}
