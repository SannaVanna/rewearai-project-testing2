import { Sparkles, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-background rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-foreground" />
              </div>
              <span className="font-display text-2xl font-semibold text-background">Rewear AI</span>
            </div>
            <p className="text-background/60 max-w-sm leading-relaxed">
              Your AI-powered fashion assistant. Rewear what you love, style with intention, and embrace sustainable fashion.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-background mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Features</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">How It Works</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-background mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">About</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Privacy</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/40 text-sm">
            © 2024 Rewear AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-background/40 hover:text-background transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-background/40 hover:text-background transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
