
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '@/context/BookingContext';
import { useAuth } from '@/context/AuthContext';
import BookingCard from '@/components/bookings/BookingCard';
import { Button } from '@/components/ui/button';

const BookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { getUserBookings, cancelBooking, shows } = useBooking();
  const { isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate('/login', { state: { from: '/bookings' } });
    return null;
  }
  
  const userBookings = getUserBookings();
  
  // Find show details for each booking
  const bookingsWithShows = userBookings.map(booking => {
    const show = shows.find(s => s.id === booking.showId);
    return { booking, show };
  });
  
  // Sort bookings by date (most recent first)
  const sortedBookings = [...bookingsWithShows].sort((a, b) => {
    if (!a.show || !b.show) return 0;
    return new Date(b.show.date).getTime() - new Date(a.show.date).getTime();
  });
  
  // Get upcoming bookings
  const upcomingBookings = sortedBookings.filter(
    item => item.show && new Date(item.show.date) >= new Date() && item.booking.status === 'confirmed'
  );
  
  // Get past bookings
  const pastBookings = sortedBookings.filter(
    item => item.show && (new Date(item.show.date) < new Date() || item.booking.status === 'cancelled')
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      
      {sortedBookings.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl text-muted-foreground mb-4">You don't have any bookings yet</h3>
          <Button onClick={() => navigate('/shows')}>Browse Shows</Button>
        </div>
      ) : (
        <>
          {upcomingBookings.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Upcoming Bookings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingBookings.map(({ booking, show }) => (
                  show && <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    show={show} 
                    onCancelBooking={cancelBooking} 
                  />
                ))}
              </div>
            </div>
          )}
          
          {pastBookings.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Past & Cancelled Bookings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastBookings.map(({ booking, show }) => (
                  show && <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    show={show} 
                    onCancelBooking={cancelBooking} 
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookingsPage;
