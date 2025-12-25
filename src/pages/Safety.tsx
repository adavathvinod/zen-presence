import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, Clock, MapPin, AlertTriangle, CheckCircle, Ban, CreditCard, Phone } from "lucide-react";

const Safety = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-6">
                Safety & Trust Center
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Your safety is our highest priority. Learn about our protocols, guidelines, 
                and the measures we take to ensure every interaction is secure and respectful.
              </p>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-8 bg-zen-warm border-y border-border">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-3 text-foreground">
              <AlertTriangle className="w-5 h-5 text-primary" />
              <p className="font-medium">
                This is NOT a dating or labor service. Our companions provide presence only.
              </p>
            </div>
          </div>
        </section>

        {/* Scope of Service */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-semibold text-foreground mb-8">
                1. The Scope of Service
              </h2>
              
              <div className="bg-card rounded-2xl border border-border p-8 mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  The "Presence Only" Rule
                </h3>
                <p className="text-muted-foreground mb-6">
                  The service provided is strictly for platonic companionship and silent presence. 
                  Our companions (Sathis) are hired to accompany you to public spaces or events.
                </p>
                
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Ban className="w-5 h-5 text-destructive" />
                  They are NOT permitted to:
                </h4>
                <ul className="space-y-3">
                  {[
                    "Perform any manual labor, cleaning, or household chores",
                    "Provide professional therapy, legal advice, or medical counseling",
                    "Engage in any form of physical intimacy or romantic behavior",
                    "Lend or borrow money",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Expense Policy */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-semibold text-foreground mb-8 flex items-center gap-3">
                <CreditCard className="w-8 h-8 text-primary" />
                2. Expense Policy
              </h2>
              
              <p className="text-muted-foreground mb-6">
                The booking fee covers the companion's time only. The Client is responsible for:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background rounded-xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Travel</h3>
                  <p className="text-muted-foreground">
                    All transportation costs for the companion to and from the meeting point.
                  </p>
                </div>
                <div className="bg-background rounded-xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Meals & Entry</h3>
                  <p className="text-muted-foreground">
                    All food, beverage, and entry tickets (movies, museums, etc.) incurred during the session.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety & Conduct */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-semibold text-foreground mb-8 flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                3. Safety & Conduct
              </h2>
              
              <p className="text-muted-foreground mb-8">
                To ensure a safe environment for both parties:
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Public Spaces Only</h3>
                    <p className="text-muted-foreground">
                      All sessions must take place in public or semi-public locations (cafes, malls, parks, 
                      offices, events). Sessions in private residences are strictly prohibited.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Zero Tolerance</h3>
                    <p className="text-muted-foreground">
                      Any form of harassment, verbal abuse, or solicitation of illegal acts will result 
                      in an immediate termination of the session without a refund and a permanent ban.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Identity Verification</h3>
                    <p className="text-muted-foreground">
                      Both the Client and the Companion must have a verified Government ID (Aadhaar/PAN) 
                      linked to their profile before a booking can be confirmed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cancellation & Refunds */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-semibold text-foreground mb-8 flex items-center gap-3">
                <Clock className="w-8 h-8 text-primary" />
                4. Cancellation & Refunds
              </h2>
              
              <div className="space-y-4">
                {[
                  { time: "> 24 hours", policy: "Full refund" },
                  { time: "12-24 hours", policy: "50% 'Time Reservation' fee" },
                  { time: "< 12 hours", policy: "No refund" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                    <span className="text-muted-foreground">Cancellation {item.time} in advance</span>
                    <span className="font-medium text-foreground">{item.policy}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-zen-warm rounded-xl border border-accent">
                <p className="text-foreground">
                  <strong>Companion Safety:</strong> If a Companion feels unsafe at any point, they have 
                  the right to leave immediately, and the situation will be reviewed by our Safety Team.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-semibold text-primary-foreground mb-4">
                24/7 Safety Helpline
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                If you ever feel unsafe during a session, use the SOS button in your app 
                or contact our emergency helpline immediately.
              </p>
              <p className="text-2xl font-semibold text-primary-foreground">
                help@sathi.in
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Safety;
