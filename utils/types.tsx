export type CustomerType = {
  customer_id: string
  name: string
  address: string
  signed_up_on: string
  balance: number
}

export type ButtonType = {
  type: 'ADD' | 'EDIT'
}

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
