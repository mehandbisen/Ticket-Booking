
import React, { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import ShowsList from '@/components/shows/ShowsList';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ShowsPage: React.FC = () => {
  const { shows } = useBooking();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date-asc');
  const [showPastEvents, setShowPastEvents] = useState(false);
  
  // Filter shows based on search and past events toggle
  const filteredShows = shows.filter(show => {
    // Search filter
    const matchesSearch = show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          show.venue.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Past events filter
    const isPast = new Date(show.date) < new Date();
    const showBasedOnPastFilter = showPastEvents ? true : !isPast;
    
    return matchesSearch && showBasedOnPastFilter;
  });
  
  // Sort shows based on selected option
  const sortedShows = [...filteredShows].sort((a, b) => {
    switch (sortOption) {
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">All Shows</h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search by show title or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-asc">Date (Earliest first)</SelectItem>
                <SelectItem value="date-desc">Date (Latest first)</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                <SelectItem value="name-asc">Name (A to Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z to A)</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant={showPastEvents ? "secondary" : "outline"} 
              className="flex gap-2 items-center"
              onClick={() => setShowPastEvents(!showPastEvents)}
            >
              <Filter size={16} />
              {showPastEvents ? "Hide Past Events" : "Show Past Events"}
            </Button>
          </div>
        </div>
      </div>
      
      {sortedShows.length > 0 ? (
        <ShowsList shows={sortedShows} />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl text-muted-foreground mb-2">No shows found</h3>
          <p>Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
};

export default ShowsPage;
