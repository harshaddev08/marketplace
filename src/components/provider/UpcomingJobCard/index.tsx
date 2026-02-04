import moment from "moment";
import { Clock } from "lucide-react";
import { Job } from "../types";

interface UpcomingJobCardProps {
  job: Job;
}

export default function UpcomingJobCard({ job }: UpcomingJobCardProps) {
  const customerName = job.customer?.name || "Unknown";
  const scheduledDate = new Date(job.date);
  const formattedDate = moment(scheduledDate).format("MMM D, h:mm A");

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold shrink-0">
        {customerName.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-foreground truncate">
          {job.service}
        </p>
        <p className="text-xs text-muted-foreground">{customerName}</p>
        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          {formattedDate}
        </div>
      </div>
      <div className="text-sm font-semibold text-foreground">${job.price}</div>
    </div>
  );
}
