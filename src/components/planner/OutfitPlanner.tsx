import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { 
  CalendarIcon, 
  Plus, 
  Sparkles, 
  Sun, 
  Cloud, 
  CloudRain, 
  Snowflake,
  X,
  Check,
  Trash2
} from "lucide-react";

interface WardrobeItem {
  id: string;
  preview: string;
  category: string;
  name?: string;
}

interface PlannedOutfit {
  id: string;
  date: Date;
  occasion: string;
  weather: string;
  items: WardrobeItem[];
}

const occasions = [
  { id: "work", label: "Work", emoji: "💼" },
  { id: "casual", label: "Casual", emoji: "☕" },
  { id: "date", label: "Date Night", emoji: "💕" },
  { id: "party", label: "Party", emoji: "🎉" },
  { id: "fitness", label: "Fitness", emoji: "🏃" },
  { id: "travel", label: "Travel", emoji: "✈️" },
];

const weatherOptions = [
  { id: "sunny", label: "Sunny", icon: Sun, temp: "25°C+" },
  { id: "cloudy", label: "Cloudy", icon: Cloud, temp: "15-24°C" },
  { id: "rainy", label: "Rainy", icon: CloudRain, temp: "10-20°C" },
  { id: "cold", label: "Cold", icon: Snowflake, temp: "Below 10°C" },
];

