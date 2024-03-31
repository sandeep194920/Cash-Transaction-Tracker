import { BSON, ObjectSchema, Object } from 'realm'

export class Customer extends Object<Customer> {
  _id!: BSON.ObjectId
  customer_id!: string
  name!: string
  address!: string
  signed_up_on!: Date
  balance!: number
  user_id!: string

  static schema: ObjectSchema = {
    name: 'Customer',
    properties: {
      _id: 'objectId',
      customer_id: 'string',
      name: 'string',
      address: 'string',
      signed_up_on: 'date',
      balance: 'double',
      user_id: 'string',
    },
    primaryKey: '_id',
  }
}
