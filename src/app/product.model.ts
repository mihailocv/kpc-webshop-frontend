import {User} from './users.model';

export interface Product {
  _id?: string;
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  user: User;
  city: string;
  createdAt: string;
  updatedAt: string;
}
