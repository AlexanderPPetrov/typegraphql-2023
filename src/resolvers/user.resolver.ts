import { Resolver, Query, Mutation, Arg, Authorized, Args, Ctx } from 'type-graphql'
import {
  User,
  CreateUserInput,
  EditUserInput,
  PaginatedUserResponse,
  UserLoginArguments,
} from '../schema/user.schema'
import { UserRole } from '../enums/user-role'
import { UserService } from '../services/user.service'
import { PaginationInput } from '../schema/pagination.schema'
import { ObjectId } from 'mongodb'
import { Context } from '../types/context'

@Resolver()
export class UserResolver {

  constructor(private userService: UserService) {
    this.userService = new UserService()
  }

  @Query(() => PaginatedUserResponse)
  async users(@Args()paginationInput : PaginationInput):Promise<PaginatedUserResponse> {
    return this.userService.getUsers(paginationInput)
  }

  @Query(() => User)
  async user(@Arg('_id') _id: ObjectId):Promise<User> {
    return this.userService.getUser(_id)
  }


  @Mutation(() => User)
  async createUser(@Arg('user') user: CreateUserInput):Promise<User> {
    return this.userService.createUser(user)
  }

  @Authorized([UserRole.SUPER_ADMIN])
  @Mutation(() => User)
  async deleteUser(@Arg('_id') _id: ObjectId):Promise<User> {
    return this.userService.deleteUser(_id)
  }

  @Mutation(() => User)
  async updateUser(@Arg('user') user: EditUserInput):Promise<User> {
    return this.userService.updateUser(user)
  }


  @Mutation(() => String)
  async login(@Args(){ email, password }: UserLoginArguments) {
    return this.userService.login(email, password)
  }
  @Query(() => User)
  async currentUser(@Ctx() { user }: Context):Promise<User> {
    return this.userService.currentUser(user)
  }
}
