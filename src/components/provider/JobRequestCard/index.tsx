import { Card, CardContent } from "@/components/ui/card";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";
import { Job } from "../types";

interface JobRequestCardProps {
  job: Job;
  onAccept?: (jobId: string) => void;
  onDecline?: (jobId: string) => void;
}

export default function JobRequestCard({
  job,
  onAccept,
  onDecline,
}: JobRequestCardProps) {
  const customerName = job.customer?.name || "Unknown Customer";
  const scheduledDate = new Date(job.date);
  const formattedDate = moment(scheduledDate).format("MMM D, h:mm A");

  return (
    <Card className="shadow-soft border-border hover:border-primary/50 transition-colors">
      <CardContent className="p-6 flex flex-col sm:flex-row gap-6 items-center">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-lg shrink-0">
          {customerName.charAt(0)}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-semibold text-foreground">{customerName}</h3>
          <p className="text-sm text-muted-foreground mb-2">{job.service}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1 capitalize">
              <MapPin className="w-3 h-3" />
              {job.location}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formattedDate}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xl font-bold text-foreground mb-2">
            ${job.price}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8"
              onClick={() => onDecline?.(job._id)}
            >
              Decline
            </Button>
            <Button
              size="sm"
              variant="coral"
              className="h-8"
              onClick={() => onAccept?.(job._id)}
            >
              Accept
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
