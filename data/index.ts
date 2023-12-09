export type CustomerType = {
  customer_id: String
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
    signed_up_on: '22/05/2023',
    // key: '123',
    balance: 30,
  },
  {
    customer_id: '234',
    name: 'John',
    address: '52-700 Bleeker street, Toronto, M4X1N1',
    signed_up_on: '22/05/2023',
    // key: '234',
    balance: -10,
  },
]

const orders = {
  123: [
    {
      order_id: 'order_123',
      orderPrice: 20,
      date: '23/5/2010',
      items: {
        roti: 5,
        paratha: 1,
        sabzi: 1,
      },
    },
    {
      order_id: 'order_125',
      orderPrice: 25,

      date: '24/5/2010',
      items: {
        roti: 5,
        paratha: 1,
        sabzi: 1,
      },
    },
  ],
  234: [
    {
      order_id: 'order_126',
      orderPrice: 30,
      date: '23/5/2010',
      items: {
        roti: 5,
        paratha: 1,
        sabzi: 1,
      },
    },
    {
      order_id: 'order_127',
      orderPrice: 30,
      date: '24/5/2010',
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
