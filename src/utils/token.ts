
import jsonwebtoken from 'jsonwebtoken'
import { UserRole } from '../enums/user-role'
import { ObjectId } from 'mongodb'

export function getToken(_id: ObjectId, roles: UserRole[]) {
  return jsonwebtoken.sign(
    {
      _id,
      roles,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRATION ?? '1d',
    }
  )
}