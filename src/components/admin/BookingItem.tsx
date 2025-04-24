
import React from 'react';
import { Booking, Show } from '@/types';
import { CalendarDays, Ticket, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingItemProps {
  booking: Booking;
  show: Show;
  userName: string;
}

const BookingItem: React.FC<BookingItemProps> = ({ booking, show, userName }) => {
  const isCancelled = booking.status === 'cancelled';
  return (
    <div className={cn(
      "rounded-lg border p-4 flex flex-col md:flex-row md:items-center justify-between gap-4",
      isCancelled ? "border-muted bg-muted/20" : "border-border"
    )}>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <h3 className="font-medium text-lg">{show.title}</h3>
          <div className="text-sm font-medium">
            <span className={cn(
              "px-2 py-1 rounded-full",
              isCancelled 
                ? "bg-red-100 text-red-800" 
                : "bg-green-100 text-green-800"
            )}>
              {isCancelled ? 'Cancelled' : 'Confirmed'}
            </span>
          </div>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays size={14} />
            <span>{new Date(show.date).toLocaleDateString()} - {show.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <Ticket size={14} />
            <span>{booking.seats.map(seat => `${seat.row}${seat.number}`).join(', ')}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{userName}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Total</div>
          <div className="font-bold">${booking.totalPrice.toFixed(2)}</div>
        </div>
        
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Booking ID</div>
          <div className="text-sm font-mono">{booking.id}</div>
        </div>
      </div>
    </div>
  );
};

export default BookingItem;
