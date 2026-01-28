import { Leaf, TrendingDown, Recycle, Heart } from "lucide-react";

const stats = [
  { value: "92%", label: "of users shop less", icon: TrendingDown },
  { value: "40+", label: "outfits per item", icon: Recycle },
  { value: "2.5T", label: "gallons water saved", icon: Leaf },
];

const Sustainability = () => {
  return (
    <section className="py-24 gradient-hero overflow-hidden">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6 animate-fade-up">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">For a Better Future</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6 text-foreground animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Fashion That Cares
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
            The fashion industry is one of the largest polluters. By helping you love and use what you already own, we're making a difference together.
          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl shadow-soft animate-fade-up"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <p className="font-display text-4xl font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="relative animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-primary/20 font-display">"</div>
            <p className="font-display text-2xl md:text-3xl italic text-foreground/80 mb-4">
              The most sustainable outfit is the one already in your closet.
            </p>
            <cite className="text-muted-foreground not-italic">— Rewear AI Philosophy</cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
