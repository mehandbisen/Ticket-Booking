
import React from 'react';
import { Show } from '@/types';
import { CalendarDays, MapPin, Clock, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShowDetailProps {
  show: Show;
  onBookTickets: () => void;
}

const ShowDetail: React.FC<ShowDetailProps> = ({ show, onBookTickets }) => {
  const showDate = new Date(show.date);
  const isUpcoming = showDate > new Date();

  return (
    <div className="space-y-6">
      <div className="relative rounded-lg overflow-hidden h-64 md:h-80 lg:h-96">
        <img 
          src={show.imageUrl} 
          alt={show.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">{show.title}</h1>
          <div className="mt-2 flex flex-wrap gap-4">
            <div className="flex items-center text-white/80 gap-1">
              <CalendarDays size={18} />
              <span>{showDate.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-white/80 gap-1">
              <Clock size={18} />
              <span>{show.time}</span>
            </div>
            <div className="flex items-center text-white/80 gap-1">
              <MapPin size={18} />
              <span>{show.venue}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="ticket-stub p-6 bg-background">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium mb-1">Ticket Information</h3>
            <div className="text-sm text-muted-foreground">
              <p>Price per ticket: <span className="font-semibold text-foreground">${show.price.toFixed(2)}</span></p>
              <p>Available seats: <span className="font-semibold text-foreground">{show.availableSeats} / {show.totalSeats}</span></p>
            </div>
          </div>
          <Button 
            onClick={onBookTickets} 
            className="gap-2"
            size="lg"
            disabled={!isUpcoming || show.availableSeats === 0}
          >
            <Ticket size={18} />
            {show.availableSeats > 0 ? 'Select Seats' : 'Sold Out'}
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-medium mb-3">About the Show</h3>
        <p className="text-muted-foreground">
          {show.description}
        </p>
      </div>
    </div>
  );
};

export default ShowDetail;
