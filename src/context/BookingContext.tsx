
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Show, Booking, Seat } from '../types';
import { mockShows, mockBookings, generateSeats } from '../data/mockData';
import { useAuth } from './AuthContext';
import { toast } from "@/components/ui/sonner";

interface BookingContextType {
  shows: Show[];
  bookings: Booking[];
  selectedShow: Show | null;
  selectedSeats: Seat[];
  availableSeats: Seat[];
  selectShow: (show: Show) => void;
  clearSelectedShow: () => void;
  toggleSeatSelection: (seat: Seat) => void;
  confirmBooking: () => boolean;
  getUserBookings: () => Booking[];
  cancelBooking: (bookingId: string) => void;
  addShow: (show: Omit<Show, 'id'>) => void;
  updateShow: (updatedShow: Show) => void;
  deleteShow: (showId: string) => void;
  getAllBookings: () => Booking[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [shows, setShows] = useState<Show[]>(mockShows);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [availableSeats, setAvailableSeats] = useState<Seat[]>([]);
  
  const { currentUser } = useAuth();

  const selectShow = (show: Show) => {
    setSelectedShow(show);
    setSelectedSeats([]);
    
    // Generate seats for the selected show
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 10;
    const allSeats = generateSeats(rows, seatsPerRow);
    
    // Mark booked seats
    const bookedSeatsIds = bookings
      .filter(b => b.showId === show.id && b.status === 'confirmed')
      .flatMap(b => b.seats)
      .map(s => s.id);
    
    const seatsWithStatus = allSeats.map(seat => ({
      ...seat,
      status: bookedSeatsIds.includes(seat.id) ? 'booked' as const : 'available' as const
    }));
    
    setAvailableSeats(seatsWithStatus);
  };

  const clearSelectedShow = () => {
    setSelectedShow(null);
    setSelectedSeats([]);
    setAvailableSeats([]);
  };

  const toggleSeatSelection = (seat: Seat) => {
    if (seat.status === 'booked') return; // Cannot select already booked seats
    
    if (selectedSeats.some(s => s.id === seat.id)) {
      // Deselect the seat
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
      setAvailableSeats(availableSeats.map(s => 
        s.id === seat.id ? { ...s, status: 'available' } : s
      ));
    } else {
      // Select the seat
      setSelectedSeats([...selectedSeats, { ...seat, status: 'selected' }]);
      setAvailableSeats(availableSeats.map(s => 
        s.id === seat.id ? { ...s, status: 'selected' } : s
      ));
    }
  };

  const confirmBooking = () => {
    if (!currentUser) {
      toast.error("Please log in to book tickets!");
      return false;
    }
    
    if (!selectedShow) {
      toast.error("No show selected!");
      return false;
    }
    
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat!");
      return false;
    }
    
    // Create a new booking
    const newBooking: Booking = {
      id: `booking-${bookings.length + 1}`,
      showId: selectedShow.id,
      userId: currentUser.id,
      seats: selectedSeats.map(s => ({ ...s, status: 'booked' })),
      totalPrice: selectedShow.price * selectedSeats.length,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'confirmed'
    };
    
    // Update bookings
    setBookings([...bookings, newBooking]);
    
    // Update show's available seats
    const updatedShow = {
      ...selectedShow,
      availableSeats: selectedShow.availableSeats - selectedSeats.length
    };
    
    setShows(shows.map(s => s.id === updatedShow.id ? updatedShow : s));
    
    // Clear selection
    setSelectedShow(null);
    setSelectedSeats([]);
    setAvailableSeats([]);
    
    toast.success("Booking confirmed! Enjoy the show!");
    return true;
  };

  const getUserBookings = () => {
    if (!currentUser) return [];
    return bookings.filter(booking => booking.userId === currentUser.id);
  };

  const cancelBooking = (bookingId: string) => {
    const bookingToCancel = bookings.find(b => b.id === bookingId);
    
    if (!bookingToCancel) {
      toast.error("Booking not found!");
      return;
    }
    
    // Update booking status
    const updatedBookings = bookings.map(b => 
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    );
    
    // Update show's available seats
    const show = shows.find(s => s.id === bookingToCancel.showId);
    if (show) {
      const updatedShow = {
        ...show,
        availableSeats: show.availableSeats + bookingToCancel.seats.length
      };
      setShows(shows.map(s => s.id === updatedShow.id ? updatedShow : s));
    }
    
    setBookings(updatedBookings);
    toast.success("Booking cancelled successfully!");
  };

  // Admin functions
  const addShow = (showData: Omit<Show, 'id'>) => {
    const newShow: Show = {
      ...showData,
      id: `show-${shows.length + 1}`
    };
    
    setShows([...shows, newShow]);
    toast.success("Show added successfully!");
  };

  const updateShow = (updatedShow: Show) => {
    setShows(shows.map(s => s.id === updatedShow.id ? updatedShow : s));
    toast.success("Show updated successfully!");
  };

  const deleteShow = (showId: string) => {
    // Check if there are any confirmed bookings for this show
    const hasConfirmedBookings = bookings.some(
      b => b.showId === showId && b.status === 'confirmed'
    );
    
    if (hasConfirmedBookings) {
      toast.error("Cannot delete a show with confirmed bookings!");
      return;
    }
    
    setShows(shows.filter(s => s.id !== showId));
    // Also remove any bookings for this show
    setBookings(bookings.filter(b => b.showId !== showId));
    toast.success("Show deleted successfully!");
  };

  const getAllBookings = () => {
    return bookings;
  };

  return (
    <BookingContext.Provider
      value={{
        shows,
        bookings,
        selectedShow,
        selectedSeats,
        availableSeats,
        selectShow,
        clearSelectedShow,
        toggleSeatSelection,
        confirmBooking,
        getUserBookings,
        cancelBooking,
        addShow,
        updateShow,
        deleteShow,
        getAllBookings
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
