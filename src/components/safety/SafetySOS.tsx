import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertTriangle, Phone, X } from 'lucide-react';
import { toast } from 'sonner';

const SafetySOS = () => {
  const [hasActiveBooking, setHasActiveBooking] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkActiveBookings = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setHasActiveBooking(false);
        return;
      }

      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'confirmed')
        .gte('booking_date', today)
        .limit(1);

      if (!error && data && data.length > 0) {
        setHasActiveBooking(true);
      } else {
        setHasActiveBooking(false);
      }
    };

    checkActiveBookings();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkActiveBookings();
    });

    // Check every minute for active bookings
    const interval = setInterval(checkActiveBookings, 60000);

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleEmergencyCall = () => {
    window.location.href = 'tel:112';
    toast.info('Calling emergency services...');
  };

  const handleReportIssue = () => {
    window.location.href = 'tel:+919999999999';
    toast.info('Calling Sathi Safety Helpline...');
  };

  if (!hasActiveBooking || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Floating SOS Button */}
      <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2">
        <button
          onClick={() => setIsVisible(false)}
          className="text-muted-foreground hover:text-foreground text-xs"
        >
          <X className="h-4 w-4" />
        </button>
        <Button
          variant="sos"
          size="lg"
          onClick={() => setIsDialogOpen(true)}
          className="rounded-full shadow-2xl animate-pulse-slow"
        >
          <AlertTriangle className="h-5 w-5 mr-2" />
          SOS
        </Button>
      </div>

      {/* SOS Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Safety SOS
            </DialogTitle>
            <DialogDescription>
              If you feel unsafe, use these options immediately. Your safety is our priority.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 pt-4">
            <Button
              variant="destructive"
              className="w-full h-14 text-lg"
              onClick={handleEmergencyCall}
            >
              <Phone className="h-5 w-5 mr-2" />
              Call 112 (Emergency)
            </Button>
            
            <Button
              variant="outline"
              className="w-full h-12 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={handleReportIssue}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Sathi Safety Helpline
            </Button>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground text-center">
                All incidents are taken seriously. Our safety team will follow up within 15 minutes of any report.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SafetySOS;
