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

/* BALANCE UPDATE
I want to show the transaction even if it's just about updating the balance. 
Hence, we include transactionType prop inside Order to differentiate if it's order or balanceUpdate
*/
export class BalanceUpdate extends Object {
  old_balance!: number;
  new_balance!: number;

  static schema: ObjectSchema = {
    name: "BalanceUpdate",
    embedded: true, // Indicates this is an embedded object
    properties: {
      old_balance: "double",
      new_balance: "double",
    },
  };
}

export class Order extends Object<Order> {
  _id: BSON.ObjectID = new BSON.ObjectId();
  user_id!: string;
  customer_id!: string;
  order_date!: Date;
  transactionType: "order" | "balanceUpdate" | null = "order"; // Default to "order"

  order_price?: number;
  paid_by_customer?: number;
  carry_over?: number;
  items?: Realm.List<Item>;

  balanceUpdate?: BalanceUpdate;

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
      transactionType: "string",
      balanceUpdate: "BalanceUpdate?",
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
