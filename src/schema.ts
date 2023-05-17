import { buildSchema } from 'type-graphql'
import { TypegooseMiddleware } from './typegoose-middleware'
import { ObjectId } from 'mongodb'
import { ObjectIdScalar } from './object-id.scalar'
import { authChecker } from './utils/auth-checker'

import * as path from 'path'
import { resolvers } from './resolvers'

export const getSchema = async () => {
  return await buildSchema({
    resolvers,
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    // use document converting middleware
    globalMiddlewares: [TypegooseMiddleware],
    // use ObjectId scalar mapping
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    authChecker,
  })
}

