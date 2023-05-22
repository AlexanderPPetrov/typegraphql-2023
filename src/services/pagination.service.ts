import { PaginationInput } from '../schema/pagination.schema'

export class PaginationService<T> {
  //TODO define proper model type
  private model: any
  private populate = ''
  constructor(model: any, populate?: string) {
    this.model = model
    this.populate = populate || ''
  }

  async getPaginatedItems({ page, limit }: PaginationInput) {
    const skip = (page - 1) * limit

    const [items, totalItems] = await Promise.all([
      this.model.find().skip(skip).limit(limit).populate(this.populate).lean(),
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