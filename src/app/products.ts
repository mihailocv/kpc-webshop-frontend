import { Injectable } from '@angular/core';
import type { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class Products {
  isLoggedIn = true;
  loggedInUserId = 1;

  products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      description: 'High-performance laptop with 16GB RAM and 512GB SSD.',
      imageUrl: 'https://picsum.photos/238/160?random=1',
      price: 500,
      category: 'Electronics',
      seller: 'John Doe',
      city: 'Belgrade',
      date: '2023-10-01',
    },
    {
      id: 2,
      name: 'Bicycle',
      description: 'Mountain bike with 21-speed gears and disc brakes.',
      imageUrl: 'https://picsum.photos/238/160?random=2',
      price: 150,
      category: 'Sports',
      seller: 'Jane Smith',
      city: 'Novi Sad',
      date: '2023-10-02',
    },
    {
      id: 3,
      name: 'Smartphone',
      description: 'Latest smartphone with 128GB storage and 48MP camera.',
      imageUrl: 'https://picsum.photos/238/160?random=3',
      price: 300,
      category: 'Electronics',
      seller: 'Alice Johnson',
      city: 'Niš',
      date: '2023-10-03',
    },
    {
      id: 4,
      name: 'Camera',
      description: 'DSLR camera with 24MP sensor and 18-55mm lens.',
      imageUrl: 'https://picsum.photos/238/160?random=4',
      price: 400,
      category: 'Photography',
      seller: 'Bob Brown',
      city: 'Subotica',
      date: '2023-10-04',
    },
    {
      id: 5,
      name: 'Headphones',
      description: 'Wireless over-ear headphones with noise cancellation.',
      imageUrl: 'https://picsum.photos/238/160?random=5',
      price: 80,
      category: 'Audio',
      seller: 'Charlie Davis',
      city: 'Kragujevac',
      date: '2023-10-05',
    },
    {
      id: 6,
      name: 'Watch',
      description:
        'Stylish analog watch with leather strap and water resistance.',
      imageUrl: 'https://picsum.photos/238/160?random=6',
      price: 200,
      category: 'Accessories',
      seller: 'Diana Evans',
      city: 'Čačak',
      date: '2023-10-06',
    },
    {
      id: 7,
      name: 'Tablet',
      description:
        '10-inch tablet with 64GB storage and high-resolution display.',
      imageUrl: 'https://picsum.photos/238/160?random=7',
      price: 250,
      category: 'Electronics',
      seller: 'Ethan Green',
      city: 'Zrenjanin',
      date: '2023-10-07',
    },
    {
      id: 8,
      name: 'Gaming Console',
      description: 'Next-gen gaming console with 4K support and 1TB storage.',
      imageUrl: 'https://picsum.photos/238/160?random=8',
      price: 350,
      category: 'Gaming',
      seller: 'Fiona Harris',
      city: 'Senta',
      date: '2023-10-08',
    },
    {
      id: 9,
      name: 'Printer',
      description: 'All-in-one printer with scanning and copying features.',
      imageUrl: 'https://picsum.photos/238/160?random=9',
      price: 120,
      category: 'Office',
      seller: 'George King',
      city: 'Leskovac',
      date: '2023-10-09',
    },
    {
      id: 10,
      name: 'Smartwatch',
      description:
        'Wearable smartwatch with fitness tracking and heart rate monitor.',
      imageUrl: 'https://picsum.photos/238/160?random=10',
      price: 180,
      category: 'Wearables',
      seller: 'Hannah Lee',
      city: 'Valjevo',
      date: '2023-10-10',
    },
    {
      id: 11,
      name: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker with high-quality sound.',
      imageUrl: 'https://picsum.photos/238/160?random=11',
      price: 70,
      category: 'Audio',
      seller: 'Ian Miller',
      city: 'Pirot',
      date: '2023-10-11',
    },
    {
      id: 12,
      name: 'E-reader',
      description:
        'Lightweight e-reader with adjustable front light and long battery life.',
      imageUrl: 'https://picsum.photos/238/160?random=12',
      price: 220,
      category: 'Books',
      seller: 'Julia Nelson',
      city: 'Sremska Mitrovica',
      date: '2023-10-12',
    },
  ];

  getProduct(idString: string) {
    const id = +idString;
    return this.products.find((product) => product.id === id);
  }
}
