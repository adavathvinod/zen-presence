import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, MapPin } from "lucide-react";

interface CompanionCardProps {
  id: string;
  name: string;
  bio: string;
  energyType: string;
  avatarUrl: string;
  hourlyRate: number;
  city: string;
  languages: string[];
  isVerified: boolean;
  rating: number;
  totalSessions: number;
}

const energyTypeLabels: Record<string, { label: string; color: string }> = {
  silent_observant: { label: "Silent & Observant", color: "bg-slate/10 text-slate-dark border-slate/20" },
  comforting_presence: { label: "Comforting Presence", color: "bg-zen-warm text-foreground border-accent" },
  public_event_plus_one: { label: "Event Plus-One", color: "bg-primary/10 text-primary border-primary/20" },
  calm_listener: { label: "Calm Listener", color: "bg-secondary text-secondary-foreground border-border" },
  gentle_companion: { label: "Gentle Companion", color: "bg-muted text-muted-foreground border-border" },
};

const CompanionCard = ({
  id,
  name,
  bio,
  energyType,
  avatarUrl,
  hourlyRate,
  city,
  languages,
  isVerified,
  rating,
  totalSessions,
}: CompanionCardProps) => {
  const energyInfo = energyTypeLabels[energyType] || { label: energyType, color: "bg-muted text-muted-foreground" };

  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden zen-shadow hover:zen-shadow-md transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        
        {/* Verified Badge */}
        {isVerified && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-foreground">Verified</span>
          </div>
        )}

        {/* Rating */}
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-card/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
          <Star className="w-3.5 h-3.5 fill-primary text-primary" />
          <span className="text-xs font-medium text-foreground">{rating}</span>
        </div>

        {/* Name & Location Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-semibold text-primary-foreground mb-1">{name}</h3>
          <div className="flex items-center gap-1.5 text-primary-foreground/80">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-sm">{city}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Energy Type Badge */}
        <Badge variant="outline" className={`mb-3 ${energyInfo.color}`}>
          {energyInfo.label}
        </Badge>

        {/* Bio */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
          {bio}
        </p>

        {/* Languages */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {languages.map((lang) => (
            <span key={lang} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
              {lang}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-lg font-semibold text-foreground">₹{hourlyRate}</span>
            <span className="text-muted-foreground text-sm">/hour</span>
          </div>
          <Link to={`/book/${id}`}>
            <Button variant="zen" size="sm">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanionCard;
