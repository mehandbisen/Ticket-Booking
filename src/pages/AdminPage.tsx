
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useBooking } from '@/context/BookingContext';
import { mockUsers } from '@/data/mockData';
import { Show } from '@/types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import ShowForm from '@/components/admin/ShowForm';
import BookingItem from '@/components/admin/BookingItem';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const { shows, bookings, addShow, updateShow, deleteShow, getAllBookings } = useBooking();
  
  const [isAddingShow, setIsAddingShow] = useState(false);
  const [editingShow, setEditingShow] = useState<Show | null>(null);
  const [showToDelete, setShowToDelete] = useState<Show | null>(null);
  
  // Redirect if not admin
  if (!isAuthenticated || !currentUser?.isAdmin) {
    navigate('/', { replace: true });
    return null;
  }
  
  const allBookings = getAllBookings();
  
  // Get user names for bookings
  const getUserName = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const handleShowSubmit = (showData: Omit<Show, 'id'> | Show) => {
    if ('id' in showData) {
      // Update existing show
      updateShow(showData);
      setEditingShow(null);
    } else {
      // Add new show
      addShow(showData);
      setIsAddingShow(false);
    }
  };

  const handleDeleteConfirmed = () => {
    if (showToDelete) {
      deleteShow(showToDelete.id);
      setShowToDelete(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="shows" className="space-y-6">
        <TabsList>
          <TabsTrigger value="shows">Manage Shows</TabsTrigger>
          <TabsTrigger value="bookings">All Bookings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="shows">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Shows</h2>
            <Dialog open={isAddingShow} onOpenChange={setIsAddingShow}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus size={16} />
                  Add New Show
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Show</DialogTitle>
                </DialogHeader>
                <ShowForm
                  onSubmit={handleShowSubmit}
                  onCancel={() => setIsAddingShow(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-4">
            {shows.map((show) => (
              <Card key={show.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 h-40">
                      <img 
                        src={show.imageUrl} 
                        alt={show.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-medium">{show.title}</h3>
                          <div className="text-muted-foreground text-sm">
                            {new Date(show.date).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {show.description}
                        </p>
                        <div className="mt-2 text-sm">
                          <span className="font-medium">${show.price.toFixed(2)}</span>
                          <span className="text-muted-foreground ml-4">
                            {show.availableSeats} / {show.totalSeats} seats available
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-2">
                        <Dialog open={editingShow?.id === show.id} onOpenChange={(open) => !open && setEditingShow(null)}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" className="gap-1" onClick={() => setEditingShow(show)}>
                              <Pencil size={15} />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Show</DialogTitle>
                            </DialogHeader>
                            {editingShow && (
                              <ShowForm
                                show={editingShow}
                                onSubmit={handleShowSubmit}
                                onCancel={() => setEditingShow(null)}
                              />
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <AlertDialog open={showToDelete?.id === show.id} onOpenChange={(open) => !open && setShowToDelete(null)}>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" className="text-destructive gap-1 hover:bg-destructive/10" onClick={() => setShowToDelete(show)}>
                              <Trash2 size={15} />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the show "{show.title}". This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDeleteConfirmed} className="bg-destructive text-destructive-foreground">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {shows.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No shows available. Add your first show!</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="bookings">
          <h2 className="text-2xl font-semibold mb-6">All Bookings</h2>
          
          <div className="space-y-4">
            {allBookings.map(booking => {
              const show = shows.find(s => s.id === booking.showId);
              const userName = getUserName(booking.userId);
              
              if (!show) return null;
              
              return (
                <BookingItem 
                  key={booking.id} 
                  booking={booking} 
                  show={show} 
                  userName={userName} 
                />
              );
            })}
            
            {allBookings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No bookings available yet.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
