export type CustomerType = {
  customer_id: string
  name: string
  address: string
  signed_up_on: string
  balance: number
  // key: string
}

const customers: CustomerType[] = [
  {
    customer_id: '123',
    name: 'Anirban',
    address: '22-565 Sherbourne street, Toronto, M4X1N1',
    signed_up_on: '23 Nov, 2023',
    // key: '123',
    balance: 30,
  },
  {
    customer_id: '234',
    name: 'John',
    address: '52-700 Bleeker street, Toronto, M4X1N1',
    signed_up_on: '24 Nov, 2023',
    // key: '234',
    balance: -10,
  },
]

type OrderItem = {
  order_id: string
  order_price: number
  order_date: string
  items: {
    [itemName: string]: number
  }
}

export type OrdersType = {
  [customerId: string]: OrderItem[]
}

export const orders: OrdersType = {
  '123': [
    {
      order_id: 'order_123',
      order_price: 20,
      order_date: '23 Nov, 2023',
      items: {
        roti: 5,
        paratha: 1,
        sabzi: 1,
      },
    },
    {
      order_id: 'order_125',
      order_price: -25,

      order_date: '24 Nov, 2023',
      items: {
        roti: 5,
        paratha: 1,
        sabzi: 1,
      },
    },
  ],
  '234': [
    {
      order_id: 'order_126',
      order_price: 30,
      order_date: '24 Nov, 2023',
      items: {
        roti: 5,
        paratha: 1,
        sabzi: 1,
      },
    },
    {
      order_id: 'order_127',
      order_price: 30,
      order_date: '23 Nov, 2023',
      items: {
        roti: 20,
        paratha: 1,
        sabzi: 1,
      },
    },
  ],
}

export default {
  customers,
  orders,
}
