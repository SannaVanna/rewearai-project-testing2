import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Leaf, Clock, Sparkles, Check, ChevronRight, ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";

interface Tutorial {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  time: string;
  icon: string;
  steps: string[];
}

const tutorials: Tutorial[] = [
  {
    id: "1",
    title: "Denim to Tote",
    difficulty: "Medium",
    time: "45m",
    icon: "👜",
    steps: [
      "Cut legs off old jeans.",
      "Turn inside out and sew bottom edge.",
      "Use excess fabric for straps."
    ]
  },
  {
    id: "2",
    title: "T-Shirt to Crop Top",
    difficulty: "Easy",
    time: "15m",
    icon: "👕",
    steps: [
      "Lay flat.",
      "Measure to waist.",
      "Cut straight across (no-sew)."
    ]
  },
  {
    id: "3",
    title: "Sweater to Mittens",
    difficulty: "Easy",
    time: "30m",
    icon: "🧤",
    steps: [
      "Trace hand on sweater.",
      "Cut slightly outside outline.",
      "Stitch edges together."
    ]
  },
  {
    id: "4",
    title: "Dress to Two-Piece Set",
    difficulty: "Advanced",
    time: "60m",
    icon: "👗",
    steps: [
      "Cut at waistline.",
      "Hem the top.",
      "Add elastic to skirt waistband."
    ]
  },
  {
    id: "5",
    title: "Silk Scarf to Halter Top",
    difficulty: "Easy",
    time: "10m",
    icon: "🧣",
    steps: [
      "Fold scarf into a triangle.",
      "Tie around neck.",
      "Tie ends around waist."
    ]
  }
];

const difficultyColors = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-amber-100 text-amber-700",
  Advanced: "bg-primary/10 text-primary"
};

interface UpcyclingStudioProps {
  onBack?: () => void;
}

const UpcyclingStudio = ({ onBack }: UpcyclingStudioProps) => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [projectCompleted, setProjectCompleted] = useState(false);

  const handleStepToggle = (index: number) => {
    setCompletedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleComplete = () => {
    setProjectCompleted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4a574', '#c49a6c', '#8b7355', '#a8d5a2', '#7cb87a']
    });
  };

  const handleCloseModal = () => {
    setSelectedTutorial(null);
    setCompletedSteps([]);
    setProjectCompleted(false);
  };

  const allStepsCompleted = selectedTutorial && 
    completedSteps.length === selectedTutorial.steps.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-green-50/50 to-background pt-8 pb-12 px-4">
        <div className="container max-w-4xl">
          {onBack && (
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </button>
          )}
          
          <div className="text-center animate-fade-up">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
              Upcycle with Purpose
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Transform your old clothes into something new. Simple DIY projects that give your wardrobe a second life.
            </p>
          </div>
        </div>
      </div>

      {/* Tutorial Cards */}
      <div className="container max-w-4xl px-4 pb-16">
        <div className="grid gap-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {tutorials.map((tutorial, index) => (
            <button
              key={tutorial.id}
              onClick={() => setSelectedTutorial(tutorial)}
              className="group bg-card rounded-2xl p-5 shadow-soft hover:shadow-medium transition-all text-left flex items-center gap-4"
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center text-2xl shrink-0">
                {tutorial.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 truncate">
                  {tutorial.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[tutorial.difficulty]}`}>
                    {tutorial.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {tutorial.time}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0" />
            </button>
          ))}
        </div>

        {/* Impact Section */}
        <div className="mt-12 p-6 bg-green-50/50 rounded-2xl border border-green-100 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-foreground font-medium mb-1">Your Impact Matters</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Extending the life of clothes by just 9 months can reduce carbon, waste, and water footprints by up to 30%.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Modal */}
      <Dialog open={!!selectedTutorial} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-xl">
                {selectedTutorial?.icon}
              </div>
              <div>
                <DialogTitle className="font-display text-xl font-semibold text-foreground text-left">
                  {selectedTutorial?.title}
                </DialogTitle>
                <div className="flex gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    selectedTutorial ? difficultyColors[selectedTutorial.difficulty] : ''
                  }`}>
                    {selectedTutorial?.difficulty}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
                    {selectedTutorial?.time}
                  </span>
                </div>
              </div>
            </div>
          </DialogHeader>

          {projectCompleted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                Circular Win 🌱
              </h3>
              <p className="text-muted-foreground mb-6">
                Amazing work! You've given new life to an old piece.
              </p>
              <Button onClick={handleCloseModal} variant="hero" size="lg">
                Back to Projects
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-3 my-4">
                {selectedTutorial?.steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => handleStepToggle(index)}
                    className={`w-full flex items-start gap-3 p-4 rounded-xl transition-all text-left ${
                      completedSteps.includes(index)
                        ? "bg-green-50 border border-green-200"
                        : "bg-secondary/50 hover:bg-secondary"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      completedSteps.includes(index)
                        ? "bg-green-500 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {completedSteps.includes(index) ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-medium">{index + 1}</span>
                      )}
                    </div>
                    <span className={`text-sm leading-relaxed ${
                      completedSteps.includes(index)
                        ? "text-green-700"
                        : "text-foreground"
                    }`}>
                      {step}
                    </span>
                  </button>
                ))}
              </div>

              <Button 
                onClick={handleComplete}
                disabled={!allStepsCompleted}
                variant={allStepsCompleted ? "hero" : "secondary"}
                size="lg"
                className="w-full"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Project Completed
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpcyclingStudio;
