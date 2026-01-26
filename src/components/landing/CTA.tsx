import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface CTAProps {
  onGetStarted: () => void;
}

const CTA = ({ onGetStarted }: CTAProps) => {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="relative overflow-hidden bg-foreground rounded-3xl p-12 md:p-16 text-center">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground/80">Free to get started</span>
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6 text-background">
              Ready to Transform Your Style?
            </h2>
            
            <p className="text-lg text-background/70 mb-8 max-w-xl mx-auto">
              Join thousands of fashion-forward individuals who are already discovering their perfect style with Luvia AI.
            </p>
            
            <Button 
              variant="default" 
              size="xl" 
              onClick={onGetStarted}
              className="bg-background text-foreground hover:bg-background/90 group"
            >
              Start Your Style Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
