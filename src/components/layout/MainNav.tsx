import { Sparkles, Home, Shirt, BookOpen, User } from "lucide-react";

interface MainNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Home", icon: Home },
  { id: "wardrobe", label: "Wardrobe", icon: Shirt },
  { id: "learning", label: "Learning", icon: BookOpen },
  { id: "profile", label: "Profile", icon: User },
];

const MainNav = ({ currentScreen, onNavigate }: MainNavProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <button 
          onClick={() => onNavigate("dashboard")}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-background" />
          </div>
          <span className="font-display text-xl font-semibold text-foreground hidden sm:block">
            Rewear AI
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id || 
              (item.id === "dashboard" && currentScreen === "dashboard");
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg font-body text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id || 
              (item.id === "dashboard" && currentScreen === "dashboard");
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`p-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default MainNav;
