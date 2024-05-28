// export type CustomerType = {
//   _id: string
//   name: string
//   address: string
//   signed_up_on: string
//   balance: number
//   user_id: string
// }

export type CustomerType = {
  name: string;
  phone: string;
  address: string;
  email: string;
};

export type ButtonType = {
  type: "ADD" | "EDIT";
  pressHandler: () => void;
};

type Item = {
  name: string
  pricePerItem: number
  quantity: number
}

type OrderItem = {
  order_id: string
  order_price: number
  order_date: string
  items: Item[]
  paid_by_customer: number
  carry_over: number
}

export type OrdersType = {
  [customerId: string]: OrderItem[]
}

export type InputViewType = {
  isInput: boolean
  inputType: null | 'ADD' | 'EDIT'
}
