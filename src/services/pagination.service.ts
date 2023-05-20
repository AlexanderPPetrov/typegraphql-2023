import { PaginationInput } from '../schema/pagination.schema'

export class PaginationService<T> {
  //TODO define proper model type
  private model: any
  constructor(model: any) {
    this.model = model
  }

  async getPaginatedItems({ page, limit }: PaginationInput) {
    const skip = (page - 1) * limit

    const [items, totalItems] = await Promise.all([
      this.model.find().skip(skip).limit(limit).lean(),
      this.model.countDocuments(),
    ])
    const totalPages = Math.ceil(totalItems / limit)

    return {
      page,
      totalPages,
      totalItems,
      items,
    }
  }
}