import { Item } from './item.model';

export interface Wishlist {
  headerImg: string;
  title: string;
  expirationDate: Date;
  items: Item[];
}
