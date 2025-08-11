// src/types/user.ts
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    username: string;
    image: string;
    address: {
      address: string;
      city: string;
      country: string;
      state: string;
    };
  }