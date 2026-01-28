import { useState, useEffect } from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Sustainability from "@/components/landing/Sustainability";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import AuthModal from "@/components/auth/AuthModal";
import StylePreferences from "@/components/onboarding/StylePreferences";
import WardrobeUpload from "@/components/wardrobe/WardrobeUpload";
import WardrobePage from "@/components/wardrobe/WardrobePage";
import VirtualTryOn from "@/components/tryon/VirtualTryOn";
import Dashboard from "@/components/dashboard/Dashboard";
import UpcyclingStudio from "@/components/learning/UpcyclingStudio";
import ProfilePage from "@/components/profile/ProfilePage";
import MainNav from "@/components/layout/MainNav";

type Screen = "landing" | "onboarding" | "wardrobe-upload" | "wardrobe" | "tryon" | "dashboard" | "learning" | "profile";

const AUTH_STORAGE_KEY = "rewear_auth_state";

const Index = () => {
  // Check for returning user on mount
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored === "true";
  });
  
  const [currentScreen, setCurrentScreen] = useState<Screen>(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored === "true" ? "dashboard" : "landing";
  });
  
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Persist auth state
  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, isLoggedIn ? "true" : "false");
  }, [isLoggedIn]);

  const handleGetStarted = () => {
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setAuthModalOpen(false);
    setIsLoggedIn(true);
    setCurrentScreen("onboarding");
  };

  const handleStyleComplete = (styles: string[]) => {
    console.log("Selected styles:", styles);
    setCurrentScreen("wardrobe-upload");
  };

  const handleWardrobeComplete = () => {
    setCurrentScreen("dashboard");
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  // Show navigation for logged-in screens
  const showMainNav = isLoggedIn && !["onboarding", "wardrobe-upload"].includes(currentScreen);

  // Render based on current screen
  if (currentScreen === "onboarding") {
    return <StylePreferences onComplete={handleStyleComplete} />;
  }

  if (currentScreen === "wardrobe-upload") {
    return <WardrobeUpload onComplete={handleWardrobeComplete} />;
  }

  if (currentScreen === "tryon") {
    return (
      <>
        {showMainNav && <MainNav currentScreen={currentScreen} onNavigate={handleNavigate} />}
        <VirtualTryOn />
      </>
    );
  }

  if (currentScreen === "wardrobe") {
    return (
      <>
        {showMainNav && <MainNav currentScreen={currentScreen} onNavigate={handleNavigate} />}
        <WardrobePage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentScreen === "learning") {
    return (
      <>
        {showMainNav && <MainNav currentScreen={currentScreen} onNavigate={handleNavigate} />}
        <UpcyclingStudio />
      </>
    );
  }

  if (currentScreen === "profile") {
    return (
      <>
        {showMainNav && <MainNav currentScreen={currentScreen} onNavigate={handleNavigate} />}
        <ProfilePage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentScreen === "dashboard") {
    return (
      <>
        {showMainNav && <MainNav currentScreen={currentScreen} onNavigate={handleNavigate} />}
        <Dashboard onNavigate={handleNavigate} />
      </>
    );
  }

  // Landing page (no nav, use original header)
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
