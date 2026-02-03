"use client";

import { CheckCircle2, Send } from "lucide-react";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  Button,
} from "@/components/ui";
import { Provider } from "@/components/ProviderCard";

interface MessageSuccessViewProps {
  provider: Provider;
  onClose: () => void;
}

export const MessageSuccessView = ({
  provider,
  onClose,
}: MessageSuccessViewProps) => {
  return (
    <DialogContent className="sm:max-w-md text-center p-12 overflow-hidden border-none glass-card">
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center text-success mb-2">
          <Send className="w-10 h-10" />
        </div>
        <DialogTitle className="text-2xl font-bold">Message Sent!</DialogTitle>
        <DialogDescription className="text-lg">
          Your message has been delivered to{" "}
          <span className="font-bold text-foreground">{provider.name}</span>.
          They usually respond within 24 hours.
        </DialogDescription>

        <div className="flex items-center gap-2 text-sm text-success font-medium bg-success/5 px-4 py-2 rounded-full mt-4">
          <CheckCircle2 className="w-4 h-4" />
          Sent to contact@{provider.name.toLowerCase().replace(" ", "")}.com
        </div>

        <Button
          variant="coral"
          className="w-full mt-8 h-12 rounded-xl text-lg font-bold"
          onClick={onClose}
        >
          Got it
        </Button>
      </div>
    </DialogContent>
  );
};
