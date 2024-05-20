import { BSON, ObjectSchema, Object } from "realm";

export class Item extends Object {
  name!: string;
  quantity!: number;
  price_per_item!: number;

  static schema: ObjectSchema = {
    name: "Item",
    embedded: true, // ITEM IS AN EMBEDDED SCHEMA USED IN ORDER
    properties: {
      name: "string",
      quantity: "int",
      price_per_item: "double",
    },
  };
}
export class Order extends Object<Order> {
  _id: BSON.ObjectID = new BSON.ObjectId();
  user_id!: string;
  customer_id!: string;
  order_price!: number;
  paid_by_customer!: number;
  carry_over!: number;
  order_date!: Date;
  items!: Realm.List<Item>;
  // items!: { type: "list"; objectType: "Item" };

  static schema: ObjectSchema = {
    name: "Order",
    properties: {
      _id: "objectId",
      user_id: "string",
      customer_id: "string",
      order_price: "double",
      paid_by_customer: "double",
      carry_over: "double",
      order_date: "date",
      items: "Item[]",
      customer: {
        type: "linkingObjects",
        objectType: "Customer",
        property: "orders",
      },
    },
    primaryKey: "_id",
  };
}

// INFO: Not required as I'm using the interface CustomerTransactionProps in CustomerTransaction comp to recieve the prop transaction

// export type OrderType = {
//   _id: string;
//   user_id: string;
//   customer_id: string;
//   order_price: Double;
//   paid_by_customer: Double;
//   carry_over: Double;
//   order_date: Date;
//   items: Realm.List<Item>;
// };
