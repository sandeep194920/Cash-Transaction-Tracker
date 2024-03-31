import { BSON, ObjectSchema, Object } from 'realm'

export class Item extends Object<Item> {
  _id!: BSON.UUID
  name!: string
  quantity!: number
  price_per_item!: number

  static schema: ObjectSchema = {
    name: 'Item',
    properties: {
      _id: 'objectId',
      name: 'string',
      quantity: 'int',
      price_per_item: 'double',
    },
    primaryKey: '_id',
  }
}
