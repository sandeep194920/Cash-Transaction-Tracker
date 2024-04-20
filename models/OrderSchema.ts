import { BSON, ObjectSchema, Object } from 'realm'
import { Item } from './ItemSchema'
// import { Customer } from './CustomerSchema'

export class Order extends Object<Order> {
  _id: BSON.ObjectID = new BSON.ObjectId()
  user_id!: string
  order_id!: string
  order_price!: number
  paid_by_customer!: number
  carry_over!: number
  order_date!: Date
  items!: Realm.List<Item> // Reference to the Item schema

  static schema: ObjectSchema = {
    name: 'Order',
    properties: {
      _id: 'objectId',
      user_id: 'string',
      order_id: 'string',
      order_price: 'double',
      paid_by_customer: 'double',
      carry_over: 'double',
      order_date: 'date',
      items: 'Item[]',
      customer: {
        type: 'linkingObjects',
        objectType: 'Customer',
        property: 'orders',
      },
    },
    primaryKey: '_id',
  }
}
