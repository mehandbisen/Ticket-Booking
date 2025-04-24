
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/context/BookingContext';
import { Ticket } from 'lucide-react';
import ShowsList from '@/components/shows/ShowsList';

const HomePage: React.FC = () => {
  const { shows } = useBooking();
  
  // Get upcoming shows (limit to 3)
  const upcomingShows = shows
    .filter(show => new Date(show.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1564217128561-31a35ca87214?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Theater background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Your Gateway to Unforgettable Experiences
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Discover and book tickets to the best shows, concerts, and events with TicketHaven.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shows">
                <Button size="lg" className="gap-2">
                  <Ticket size={18} />
                  Browse Shows
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Shows Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Shows</h2>
          <Link to="/shows">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        
        {upcomingShows.length > 0 ? (
          <ShowsList shows={upcomingShows} />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl text-muted-foreground">No upcoming shows available</h3>
          </div>
        )}
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Browse Shows</h3>
              <p className="text-muted-foreground">
                Explore our collection of events and find the perfect show for you.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Select Seats</h3>
              <p className="text-muted-foreground">
                Choose your preferred seats from our interactive seating chart.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Enjoy the Show</h3>
              <p className="text-muted-foreground">
                Receive your e-ticket and get ready for an amazing experience!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="bg-card shadow-lg rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to explore more?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join TicketHaven today and get access to exclusive offers, early ticket releases, and more!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="gap-2">
                Create an Account
              </Button>
            </Link>
            <Link to="/shows">
              <Button size="lg" variant="outline">
                View All Shows
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
