"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, XCircle, Star } from "lucide-react";
import { CustomerJob } from "@/services/customerService";

interface JobCardProps {
  job: CustomerJob;
  onCancel: (id: string) => Promise<void>;
}

export const JobCard = ({ job, onCancel }: JobCardProps) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "active":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card className="shadow-soft border-border hover:border-primary/50 transition-all">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {job.provider.charAt(0)}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                {job.service}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{job.provider}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-foreground">{job.price}</p>
            <Badge
              variant={getStatusVariant(job.status)}
              className="capitalize"
            >
              {job.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3 text-sm">
        <p className="mb-4 text-muted-foreground">{job.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-coral" />
            {job.location}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-coral" />
            {job.date}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-3 border-t border-border flex justify-end gap-2">
        {job.status === "pending" && (
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
            onClick={() => onCancel(job.id)}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Cancel Booking
          </Button>
        )}
        {job.status === "completed" && (
          <Button variant="coral" size="sm">
            <Star className="w-4 h-4 mr-2" />
            Leave a Review
          </Button>
        )}
        {job.status === "active" && (
          <Button variant="outline" size="sm" disabled>
            In Progress
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
