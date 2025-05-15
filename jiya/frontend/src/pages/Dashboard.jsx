import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Pencil, Trash2, X, Calendar, MapPin, Image, Clock, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/events`

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [imagePreview, setImagePreview] = useState('');

  

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image: null
  });
  
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/`, { withCredentials: true });
      setEvents(Array.isArray(response.data)?response.data:[]);
      
      setError(null);
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Error fetching events:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormData({
        ...formData,
        image: file
      });
      
      // Create a preview URL
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      location: '',
      image: null
    });
    setSelectedFile(null);
    setImagePreview('');
  };

  const openCreateDialog = () => {
    resetForm();
    setShowCreateDialog(true);
  };

  const openEditDialog = (event) => {
    // Format the date for the input field (YYYY-MM-DD)
    const formattedDate = event.date ? new Date(event.date).toISOString().split('T')[0] : '';
    
    setFormData({
      title: event.title || '',
      description: event.description || '',
      date: formattedDate,
      location: event.location || '',
      image: null // We can't retrieve the actual file object
    });
    
    // If there's an image, set the preview from the server path
    if (event.image) {
      setImagePreview(event.image.startsWith('http') ? event.image : `/uploads/${event.image}`);
    } else {
      setImagePreview('');
    }
    
    setSelectedFile(null);
    setCurrentEvent(event);
    setShowEditDialog(true);
  };

  const openDeleteDialog = (event) => {
    setCurrentEvent(event);
    setShowDeleteDialog(true);
  };

  const handleCreateEvent = async () => {
    try {
      let imageUrl = null;
      
      // First, handle image upload if a file is selected
      if (selectedFile) {
        const imageFormData = new FormData();
        imageFormData.append('image', selectedFile);
        
        // Make a separate request to upload the image
        const imageUploadResponse = await axios.post(
          `${API_BASE_URL}/upload-event-image`, 
          imageFormData, 
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        
        // Get the image URL from the response
        imageUrl = imageUploadResponse.data.imageUrl;
        console.log(imageUrl)
      }
      
      // Then create the event with the image URL
      const eventData = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        location: formData.location,
        image: imageUrl // Include the image URL from the previous request
      };
      
      const response = await axios.post(
        `${API_BASE_URL}/create`, 
        eventData, 
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      setEvents([...events, response.data]);
      showNotification('Event created successfully', 'success');
      setShowCreateDialog(false);
      resetForm();
    } catch (err) {
      showNotification('Failed to create event', 'error');
      console.error('Error creating event:', err);
    }
  };

  const handleUpdateEvent = async () => {
    try {
      let imageUrl = null;
      
      // First, handle image upload if a file is selected
      if (selectedFile) {
        const imageFormData = new FormData();
        imageFormData.append('image', selectedFile);
        // imageFormData.append('eventId', currentEvent._id); // Include event ID for reference
        
        // Make a separate request to upload the image
        const imageUploadResponse = await axios.post(
          `${API_BASE_URL}/upload-event-image`, 
          imageFormData, 
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        
        // Get the image URL from the response
        imageUrl = imageUploadResponse.data.imageUrl;
      }
      
      // Then update the event details
      const eventData = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        location: formData.location
      };
      
      // Include the image URL if it was updated
      if (imageUrl) {
        eventData.imageUrl = imageUrl;
      }
      
      const response = await axios.put(
        `${API_BASE_URL}/edit/${currentEvent._id}`, 
        eventData, 
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json' // Changed to application/json
          }
        }
      );
      
      const updatedEvents = events.map(event => 
        event._id === currentEvent._id ? response.data : event
      );
      
      setEvents(updatedEvents);
      showNotification('Event updated successfully', 'success');
      setShowEditDialog(false);
      resetForm();
    } catch (err) {
      showNotification('Failed to update event', 'error');
      console.error('Error updating event:', err);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${currentEvent._id}`, { withCredentials: true });
      const filteredEvents = events.filter(event => event._id !== currentEvent._id);
      setEvents(filteredEvents);
      showNotification('Event deleted successfully', 'success');
      setShowDeleteDialog(false);
    } catch (err) {
      showNotification('Failed to delete event', 'error');
      console.error('Error deleting event:', err);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get image URL with fallback
  const getImageUrl = (event) => {
    if (!event.image && !event.imageUrl) return '/api/placeholder/400/300';
    return event.imageUrl || (event.image && event.image.startsWith('http') ? event.image : `/uploads/${event.image}`);
  };

  // Check if event date is in the future
  const isUpcoming = (dateString) => {
    if (!dateString) return false;
    const eventDate = new Date(dateString);
    const today = new Date();
    return eventDate >= today;
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Events Dashboard</CardTitle>
            <CardDescription>Manage your upcoming and past events</CardDescription>
          </div>
          <Button onClick={openCreateDialog} className="flex items-center gap-2">
            <PlusCircle size={16} />
            <span>Add Event</span>
          </Button>
        </CardHeader>
        <CardContent>
          {notification.show && (
            <Alert className={`mb-4 ${notification.type === 'error' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
              <AlertTitle>{notification.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
              <AlertDescription>{notification.message}</AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-middle"></div>
              <p className="mt-4 text-gray-600">Loading events...</p>
            </div>
          ) : error ? (
            <Alert className="bg-red-50 border-red-200">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : events.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <Info size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">No events found</h3>
              <p className="mt-1 text-gray-500">Get started by creating your first event.</p>
              <Button onClick={openCreateDialog} className="mt-6 flex items-center gap-2 mx-auto">
                <PlusCircle size={16} />
                <span>Create New Event</span>
              </Button>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Upcoming Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events
                    .filter(event => isUpcoming(event.date))
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((event) => (
                      <Card key={event._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                          <img 
                            src={getImageUrl(event)} 
                            alt={event.title}
                            className="h-full w-full object-cover transition-transform hover:scale-105"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/api/placeholder/400/300";
                            }}
                          />
                          <Badge className="absolute top-2 right-2 bg-green-500">Upcoming</Badge>
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-xl font-bold line-clamp-1">{event.title}</CardTitle>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar size={14} className="mr-1" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <MapPin size={14} className="mr-1" />
                              <span className="line-clamp-1">{event.location}</span>
                            </div>
                          )}
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 line-clamp-2">
                            {event.description || 'No description available'}
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex items-center" onClick={() => openEditDialog(event)}>
                            <Pencil size={14} className="mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center text-red-600 hover:bg-red-50" onClick={() => openDeleteDialog(event)}>
                            <Trash2 size={14} className="mr-1" />
                            Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
                {events.filter(event => isUpcoming(event.date)).length === 0 && (
                  <p className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">No upcoming events found</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Past Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events
                    .filter(event => !isUpcoming(event.date))
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((event) => (
                      <Card key={event._id} className="overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                          <img 
                            src={getImageUrl(event)} 
                            alt={event.title}
                            className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/api/placeholder/400/300";
                            }}
                          />
                          <Badge className="absolute top-2 right-2 bg-gray-500">Past</Badge>
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-xl font-bold line-clamp-1">{event.title}</CardTitle>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar size={14} className="mr-1" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <MapPin size={14} className="mr-1" />
                              <span className="line-clamp-1">{event.location}</span>
                            </div>
                          )}
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 line-clamp-2">
                            {event.description || 'No description available'}
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex items-center" onClick={() => openEditDialog(event)}>
                            <Pencil size={14} className="mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center text-red-600 hover:bg-red-50" onClick={() => openDeleteDialog(event)}>
                            <Trash2 size={14} className="mr-1" />
                            Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
                {events.filter(event => !isUpcoming(event.date)).length === 0 && (
                  <p className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">No past events found</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Event Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-md max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>Add a new event to your calendar</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title*</Label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange}
                placeholder="Event title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Event description"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date*</Label>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-gray-500" />
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2 text-gray-500" />
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Event location"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Event Image</Label>
              <div className="flex items-center">
                <Image size={16} className="mr-2 text-gray-500" />
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Upload an image for the event (PNG, JPG, JPEG, WebP)</p>
            </div>
            {imagePreview && (
              <div className="mt-2">
                <Label className="mb-2 block">Image Preview</Label>
                <div className="relative h-40 w-full overflow-hidden rounded-md border">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/api/placeholder/400/300";
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateEvent} disabled={!formData.title || !formData.date}>Create Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>Update event details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title*</Label>
              <Input 
                id="edit-title" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange}
                placeholder="Event title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Event description"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-date">Date*</Label>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-gray-500" />
                <Input
                  id="edit-date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-location">Location</Label>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2 text-gray-500" />
                <Input
                  id="edit-location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Event location"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-image">Event Image</Label>
              <div className="flex items-center">
                <Image size={16} className="mr-2 text-gray-500" />
                <Input
                  id="edit-image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Upload a new image or keep the existing one</p>
            </div>
            {imagePreview && (
              <div className="mt-2">
                <Label className="mb-2 block">Image Preview</Label>
                <div className="relative h-40 w-full overflow-hidden rounded-md border">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/api/placeholder/400/300";
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateEvent} disabled={!formData.title || !formData.date}>Update Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Event Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentEvent?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteEvent}>Delete Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}