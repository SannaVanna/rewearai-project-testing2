import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const styles = [
  { id: "casual", name: "Casual", emoji: "👕", description: "Relaxed, everyday comfort" },
  { id: "classy", name: "Classy", emoji: "👔", description: "Elegant and sophisticated" },
  { id: "streetwear", name: "Streetwear", emoji: "🧢", description: "Urban and trendy" },
  { id: "minimal", name: "Minimal", emoji: "⚪", description: "Clean and simple" },
  { id: "bohemian", name: "Bohemian", emoji: "🌻", description: "Free-spirited and artistic" },
  { id: "athletic", name: "Athletic", emoji: "🏃", description: "Sporty and active" },
];

interface StylePreferencesProps {
  onComplete: (styles: string[]) => void;
}

const StylePreferences = ({ onComplete }: StylePreferencesProps) => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const toggleStyle = (id: string) => {
    setSelectedStyles(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-up">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-1 bg-foreground rounded-full" />
          <div className="w-8 h-1 bg-foreground/20 rounded-full" />
          <div className="w-8 h-1 bg-foreground/20 rounded-full" />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            What's Your Style?
          </h1>
          <p className="text-lg text-muted-foreground">
            Select all styles that resonate with you. This helps us personalize your experience.
          </p>
        </div>

        {/* Style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {styles.map((style) => {
            const isSelected = selectedStyles.includes(style.id);
            return (
              <button
                key={style.id}
                onClick={() => toggleStyle(style.id)}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                  isSelected 
                    ? "border-primary bg-primary/5 shadow-soft" 
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
                <span className="text-3xl mb-3 block">{style.emoji}</span>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  {style.name}
                </h3>
                <p className="text-sm text-muted-foreground">{style.description}</p>
              </button>
            );
          })}
        </div>

        {/* Continue button */}
        <div className="flex justify-center">
          <Button 
            variant="hero" 
            size="xl" 
            onClick={() => onComplete(selectedStyles)}
            disabled={selectedStyles.length === 0}
            className="group"
          >
            Continue
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StylePreferences;
