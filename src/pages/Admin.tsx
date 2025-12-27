import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAdmin } from '@/hooks/useAdmin';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/seo/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Users, Calendar, Shield, Phone } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

type Companion = Database['public']['Tables']['companions']['Row'];
type Booking = Database['public']['Tables']['bookings']['Row'];
type EnergyType = Database['public']['Enums']['energy_type'];
type BookingStatus = Database['public']['Enums']['booking_status'];

const energyTypes: EnergyType[] = ['silent_observant', 'comforting_presence', 'public_event_plus_one'];

const Admin = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [bookings, setBookings] = useState<(Booking & { companion_name?: string; user_email?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCompanion, setEditingCompanion] = useState<Companion | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    energy_type: 'silent_observant' as EnergyType,
    hourly_rate: 500,
    city: '',
    languages: 'Hindi, English',
    avatar_url: '',
    is_available: true,
    is_verified: true,
  });

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      toast.error('Access denied. Admin privileges required.');
      navigate('/');
    }
  }, [isAdmin, adminLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchCompanions();
      fetchBookings();
    }
  }, [isAdmin]);

  const fetchCompanions = async () => {
    const { data, error } = await supabase
      .from('companions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch companions');
    } else {
      setCompanions(data || []);
    }
    setLoading(false);
  };

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        companions:companion_id (name),
        profiles:user_id (email)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch bookings');
    } else {
      const formattedBookings = (data || []).map((booking: any) => ({
        ...booking,
        companion_name: booking.companions?.name,
        user_email: booking.profiles?.email,
      }));
      setBookings(formattedBookings);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const companionData = {
      name: formData.name,
      bio: formData.bio,
      energy_type: formData.energy_type,
      hourly_rate: formData.hourly_rate,
      city: formData.city,
      languages: formData.languages.split(',').map(l => l.trim()),
      avatar_url: formData.avatar_url || null,
      is_available: formData.is_available,
      is_verified: formData.is_verified,
    };

    if (editingCompanion) {
      const { error } = await supabase
        .from('companions')
        .update(companionData)
        .eq('id', editingCompanion.id);

      if (error) {
        toast.error('Failed to update companion');
      } else {
        toast.success('Companion updated successfully');
        fetchCompanions();
      }
    } else {
      const { error } = await supabase
        .from('companions')
        .insert([companionData]);

      if (error) {
        toast.error('Failed to add companion');
      } else {
        toast.success('Companion added successfully');
        fetchCompanions();
      }
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (companion: Companion) => {
    setEditingCompanion(companion);
    setFormData({
      name: companion.name,
      bio: companion.bio || '',
      energy_type: companion.energy_type,
      hourly_rate: companion.hourly_rate,
      city: companion.city,
      languages: companion.languages?.join(', ') || 'Hindi, English',
      avatar_url: companion.avatar_url || '',
      is_available: companion.is_available ?? true,
      is_verified: companion.is_verified ?? true,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this companion?')) return;

    const { error } = await supabase
      .from('companions')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete companion');
    } else {
      toast.success('Companion deleted successfully');
      fetchCompanions();
    }
  };

  const handleStatusChange = async (bookingId: string, status: BookingStatus) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId);

    if (error) {
      toast.error('Failed to update booking status');
    } else {
      toast.success('Booking status updated');
      fetchBookings();
    }
  };

  const resetForm = () => {
    setEditingCompanion(null);
    setFormData({
      name: '',
      bio: '',
      energy_type: 'silent_observant',
      hourly_rate: 500,
      city: '',
      languages: 'Hindi, English',
      avatar_url: '',
      is_available: true,
      is_verified: true,
    });
  };

  if (adminLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Admin Dashboard | Sāthī"
        description="Manage companions and bookings on Sāthī admin panel."
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-light text-foreground">Admin Dashboard</h1>
        </div>

        <Tabs defaultValue="companions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="companions" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Companions
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              All Bookings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="companions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-foreground">Manage Companions</h2>
              <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Companion
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingCompanion ? 'Edit Companion' : 'Add New Companion'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Bio</label>
                      <Textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Energy Type</label>
                      <Select
                        value={formData.energy_type}
                        onValueChange={(value: EnergyType) => setFormData({ ...formData, energy_type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {energyTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Hourly Rate (₹)</label>
                      <Input
                        type="number"
                        value={formData.hourly_rate}
                        onChange={(e) => setFormData({ ...formData, hourly_rate: parseInt(e.target.value) })}
                        min={100}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">City</label>
                      <Input
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Languages (comma-separated)</label>
                      <Input
                        value={formData.languages}
                        onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Avatar URL</label>
                      <Input
                        value={formData.avatar_url}
                        onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.is_available}
                          onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                        />
                        Available
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.is_verified}
                          onChange={(e) => setFormData({ ...formData, is_verified: e.target.checked })}
                        />
                        Verified
                      </label>
                    </div>
                    <Button type="submit" className="w-full">
                      {editingCompanion ? 'Update Companion' : 'Add Companion'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {companions.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    No companions found. Add your first companion to get started.
                  </CardContent>
                </Card>
              ) : (
                companions.map((companion) => (
                  <Card key={companion.id}>
                    <CardContent className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                          {companion.avatar_url ? (
                            <img src={companion.avatar_url} alt={companion.name} className="w-full h-full object-cover" />
                          ) : (
                            <Users className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{companion.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{companion.city}</span>
                            <span>•</span>
                            <span>₹{companion.hourly_rate}/hr</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={companion.is_available ? 'default' : 'secondary'}>
                          {companion.is_available ? 'Available' : 'Unavailable'}
                        </Badge>
                        <Button variant="outline" size="icon" onClick={() => handleEdit(companion)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(companion.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <h2 className="text-xl font-medium text-foreground">All Bookings</h2>
            
            <div className="grid gap-4">
              {bookings.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    No bookings found.
                  </CardContent>
                </Card>
              ) : (
                bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="py-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{booking.companion_name || 'Unknown Companion'}</h3>
                            <Badge variant={
                              booking.status === 'confirmed' ? 'default' :
                              booking.status === 'completed' ? 'secondary' :
                              booking.status === 'cancelled' ? 'destructive' : 'outline'
                            }>
                              {booking.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Client: {booking.user_email || 'Unknown'} {(booking as any).phone && `• ${(booking as any).phone}`}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {booking.booking_date} at {booking.start_time} • {booking.duration_hours} hours
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Venue: {booking.venue_name}, {booking.venue_address}
                          </p>
                          <p className="text-sm font-medium">
                            Amount: ₹{booking.total_amount}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Select
                            value={booking.status || 'pending'}
                            onValueChange={(value: BookingStatus) => handleStatusChange(booking.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
