import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { 
  Sparkles, 
  Shirt, 
  Camera, 
  Sun,
  Thermometer,
  ChevronRight,
  Wind,
  Wand2,
  BookOpen,
  Heart,
  Recycle,
  BarChart3,
  MessageCircle
} from "lucide-react";
import wardrobeImage from "@/assets/wardrobe-preview.jpg";
import SDGBadge from "@/components/sustainability/SDGBadge";
import ImpactTracker from "@/components/sustainability/ImpactTracker";
import DonationHub from "@/components/sustainability/DonationHub";
import FavoriteOutfits from "@/components/wardrobe/FavoriteOutfits";
import AIAssistant from "@/components/assistant/AIAssistant";

// Quick action buttons for AI Stylist section
const aiStylistActions = [
  { id: "tryon", icon: Camera, label: "Try-On", color: "bg-primary/10 text-primary" },
  { id: "generator", icon: Wand2, label: "Get Styled", color: "bg-accent/10 text-accent" },
  { id: "wardrobe", icon: Shirt, label: "Wardrobe", color: "bg-secondary text-foreground" },
  { id: "assistant", icon: MessageCircle, label: "AI Tips", color: "bg-primary/10 text-primary" },
];

// Quick actions for Sustainability Hub
const sustainabilityActions = [
  { id: "donate", icon: Heart, label: "Donate", color: "bg-sage-light text-sage" },
  { id: "learning", icon: Recycle, label: "Upcycle", color: "bg-sage-light text-sage" },
  { id: "impact", icon: BarChart3, label: "Impact", color: "bg-sage-light text-sage" },
];

const outfitSuggestions = [
  { id: 1, occasion: "Everyday Wear", style: "Comfortable and stylish", items: 3 },
  { id: 2, occasion: "Event Styling", style: "Elegant occasion look", items: 4 },
  { id: 3, occasion: "Trend-Inspired", style: "Current fashion trends", items: 3 },
];

