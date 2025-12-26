import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/seo/SEO";
import { ArrowRight, Shield, Volume2, Hand, Users, MapPin, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-slate-light/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-4 animate-fade-in">
              The Art of Being Present
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              The Luxury of{" "}
              <span className="text-primary">Quiet Presence</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Someone to be there, when you just don't want to be alone. 
              No conversation required. No expectations. Just presence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/companions">
                <Button variant="hero" size="xl" className="gap-2">
                  Find Your Sathi
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="zen" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Why Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              In a world that never stops talking
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We provide the comfort of someone who just listens and exists beside you. 
              No pressure to perform. No need to explain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Volume2,
                title: "Silence is Welcomed",
                description: "Conversation is optional. Enjoy peaceful moments without the pressure to fill the silence.",
              },
              {
                icon: Shield,
                title: "Verified & Secure",
                description: "Every companion undergoes thorough identity verification. Your safety is paramount.",
              },
              {
                icon: Hand,
                title: "Presence Over Performance",
                description: "No chores, no advice, no labor. Just the simple gift of human presence.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-background border border-border hover:border-primary/20 hover:zen-shadow-md transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              When Presence Makes a Difference
            </h2>
            <p className="text-lg text-muted-foreground">
              Life is intimidating alone. Sometimes you just need someone by your side.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Users, title: "Social Events", desc: "Attending a wedding or party alone? Bring a plus-one who has no expectations of you." },
              { icon: MapPin, title: "New Experiences", desc: "Trying a new café or restaurant? Make the first visit less daunting with company." },
              { icon: Clock, title: "Difficult Days", desc: "Facing a hospital visit or government office? Have someone quietly support you." },
              { icon: Shield, title: "Safe Exploration", desc: "Walking in a new neighborhood? Feel secure with a companion by your side." },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border hover:zen-shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <item.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-primary-foreground mb-4">
              Ready to Experience Presence?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Browse our verified companions and book your first session today.
            </p>
            <Link to="/companions">
              <Button 
                variant="secondary" 
                size="xl"
                className="bg-background text-foreground hover:bg-background/90"
              >
                Browse Companions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
