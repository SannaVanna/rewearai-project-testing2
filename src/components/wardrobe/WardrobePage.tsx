import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Sparkles, Plus, Shirt, ArrowLeft, Check, Filter } from "lucide-react";

interface WardrobePageProps {
  onNavigate: (screen: string) => void;
}

const categories = [
  { id: "all", name: "All", icon: "✨" },
  { id: "tops", name: "Tops", icon: "👕" },
  { id: "bottoms", name: "Bottoms", icon: "👖" },
  { id: "dresses", name: "Dresses", icon: "👗" },
  { id: "outerwear", name: "Outerwear", icon: "🧥" },
  { id: "shoes", name: "Shoes", icon: "👟" },
];

interface WardrobeItem {
  id: string;
  preview: string;
  category: string;
  name?: string;
}

// Sample wardrobe items with real fashion images
const sampleItems: WardrobeItem[] = [
  { id: "1", preview: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop", category: "tops", name: "White Linen Shirt" },
  { id: "2", preview: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop", category: "bottoms", name: "High-Waist Jeans" },
  { id: "3", preview: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop", category: "dresses", name: "Floral Midi Dress" },
  { id: "4", preview: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=300&fit=crop", category: "outerwear", name: "Beige Trench Coat" },
  { id: "5", preview: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop", category: "shoes", name: "White Sneakers" },
  { id: "6", preview: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop", category: "tops", name: "Navy Cashmere Sweater" },
];

const WardrobePage = ({ onNavigate }: WardrobePageProps) => {
  const [items, setItems] = useState<WardrobeItem[]>(sampleItems);
  const [activeCategory, setActiveCategory] = useState("all");
  const [dragActive, setDragActive] = useState(false);

  const filteredItems = activeCategory === "all" 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const handleFiles = useCallback((files: FileList) => {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newItem: WardrobeItem = {
            id: Math.random().toString(36).substr(2, 9),
            preview: e.target?.result as string,
            category: "tops", // Default category
            name: file.name.replace(/\.[^/.]+$/, ""),
          };
          setItems((prev) => [...prev, newItem]);
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
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-gradient-to-b from-secondary/50 to-background pt-8 pb-6 px-4">
        <div className="container max-w-4xl">
          <div className="text-center animate-fade-up">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shirt className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-2">
              Your Wardrobe
            </h1>
            <p className="text-muted-foreground">
              {items.length} items in your collection
            </p>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl px-4">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-foreground text-background"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 mb-8 animate-fade-up ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border bg-secondary/20 hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          style={{ animationDelay: '0.15s' }}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Plus className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground mb-1">
            Add new items
          </h3>
          <p className="text-sm text-muted-foreground">
            Drop photos here or click to browse
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {filteredItems.map((item) => (
            <div key={item.id} className="relative group">
              <div className="aspect-square rounded-2xl overflow-hidden bg-secondary shadow-soft">
                {item.preview ? (
                  <img
                    src={item.preview}
                    alt={item.name || "Wardrobe item"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    {categories.find(c => c.id === item.category)?.icon || "👕"}
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-foreground/60 to-transparent rounded-b-2xl">
                <p className="text-sm font-medium text-background truncate">
                  {item.name}
                </p>
                <p className="text-xs text-background/70 capitalize">
                  {item.category}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 w-8 h-8 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items in this category yet.</p>
          </div>
        )}

        {/* AI Styling CTA */}
        <div className="mt-12 p-6 bg-card rounded-2xl shadow-soft animate-fade-up" style={{ animationDelay: '0.25s' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                Ready for styling?
              </h3>
              <p className="text-sm text-muted-foreground">
                Let AI create outfit combinations from your wardrobe
              </p>
            </div>
            <Button 
              variant="hero" 
              onClick={() => onNavigate("dashboard")}
              className="shrink-0"
            >
              Get Styled
            </Button>
          </div>
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

export default WardrobePage;
