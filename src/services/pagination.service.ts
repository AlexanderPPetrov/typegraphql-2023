import { PaginationInput } from '../schema/pagination.schema'
import { ReturnModelType } from '@typegoose/typegoose'
import { ClassType } from 'type-graphql'

export class PaginationService<T> {
  private model: ReturnModelType<ClassType<T>, unknown>

  constructor(model: ReturnModelType<ClassType<T>, unknown>) {
    this.model = model
  }

  async paginate({ page, limit }: PaginationInput) {
    const skipCount = (page - 1) * limit
    const [totalItems, items] = await Promise.all([
      this.model.countDocuments(),
      this.model.find({}).skip(skipCount).limit(limit).lean(),
    ])
    const totalPages = Math.ceil(totalItems / limit)

    return {
      items,
      page,
      totalPages,
      totalItems,
    }
  }

}
