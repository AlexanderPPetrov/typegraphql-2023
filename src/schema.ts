import { buildSchema } from 'type-graphql'
import { TypegooseMiddleware } from './typegoose-middleware'
import { ObjectIdScalar } from './object-id.scalar'
import * as path from 'path'
import { resolvers } from './resolvers'
import { authChecker } from './utils/auth-checker'
import { Types } from 'mongoose'

export const getSchema = async () => {
  return await buildSchema({
    resolvers,
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    // use document converting middleware
    globalMiddlewares: [TypegooseMiddleware],
    // use ObjectId scalar mapping
    scalarsMap: [{ type: Types.ObjectId, scalar: ObjectIdScalar }],
    authChecker,
  })
}
