import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Leaf, Shield } from "lucide-react";

const styles = [
  { id: "casual", name: "Casual", emoji: "👕", description: "Relaxed, everyday comfort" },
  { id: "chic", name: "Chic", emoji: "✨", description: "Elegant and refined" },
  { id: "streetwear", name: "Streetwear", emoji: "🧢", description: "Urban and trendy" },
  { id: "minimal", name: "Minimal", emoji: "⚪", description: "Clean and simple" },
  { id: "bohemian", name: "Bohemian", emoji: "🌻", description: "Free-spirited and artistic" },
  { id: "athletic", name: "Athletic", emoji: "🏃", description: "Sporty and active" },
];

const sustainabilityGoals = [
  { id: "buy-less", name: "Buy Less", emoji: "🛒", description: "Reduce new purchases" },
  { id: "restyle-more", name: "Restyle More", emoji: "🔄", description: "Remix existing wardrobe" },
  { id: "upcycle", name: "Upcycle", emoji: "♻️", description: "Transform old into new" },
];

interface StylePreferencesProps {
  onComplete: (styles: string[]) => void;
}

const StylePreferences = ({ onComplete }: StylePreferencesProps) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleStyle = (id: string) => {
    setSelectedStyles(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (step === 1 && selectedStyles.length > 0) {
      setStep(2);
    } else if (step === 2 && selectedGoals.length > 0) {
      setStep(3);
    } else if (step === 3) {
      onComplete(selectedStyles);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-up">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`w-8 h-1 rounded-full transition-colors ${step >= 1 ? 'bg-foreground' : 'bg-foreground/20'}`} />
          <div className={`w-8 h-1 rounded-full transition-colors ${step >= 2 ? 'bg-foreground' : 'bg-foreground/20'}`} />
          <div className={`w-8 h-1 rounded-full transition-colors ${step >= 3 ? 'bg-foreground' : 'bg-foreground/20'}`} />
        </div>

        {/* Step 1: Style Preferences */}
        {step === 1 && (
          <>
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
                What's Your Style?
              </h1>
              <p className="text-lg text-muted-foreground">
                Select all styles that resonate with you. This helps us personalize your experience.
              </p>
            </div>

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
          </>
        )}

        {/* Step 2: Sustainability Goals */}
        {step === 2 && (
          <>
            <div className="text-center mb-12">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-7 h-7 text-green-600" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
                Your Sustainability Goals
              </h1>
              <p className="text-lg text-muted-foreground">
                How would you like to embrace sustainable fashion?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {sustainabilityGoals.map((goal) => {
                const isSelected = selectedGoals.includes(goal.id);
                return (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                      isSelected 
                        ? "border-green-500 bg-green-50 shadow-soft" 
                        : "border-border bg-card hover:border-green-300"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <span className="text-3xl mb-3 block">{goal.emoji}</span>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                      {goal.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Step 3: Privacy Assurance */}
        {step === 3 && (
          <>
            <div className="text-center mb-12">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
                Your Privacy Matters
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                We take your privacy seriously. Here's what you need to know:
              </p>
            </div>

            <div className="space-y-4 mb-12 max-w-lg mx-auto">
              <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Images Never Stored</h3>
                  <p className="text-sm text-muted-foreground">Your uploaded photos are never saved to our servers.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Auto-Delete After Processing</h3>
                  <p className="text-sm text-muted-foreground">All uploads are automatically deleted after processing.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">100% Private</h3>
                  <p className="text-sm text-muted-foreground">Your wardrobe and style data stays completely private.</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Continue button */}
        <div className="flex justify-center">
          <Button 
            variant="hero" 
            size="xl" 
            onClick={handleContinue}
            disabled={(step === 1 && selectedStyles.length === 0) || (step === 2 && selectedGoals.length === 0)}
            className="group"
          >
            {step === 3 ? "Get Started" : "Continue"}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StylePreferences;
