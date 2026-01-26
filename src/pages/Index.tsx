import { useState } from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Sustainability from "@/components/landing/Sustainability";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import AuthModal from "@/components/auth/AuthModal";
import StylePreferences from "@/components/onboarding/StylePreferences";
import WardrobeUpload from "@/components/wardrobe/WardrobeUpload";
import VirtualTryOn from "@/components/tryon/VirtualTryOn";
import Dashboard from "@/components/dashboard/Dashboard";

type Screen = "landing" | "onboarding" | "wardrobe" | "tryon" | "dashboard";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleGetStarted = () => {
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setAuthModalOpen(false);
    setCurrentScreen("onboarding");
  };

  const handleStyleComplete = (styles: string[]) => {
    console.log("Selected styles:", styles);
    setCurrentScreen("wardrobe");
  };

  const handleWardrobeComplete = () => {
    setCurrentScreen("dashboard");
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  // Render based on current screen
  if (currentScreen === "onboarding") {
    return <StylePreferences onComplete={handleStyleComplete} />;
  }

  if (currentScreen === "wardrobe") {
    return <WardrobeUpload onComplete={handleWardrobeComplete} />;
  }

  if (currentScreen === "tryon") {
    return <VirtualTryOn />;
  }

  if (currentScreen === "dashboard") {
    return <Dashboard onNavigate={handleNavigate} />;
  }

  // Landing page
  return (
    <div className="min-h-screen">
      <Header onGetStarted={handleGetStarted} />
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <Sustainability />
      <CTA onGetStarted={handleGetStarted} />
      <Footer />
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;
