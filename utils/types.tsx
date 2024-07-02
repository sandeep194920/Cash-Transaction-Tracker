import { colors } from "./styles";

export type CustomerType = {
  name: string;
  phone: string;
  address: string;
  email: string;
};

export type RoundButtonType = {
  type: "ADD" | "EDIT";
  onPress: () => void;
};

// * NOTE: I wanted a way where, if the bgColor is specified, noBorder shouldn't be allowed
// * and vice versa. So achieveing that below

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

export type ItemInFeFormat = {
  itemName: string;
  price: number;
  qty: number;
};

export type ItemAddedInFeFormat = ItemInFeFormat & {
  id: string;
  total: number;
};

export type ItemInBeFormat = {
  name: string;
  price_per_item: number;
  quantity: number;
};

export type InputViewType = {
  isInput: boolean;
  inputType: null | "ADD" | "EDIT";
};
