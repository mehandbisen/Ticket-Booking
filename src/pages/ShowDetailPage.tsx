
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooking } from '@/context/BookingContext';
import { useAuth } from '@/context/AuthContext';
import ShowDetail from '@/components/shows/ShowDetail';
import SeatSelector from '@/components/bookings/SeatSelector';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ShowDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { shows, selectShow, selectedShow, clearSelectedShow, availableSeats, selectedSeats, toggleSeatSelection, confirmBooking } = useBooking();
  const { isAuthenticated } = useAuth();
  const [selectingSeats, setSelectingSeats] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const show = shows.find(s => s.id === id);
      if (show) {
        selectShow(show);
      } else {
        navigate('/shows', { replace: true });
      }
    }
    
    return () => {
      clearSelectedShow();
    };
  }, [id, shows, navigate, selectShow, clearSelectedShow]);

  const handleBookTickets = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/shows/${id}` } });
      return;
    }
    setSelectingSeats(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmBooking = () => {
    const success = confirmBooking();
    if (success) {
      navigate('/bookings');
    }
  };

  const handleCancelSeatSelection = () => {
    setSelectingSeats(false);
  };

  if (!selectedShow) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p>Loading show details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6 gap-2"
        onClick={() => navigate('/shows')}
      >
        <ArrowLeft size={18} />
        Back to Shows
      </Button>
      
      {selectingSeats ? (
        <SeatSelector 
          availableSeats={availableSeats}
          selectedSeats={selectedSeats}
          onToggleSeat={toggleSeatSelection}
          onConfirm={handleConfirmBooking}
          onCancel={handleCancelSeatSelection}
          ticketPrice={selectedShow.price}
        />
      ) : (
        <ShowDetail 
          show={selectedShow} 
          onBookTickets={handleBookTickets} 
        />
      )}
    </div>
  );
};

export default ShowDetailPage;
