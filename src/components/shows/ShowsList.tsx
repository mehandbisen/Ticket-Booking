
import React from 'react';
import ShowCard from './ShowCard';
import { Show } from '@/types';

interface ShowsListProps {
  shows: Show[];
}

const ShowsList: React.FC<ShowsListProps> = ({ shows }) => {
  if (shows.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-muted-foreground">No shows available at the moment</h3>
        <p className="mt-2">Check back later for upcoming events!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {shows.map((show) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </div>
  );
};

export default ShowsList;
