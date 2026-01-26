import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Image, X, Sparkles, ArrowRight, Shirt, Check } from "lucide-react";

interface WardrobeUploadProps {
  onComplete: () => void;
}

const categories = [
  { id: "tops", name: "Tops", icon: "👕" },
  { id: "bottoms", name: "Bottoms", icon: "👖" },
  { id: "dresses", name: "Dresses", icon: "👗" },
  { id: "shoes", name: "Shoes", icon: "👟" },
  { id: "accessories", name: "Accessories", icon: "👜" },
];

interface UploadedItem {
  id: string;
  file: File;
  preview: string;
  category?: string;
  analyzing: boolean;
}

const WardrobeUpload = ({ onComplete }: WardrobeUploadProps) => {
  const [items, setItems] = useState<UploadedItem[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = useCallback((files: FileList) => {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newItem: UploadedItem = {
            id: Math.random().toString(36).substr(2, 9),
            file,
            preview: e.target?.result as string,
            analyzing: true,
          };
          setItems((prev) => [...prev, newItem]);
          
          // Simulate AI analysis
          setTimeout(() => {
            setItems((prev) =>
              prev.map((item) =>
                item.id === newItem.id
                  ? { ...item, analyzing: false, category: categories[Math.floor(Math.random() * categories.length)].id }
                  : item
              )
            );
          }, 1500 + Math.random() * 1000);
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-1 bg-foreground rounded-full" />
          <div className="w-8 h-1 bg-foreground rounded-full" />
          <div className="w-8 h-1 bg-foreground/20 rounded-full" />
        </div>

        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Build Your Wardrobe
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Upload photos of your clothes. Our AI will automatically categorize them for you.
          </p>
        </div>

        {/* Upload area */}
        <div
          className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 mb-8 animate-fade-up ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border bg-secondary/30 hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          style={{ animationDelay: '0.1s' }}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            Drop your photos here
          </h3>
          <p className="text-muted-foreground mb-4">or click to browse</p>
          <p className="text-sm text-muted-foreground">
            Supports JPG, PNG • Multiple files allowed
          </p>
        </div>

        {/* Category legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </div>
          ))}
        </div>

        {/* Uploaded items grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {items.map((item) => (
              <div key={item.id} className="relative group">
                <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
                  <img
                    src={item.preview}
                    alt="Uploaded item"
                    className="w-full h-full object-cover"
                  />
                  {item.analyzing && (
                    <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                      <div className="flex items-center gap-2 text-background">
                        <Sparkles className="w-5 h-5 animate-pulse-soft" />
                        <span className="text-sm font-medium">Analyzing...</span>
                      </div>
                    </div>
                  )}
                </div>
                {!item.analyzing && item.category && (
                  <div className="absolute bottom-2 left-2 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                    <span>{categories.find((c) => c.id === item.category)?.icon}</span>
                    <span className="text-sm font-medium text-foreground">
                      {categories.find((c) => c.id === item.category)?.name}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Continue button */}
        <div className="flex justify-center gap-4">
          {items.length === 0 ? (
            <Button variant="elegant" size="lg" onClick={onComplete}>
              Skip for now
            </Button>
          ) : (
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onComplete}
              disabled={items.some((i) => i.analyzing)}
              className="group"
            >
              Continue to Try-On
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </div>

        {/* Privacy note */}
        <p className="text-center text-sm text-muted-foreground mt-8 flex items-center justify-center gap-2">
          <Check className="w-4 h-4 text-green-500" />
          Your photos are processed securely and never stored
        </p>
      </div>
    </div>
  );
};

export default WardrobeUpload;
