
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Show {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  imageUrl: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'selected' | 'booked';
}

export interface Booking {
  id: string;
  showId: string;
  userId: string;
  seats: Seat[];
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
}
