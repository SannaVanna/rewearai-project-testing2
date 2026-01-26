import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onGetStarted: () => void;
}

const Header = ({ onGetStarted }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-background" />
          </div>
          <span className="font-display text-2xl font-semibold text-foreground">Luvia AI</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#sustainability" className="text-muted-foreground hover:text-foreground transition-colors">Sustainability</a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" onClick={onGetStarted}>Log In</Button>
          <Button variant="default" onClick={onGetStarted}>Get Started</Button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <nav className="container py-4 flex flex-col gap-4">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors py-2">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors py-2">How It Works</a>
            <a href="#sustainability" className="text-muted-foreground hover:text-foreground transition-colors py-2">Sustainability</a>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="ghost" onClick={onGetStarted}>Log In</Button>
              <Button variant="default" onClick={onGetStarted}>Get Started</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
