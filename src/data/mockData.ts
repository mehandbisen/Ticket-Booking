
import { Show, User, Booking } from '../types';

export const mockShows: Show[] = [
  {
    id: '1',
    title: 'Hamilton',
    description: 'An American Musical by Lin-Manuel Miranda about the life of American founding father Alexander Hamilton.',
    date: '2025-05-15',
    time: '19:30',
    venue: 'Broadway Theater',
    imageUrl: 'https://images.unsplash.com/photo-1568184802975-103d1f3bfdf3?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3',
    price: 149.99,
    availableSeats: 85,
    totalSeats: 100
  },
  {
    id: '2',
    title: 'The Lion King',
    description: 'Disney\'s beloved animated film comes to spectacular life in this musical directed by Julie Taymor.',
    date: '2025-05-20',
    time: '20:00',
    venue: 'Minskoff Theatre',
    imageUrl: 'https://images.unsplash.com/photo-1616442343016-f19d90d6c8fc?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3',
    price: 129.99,
    availableSeats: 75,
    totalSeats: 120
  },
  {
    id: '3',
    title: 'Phantom of the Opera',
    description: 'Andrew Lloyd Webber\'s iconic musical about a musical genius who haunts the Paris Opera House.',
    date: '2025-05-25',
    time: '19:00',
    venue: 'Majestic Theatre',
    imageUrl: 'https://images.unsplash.com/photo-1572204097183-e1ab140342ed?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3',
    price: 99.99,
    availableSeats: 110,
    totalSeats: 150
  },
  {
    id: '4',
    title: 'Wicked',
    description: 'The untold story of the witches of Oz, exploring the unlikely friendship between them.',
    date: '2025-06-10',
    time: '18:30',
    venue: 'Gershwin Theatre',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=3020&auto=format&fit=crop&ixlib=rb-4.0.3',
    price: 119.99,
    availableSeats: 95,
    totalSeats: 120
  },
  {
    id: '5',
    title: 'The Book of Mormon',
    description: 'A satirical musical comedy that follows two Mormon missionaries as they attempt to preach in Uganda.',
    date: '2025-06-15',
    time: '20:00',
    venue: 'Eugene O\'Neill Theatre',
    imageUrl: 'https://images.unsplash.com/photo-1559567123-12c6d2991fe1?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3',
    price: 89.99,
    availableSeats: 80,
    totalSeats: 100
  },
  {
    id: '6',
    title: 'Dear Evan Hansen',
    description: 'A powerful musical about a high school senior with social anxiety who gets caught up in a web of lies.',
    date: '2025-06-22',
    time: '19:00',
    venue: 'Music Box Theatre',
    imageUrl: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3',
    price: 109.99,
    availableSeats: 70,
    totalSeats: 90
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@tickets.com',
    isAdmin: true
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    isAdmin: false
  }
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    showId: '1',
    userId: '2',
    seats: [
      { id: 'A1', row: 'A', number: 1, status: 'booked' },
      { id: 'A2', row: 'A', number: 2, status: 'booked' },
    ],
    totalPrice: 299.98,
    bookingDate: '2025-04-10',
    status: 'confirmed'
  },
  {
    id: '2',
    showId: '3',
    userId: '2',
    seats: [
      { id: 'B5', row: 'B', number: 5, status: 'booked' },
    ],
    totalPrice: 99.99,
    bookingDate: '2025-04-15',
    status: 'confirmed'
  }
];

export const generateSeats = (rows: string[], seatsPerRow: number) => {
  const seats = [];
  for (const row of rows) {
    for (let i = 1; i <= seatsPerRow; i++) {
      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        status: 'available' as const
      });
    }
  }
  return seats;
};
