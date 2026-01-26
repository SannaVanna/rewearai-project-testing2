import { Shirt, Camera, Leaf, Sparkles, Shield, Palette } from "lucide-react";
import wardrobeImage from "@/assets/wardrobe-preview.jpg";
import tryonImage from "@/assets/tryon-preview.jpg";

const features = [
  {
    icon: Shirt,
    title: "Smart Wardrobe",
    description: "Upload your clothes and let AI categorize them automatically. Build your digital closet effortlessly.",
  },
  {
    icon: Camera,
    title: "Virtual Try-On",
    description: "See outfits on your own body using just a photo. No measurements needed.",
  },
  {
    icon: Sparkles,
    title: "AI Styling",
    description: "Get personalized outfit suggestions based on your style preferences and occasions.",
  },
  {
    icon: Palette,
    title: "Color Matching",
    description: "Our AI understands color theory to create harmonious outfit combinations.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Track your wardrobe usage and see how you're reducing fashion waste.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your photos are auto-deleted after processing. We never store your images.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4 text-foreground">
            Fashion Meets Technology
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed to transform how you style your wardrobe
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group p-6 bg-card rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-soft transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Showcase section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              Your Entire Wardrobe, Digitized
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Simply snap photos of your clothes and watch as our AI organizes everything into a beautiful digital wardrobe. Find pieces instantly, mix and match with ease.
            </p>
            <ul className="space-y-3">
              {["Automatic categorization", "Search by color, type, or occasion", "Track what you wear most"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-xl" />
            <img 
              src={wardrobeImage} 
              alt="Digital Wardrobe" 
              className="relative rounded-3xl shadow-soft w-full"
            />
          </div>
        </div>

        {/* Second showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-20">
          <div className="relative order-2 lg:order-1 animate-fade-up">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 rounded-3xl blur-xl" />
            <img 
              src={tryonImage} 
              alt="Virtual Try-On" 
              className="relative rounded-3xl shadow-soft w-full"
            />
          </div>
          <div className="space-y-6 order-1 lg:order-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              See Before You Wear
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Upload a full-body photo and instantly see how different outfit combinations look on you. Perfect for planning your day or a special occasion.
            </p>
            <ul className="space-y-3">
              {["Realistic AI visualization", "Mix items from your wardrobe", "Save favorite combinations"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
