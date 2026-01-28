import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sparkles, 
  Send, 
  Lightbulb, 
  Palette, 
  Sun,
  Heart,
  X
} from "lucide-react";

interface AIAssistantProps {
  onClose?: () => void;
}

const quickTips = [
  {
    icon: Palette,
    title: "Color Harmony",
    tip: "Neutrals like beige and cream pair beautifully with soft sage greens for a sophisticated eco-chic look."
  },
  {
    icon: Sun,
    title: "Seasonal Styling",
    tip: "Layer light breathable fabrics in summer. Try a linen blouse with cotton trousers from your wardrobe."
  },
  {
    icon: Heart,
    title: "Capsule Wardrobe",
    tip: "Focus on 30-40 versatile pieces that mix and match. Quality over quantity reduces waste."
  }
];

const suggestedQuestions = [
  "What colors match my beige coat?",
  "Suggest an outfit for a job interview",
  "How can I style a white shirt 5 ways?",
  "What to wear for a summer wedding?"
];

const AIAssistant = ({ onClose }: AIAssistantProps) => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<Array<{ role: string; content: string }>>([
    { 
      role: "assistant", 
      content: "Hi! I'm your AI styling assistant. I can help with outfit ideas, color matching, and sustainable fashion tips. What would you like to know?" 
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = { role: "user", content: message };
    setConversation(prev => [...prev, userMessage]);
    
    // Simulate AI response (in production, this would call the AI API)
    setTimeout(() => {
      const responses = [
        "Great question! Based on color theory, I'd recommend pairing that with soft neutral tones like cream, beige, or a muted sage green for a harmonious look.",
        "For that occasion, I suggest something elegant yet comfortable. Check your wardrobe for a structured blazer paired with well-fitted trousers.",
        "That's a versatile piece! You can dress it up with accessories or keep it minimal for everyday wear. Try layering with items you already own.",
        "Consider the 30-wear rule: if you won't wear it at least 30 times, it might not be worth adding to your wardrobe. Focus on timeless pieces!"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setConversation(prev => [...prev, { role: "assistant", content: randomResponse }]);
    }, 1000);
    
    setMessage("");
  };

  const handleQuickQuestion = (question: string) => {
    setMessage(question);
  };

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">AI Stylist</h3>
            <p className="text-xs text-muted-foreground">Your personal fashion advisor</p>
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Quick Tips */}
      <div className="p-4 bg-secondary/30 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-foreground uppercase tracking-wide">Quick Tips</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {quickTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-card rounded-xl">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <tip.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{tip.title}</p>
                <p className="text-xs text-muted-foreground">{tip.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-secondary text-foreground rounded-bl-md"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Questions */}
      <div className="px-4 pb-2">
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.slice(0, 2).map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="text-xs px-3 py-1.5 bg-secondary rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about styling, colors, outfits..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
