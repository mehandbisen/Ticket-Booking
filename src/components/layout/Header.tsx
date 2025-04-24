
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { Ticket, User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="bg-primary py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <Link to="/" className="flex items-center mb-3 sm:mb-0">
          <Ticket size={28} className="text-secondary mr-2" />
          <span className="text-xl font-semibold text-primary-foreground">TicketHaven</span>
        </Link>
        
        <nav className="flex items-center space-x-2">
          <Link to="/shows">
            <Button
              variant={location.pathname === "/shows" ? "secondary" : "ghost"}
              className="text-primary-foreground"
            >
              Shows
            </Button>
          </Link>
          
          {isAuthenticated && (
            <Link to="/bookings">
              <Button
                variant={location.pathname === "/bookings" ? "secondary" : "ghost"}
                className="text-primary-foreground"
              >
                My Bookings
              </Button>
            </Link>
          )}
          
          {isAuthenticated && currentUser?.isAdmin && (
            <Link to="/admin">
              <Button
                variant={location.pathname === "/admin" ? "secondary" : "ghost"}
                className="text-primary-foreground"
              >
                Admin
              </Button>
            </Link>
          )}
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex items-center gap-2 text-primary-foreground text-sm">
                <User size={16} />
                <span>{currentUser?.name}</span>
              </div>
              <Button 
                variant="ghost" 
                className="text-primary-foreground"
                onClick={logout}
              >
                <LogOut size={16} className="mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button
                  variant={location.pathname === "/login" ? "secondary" : "ghost"}
                  className="text-primary-foreground"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant={location.pathname === "/register" ? "secondary" : "ghost"}
                  className="text-primary-foreground"
                >
                  Register
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
