import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-sm">S</span>
              </div>
              <span className="text-xl font-semibold text-foreground">Sathi</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The luxury of quiet presence. Someone to be there, when you just don't want to be alone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/companions" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Browse Companions
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Safety Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/safety" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  User Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground text-sm">
                help@sathi.in
              </li>
              <li className="text-muted-foreground text-sm">
                24/7 Safety Helpline
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 Sathi. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm mt-2 md:mt-0">
              Made with intention in India 🇮🇳
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
