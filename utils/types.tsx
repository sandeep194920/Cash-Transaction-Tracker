import { colors } from "./styles";

export type CustomerType = {
  name: string;
  phone: string;
  address: string;
  email: string;
};

export type RoundButtonType = {
  type: "ADD" | "EDIT";
  pressHandler: () => void;
};

// * NOTE: I wanted a way where, if the bgColor is specified, noBorder shouldn't be allowed
// * and vice versa. So achieveing that below

// export type ButtonType = {
//   title: string;
//   color?: keyof typeof colors;
//   bgColor?: keyof typeof colors | "transparent";
//   borderRadius?: "semi-rounded" | "rounded";
//   noBorder?: boolean;
// };

type BaseButtonType = {
  title: string;
  color?: keyof typeof colors;
  borderRadius?: "semi-rounded" | "rounded";
  onPress?: () => void;
};

type ButtonWithBgColor = BaseButtonType & {
  bgColor: keyof typeof colors | "transparent";
  // * never indicates that, this property can't be set at all. The meaning of that
  // * here is, when bgColor is set, the noBorder can't exist, and vice versa for below one
  noBorder?: never;
};

type ButtonWithNoBorder = BaseButtonType & {
  noBorder: boolean;
  bgColor?: never;
};

export type ButtonType = ButtonWithBgColor | ButtonWithNoBorder;

export type Item = {
  itemName: string;
  price: number;
  qty: number;
};

export type ItemAdded = Item & {
  id: string;
  total: number;
};

type OrderItem = {
  order_id: string;
  order_price: number;
  order_date: string;
  items: Item[];
  paid_by_customer: number;
  carry_over: number;
};

export type OrdersType = {
  [customerId: string]: OrderItem[];
};

export type InputViewType = {
  isInput: boolean;
  inputType: null | "ADD" | "EDIT";
};
