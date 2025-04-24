
import React from 'react';
import { Booking, Show } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Clock, Ticket, X } from 'lucide-react';

interface BookingCardProps {
  booking: Booking;
  show: Show;
  onCancelBooking: (bookingId: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, show, onCancelBooking }) => {
  const showDate = new Date(show.date);
  const isPast = showDate < new Date();
  const bookingDate = new Date(booking.bookingDate).toLocaleDateString();
  const isCancelled = booking.status === 'cancelled';

  return (
    <Card className={cn(
      "ticket-stub border-dashed overflow-hidden", 
      isCancelled && "opacity-70"
    )}>
      {isCancelled && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-background/50">
          <div className="transform rotate-12 border-4 border-red-500 px-4 py-1 rounded-md">
            <span className="text-2xl font-bold text-red-500">CANCELLED</span>
          </div>
        </div>
      )}
      
      <CardHeader className="relative pb-2">
        <div className="absolute top-4 right-4 text-xs font-medium px-2 py-1 rounded bg-secondary/20 text-secondary-foreground">
          Booked on {bookingDate}
        </div>
        <CardTitle className="text-xl">{show.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <CalendarDays size={14} />
              <span>{showDate.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <Clock size={14} />
              <span>{show.time}</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <MapPin size={14} />
              <span>{show.venue}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <Ticket size={14} />
              <span>
                {booking.seats.map(seat => `${seat.row}${seat.number}`).join(', ')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center border-t border-border pt-3">
          <div>
            <div className="text-xs text-muted-foreground">Total Paid</div>
            <div className="font-bold">${booking.totalPrice.toFixed(2)}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Booking ID</div>
            <div className="text-sm font-mono">{booking.id}</div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        {!isPast && !isCancelled && (
          <Button 
            variant="destructive" 
            className="w-full gap-1" 
            onClick={() => onCancelBooking(booking.id)}
          >
            <X size={16} />
            Cancel Booking
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

// Helper for conditional class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default BookingCard;
