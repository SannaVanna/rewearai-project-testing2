import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Package, MapPin, CheckCircle, ChevronRight } from "lucide-react";

const charityPartners = [
  { id: "oxfam", name: "Oxfam", description: "Supporting communities worldwide", logo: "🌍" },
  { id: "salvation", name: "Salvation Army", description: "Helping those in need", logo: "❤️" },
  { id: "goodwill", name: "Goodwill", description: "Job training & employment", logo: "🤝" },
  { id: "local", name: "Local Shelter", description: "Your neighborhood support", logo: "🏠" },
];

interface DonationHubProps {
  onClose?: () => void;
}

const DonationHub = ({ onClose }: DonationHubProps) => {
  const [selectedCharity, setSelectedCharity] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "items" | "confirm" | "success">("select");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const mockWardrobeItems = [
    { id: "1", name: "Blue Denim Jacket", category: "Outerwear" },
    { id: "2", name: "White Cotton Blouse", category: "Tops" },
    { id: "3", name: "Black Midi Skirt", category: "Bottoms" },
    { id: "4", name: "Beige Linen Pants", category: "Bottoms" },
    { id: "5", name: "Floral Summer Dress", category: "Dresses" },
  ];

  const toggleItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleConfirmDonation = () => {
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-sage" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
          Thank You! 🌱
        </h3>
        <p className="text-muted-foreground mb-4">
          Your donation of {selectedItems.length} items will make a difference.
        </p>
        <div className="bg-sage-light rounded-xl p-4 mb-6">
          <p className="text-sm text-sage-foreground">
            <strong>Impact:</strong> You've helped save approximately{" "}
            <span className="font-semibold">{selectedItems.length * 2.5}kg</span> of CO₂ emissions
          </p>
        </div>
        <Button onClick={onClose} variant="outline" className="border-sage text-sage hover:bg-sage-light">
          Close
        </Button>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            Confirm Donation
          </h3>
          <p className="text-muted-foreground text-sm">
            Review your donation details
          </p>
        </div>

        <div className="bg-sage-light rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{charityPartners.find(c => c.id === selectedCharity)?.logo}</span>
            <div>
              <p className="font-medium text-foreground">
                {charityPartners.find(c => c.id === selectedCharity)?.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedItems.length} items selected
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {selectedItems.map(id => {
            const item = mockWardrobeItems.find(i => i.id === id);
            return (
              <div key={id} className="flex items-center gap-3 p-3 bg-secondary rounded-xl">
                <div className="w-10 h-10 bg-muted rounded-lg" />
                <span className="text-sm text-foreground">{item?.name}</span>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => setStep("items")}
          >
            Back
          </Button>
          <Button 
            className="flex-1 bg-sage hover:bg-sage/90 text-sage-foreground"
            onClick={handleConfirmDonation}
          >
            <Heart className="w-4 h-4 mr-2" />
            Confirm Donation
          </Button>
        </div>
      </div>
    );
  }

  if (step === "items") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            Select Items to Donate
          </h3>
          <p className="text-muted-foreground text-sm">
            Choose clothes from your wardrobe
          </p>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {mockWardrobeItems.map(item => (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                selectedItems.includes(item.id)
                  ? "bg-sage-light border-2 border-sage"
                  : "bg-secondary hover:bg-secondary/80 border-2 border-transparent"
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedItems.includes(item.id)
                  ? "border-sage bg-sage"
                  : "border-muted-foreground"
              }`}>
                {selectedItems.includes(item.id) && (
                  <CheckCircle className="w-3 h-3 text-background" />
                )}
              </div>
              <div className="w-10 h-10 bg-muted rounded-lg" />
              <div className="text-left flex-1">
                <p className="text-sm font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.category}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => setStep("select")}
          >
            Back
          </Button>
          <Button 
            className="flex-1 bg-sage hover:bg-sage/90 text-sage-foreground"
            onClick={() => setStep("confirm")}
            disabled={selectedItems.length === 0}
          >
            Continue ({selectedItems.length})
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-14 h-14 bg-sage-light rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Heart className="w-7 h-7 text-sage" />
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          Donate Your Clothes
        </h3>
        <p className="text-muted-foreground text-sm">
          Give your clothes a second life with our charity partners
        </p>
      </div>

      <div className="space-y-3">
        {charityPartners.map(charity => (
          <button
            key={charity.id}
            onClick={() => setSelectedCharity(charity.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
              selectedCharity === charity.id
                ? "bg-sage-light border-2 border-sage"
                : "bg-secondary hover:bg-secondary/80 border-2 border-transparent"
            }`}
          >
            <span className="text-2xl">{charity.logo}</span>
            <div className="text-left flex-1">
              <p className="font-medium text-foreground">{charity.name}</p>
              <p className="text-sm text-muted-foreground">{charity.description}</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${
              selectedCharity === charity.id
                ? "border-sage bg-sage"
                : "border-muted-foreground"
            }`}>
              {selectedCharity === charity.id && (
                <CheckCircle className="w-4 h-4 text-background" />
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 p-3 bg-muted rounded-xl">
        <MapPin className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Free pickup available in your area
        </span>
      </div>

      <Button 
        className="w-full bg-sage hover:bg-sage/90 text-sage-foreground"
        onClick={() => setStep("items")}
        disabled={!selectedCharity}
      >
        <Package className="w-4 h-4 mr-2" />
        Select Items to Donate
      </Button>
    </div>
  );
};

export default DonationHub;
