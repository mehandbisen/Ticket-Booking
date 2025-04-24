
import React, { useState, useEffect } from 'react';
import { Show } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface ShowFormProps {
  show?: Show;
  onSubmit: (showData: Omit<Show, 'id'> | Show) => void;
  onCancel: () => void;
}

const ShowForm: React.FC<ShowFormProps> = ({ show, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Show, 'id'> | Show>({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    imageUrl: '',
    price: 0,
    availableSeats: 0,
    totalSeats: 0,
    ...(show || {})
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (show) {
      setFormData(show);
    }
  }, [show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;
    
    // Parse numeric values
    if (name === 'price' || name === 'availableSeats' || name === 'totalSeats') {
      parsedValue = value === '' ? 0 : parseFloat(value);
    }
    
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time.trim()) newErrors.time = 'Time is required';
    if (!formData.venue.trim()) newErrors.venue = 'Venue is required';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (formData.availableSeats < 0) newErrors.availableSeats = 'Available seats must be positive';
    if (formData.totalSeats <= 0) newErrors.totalSeats = 'Total seats must be greater than 0';
    if (formData.availableSeats > formData.totalSeats) {
      newErrors.availableSeats = 'Available seats cannot exceed total seats';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event Title"
          />
          {errors.title && <p className="text-destructive text-sm">{errors.title}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="venue">Venue</Label>
          <Input
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="Event Venue"
          />
          {errors.venue && <p className="text-destructive text-sm">{errors.venue}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <p className="text-destructive text-sm">{errors.date}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="7:30 PM"
          />
          {errors.time && <p className="text-destructive text-sm">{errors.time}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
          />
          {errors.price && <p className="text-destructive text-sm">{errors.price}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="availableSeats">Available Seats</Label>
          <Input
            id="availableSeats"
            name="availableSeats"
            type="number"
            min="0"
            value={formData.availableSeats}
            onChange={handleChange}
          />
          {errors.availableSeats && <p className="text-destructive text-sm">{errors.availableSeats}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="totalSeats">Total Seats</Label>
          <Input
            id="totalSeats"
            name="totalSeats"
            type="number"
            min="1"
            value={formData.totalSeats}
            onChange={handleChange}
          />
          {errors.totalSeats && <p className="text-destructive text-sm">{errors.totalSeats}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
        {errors.imageUrl && <p className="text-destructive text-sm">{errors.imageUrl}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Event Description"
        />
        {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
      </div>
      
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {show ? 'Update Show' : 'Add Show'}
        </Button>
      </div>
    </form>
  );
};

export default ShowForm;
