
import React from 'react';
import { Ticket } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary py-8 text-primary-foreground mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Ticket size={24} className="text-secondary mr-2" />
              <h3 className="text-lg font-semibold">TicketHaven</h3>
            </div>
            <p className="text-sm opacity-80">
              Your one-stop destination for booking tickets to the best shows and events.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="/shows" className="hover:text-secondary">All Shows</a></li>
              <li><a href="/bookings" className="hover:text-secondary">My Bookings</a></li>
              <li><a href="/register" className="hover:text-secondary">Create Account</a></li>
              <li><a href="/login" className="hover:text-secondary">Login</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Email: info@tickethaven.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Venue St, Eventville</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-80 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} TicketHaven. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-sm opacity-80 hover:text-secondary">Privacy Policy</a>
            <a href="#" className="text-sm opacity-80 hover:text-secondary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
