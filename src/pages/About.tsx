import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Volume2, Shield, Hand, Heart, Users, Compass } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary text-sm font-medium tracking-wide uppercase mb-4">
                About Sathi
              </p>
              <h1 className="text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-6">
                The Art of Being Present
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In an era of hyper-connectivity, we have forgotten the simple value of presence. 
                We are constantly pressured to talk, to perform, and to be "productive."
              </p>
            </div>
          </div>
        </section>

        {/* Why We Exist */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-semibold text-foreground mb-6">Why We Exist</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Sathi was founded on a radical yet simple idea: That sometimes, the most valuable 
                    thing another human can offer is simply <strong>being there</strong>.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We provide professional, non-judgmental companionship for those moments when you 
                    don't need a talker, a worker, or a fixer—you just don't want to be alone.
                  </p>
                </div>
                <div className="bg-primary/5 rounded-2xl p-8">
                  <blockquote className="text-xl text-foreground italic leading-relaxed">
                    "In a world that never stops talking, we provide the comfort of someone who 
                    just listens and exists beside you."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is Professional Presence */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-semibold text-foreground mb-4">
                What is a "Professional Presence"?
              </h2>
              <p className="text-lg text-muted-foreground">
                Our companions are not here to provide services in the traditional sense. 
                They are here to anchor your experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Heart,
                  title: "Zero Pressure",
                  description: "No need to keep a conversation going. Silence is welcomed and respected.",
                },
                {
                  icon: Users,
                  title: "Zero Judgment",
                  description: "Our companions exist alongside you, not to critique your life choices.",
                },
                {
                  icon: Compass,
                  title: "Zero Labor",
                  description: "We don't do chores. We don't give advice. We just provide presence.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-card border border-border text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why India Needs This */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-semibold text-foreground mb-8 text-center">
                Why India Needs This
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                From the bustling streets of Mumbai to the tech hubs of Bangalore, 
                urban isolation is real. We understand that:
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Life is intimidating alone",
                    description: "Visiting a hospital, a government office, or a new cafe can feel lonely and overwhelming.",
                  },
                  {
                    title: "Social expectations are heavy",
                    description: "Sometimes you need a 'plus-one' who has no expectations of you whatsoever.",
                  },
                  {
                    title: "Peace is a luxury",
                    description: "Having someone stay with you while you read, work, or think provides unique security.",
                  },
                ].map((item, index) => (
                  <div key={index} className="p-6 rounded-xl bg-background border border-border">
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* The Guidelines */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-semibold text-foreground mb-4">The Guidelines</h2>
              <p className="text-muted-foreground">Our core principles that guide every interaction.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-8 rounded-2xl border border-border hover:zen-shadow-md transition-all duration-300 text-center group">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors">
                  <Volume2 className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Silence</h3>
                <p className="text-muted-foreground">Conversation is optional.</p>
              </div>

              <div className="p-8 rounded-2xl border border-border hover:zen-shadow-md transition-all duration-300 text-center group">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors">
                  <Shield className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Shield</h3>
                <p className="text-muted-foreground">Verified & Secure.</p>
              </div>

              <div className="p-8 rounded-2xl border border-border hover:zen-shadow-md transition-all duration-300 text-center group">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors">
                  <Hand className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">No-Work</h3>
                <p className="text-muted-foreground">Presence over Performance.</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link to="/companions">
                <Button variant="hero" size="xl">
                  Book a Companion
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Our Promise */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-semibold text-primary-foreground mb-6">Our Promise</h2>
              <p className="text-lg text-primary-foreground/90 leading-relaxed">
                Your safety and peace of mind are our highest priorities. Every companion on our 
                platform undergoes a rigorous identity verification process. We facilitate connections 
                that are strictly professional, platonic, and rooted in mutual respect.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
