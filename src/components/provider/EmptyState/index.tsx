import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface EmptyStateProps {
  onUpdateAvailability?: () => void;
}

export default function EmptyState({ onUpdateAvailability }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      <Calendar className="w-12 h-12 text-muted-foreground/30 mb-3" />
      <p className="text-sm text-muted-foreground">
        Enjoy your day off! Turn on availability to receive last-minute
        requests.
      </p>
      <Button
        variant="outline"
        size="sm"
        className="mt-4"
        onClick={onUpdateAvailability}
      >
        Update Availability
      </Button>
    </div>
  );
}
