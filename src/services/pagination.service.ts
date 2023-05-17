import { ClassType } from 'type-graphql'
import { getModelForClass  } from '@typegoose/typegoose'
import { PaginationInput } from '../schema/pagination.schema'

export class PaginationService<T> {
  private model: any

  constructor(model: ClassType<T>) {
    this.model = getModelForClass(model)
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
