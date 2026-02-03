"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase } from "lucide-react";
import { CustomerJob } from "@/services/customerService";
import { JobCard } from "../JobCard";

interface JobsTabsProps {
  jobs: CustomerJob[];
  loading: boolean;
  onCancel: (id: string) => Promise<void>;
}

export const JobsTabs = ({ jobs, loading, onCancel }: JobsTabsProps) => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-4 mb-8">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="pending">Upcoming</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="completed">Done</TabsTrigger>
      </TabsList>

      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your bookings...</p>
          </div>
        ) : (
          <>
            {["all", "pending", "active", "completed"].map((tab) => {
              const filteredJobs = jobs.filter(
                (job) =>
                  tab === "all" ||
                  job.status === tab ||
                  (tab === "completed" &&
                    (job.status === "completed" || job.status === "cancelled")),
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
                        <JobCard key={job.id} job={job} onCancel={onCancel} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 bg-card rounded-2xl border border-border border-dashed text-center">
                      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                        <Briefcase className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        No {tab === "all" ? "" : tab} bookings found
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                        {tab === "all"
                          ? "You haven't made any bookings yet."
                          : `You don't have any ${tab} bookings at the moment.`}
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
};
