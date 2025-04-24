
import React from 'react';
import { Seat } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SeatSelectorProps {
  availableSeats: Seat[];
  selectedSeats: Seat[];
  onToggleSeat: (seat: Seat) => void;
  onConfirm: () => void;
  onCancel: () => void;
  ticketPrice: number;
}

const SeatSelector: React.FC<SeatSelectorProps> = ({
  availableSeats,
  selectedSeats,
  onToggleSeat,
  onConfirm,
  onCancel,
  ticketPrice
}) => {
  // Group seats by row
  const seatsByRow: Record<string, Seat[]> = availableSeats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  // Sort rows
  const rows = Object.keys(seatsByRow).sort();

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-1">Select Your Seats</h2>
        <p className="text-sm text-muted-foreground">
          Click on the seats you want to book
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="w-full max-w-3xl">
          <div className="h-10 bg-muted/30 rounded-t-xl flex items-center justify-center text-sm mb-6">
            SCREEN
          </div>

          <div className="space-y-4">
            {rows.map((row) => (
              <div key={row} className="flex items-center">
                <div className="w-7 text-center font-medium">{row}</div>
                <div className="flex flex-wrap justify-center">
                  {seatsByRow[row].map((seat) => (
                    <button
                      key={seat.id}
                      className={cn(
                        'seat',
                        seat.status === 'available' && 'seat-available',
                        seat.status === 'selected' && 'seat-selected',
                        seat.status === 'booked' && 'seat-booked'
                      )}
                      onClick={() => onToggleSeat(seat)}
                      disabled={seat.status === 'booked'}
                      aria-label={`Seat ${seat.row}${seat.number}`}
                    >
                      {seat.number}
                    </button>
                  ))}
                </div>
                <div className="w-7"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-muted/20 p-4 rounded-lg">
        <div className="flex justify-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="seat-available w-5 h-5"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="seat-selected w-5 h-5"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="seat-booked w-5 h-5"></div>
            <span className="text-sm">Booked</span>
          </div>
        </div>

        <div className="border-t border-b border-border py-4 my-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-muted-foreground">Selected Seats: </span>
              <span className="font-medium">
                {selectedSeats.length > 0
                  ? selectedSeats.map(s => `${s.row}${s.number}`).join(', ')
                  : 'None'}
              </span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Total: </span>
              <span className="font-bold text-lg">
                ${(selectedSeats.length * ticketPrice).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button 
            onClick={onConfirm} 
            disabled={selectedSeats.length === 0}
            className="gap-1"
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;
