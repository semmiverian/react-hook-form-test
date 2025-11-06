export interface ItemType {
  itemName: string;
  quantity: number;
  price: number;
}

export interface FormData {
  name: string;
  age: number;
  items: ItemType[];
}
