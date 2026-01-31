import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Sparkles, RefreshCw, Heart, Share2, ChevronLeft, ChevronRight, User, Shield, Recycle, Gift, X } from "lucide-react";

// Real fashion outfit images from Unsplash
const outfitImages = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=800&fit=crop",
];

const sampleOutfits = [
  { id: 1, name: "Casual Chic", items: ["White blouse", "Beige trousers", "Nude heels"], reason: "This works because neutral tones create an effortlessly elegant look.", image: outfitImages[0] },
  { id: 2, name: "Office Ready", items: ["Camel coat", "White shirt", "Grey pants"], reason: "Professional yet stylish - perfect for your meetings.", image: outfitImages[1] },
  { id: 3, name: "Weekend Vibes", items: ["Cream sweater", "Jeans", "Sneakers"], reason: "Comfortable and put-together for relaxed days.", image: outfitImages[2] },
];

const bodyTypes = [
  { id: "slim", label: "Slim" },
  { id: "average", label: "Average" },
  { id: "curvy", label: "Curvy" },
  { id: "tall", label: "Tall" },
  { id: "petite", label: "Petite" },
];

type UploadType = "fullbody" | "selfie" | null;

const VirtualTryOn = () => {
  const [currentOutfit, setCurrentOutfit] = useState(0);
  const [uploadType, setUploadType] = useState<UploadType>(null);
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [liked, setLiked] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selfieInputRef = useRef<HTMLInputElement>(null);

  const handleUploadChoice = (type: UploadType) => {
    setUploadType(type);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelfieSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelfieUploaded(true);
    }
  };

  const handleGenerateOutfit = () => {
    if (!uploadedPhoto && uploadType === "fullbody") return;
    if (!selfieUploaded && !selectedBodyType && uploadType === "selfie") return;
    
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2500);
  };

  const handleBodyTypeSelect = (bodyType: string) => {
    setSelectedBodyType(bodyType);
  };

  const canGenerate = () => {
    if (uploadType === "fullbody") return !!uploadedPhoto;
    if (uploadType === "selfie") return selfieUploaded && !!selectedBodyType;
    return false;
  };

  const nextOutfit = () => {
    setCurrentOutfit((prev) => (prev + 1) % sampleOutfits.length);
    setGenerating(true);
    setTimeout(() => setGenerating(false), 1000);
  };

  const prevOutfit = () => {
    setCurrentOutfit((prev) => (prev - 1 + sampleOutfits.length) % sampleOutfits.length);
    setGenerating(true);
    setTimeout(() => setGenerating(false), 1000);
  };

  const resetUpload = () => {
    setUploadType(null);
    setSelectedBodyType(null);
    setUploadedPhoto(null);
    setSelfieUploaded(false);
    setGenerated(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hidden file inputs */}
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        className="hidden" 
        onChange={handleFileSelect}
      />
      <input 
        type="file" 
        ref={selfieInputRef} 
        accept="image/*" 
        className="hidden" 
        onChange={handleSelfieSelect}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <h1 className="font-display text-2xl font-semibold text-foreground">Try-On Studio</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setLiked(!liked)}>
              <Heart className={`w-5 h-5 ${liked ? "fill-primary text-primary" : ""}`} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Try-on preview */}
          <div className="space-y-6">
            <div className="relative aspect-[3/4] bg-secondary rounded-3xl overflow-hidden">
              {!uploadType ? (
                /* Upload Type Selection */
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Camera className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2 text-center">
                    Choose Upload Method
                  </h3>
                  <p className="text-muted-foreground text-center mb-6 max-w-xs">
                    Select how you'd like to try on outfits
                  </p>
                  <div className="flex flex-col gap-3 w-full max-w-xs">
                    <Button variant="default" onClick={() => handleUploadChoice("fullbody")} className="w-full">
                      <Camera className="w-4 h-4 mr-2" />
                      Full Body Photo
                    </Button>
                    <Button variant="elegant" onClick={() => handleUploadChoice("selfie")} className="w-full">
                      <User className="w-4 h-4 mr-2" />
                      Selfie + Body Type
                    </Button>
                  </div>
                </div>
              ) : !generated && uploadType === "fullbody" ? (
                /* Full Body Upload - Enforced input step */
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  {uploadedPhoto ? (
                    <>
                      <div className="relative w-32 h-40 mb-4">
                        <img 
                          src={uploadedPhoto} 
                          alt="Your uploaded photo" 
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <button 
                          onClick={() => setUploadedPhoto(null)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Photo uploaded! Ready to generate.</p>
                      <Button 
                        variant="hero" 
                        onClick={handleGenerateOutfit}
                        disabled={generating}
                        className="w-full max-w-xs"
                      >
                        {generating ? (
                          <>
                            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate Try-On
                          </>
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                        <Camera className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2 text-center">
                        Upload Full Body Photo
                      </h3>
                      <p className="text-muted-foreground text-center mb-6 max-w-xs">
                        No measurements needed - just a full-body shot
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button variant="default" onClick={() => fileInputRef.current?.click()}>
                          <Camera className="w-4 h-4 mr-2" />
                          Take Photo
                        </Button>
                        <Button variant="elegant" onClick={() => fileInputRef.current?.click()}>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                    </>
                  )}
                  <button onClick={resetUpload} className="text-sm text-muted-foreground mt-4 hover:text-foreground transition-colors">
                    ← Back to options
                  </button>
                </div>
              ) : !generated && uploadType === "selfie" ? (
                /* Selfie + Body Type - Enforced input step */
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2 text-center">
                    Upload Selfie & Select Body Type
                  </h3>
                  <p className="text-muted-foreground text-center mb-6 max-w-xs text-sm">
                    We'll use your face and selected proportions
                  </p>
                  
                  <div className="w-full max-w-xs mb-6">
                    <Button 
                      variant={selfieUploaded ? "default" : "elegant"}
                      onClick={() => selfieInputRef.current?.click()} 
                      className="w-full mb-4"
                    >
                      {selfieUploaded ? (
                        <>
                          <Camera className="w-4 h-4 mr-2" />
                          ✓ Selfie Uploaded
                        </>
                      ) : (
                        <>
                          <Camera className="w-4 h-4 mr-2" />
                          Upload Selfie
                        </>
                      )}
                    </Button>
                    
                    <p className="text-sm text-muted-foreground mb-3 text-center">Select body type:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {bodyTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => handleBodyTypeSelect(type.id)}
                          className={`p-3 rounded-xl text-sm font-medium transition-all ${
                            selectedBodyType === type.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-card hover:bg-secondary text-foreground border border-border"
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                    
                    {canGenerate() && (
                      <Button 
                        variant="hero" 
                        onClick={handleGenerateOutfit}
                        disabled={generating}
                        className="w-full mt-4"
                      >
                        {generating ? (
                          <>
                            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate Try-On
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  
                  <button onClick={resetUpload} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    ← Back to options
                  </button>
                </div>
              ) : (
                <>
                  {/* Show realistic outfit image instead of placeholder */}
                  <img
                    src={sampleOutfits[currentOutfit].image}
                    alt={sampleOutfits[currentOutfit].name}
                    className="w-full h-full object-cover"
                  />
                  {generating && (
                    <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm flex items-center justify-center">
                      <div className="bg-card/90 backdrop-blur-md p-6 rounded-2xl flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                        <span className="font-medium text-foreground">Generating look...</span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Navigation */}
            {generated && !generating && (
              <div className="flex items-center justify-center gap-4">
                <Button variant="ghost" size="icon" onClick={prevOutfit}>
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <div className="flex gap-2">
                  {sampleOutfits.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentOutfit ? "bg-foreground" : "bg-foreground/20"
                      }`}
                    />
                  ))}
                </div>
                <Button variant="ghost" size="icon" onClick={nextOutfit}>
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            )}
          </div>

          {/* Right - Outfit details */}
          <div className="space-y-6">
            {generated && (
              <div className="animate-fade-up">
                <div className="bg-card rounded-3xl p-6 shadow-soft mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display text-2xl font-semibold text-foreground">
                      {sampleOutfits[currentOutfit].name}
                    </h2>
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Remix
                    </Button>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    {sampleOutfits[currentOutfit].items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-secondary rounded-xl"
                      >
                        <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                          <img 
                            src={`https://images.unsplash.com/photo-${1558171813 + index}-7d6a4b4b8f60?w=100&h=100&fit=crop`} 
                            alt={item}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Outfit reasoning */}
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <p className="text-sm text-muted-foreground italic">
                      "{sampleOutfits[currentOutfit].reason}"
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <Button variant="hero" size="lg" className="flex-1">
                      <Heart className="w-4 h-4 mr-2" />
                      Save to Favorites
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1" onClick={resetUpload}>
                      Try Another
                    </Button>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="elegant" size="default" className="flex-1 text-sage border-sage hover:bg-sage hover:text-sage-foreground">
                      <Recycle className="w-4 h-4 mr-2" />
                      Upcycle Item
                    </Button>
                    <Button variant="elegant" size="default" className="flex-1 text-sage border-sage hover:bg-sage hover:text-sage-foreground">
                      <Gift className="w-4 h-4 mr-2" />
                      Donate Item
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {!generated && (
              <div className="bg-card rounded-3xl p-6 shadow-soft animate-fade-up">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  How it works
                </h3>
                <div className="space-y-4">
                  {[
                    { step: 1, title: "Choose your method", desc: "Full body photo or selfie with body type" },
                    { step: 2, title: "Upload your image", desc: "Instantly processed, never stored" },
                    { step: 3, title: "See the magic", desc: "AI generates the look on you" },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-primary">{item.step}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy badge */}
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
              <Shield className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-700">
                Your image is processed instantly and auto-deleted. Never stored.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
