import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import type { ChatSession } from "./DemoChatWidget";

interface DemoChatFormProps {
  onSessionCreated: (session: ChatSession) => void;
}

const DemoChatForm = ({ onSessionCreated }: DemoChatFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    clinicType: "fertility" as "fertility" | "med_spa" | "regenerative" | "other",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from("demo_chat_sessions")
        .insert({
          visitor_name: formData.name.trim(),
          visitor_email: formData.email.trim(),
          visitor_phone: formData.phone.trim(),
          clinic_type: formData.clinicType,
        })
        .select()
        .single();

      if (error) throw error;

      onSessionCreated({
        id: data.id,
        visitorName: data.visitor_name,
        visitorEmail: data.visitor_email,
        visitorPhone: data.visitor_phone,
        clinicType: data.clinic_type as ChatSession["clinicType"],
      });
    } catch (error) {
      console.error("Error creating session:", error);
      toast({
        title: "Error starting chat",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-orange to-secondary flex items-center justify-center mx-auto mb-4">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Experience the AI in Action
        </h3>
        <p className="text-sm text-muted-foreground">
          See how GrowthOS engages patients 24/7. Enter your details to start the demo.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="demo-name">Your Name</Label>
          <Input
            id="demo-name"
            placeholder="Jane Smith"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-11"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="demo-email">Email Address</Label>
          <Input
            id="demo-email"
            type="email"
            placeholder="jane@clinic.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-11"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="demo-phone">Phone Number</Label>
          <Input
            id="demo-phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="h-11"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-3">
          <Label>What type of clinic are you?</Label>
          <RadioGroup
            value={formData.clinicType}
            onValueChange={(value) => 
              setFormData({ ...formData, clinicType: value as typeof formData.clinicType })
            }
            className="grid grid-cols-2 gap-2"
            disabled={isSubmitting}
          >
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
              <RadioGroupItem value="fertility" id="fertility" />
              <Label htmlFor="fertility" className="cursor-pointer text-sm">
                Fertility Clinic
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
              <RadioGroupItem value="med_spa" id="med_spa" />
              <Label htmlFor="med_spa" className="cursor-pointer text-sm">
                Med Spa
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
              <RadioGroupItem value="other" id="wellness" />
              <Label htmlFor="wellness" className="cursor-pointer text-sm">
                Wellness Center
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
              <RadioGroupItem value="regenerative" id="regenerative" />
              <Label htmlFor="regenerative" className="cursor-pointer text-sm">
                Regenerative Medicine
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Button
          type="submit"
          variant="hero"
          className="w-full h-12"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Starting...
            </>
          ) : (
            "Start Demo Chat"
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          This is a demo experience. No real appointments will be booked.
        </p>
      </form>
    </div>
  );
};

export default DemoChatForm;
