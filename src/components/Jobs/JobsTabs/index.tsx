"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Briefcase,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Job } from "../types";

interface JobsTabsProps {
  jobs: Job[];
  loading: boolean;
  onStatusUpdate: (id: string, newStatus: string) => Promise<void>;
}

export function JobsTabs({ jobs, loading, onStatusUpdate }: JobsTabsProps) {
  const JobCard = ({ job }: { job: Job }) => (
    <Card className="shadow-soft border-border hover:border-primary/50 transition-all">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
              {job.customer.charAt(0)}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                {job.service}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{job.customer}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-foreground">{job.price}</p>
            <Badge
              variant={
                job.status === "completed"
                  ? "default"
                  : job.status === "confirmed"
                    ? "secondary"
                    : "outline"
              }
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
            <MapPin className="w-4 h-4 text-primary" />
            {job.location}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            {job.date}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-3 border-t border-border flex justify-end gap-2">
        {job.status === "pending" && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
              onClick={() => onStatusUpdate(job.id, "cancelled")}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Decline
            </Button>
            <Button
              variant="coral"
              size="sm"
              onClick={() => onStatusUpdate(job.id, "confirmed")}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Accept
            </Button>
          </>
        )}
        {job.status === "confirmed" && (
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            size="sm"
            onClick={() => onStatusUpdate(job.id, "completed")}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark as Completed
          </Button>
        )}
        {job.status === "completed" && (
          <Button variant="outline" size="sm" disabled>
            Completed
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-4 mb-8">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
        <TabsTrigger value="completed">Done</TabsTrigger>
      </TabsList>

      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading jobs...</p>
          </div>
        ) : (
          <>
            {["all", "pending", "confirmed", "completed"].map((tab) => {
              const filteredJobs = jobs.filter(
                (job) =>
                  tab === "all" ||
                  job.status === tab ||
                  (tab === "completed" && job.status === "completed"),
              );

              return (
                <TabsContent
                  key={tab}
                  value={tab}
                  className="mt-0 focus-visible:outline-none"
                >
                  {filteredJobs.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      {filteredJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 bg-card rounded-2xl border border-border border-dashed text-center">
                      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                        <Briefcase className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        No {tab === "all" ? "" : tab} jobs found
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                        {tab === "all"
                          ? "You haven't received any job requests yet."
                          : `You don't have any ${tab} jobs at the moment.`}
                      </p>
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </>
        )}
      </div>
    </Tabs>
  );
}
