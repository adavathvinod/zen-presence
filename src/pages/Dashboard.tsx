import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, MapPin, User } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/auth");
        return;
      }
      setUser(session.user);

      const { data } = await supabase
        .from("bookings")
        .select("*, companions(*)")
        .eq("user_id", session.user.id)
        .order("booking_date", { ascending: false });

      if (data) setBookings(data);
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    completed: "bg-muted text-muted-foreground",
    cancelled: "bg-red-100 text-red-800",
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p>Loading...</p></div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-foreground mb-2">My Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user?.email}</p>
              </div>
              <Button onClick={() => navigate("/companions")}>Book New Session</Button>
            </div>

            <h2 className="text-xl font-semibold text-foreground mb-4">Your Bookings</h2>
            {bookings.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No bookings yet</p>
                <Button onClick={() => navigate("/companions")}>Find a Companion</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-card rounded-xl border border-border p-6 flex flex-col md:flex-row gap-6">
                    <img src={booking.companions?.avatar_url} alt="" className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">{booking.companions?.name}</h3>
                        <Badge className={statusColors[booking.status]}>{booking.status}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{booking.booking_date}</div>
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{booking.start_time} ({booking.duration_hours}h)</div>
                        <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{booking.venue_name}</div>
                        <div className="font-medium text-foreground">₹{booking.total_amount}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
