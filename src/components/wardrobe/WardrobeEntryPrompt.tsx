import { Button } from "@/components/ui/button";
import { Shirt, Upload, ArrowRight, Sparkles } from "lucide-react";

interface WardrobeEntryPromptProps {
  onUploadNew: () => void;
  onUseExisting: () => void;
}

const WardrobeEntryPrompt = ({ onUploadNew, onUseExisting }: WardrobeEntryPromptProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8 animate-fade-up">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shirt className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-foreground mb-3">
            Let's Get Started
          </h1>
          <p className="text-muted-foreground">
            Before trying on outfits, would you like to add some clothes to your wardrobe?
          </p>
        </div>

        <div className="space-y-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {/* Upload new clothes option */}
          <button
            onClick={onUploadNew}
            className="w-full bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all text-left group border border-border/50 hover:border-primary/30"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Upload className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  Upload My Clothes
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add photos of your wardrobe items for personalized styling
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-4" />
            </div>
          </button>

          {/* Use existing wardrobe option */}
          <button
            onClick={onUseExisting}
            className="w-full bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all text-left group border border-border/50 hover:border-primary/30"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center shrink-0 group-hover:bg-secondary/80 transition-colors">
                <Sparkles className="w-7 h-7 text-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  Skip & Use Sample Items
                </h3>
                <p className="text-sm text-muted-foreground">
                  Try out the virtual styling with our sample wardrobe
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-4" />
            </div>
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          You can always add more clothes later from your dashboard
        </p>
      </div>
    </div>
  );
};

export default WardrobeEntryPrompt;
