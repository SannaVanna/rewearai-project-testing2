import { Button } from "@/components/ui/button";
import { User, Settings, Heart, Leaf, ChevronRight, LogOut } from "lucide-react";

interface ProfilePageProps {
  onNavigate: (screen: string) => void;
}

const ProfilePage = ({ onNavigate }: ProfilePageProps) => {
  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-gradient-to-b from-secondary/50 to-background pt-12 pb-8 px-4">
        <div className="container max-w-lg">
          <div className="text-center animate-fade-up">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-display text-3xl font-semibold text-primary">S</span>
            </div>
            <h1 className="font-display text-2xl font-semibold text-foreground mb-1">
              Sarah
            </h1>
            <p className="text-muted-foreground">
              Member since 2024
            </p>
          </div>
        </div>
      </div>

      <div className="container max-w-lg px-4 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-card rounded-2xl p-4 text-center shadow-soft">
            <p className="font-display text-2xl font-bold text-foreground">24</p>
            <p className="text-xs text-muted-foreground">Items</p>
          </div>
          <div className="bg-card rounded-2xl p-4 text-center shadow-soft">
            <p className="font-display text-2xl font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">Outfits</p>
          </div>
          <div className="bg-card rounded-2xl p-4 text-center shadow-soft">
            <p className="font-display text-2xl font-bold text-green-600">85%</p>
            <p className="text-xs text-muted-foreground">Usage</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2 animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <button className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl shadow-soft hover:shadow-medium transition-shadow text-left">
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Edit Profile</p>
              <p className="text-sm text-muted-foreground">Update your information</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl shadow-soft hover:shadow-medium transition-shadow text-left">
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Style Preferences</p>
              <p className="text-sm text-muted-foreground">Casual, minimal, classy</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl shadow-soft hover:shadow-medium transition-shadow text-left">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Sustainability Goals</p>
              <p className="text-sm text-muted-foreground">Track your impact</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl shadow-soft hover:shadow-medium transition-shadow text-left">
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Settings</p>
              <p className="text-sm text-muted-foreground">Notifications, privacy</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Sign Out */}
        <Button 
          variant="outline" 
          className="w-full animate-fade-up" 
          style={{ animationDelay: '0.2s' }}
          onClick={() => onNavigate("landing")}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground">
          Rewear AI v1.0.0
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
