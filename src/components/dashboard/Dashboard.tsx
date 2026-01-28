import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Shirt, 
  Camera, 
  Leaf, 
  Calendar, 
  TrendingUp, 
  Plus,
  Sun,
  Cloud,
  CloudRain,
  Thermometer,
  ChevronRight,
  Wind
} from "lucide-react";
import wardrobeImage from "@/assets/wardrobe-preview.jpg";

const quickActions = [
  { icon: Camera, label: "Try On", color: "bg-primary/10 text-primary" },
  { icon: Shirt, label: "Wardrobe", color: "bg-accent/10 text-accent" },
  { icon: Calendar, label: "Plan Week", color: "bg-green-100/80 text-green-700" },
  { icon: Plus, label: "Add Clothes", color: "bg-secondary text-foreground" },
];

const outfitSuggestions = [
  { id: 1, occasion: "Work Meeting", style: "Business casual", items: 4 },
  { id: 2, occasion: "Weekend Brunch", style: "Relaxed chic", items: 3 },
  { id: 3, occasion: "Date Night", style: "Elegant", items: 3 },
];

// Weather-aware styling data
const weatherData = {
  temp: 28,
  condition: "sunny",
  humidity: 45,
  recommendation: "It's 28°C and sunny — here's a breathable outfit from your wardrobe."
};

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-b from-secondary/50 to-background pt-8 pb-6 px-4">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-muted-foreground mb-1">Good morning,</p>
              <h1 className="font-display text-3xl font-semibold text-foreground">Sarah</h1>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="font-display text-lg font-semibold text-primary">S</span>
            </div>
          </div>

          {/* Weather-Aware Styling Radar */}
          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                <Sun className="w-7 h-7 text-amber-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">AI Styling Radar</span>
                </div>
                <p className="font-display text-lg font-medium text-foreground leading-snug">
                  {weatherData.recommendation}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Thermometer className="w-4 h-4" />
                <span>{weatherData.temp}°C</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wind className="w-4 h-4" />
                <span>{weatherData.humidity}% humidity</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container px-4 space-y-8">
        {/* Quick actions */}
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => action.label === "Try On" ? onNavigate("tryon") : action.label === "Wardrobe" && onNavigate("wardrobe")}
              className="flex flex-col items-center gap-2 p-4 bg-card rounded-2xl shadow-soft hover:shadow-medium transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-foreground">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Today's outfit */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold text-foreground">Today's Outfit</h2>
            <Button variant="ghost" size="sm">
              See all <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div 
            className="relative h-64 rounded-3xl overflow-hidden cursor-pointer group"
            onClick={() => onNavigate("tryon")}
          >
            <img 
              src={wardrobeImage} 
              alt="Today's outfit" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm text-primary-foreground/80">AI Suggested</span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-background mb-1">
                Casual Elegance
              </h3>
              <p className="text-background/80">3 items from your wardrobe</p>
            </div>
          </div>
        </section>

        {/* Occasion-Based Outfit suggestions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold text-foreground">Style by Occasion</h2>
            <Button variant="ghost" size="sm">
              See all <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {outfitSuggestions.map((outfit) => (
              <div 
                key={outfit.id}
                className="bg-card rounded-2xl p-4 shadow-soft flex items-center gap-4 cursor-pointer hover:shadow-medium transition-shadow"
                onClick={() => onNavigate("tryon")}
              >
                <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center">
                  <Shirt className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{outfit.occasion}</h3>
                  <p className="text-sm text-muted-foreground">{outfit.style}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {outfit.items} items
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </section>

        {/* Sustainability stats */}
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">Your Impact</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-2xl p-4">
              <Leaf className="w-6 h-6 text-green-600 mb-2" />
              <p className="font-display text-2xl font-bold text-green-800">12</p>
              <p className="text-sm text-green-700">Outfits created this week</p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-4">
              <TrendingUp className="w-6 h-6 text-amber-600 mb-2" />
              <p className="font-display text-2xl font-bold text-amber-800">85%</p>
              <p className="text-sm text-amber-700">Wardrobe utilization</p>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
};

export default Dashboard;
