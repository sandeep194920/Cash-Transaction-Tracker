/* DB Item looks like this
    name,
    quantity,
    price_per_item

The items in front-end looks like this 
  itemName: string;
  price: number;
  qty: number;
  id: string;
  total: number;

I don't want to add id to item in db as it is embedded entity (which doesn't require db as per
mongodb docs). Also, I don't want to calculate total and store it in db

Hence I will transform Items as need from one format to another when read from and written to DB
*/

import { ItemAddedInFeFormat, ItemInBeFormat, ItemInFeFormat } from "./types";
import uuid from "react-native-uuid";

const itemsToBeFormat = (items: ItemAddedInFeFormat[]) => {
  const transformedItems = items.map(({ itemName, qty, price }) => ({
    name: itemName,
    quantity: +qty,
    price_per_item: +price,
  }));

  return transformedItems;
};

const itemsToFeFormat = (items: ItemInBeFormat[]): ItemAddedInFeFormat[] => {
  const formattedItems = items.map((item) => {
    return itemToFeFormat(item);
  });
  return formattedItems;
};

const itemToFeFormat = (item: ItemInBeFormat): ItemAddedInFeFormat => {
  return {
    id: uuid.v4().toString(),
    itemName: item.name,
    price: item.price_per_item,
    qty: item.quantity,
    total: item.price_per_item * item.quantity,
  };
};

const updateItemWithDetailsFE = (item: ItemInFeFormat): ItemAddedInFeFormat => {
  const updatedItem = {
    ...item,
    id: uuid.v4().toString(),
    total: +(item.price * item.qty).toFixed(2),
  };
  return updatedItem;
};

export {
  itemsToFeFormat,
  itemsToBeFormat,
  itemToFeFormat,
  updateItemWithDetailsFE,
};
