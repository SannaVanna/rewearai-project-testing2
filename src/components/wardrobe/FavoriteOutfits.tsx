import { useState } from "react";
import { Heart, DollarSign, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Outfit {
  id: string;
  name: string;
  items: string[];
  isFavorite: boolean;
  wearCount: number;
  totalCost: number;
  lastWorn?: string;
}

const mockOutfits: Outfit[] = [
  {
    id: "1",
    name: "Casual Friday",
    items: ["Blue Denim Jacket", "White Tee", "Black Jeans"],
    isFavorite: true,
    wearCount: 12,
    totalCost: 180,
    lastWorn: "2 days ago",
  },
  {
    id: "2",
    name: "Summer Brunch",
    items: ["Linen Blouse", "Floral Skirt", "Sandals"],
    isFavorite: true,
    wearCount: 8,
    totalCost: 145,
    lastWorn: "1 week ago",
  },
  {
    id: "3",
    name: "Office Chic",
    items: ["Blazer", "Silk Blouse", "Trousers"],
    isFavorite: false,
    wearCount: 15,
    totalCost: 320,
    lastWorn: "Yesterday",
  },
];

interface FavoriteOutfitsProps {
  showAll?: boolean;
}

const FavoriteOutfits = ({ showAll = false }: FavoriteOutfitsProps) => {
  const [outfits, setOutfits] = useState(mockOutfits);

  const toggleFavorite = (id: string) => {
    setOutfits(prev =>
      prev.map(outfit =>
        outfit.id === id ? { ...outfit, isFavorite: !outfit.isFavorite } : outfit
      )
    );
  };

  const getCostPerWear = (totalCost: number, wearCount: number) => {
    return (totalCost / wearCount).toFixed(2);
  };

  const displayOutfits = showAll ? outfits : outfits.filter(o => o.isFavorite).slice(0, 2);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          {showAll ? "All Outfits" : "Favorite Outfits"}
        </h3>
        {!showAll && (
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View all
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {displayOutfits.map(outfit => (
          <div
            key={outfit.id}
            className="bg-card rounded-2xl p-4 shadow-soft border border-border/50"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-foreground">{outfit.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {outfit.items.length} items
                </p>
              </div>
              <button
                onClick={() => toggleFavorite(outfit.id)}
                className={`p-2 rounded-full transition-colors ${
                  outfit.isFavorite
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary text-muted-foreground hover:text-primary"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${outfit.isFavorite ? "fill-current" : ""}`}
                />
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <DollarSign className="w-4 h-4" />
                <span>
                  <strong className="text-foreground">
                    ${getCostPerWear(outfit.totalCost, outfit.wearCount)}
                  </strong>
                  /wear
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{outfit.lastWorn}</span>
              </div>
            </div>

            {/* Cost per wear indicator */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Cost efficiency</span>
                <span className={`font-medium ${
                  parseFloat(getCostPerWear(outfit.totalCost, outfit.wearCount)) < 15
                    ? "text-sage"
                    : parseFloat(getCostPerWear(outfit.totalCost, outfit.wearCount)) < 30
                    ? "text-amber-600"
                    : "text-primary"
                }`}>
                  {parseFloat(getCostPerWear(outfit.totalCost, outfit.wearCount)) < 15
                    ? "Excellent"
                    : parseFloat(getCostPerWear(outfit.totalCost, outfit.wearCount)) < 30
                    ? "Good"
                    : "Building value"}
                </span>
              </div>
              <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    parseFloat(getCostPerWear(outfit.totalCost, outfit.wearCount)) < 15
                      ? "bg-sage"
                      : parseFloat(getCostPerWear(outfit.totalCost, outfit.wearCount)) < 30
                      ? "bg-amber-500"
                      : "bg-primary"
                  }`}
                  style={{
                    width: `${Math.min(100, (1 / parseFloat(getCostPerWear(outfit.totalCost, outfit.wearCount))) * 500)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {displayOutfits.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Heart className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No favorite outfits yet</p>
          <p className="text-sm">Start styling to save your favorites!</p>
        </div>
      )}
    </div>
  );
};

export default FavoriteOutfits;
