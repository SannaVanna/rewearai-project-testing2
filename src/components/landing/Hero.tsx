import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-fashion.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="container relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen py-20 gap-12">
        {/* Left content */}
        <div className="flex-1 max-w-2xl animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/80">AI-Powered Fashion Assistant</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6 text-foreground">
            Discover Your
            <span className="block text-primary">Perfect Style</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
            Style your wardrobe with AI, visualize outfits on your own body, and embrace sustainable fashion. Your personal stylist, reimagined.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" onClick={onGetStarted} className="group">
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="elegant" size="lg">
              See How It Works
            </Button>
          </div>
          
          {/* Trust badges */}
          <div className="mt-12 flex items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>100% privacy protected</span>
            </div>
          </div>
        </div>

        {/* Right content - Hero image */}
        <div className="flex-1 relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-2xl transform rotate-3" />
            <img 
              src={heroImage} 
              alt="Rewear AI Fashion"
              className="relative rounded-3xl shadow-medium w-full max-w-lg mx-auto object-cover aspect-[4/5]"
            />
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card/90 backdrop-blur-md p-4 rounded-2xl shadow-medium animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">AI Styling</p>
                  <p className="text-sm text-muted-foreground">Personalized for you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
