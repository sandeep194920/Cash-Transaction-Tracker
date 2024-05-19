import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { BSON, ObjectSchema, Object } from "realm";
import { CustomerType } from "./CustomerSchema";

// Item (Embedded Model) is used inside Order which is defined in this file, so adding Item here itself.
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

export type OrderType = {
  _id: string;
  user_id: string;
  customer_id: string;
  order_price: Double;
  paid_by_customer: Double;
  carry_over: Double;
  order_date: Date;
  items: Realm.List<Item>;
  // TODO: Add customer which is linking object. Know the type of it and add it here
  // customer: CustomerType;
};
