"use client";

import { CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  Button,
} from "@/components/ui";
import { Provider } from "@/components/ProviderCard";

interface BookingSuccessViewProps {
  provider: Provider;
  date: Date | undefined;
  time: string;
  onClose: () => void;
}

export const BookingSuccessView = ({
  provider,
  date,
  time,
  onClose,
}: BookingSuccessViewProps) => {
  return (
    <DialogContent className="sm:max-w-md text-center p-12">
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center text-success mb-2">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <DialogTitle className="text-2xl font-bold">
          Booking Request Sent!
        </DialogTitle>
        <DialogDescription className="text-lg">
          Your request has been sent to{" "}
          <span className="font-bold text-foreground">{provider.name}</span>.
          They will review and confirm your booking shortly.
        </DialogDescription>
        <div className="bg-muted/30 p-4 rounded-xl w-full text-left space-y-2 text-sm mt-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span className="font-medium">
              {date ? format(date, "PPP") : ""}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time:</span>
            <span className="font-medium">{time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service:</span>
            <span className="font-medium">{provider.category}</span>
          </div>
        </div>
        <Button
          variant="coral"
          className="w-full mt-6 h-12 rounded-xl text-lg font-bold"
          onClick={onClose}
        >
          Got it
        </Button>
      </div>
    </DialogContent>
  );
};
