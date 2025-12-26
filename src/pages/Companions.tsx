import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CompanionCard from "@/components/companion/CompanionCard";
import SEO from "@/components/seo/SEO";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Companion {
  id: string;
  name: string;
  bio: string;
  energy_type: string;
  avatar_url: string;
  hourly_rate: number;
  city: string;
  languages: string[];
  is_verified: boolean;
  rating: number;
  total_sessions: number;
}

const energyTypes = [
  { value: "all", label: "All Types" },
  { value: "silent_observant", label: "Silent & Observant" },
  { value: "comforting_presence", label: "Comforting Presence" },
  { value: "public_event_plus_one", label: "Event Plus-One" },
  { value: "calm_listener", label: "Calm Listener" },
  { value: "gentle_companion", label: "Gentle Companion" },
];

const Companions = () => {
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    const fetchCompanions = async () => {
      const { data, error } = await supabase
        .from("companions")
        .select("*")
        .eq("is_available", true)
        .order("rating", { ascending: false });

      if (!error && data) {
        setCompanions(data);
      }
      setLoading(false);
    };

    fetchCompanions();
  }, []);

  const filteredCompanions = companions.filter((companion) => {
    const matchesSearch = 
      companion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      companion.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || companion.energy_type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Browse Companions | Sathi - Find Your Perfect Presence"
        description="Browse verified professional companions in Mumbai, Delhi, Bangalore and more. Book platonic companionship for events, outings, or quiet moments."
        keywords="hire companion India, professional companion Mumbai, Delhi companion service, Bangalore companion booking"
      />
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-semibold text-foreground mb-4">
              Find Your Companion
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse our verified companions and find the perfect presence for your needs.
            </p>
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Energy Type Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <div className="flex flex-wrap gap-2">
                  {energyTypes.map((type) => (
                    <Badge
                      key={type.value}
                      variant={selectedType === type.value ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/10 transition-colors"
                      onClick={() => setSelectedType(type.value)}
                    >
                      {type.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Companions Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden animate-pulse">
                  <div className="aspect-[4/5] bg-muted" />
                  <div className="p-5 space-y-4">
                    <div className="h-6 bg-muted rounded w-1/3" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCompanions.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No companions found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {filteredCompanions.map((companion) => (
                <CompanionCard
                  key={companion.id}
                  id={companion.id}
                  name={companion.name}
                  bio={companion.bio || ""}
                  energyType={companion.energy_type}
                  avatarUrl={companion.avatar_url || ""}
                  hourlyRate={companion.hourly_rate}
                  city={companion.city}
                  languages={companion.languages || []}
                  isVerified={companion.is_verified || false}
                  rating={Number(companion.rating) || 4.5}
                  totalSessions={companion.total_sessions || 0}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Companions;
