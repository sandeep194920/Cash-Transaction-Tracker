import { BSON, ObjectSchema, Object } from 'realm'

export class Item extends Object<Item> {
  name!: string
  quantity!: number
  price_per_item!: number

  static schema: ObjectSchema = {
    name: 'Item',
    embedded: true, // THIS IS AN EMBEDDED SCHEMA
    properties: {
      name: 'string',
      quantity: 'int',
      price_per_item: 'double',
    },
  }
}
