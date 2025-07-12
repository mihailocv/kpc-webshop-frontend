import { Injectable } from '@angular/core';
import { User } from './users.model';

@Injectable({
  providedIn: 'root',
})
export class Users {
  loggedInUser = 'John Doe';

  users: User[] = [
    {
      username: 'John Doe',
      password: 'password123',
      phone: '123-456-7890',
      dateOfRegistration: '2023-01-15',
    },
    {
      username: 'Jane Smith',
      password: 'mypassword',
      phone: '987-654-3210',
      dateOfRegistration: '2023-02-20',
    },
    {
      username: 'Alice Johnson',
      password: 'alicepass',
      phone: '555-123-4567',
      dateOfRegistration: '2023-03-10',
    },
    {
      username: 'Charlie Davis',
      password: 'charliesecure',
      phone: '444-987-6543',
      dateOfRegistration: '2023-04-05',
    },
    {
      username: 'Diana Evans',
      password: 'dianapass',
      phone: '333-555-7890',
      dateOfRegistration: '2023-05-25',
    },
    {
      username: 'Fiona Harris',
      password: 'fionapass',
      phone: '222-444-3333',
      dateOfRegistration: '2023-06-15',
    },
    {
      username: 'George King',
      password: 'georgepass',
      phone: '111-222-3333',
      dateOfRegistration: '2023-07-20',
    },
    {
      username: 'Hannah Lee',
      password: 'hannahsecure',
      phone: '666-777-8888',
      dateOfRegistration: '2023-08-30',
    },
    {
      username: 'Julia Nelson',
      password: 'juliapass',
      phone: '999-888-7777',
      dateOfRegistration: '2023-09-10',
    },
  ];
}
