import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Leaf, Clock, Sparkles, Check, ChevronRight, ArrowLeft, Lightbulb, Play, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";

interface Tutorial {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  time: string;
  videoId: string;
  videoTitle: string;
  steps: string[];
}

// Real YouTube upcycling videos
const tutorials: Tutorial[] = [
  {
    id: "1",
    title: "Raw-Edge Denim Shorts",
    difficulty: "Easy",
    time: "10m",
    videoId: "cTQzTqgYqzg",
    videoTitle: "DIY Denim Shorts from Old Jeans",
    steps: [
      "Lay jeans flat and mark desired length.",
      "Cut straight across both legs.",
      "Fray edges with scissors or by washing."
    ]
  },
  {
    id: "2",
    title: "No-Sew Tie-Front Crop",
    difficulty: "Easy",
    time: "15m",
    videoId: "qY7s3O9kQR4",
    videoTitle: "No-Sew T-Shirt Transformation",
    steps: [
      "Cut t-shirt to desired crop length.",
      "Cut vertical slits along the bottom hem.",
      "Tie slits into knots for a finished look."
    ]
  },
  {
    id: "3",
    title: "T-Shirt Fringe Tote",
    difficulty: "Medium",
    time: "20m",
    videoId: "KYUqPExAsjE",
    videoTitle: "DIY T-Shirt Tote Bag Tutorial",
    steps: [
      "Cut sleeves and neckline off the t-shirt.",
      "Turn inside out and cut fringe along the bottom.",
      "Tie fringe pieces together to close the bottom.",
      "Flip right-side out—your tote is ready!"
    ]
  },
  {
    id: "4",
    title: "Maxi-to-Skirt",
    difficulty: "Advanced",
    time: "45m",
    videoId: "H5BqFTVG_hI",
    videoTitle: "Transform a Maxi Dress into a Skirt",
    steps: [
      "Lay maxi dress flat and mark where you want the skirt to start.",
      "Cut off the top portion carefully.",
      "Fold the raw edge and sew an elastic waistband channel.",
      "Thread elastic through and secure the ends.",
      "Try on and adjust fit as needed."
    ]
  },
  {
    id: "5",
    title: "Menswear Shirt-Dress",
    difficulty: "Advanced",
    time: "60m",
    videoId: "VHwrHG8mTrw",
    videoTitle: "Turn a Men's Shirt into a Dress",
    steps: [
      "Select an oversized men's button-down shirt.",
      "Try on and mark desired dress length.",
      "Add a belt or sew darts at the waist for shape.",
      "Hem the bottom edge.",
      "Optional: Roll sleeves and add cuffs.",
      "Style with accessories for a polished look."
    ]
  }
];

const ecoTips = [
  "The 30-wear rule: Before buying, ask if you'll wear it at least 30 times. If not, skip it!",
  "Washing clothes at 30°C instead of 40°C uses 40% less energy per wash cycle.",
  "Air drying extends garment life by 50% compared to tumble drying.",
  "One white cotton t-shirt takes 2,700 liters of water to produce — enough for one person to drink for 2.5 years.",
  "Buying secondhand clothing reduces its carbon footprint by 82%.",
  "Storing clothes properly (folded knits, hung wovens) extends their lifespan significantly.",
  "Spot cleaning small stains instead of full washes saves water and preserves fabric.",
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
  const [dailyTip, setDailyTip] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  // Set daily tip based on day of year for consistency
  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setDailyTip(ecoTips[dayOfYear % ecoTips.length]);
  }, []);

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
    setShowVideo(false);
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

      {/* Eco Tip of the Day */}
      <div className="container max-w-4xl px-4 mb-8">
        <div className="p-5 bg-sage-light rounded-2xl border border-sage/20 animate-fade-up">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-sage/20 rounded-xl flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5 text-sage" />
            </div>
            <div>
              <p className="text-sage-foreground font-medium mb-1">Eco Tip of the Day</p>
              <p className="text-sage-foreground/80 text-sm leading-relaxed">
                {dailyTip}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Cards with Video Thumbnails */}
      <div className="container max-w-4xl px-4 pb-16">
        <div className="grid gap-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {tutorials.map((tutorial, index) => (
            <button
              key={tutorial.id}
              onClick={() => setSelectedTutorial(tutorial)}
              className="group bg-card rounded-2xl p-4 shadow-soft hover:shadow-medium transition-all text-left flex items-center gap-4"
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              {/* Video Thumbnail */}
              <div className="relative w-24 h-16 md:w-32 md:h-20 rounded-xl overflow-hidden shrink-0 bg-secondary">
                <img
                  src={`https://img.youtube.com/vi/${tutorial.videoId}/mqdefault.jpg`}
                  alt={tutorial.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-4 h-4 text-foreground ml-0.5" />
                  </div>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base md:text-lg font-semibold text-foreground mb-2 truncate">
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

      {/* Tutorial Modal with Video */}
      <Dialog open={!!selectedTutorial} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-lg rounded-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
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
              {/* Embedded YouTube Video */}
              <div className="mb-4">
                {showVideo ? (
                  <div className="aspect-video rounded-xl overflow-hidden bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedTutorial?.videoId}?autoplay=1`}
                      title={selectedTutorial?.videoTitle}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="relative w-full aspect-video rounded-xl overflow-hidden bg-secondary group"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${selectedTutorial?.videoId}/maxresdefault.jpg`}
                      alt={selectedTutorial?.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to medium quality if max doesn't exist
                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${selectedTutorial?.videoId}/mqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                        <Play className="w-8 h-8 text-foreground ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <p className="text-white text-sm font-medium drop-shadow-lg">
                        {selectedTutorial?.videoTitle}
                      </p>
                    </div>
                  </button>
                )}
                
                {/* External YouTube link */}
                <a
                  href={`https://www.youtube.com/watch?v=${selectedTutorial?.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Watch on YouTube
                </a>
              </div>

              <div className="space-y-3 my-4">
                <p className="text-sm font-medium text-foreground">Step-by-step guide:</p>
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
