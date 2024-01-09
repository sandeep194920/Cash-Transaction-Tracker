import { ObjectSchema } from 'realm'

import Realm from 'realm'

export class Customer extends Realm.Object<Customer> {
  _id!: Realm.BSON.ObjectId
  name!: string
  email?: string
  phone!: string
  address!: string
  static schema: ObjectSchema = {
    name: 'Customer',
    properties: {
      _id: 'objectId',
      name: 'string',
      email: 'string?',
      phone: 'string',
      address: 'string',
    },
    primaryKey: '_id',
  }
}
