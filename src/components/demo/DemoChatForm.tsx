import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { ChatSession } from "./DemoChatWidget";

interface DemoChatFormProps {
  onSessionCreated: (session: ChatSession) => void;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/demo-chat`;

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
    
    // Client-side validation
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast({
        title: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create session via edge function (server-side validation)
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          action: "create_session",
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          clinicType: formData.clinicType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create session");
      }

      onSessionCreated({
        id: data.session.id,
        visitorName: data.session.visitorName,
        visitorEmail: data.session.visitorEmail,
        visitorPhone: data.session.visitorPhone,
        clinicType: data.session.clinicType as ChatSession["clinicType"],
      });
    } catch (error) {
      console.error("Error creating session:", error);
      toast({
        title: "Error starting chat",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5 overflow-y-auto h-full overscroll-contain flex flex-col">
      <div className="text-center mb-4 flex-shrink-0">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Experience the AI in Action
        </h3>
        <p className="text-sm text-muted-foreground">
          See how GrowthOS engages patients 24/7. Enter your details to start the demo.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 flex-1">
        <div className="space-y-2">
          <Label htmlFor="demo-name">Your Name</Label>
          <Input
            id="demo-name"
            placeholder="Jane Smith"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-11"
            disabled={isSubmitting}
            maxLength={100}
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
            maxLength={255}
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
            maxLength={30}
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