// Weather-aware styling data
const weatherData = {
  temp: 28,
  condition: "sunny",
  humidity: 45,
  recommendation: "Based on today's weather, here's a comfortable and stylish option from your closet."
};

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [impactModalOpen, setImpactModalOpen] = useState(false);
  const [assistantModalOpen, setAssistantModalOpen] = useState(false);

  const handleQuickAction = (actionId: string) => {
    if (actionId === "donate") {
      setDonationModalOpen(true);
    } else if (actionId === "impact") {
      setImpactModalOpen(true);
    } else if (actionId === "assistant") {
      setAssistantModalOpen(true);
    } else if (actionId === "learning" || actionId === "upcycle") {
      onNavigate("learning");
    } else if (actionId === "tryon" || actionId === "generator") {
      onNavigate("tryon");
    } else if (actionId === "wardrobe") {
      onNavigate("wardrobe");
    }
  };

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
            <button 
              onClick={() => onNavigate("profile")}
              className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <span className="font-display text-lg font-semibold text-primary">S</span>
            </button>
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
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">Weather Styling Radar</span>
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
        {/* Key Stats Bar */}
        <ImpactTracker compact />

        {/* Two Column Layout: Fashion & Sustainability */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT: AI Stylist Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Your AI Stylist
              </h2>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {aiStylistActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  className="flex flex-col items-center gap-2 p-4 bg-card rounded-2xl shadow-soft hover:shadow-medium transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                </button>
              ))}
            </div>

            {/* Today's Outfit */}
            <div 
              className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => onNavigate("tryon")}
            >
              <img 
                src={wardrobeImage} 
                alt="Today's outfit" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-background" />
                  <span className="text-sm text-background/80">AI Suggested</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-background">
                  Casual Elegance
                </h3>
              </div>
            </div>

            {/* AI Outfit Generator */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">AI Outfit Generator</h3>
                <Button variant="ghost" size="sm" onClick={() => onNavigate("tryon")}>
                  Generate <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              {outfitSuggestions.slice(0, 2).map((outfit) => (
                <div 
                  key={outfit.id}
                  className="bg-card rounded-xl p-3 shadow-soft flex items-center gap-3 cursor-pointer hover:shadow-medium transition-shadow"
                  onClick={() => onNavigate("tryon")}
                >
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    <Shirt className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm">{outfit.occasion}</h4>
                    <p className="text-xs text-muted-foreground">{outfit.style}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>

            {/* Favorite Outfits with CPW */}
            <FavoriteOutfits />
          </section>

          {/* RIGHT: Sustainability Hub */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
                <Heart className="w-5 h-5 text-sage" />
                Sustainability Hub
              </h2>
              <div className="flex items-center gap-1">
                <SDGBadge sdg={11} size="sm" />
                <SDGBadge sdg={12} size="sm" />
                <SDGBadge sdg={13} size="sm" />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3">
              {sustainabilityActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  className="flex flex-col items-center gap-2 p-4 bg-card rounded-2xl shadow-soft hover:shadow-medium transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                </button>
              ))}
            </div>

            {/* Impact Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-sage-light rounded-2xl p-4">
                <Wind className="w-6 h-6 text-sage mb-2" />
                <p className="font-display text-2xl font-bold text-sage-foreground">12.5kg</p>
                <p className="text-sm text-sage-foreground/80">CO₂ saved</p>
              </div>
              <div className="bg-sage-light rounded-2xl p-4">
                <Recycle className="w-6 h-6 text-sage mb-2" />
                <p className="font-display text-2xl font-bold text-sage-foreground">8</p>
                <p className="text-sm text-sage-foreground/80">Items saved from landfill</p>
              </div>
            </div>

            {/* Sustainability Score */}
            <div className="bg-card rounded-2xl p-4 shadow-soft border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">Sustainability Score</span>
                <span className="text-sm font-semibold text-sage">Great</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-sage rounded-full" style={{ width: '78%' }} />
              </div>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-muted-foreground">
                  Wardrobe utilization: 85%
                </p>
                <p className="text-xs font-medium text-sage">78/100</p>
              </div>
            </div>

            {/* Upcycling Highlight */}
            <div 
              className="bg-sage-light rounded-2xl p-4 cursor-pointer hover:bg-sage-muted transition-colors"
              onClick={() => onNavigate("learning")}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-sage/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-sage" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sage-foreground">Upcycling Studio</h3>
                  <p className="text-sm text-sage-foreground/70">Learn to transform old clothes</p>
                </div>
                <ChevronRight className="w-5 h-5 text-sage" />
              </div>
              <div className="flex gap-2">
                <span className="text-xs bg-sage/20 text-sage-foreground px-2 py-1 rounded-full">5 tutorials</span>
                <span className="text-xs bg-sage/20 text-sage-foreground px-2 py-1 rounded-full">3 completed</span>
              </div>
            </div>

            {/* Donation CTA */}
            <Button 
              className="w-full bg-sage hover:bg-sage/90 text-sage-foreground"
              size="lg"
              onClick={() => setDonationModalOpen(true)}
            >
              <Heart className="w-5 h-5 mr-2" />
              Donate Clothes to Charity
            </Button>

            {/* Impact Note */}
            <p className="text-xs text-center text-muted-foreground italic px-4">
              "Extending the life of clothes by just 9 months reduces carbon, waste, and water footprints by up to 30%."
            </p>
          </section>
        </div>
      </div>

      {/* Donation Modal */}
      <Dialog open={donationModalOpen} onOpenChange={setDonationModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DonationHub onClose={() => setDonationModalOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Impact Details Modal */}
      <Dialog open={impactModalOpen} onOpenChange={setImpactModalOpen}>
        <DialogContent className="sm:max-w-md">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4 text-center">
            Your Sustainability Impact
          </h2>
          <ImpactTracker />
        </DialogContent>
      </Dialog>

      {/* AI Assistant Modal */}
      <Dialog open={assistantModalOpen} onOpenChange={setAssistantModalOpen}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
          <AIAssistant onClose={() => setAssistantModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
