import { OrdersType } from "../utils/types";

const customers = [
  {
    customer_id: "123",
    name: "Anirban",
    address: "22-565 Sherbourne street, Toronto, M4X1N1",
    signed_up_on: "23 Nov, 2023",
    balance: 30,
  },
  {
    customer_id: "234",
    name: "John",
    address: "52-700 Bleeker street, Toronto, M4X1N1",
    signed_up_on: "24 Nov, 2023",
    balance: -10,
  },
];

export const orders: OrdersType = {
  "123": [
    {
      order_id: "order_123",
      order_price: 200, // add up all the items prices
      paid_by_customer: 100,
      carry_over: 100,
      order_date: "23 Nov, 2023",
      items: [
        {
          name: "roti",
          pricePerItem: 0.5,
          quantity: 20,
        },
        {
          name: "paratha",
          pricePerItem: 4,
          quantity: 20,
        },
        {
          name: "sabzi",
          pricePerItem: 0.75,
          quantity: 20,
        },
      ],
    },
    {
      order_id: "order_125",
      order_price: -25,
      paid_by_customer: 100,
      carry_over: 100,
      order_date: "24 Nov, 2023",
      items: [
        {
          name: "roti",
          pricePerItem: 4,
          quantity: 20,
        },
        {
          name: "paratha",
          pricePerItem: 4,
          quantity: 20,
        },
        {
          name: "sabzi",
          pricePerItem: 4,
          quantity: 20,
        },
      ],
    },
  ],
  "234": [
    {
      order_id: "order_126",
      order_price: 30,
      paid_by_customer: 100,
      carry_over: 100,
      order_date: "24 Nov, 2023",
      items: [
        {
          name: "roti",
          pricePerItem: 4,
          quantity: 20,
        },
        {
          name: "paratha",
          pricePerItem: 4,
          quantity: 20,
        },
        {
          name: "sabzi",
          pricePerItem: 4,
          quantity: 20,
        },
      ],
    },
    {
      order_id: "order_127",
      order_price: 30,
      paid_by_customer: 100,
      carry_over: 100,
      order_date: "23 Nov, 2023",
      items: [
        {
          name: "roti",
          pricePerItem: 4,
          quantity: 20,
        },
        {
          name: "paratha",
          pricePerItem: 4,
          quantity: 20,
        },
        {
          name: "sabzi",
          pricePerItem: 4,
          quantity: 20,
        },
      ],
    },
  ],
};

export default {
  customers,
  orders,
};
