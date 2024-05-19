import { BSON, ObjectSchema, Object } from 'realm'
import { Order } from './OrderSchema'

export class Customer extends Object<Customer> {
  _id: BSON.ObjectID = new BSON.ObjectId();
  name!: string;
  address!: string;
  signed_up_on!: Date;
  balance!: number;
  user_id!: string;
  orders!: Realm.List<Order>;

  static schema: ObjectSchema = {
    name: "Customer",
    properties: {
      _id: "objectId",
      name: "string",
      address: "string",
      signed_up_on: "date",
      balance: "double",
      user_id: "string",
      orders: "Order[]",
    },
    primaryKey: "_id",
  };
}

// Extract the instance type of the Customer class
export type CustomerType = {
  _id: string; // this is BSON.ObjectID but marking it as string so we dont have to do .toString() while using it in CustomerTransaction file
  user_id: string;
  name: string;
  address: string;
  signed_up_on: Date;
  balance: number;
  orders: Realm.List<Order>;
};