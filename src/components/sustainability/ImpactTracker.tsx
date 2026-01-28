import { Droplets, Wind, Trash2, TrendingUp } from "lucide-react";
import SDGBadge from "./SDGBadge";

interface ImpactTrackerProps {
  compact?: boolean;
}

const impactMetrics = {
  co2Saved: 12.5,
  waterSaved: 8200,
  textilesSaved: 4.2,
  outfitsStyled: 47,
  itemsDonated: 8,
  itemsUpcycled: 3,
};

const ImpactTracker = ({ compact = false }: ImpactTrackerProps) => {
  if (compact) {
    return (
      <div className="flex items-center gap-4 p-3 bg-sage-light rounded-xl">
        <div className="flex items-center gap-1.5">
          <Wind className="w-4 h-4 text-sage" />
          <span className="text-sm font-medium text-sage-foreground">{impactMetrics.co2Saved}kg CO₂</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Droplets className="w-4 h-4 text-sage" />
          <span className="text-sm font-medium text-sage-foreground">{(impactMetrics.waterSaved / 1000).toFixed(1)}k L</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Trash2 className="w-4 h-4 text-sage" />
          <span className="text-sm font-medium text-sage-foreground">{impactMetrics.textilesSaved}kg</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* SDG Badges */}
      <div className="flex items-center justify-center gap-3 p-4 bg-sage-light/50 rounded-2xl">
        <span className="text-sm text-muted-foreground mr-2">Supporting:</span>
        <SDGBadge sdg={11} size="sm" />
        <SDGBadge sdg={12} size="sm" />
        <SDGBadge sdg={13} size="sm" />
      </div>

      {/* Main Impact Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl p-4 shadow-soft text-center">
          <div className="w-10 h-10 bg-sage-light rounded-xl flex items-center justify-center mx-auto mb-2">
            <Wind className="w-5 h-5 text-sage" />
          </div>
          <p className="font-display text-2xl font-bold text-foreground">{impactMetrics.co2Saved}</p>
          <p className="text-xs text-muted-foreground">kg CO₂ saved</p>
        </div>
        <div className="bg-card rounded-2xl p-4 shadow-soft text-center">
          <div className="w-10 h-10 bg-sage-light rounded-xl flex items-center justify-center mx-auto mb-2">
            <Droplets className="w-5 h-5 text-sage" />
          </div>
          <p className="font-display text-2xl font-bold text-foreground">{(impactMetrics.waterSaved / 1000).toFixed(1)}k</p>
          <p className="text-xs text-muted-foreground">liters water saved</p>
        </div>
        <div className="bg-card rounded-2xl p-4 shadow-soft text-center">
          <div className="w-10 h-10 bg-sage-light rounded-xl flex items-center justify-center mx-auto mb-2">
            <Trash2 className="w-5 h-5 text-sage" />
          </div>
          <p className="font-display text-2xl font-bold text-foreground">{impactMetrics.textilesSaved}</p>
          <p className="text-xs text-muted-foreground">kg textiles saved</p>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="bg-secondary rounded-2xl p-4 space-y-3">
        <h4 className="font-medium text-foreground flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-sage" />
          Your Activity
        </h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-display text-xl font-semibold text-foreground">{impactMetrics.outfitsStyled}</p>
            <p className="text-xs text-muted-foreground">Outfits styled</p>
          </div>
          <div>
            <p className="font-display text-xl font-semibold text-foreground">{impactMetrics.itemsDonated}</p>
            <p className="text-xs text-muted-foreground">Items donated</p>
          </div>
          <div>
            <p className="font-display text-xl font-semibold text-foreground">{impactMetrics.itemsUpcycled}</p>
            <p className="text-xs text-muted-foreground">Items upcycled</p>
          </div>
        </div>
      </div>

      {/* Sustainability Note */}
      <p className="text-xs text-center text-muted-foreground italic px-4">
        "Extending the life of clothes by just 9 months reduces carbon, waste, and water footprints by up to 30%."
      </p>
    </div>
  );
};

export default ImpactTracker;