// Sample wardrobe items (shared with WardrobePage)
const sampleWardrobeItems: WardrobeItem[] = [
  { id: "1", preview: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop", category: "tops", name: "White Linen Shirt" },
  { id: "2", preview: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop", category: "bottoms", name: "High-Waist Jeans" },
  { id: "3", preview: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop", category: "dresses", name: "Floral Midi Dress" },
  { id: "4", preview: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=300&fit=crop", category: "outerwear", name: "Beige Trench Coat" },
  { id: "5", preview: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop", category: "shoes", name: "White Sneakers" },
  { id: "6", preview: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop", category: "tops", name: "Navy Cashmere Sweater" },
];

interface OutfitPlannerProps {
  isOpen: boolean;
  onClose: () => void;
}

const OutfitPlanner = ({ isOpen, onClose }: OutfitPlannerProps) => {
  const [step, setStep] = useState<"list" | "create">("list");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<WardrobeItem[]>([]);
  const [plannedOutfits, setPlannedOutfits] = useState<PlannedOutfit[]>([]);
  const [editingOutfit, setEditingOutfit] = useState<PlannedOutfit | null>(null);

  const resetForm = () => {
    setSelectedDate(new Date());
    setSelectedOccasion(null);
    setSelectedWeather(null);
    setSelectedItems([]);
    setEditingOutfit(null);
  };

  const handleCreateNew = () => {
    resetForm();
    setStep("create");
  };

  const handleItemToggle = (item: WardrobeItem) => {
    setSelectedItems(prev => 
      prev.some(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
    );
  };

  const handleSaveOutfit = () => {
    if (!selectedDate || !selectedOccasion || !selectedWeather || selectedItems.length === 0) {
      return;
    }

    const newOutfit: PlannedOutfit = {
      id: editingOutfit?.id || Math.random().toString(36).substr(2, 9),
      date: selectedDate,
      occasion: selectedOccasion,
      weather: selectedWeather,
      items: selectedItems,
    };

    if (editingOutfit) {
      setPlannedOutfits(prev => prev.map(o => o.id === editingOutfit.id ? newOutfit : o));
    } else {
      setPlannedOutfits(prev => [...prev, newOutfit]);
    }

    resetForm();
    setStep("list");
  };

  const handleEditOutfit = (outfit: PlannedOutfit) => {
    setEditingOutfit(outfit);
    setSelectedDate(outfit.date);
    setSelectedOccasion(outfit.occasion);
    setSelectedWeather(outfit.weather);
    setSelectedItems(outfit.items);
    setStep("create");
  };

  const handleDeleteOutfit = (outfitId: string) => {
    setPlannedOutfits(prev => prev.filter(o => o.id !== outfitId));
  };

  const canSave = selectedDate && selectedOccasion && selectedWeather && selectedItems.length > 0;

  const getWeatherIcon = (weatherId: string) => {
    const weather = weatherOptions.find(w => w.id === weatherId);
    return weather ? weather.icon : Sun;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            {step === "list" ? "Outfit Planner" : editingOutfit ? "Edit Outfit" : "Plan New Outfit"}
          </DialogTitle>
        </DialogHeader>

        {step === "list" ? (
          <div className="space-y-4">
            {/* Create New Button */}
            <Button 
              variant="hero" 
              className="w-full"
              onClick={handleCreateNew}
            >
              <Plus className="w-4 h-4 mr-2" />
              Plan New Outfit
            </Button>

            {/* Planned Outfits List */}
            {plannedOutfits.length > 0 ? (
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Your Planned Outfits</p>
                {plannedOutfits.map((outfit) => {
                  const WeatherIcon = getWeatherIcon(outfit.weather);
                  const occasion = occasions.find(o => o.id === outfit.occasion);
                  
                  return (
                    <div
                      key={outfit.id}
                      className="bg-card rounded-xl p-4 shadow-soft border border-border/50"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium text-foreground">
                            {format(outfit.date, "EEE, MMM d")}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm">{occasion?.emoji}</span>
                            <span className="text-sm text-muted-foreground">{occasion?.label}</span>
                            <WeatherIcon className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8"
                            onClick={() => handleEditOutfit(outfit)}
                          >
                            <Sparkles className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteOutfit(outfit.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Outfit Items Preview */}
                      <div className="flex gap-2 overflow-x-auto">
                        {outfit.items.map((item) => (
                          <div
                            key={item.id}
                            className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-secondary"
                          >
                            <img
                              src={item.preview}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No outfits planned yet.</p>
                <p className="text-sm text-muted-foreground">Start planning your looks!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Date Selection */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Select Date</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Occasion Selection */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Occasion</p>
              <div className="grid grid-cols-3 gap-2">
                {occasions.map((occasion) => (
                  <button
                    key={occasion.id}
                    onClick={() => setSelectedOccasion(occasion.id)}
                    className={cn(
                      "p-3 rounded-xl text-center transition-all",
                      selectedOccasion === occasion.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80 text-foreground"
                    )}
                  >
                    <span className="text-lg block mb-1">{occasion.emoji}</span>
                    <span className="text-xs font-medium">{occasion.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Weather Selection */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Expected Weather</p>
              <div className="grid grid-cols-2 gap-2">
                {weatherOptions.map((weather) => (
                  <button
                    key={weather.id}
                    onClick={() => setSelectedWeather(weather.id)}
                    className={cn(
                      "p-3 rounded-xl flex items-center gap-3 transition-all",
                      selectedWeather === weather.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80 text-foreground"
                    )}
                  >
                    <weather.icon className="w-5 h-5" />
                    <div className="text-left">
                      <span className="text-sm font-medium block">{weather.label}</span>
                      <span className="text-xs opacity-70">{weather.temp}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Wardrobe Item Selection */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">
                Select Items ({selectedItems.length} selected)
              </p>
              <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {sampleWardrobeItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemToggle(item)}
                    className={cn(
                      "relative aspect-square rounded-xl overflow-hidden transition-all",
                      selectedItems.some(i => i.id === item.id)
                        ? "ring-2 ring-primary ring-offset-2"
                        : "hover:opacity-80"
                    )}
                  >
                    <img
                      src={item.preview}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {selectedItems.some(i => i.id === item.id) && (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  resetForm();
                  setStep("list");
                }}
              >
                Cancel
              </Button>
              <Button
                variant="hero"
                className="flex-1"
                disabled={!canSave}
                onClick={handleSaveOutfit}
              >
                <Check className="w-4 h-4 mr-2" />
                {editingOutfit ? "Update Outfit" : "Save Outfit"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OutfitPlanner;
