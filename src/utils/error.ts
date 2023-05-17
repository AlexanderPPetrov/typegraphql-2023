import { GraphQLError } from 'graphql/index'

export function AppError(message: string, code: string) {
  return new GraphQLError(message, {
    extensions: {
      code,
    },
  })
}