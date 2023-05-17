import { AuthChecker } from 'type-graphql'
import { Context } from '../types/context'

export const authChecker: AuthChecker<Context> = (
  { context: { user } },
  roles,
) => {
  if(!user) {
    return false
  }
  return user.roles.some(role => roles.includes(role))

}
