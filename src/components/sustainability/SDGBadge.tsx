import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SDGBadgeProps {
  sdg: 11 | 12 | 13;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const sdgData = {
  11: {
    name: "Sustainable Cities",
    description: "Making cities inclusive, safe, resilient, and sustainable",
    color: "bg-amber-500",
    icon: "🏙️",
  },
  12: {
    name: "Responsible Consumption",
    description: "Ensuring sustainable consumption and production patterns",
    color: "bg-amber-600",
    icon: "♻️",
  },
  13: {
    name: "Climate Action",
    description: "Taking urgent action to combat climate change",
    color: "bg-sage",
    icon: "🌍",
  },
};

const SDGBadge = ({ sdg, size = "md", showLabel = false }: SDGBadgeProps) => {
  const data = sdgData[sdg];
  
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2">
          <div 
            className={`${sizeClasses[size]} ${data.color} rounded-lg flex items-center justify-center text-background font-bold shadow-soft cursor-help transition-transform hover:scale-105`}
          >
            {sdg}
          </div>
          {showLabel && (
            <span className="text-xs text-muted-foreground font-medium">
              {data.name}
            </span>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-[200px]">
        <div className="space-y-1">
          <p className="font-medium flex items-center gap-1">
            {data.icon} SDG {sdg}: {data.name}
          </p>
          <p className="text-xs text-muted-foreground">{data.description}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default SDGBadge;
