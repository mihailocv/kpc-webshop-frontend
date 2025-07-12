import { Injectable } from '@angular/core';

interface Product {
  id: number;
  name: string;
  destination: string;
  imageUrl: string;
  price: number;
  category: string;
  seller: string;
  city: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class Products {
  isLoggedIn = false;
  loggedInUserId = 1;

  products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      destination: 'Belgrade',
      imageUrl: 'https://picsum.photos/1000?random=1',
      price: 500,
      category: 'Electronics',
      seller: 'John Doe',
      city: 'Belgrade',
      date: '2023-10-01'
    },
    {
      id: 2,
      name: 'Bicycle',
      destination: 'Novi Sad',
      imageUrl: 'https://picsum.photos/1000?random=2',
      price: 150,
      category: 'Sports',
      seller: 'Jane Smith',
      city: 'Novi Sad',
      date: '2023-10-02'
    },
    {
      id: 3,
      name: 'Smartphone',
      destination: 'Niš',
      imageUrl: 'https://picsum.photos/1000?random=3',
      price: 300,
      category: 'Electronics',
      seller: 'Alice Johnson',
      city: 'Niš',
      date: '2023-10-03'
    },
    {
      id: 4,
      name: 'Camera',
      destination: 'Subotica',
      imageUrl: 'https://picsum.photos/1000?random=4',
      price: 400,
      category: 'Photography',
      seller: 'Bob Brown',
      city: 'Subotica',
      date: '2023-10-04'
    },
    {
      id: 5,
      name: 'Headphones',
      destination: 'Kragujevac',
      imageUrl: 'https://picsum.photos/1000?random=5',
      price: 80,
      category: 'Audio',
      seller: 'Charlie Davis',
      city: 'Kragujevac',
      date: '2023-10-05'
    },
    {
      id: 6,
      name: 'Watch',
      destination: 'Čačak',
      imageUrl: 'https://picsum.photos/1000?random=6',
      price: 200,
      category: 'Accessories',
      seller: 'Diana Evans',
      city: 'Čačak',
      date: '2023-10-06'
    },
    {
      id: 7,
      name: 'Tablet',
      destination: 'Zrenjanin',
      imageUrl: 'https://picsum.photos/1000?random=7',
      price: 250,
      category: 'Electronics',
      seller: 'Ethan Green',
      city: 'Zrenjanin',
      date: '2023-10-07'
    },
    {
      id: 8,
      name: 'Gaming Console',
      destination: 'Senta',
      imageUrl: 'https://picsum.photos/1000?random=8',
      price: 350,
      category: 'Gaming',
      seller: 'Fiona Harris',
      city: 'Senta',
      date: '2023-10-08'
    },
    {
      id: 9,
      name: 'Printer',
      destination: 'Leskovac',
      imageUrl: 'https://picsum.photos/1000?random=9',
      price: 120,
      category: 'Office',
      seller: 'George King',
      city: 'Leskovac',
      date: '2023-10-09'
    },
    {
      id: 10,
      name: 'Smartwatch',
      destination: 'Valjevo',
      imageUrl: 'https://picsum.photos/1000?random=10',
      price: 180,
      category: 'Wearables',
      seller: 'Hannah Lee',
      city: 'Valjevo',
      date: '2023-10-10'
    },
    {
      id: 11,
      name: 'Bluetooth Speaker',
      destination: 'Pirot',
      imageUrl: 'https://picsum.photos/1000?random=11',
      price: 70,
      category: 'Audio',
      seller: 'Ian Miller',
      city: 'Pirot',
      date: '2023-10-11'
    },
    {
      id: 12,
      name: 'E-reader',
      destination: 'Sremska Mitrovica',
      imageUrl: 'https://picsum.photos/1000?random=12',
      price: 220,
      category: 'Books',
      seller: 'Julia Nelson',
      city: 'Sremska Mitrovica',
      date: '2023-10-12'
    }
  ];
}
