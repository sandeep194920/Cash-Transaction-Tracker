import { BSON, ObjectSchema, Object } from 'realm'
import { Item } from './ItemSchema'

export class Order extends Object<Order> {
  _id!: BSON.ObjectId
  customer_id!: string
  order_id!: string
  order_price!: number
  paid_by_customer!: number
  carry_over!: number
  order_date!: Date
  items!: Item[] // Reference to the Item schema

  static schema: ObjectSchema = {
    name: 'Order',
    properties: {
      _id: 'objectId',
      customer_id: 'string',
      order_id: 'string',
      order_price: 'double',
      paid_by_customer: 'double',
      carry_over: 'double',
      order_date: 'date',
      items: { type: 'list', objectType: 'Item' },
    },
    primaryKey: '_id',
  }
}
