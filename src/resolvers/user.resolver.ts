import { Resolver, Query, Arg, Mutation, registerEnumType } from 'type-graphql'
import { UserService } from '../services/user.service'
import { User } from '../schema/user.schema'

@Resolver()
export class UserResolver {

  constructor(private userService: UserService) {
    this.userService = new UserService()
  }

    @Query(() => [User])
  async users():Promise<User[]> {
    return this.userService.getUsers()
  }

}
