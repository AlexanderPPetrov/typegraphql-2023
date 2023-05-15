import { Resolver, Query, Mutation, Args, Ctx } from 'type-graphql'
import { ApolloServerErrorCode } from '@apollo/server/errors'
import { GraphQLError } from 'graphql'

import { User, UserModel } from '../schema/user.schema'
import bcryptjs from 'bcryptjs'

import { UserLoginArguments } from '../schema/user.schema'
import { getToken } from './auth/token'
import { Context } from '../types/context'
@Resolver()
export class AuthResolver {

  @Query(returns => User)
  async currentUser(@Ctx() ctx: Context):Promise<User> {
    console.log(ctx)
    if(!ctx.user) {
      throw new GraphQLError('Unauthenticated user', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      })
    }
    return UserModel.findById(ctx.user._id)
  }


  @Mutation(returns => String)
  async login(@Args(){ email, password }: UserLoginArguments) {

    const user = await UserModel.findOne({ email })
    if(!user) {
      throw new GraphQLError('Wrong email or password', {
        extensions: {
          code: ApolloServerErrorCode.BAD_USER_INPUT,
        },
      })
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password)

    if(!isPasswordValid) {
      throw new GraphQLError('Wrong email or password', {
        extensions: {
          code: ApolloServerErrorCode.BAD_USER_INPUT,
        },
      })
    }

    return getToken(user._id, user.roles)
  }

}
