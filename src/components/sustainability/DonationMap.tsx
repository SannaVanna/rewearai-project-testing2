import { useState } from "react";
import { MapPin, Navigation, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DonationCenter {
  id: string;
  name: string;
  description: string;
  distance: string;
  hours: string;
  position: { top: string; left: string };
}

const donationCenters: DonationCenter[] = [
  {
    id: "1",
    name: "Help Us Fight Poverty",
    description: "Clothing & household goods",
    distance: "0.5 miles",
    hours: "Mon-Sat 9am-6pm",
    position: { top: "35%", left: "25%" }
  },
  {
    id: "2",
    name: "Community Thrift Store",
    description: "All donations welcome",
    distance: "0.8 miles",
    hours: "Mon-Fri 10am-7pm",
    position: { top: "55%", left: "60%" }
  },
  {
    id: "3",
    name: "Green Circle Donations",
    description: "Sustainable fashion focus",
    distance: "1.2 miles",
    hours: "Tue-Sun 11am-5pm",
    position: { top: "25%", left: "70%" }
  },
  {
    id: "4",
    name: "Local Shelter Drop-off",
    description: "Warm clothing priority",
    distance: "1.5 miles",
    hours: "Daily 8am-8pm",
    position: { top: "70%", left: "35%" }
  }
];

const DonationMap = () => {
  const [selectedCenter, setSelectedCenter] = useState<DonationCenter | null>(null);

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1">
          Find Donation Centers Near You
        </h3>
        <p className="text-sm text-muted-foreground">
          Tap a pin to see details
        </p>
      </div>

      {/* Styled Map Container */}
      <div className="relative w-full h-64 bg-gradient-to-br from-sage-light/30 via-secondary to-sage-light/20 rounded-2xl border border-sage/20 overflow-hidden">
        {/* Map Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(rgba(139, 115, 85, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 115, 85, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Map Roads */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted/40 -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-muted/40 -translate-x-1/2" />
          <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-muted/30" />
          <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-muted/30" />
          <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-muted/30" />
          <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-muted/30" />
        </div>

        {/* User Location */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="w-4 h-4 bg-primary rounded-full border-2 border-background shadow-lg" />
            <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping" />
          </div>
        </div>

        {/* Donation Center Pins */}
        {donationCenters.map((center) => (
          <button
            key={center.id}
            onClick={() => setSelectedCenter(selectedCenter?.id === center.id ? null : center)}
            className={`absolute transform -translate-x-1/2 -translate-y-full transition-all duration-200 z-20 ${
              selectedCenter?.id === center.id ? 'scale-125' : 'hover:scale-110'
            }`}
            style={{ top: center.position.top, left: center.position.left }}
          >
            <div className={`relative ${selectedCenter?.id === center.id ? 'animate-bounce' : ''}`}>
              <MapPin 
                className={`w-8 h-8 drop-shadow-md ${
                  selectedCenter?.id === center.id 
                    ? 'text-sage fill-sage-light' 
                    : 'text-sage/80 fill-sage-light/50'
                }`} 
              />
              <Heart className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 text-background" />
            </div>
          </button>
        ))}
      </div>

      {/* Selected Center Details */}
      {selectedCenter && (
        <div className="bg-sage-light rounded-2xl p-4 border border-sage/20 animate-fade-in">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-display font-semibold text-foreground">
                {selectedCenter.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {selectedCenter.description}
              </p>
            </div>
            <span className="px-2 py-1 bg-sage/20 rounded-full text-xs font-medium text-sage-foreground">
              {selectedCenter.distance}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{selectedCenter.hours}</span>
            </div>
          </div>

          <Button 
            className="w-full bg-sage hover:bg-sage/90 text-sage-foreground"
            size="sm"
          >
            <Navigation className="w-4 h-4 mr-2" />
            Get Directions
          </Button>
        </div>
      )}

      {!selectedCenter && (
        <p className="text-center text-xs text-muted-foreground">
          📍 Your location • Green pins show nearby donation centers
        </p>
      )}
    </div>
  );
};

export default DonationMap;
