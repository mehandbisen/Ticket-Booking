
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Show } from '@/types';
import { CalendarDays, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

interface ShowCardProps {
  show: Show;
}

const ShowCard: React.FC<ShowCardProps> = ({ show }) => {
  const navigate = useNavigate();
  const showDate = new Date(show.date);
  const timeFromNow = formatDistanceToNow(showDate, { addSuffix: true });
  const isUpcoming = showDate > new Date();

  const handleBookNow = () => {
    navigate(`/shows/${show.id}`);
  };

  return (
    <Card className="ticket-card overflow-hidden group">
      <div className="relative overflow-hidden aspect-[3/2]">
        <img 
          src={show.imageUrl} 
          alt={show.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/70"></div>
        <div className="absolute bottom-0 left-0 w-full p-4 text-white">
          <h3 className="font-semibold text-lg truncate">{show.title}</h3>
          <div className="flex items-center text-xs space-x-2 text-white/80">
            <CalendarDays size={14} />
            <span>{new Date(show.date).toLocaleDateString()} at {show.time}</span>
          </div>
        </div>
        {!isUpcoming && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Past Event
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{show.venue}</span>
          </div>
          <div className="text-sm">
            <span className={`${timeFromNow.includes('ago') ? 'text-muted-foreground' : 'text-emerald-600'}`}>
              {timeFromNow}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold">${show.price.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">
              {show.availableSeats} seats left
            </div>
          </div>
          <Button 
            onClick={handleBookNow} 
            className="gap-2"
            disabled={!isUpcoming || show.availableSeats === 0}
          >
            <Ticket size={16} />
            {show.availableSeats > 0 ? 'Book Now' : 'Sold Out'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShowCard;
