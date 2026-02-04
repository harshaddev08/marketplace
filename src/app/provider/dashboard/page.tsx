"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui";

import { ProviderService } from "@/services/providerService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DollarSign,
  Briefcase,
  Star,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
  DashboardHeader,
  StatsCard,
  JobRequestCard,
  UpcomingJobCard,
  EmptyState,
} from "@/components/provider";
import { BookingService } from "@/services/bookingService";

export default function ProviderDashboard() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["provider-profile"],
    queryFn: () => ProviderService.getProfile(),
  });

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["provider-stats"],
    queryFn: () => ProviderService.getDashboardStats(),
  });

  const { data: jobRequests = [], isLoading: isLoadingRequests } = useQuery({
    queryKey: ["provider-job-requests"],
    queryFn: () => ProviderService.getJobRequests(),
  });

  const { data: upcomingJobs = [], isLoading: isLoadingUpcoming } = useQuery({
    queryKey: ["provider-upcoming-jobs"],
    queryFn: () => ProviderService.getUpcomingJobs(),
  });

  const loading =
    isLoadingProfile ||
    isLoadingStats ||
    isLoadingRequests ||
    isLoadingUpcoming;

  const updateStatusMutation = useMutation({
    mutationFn: ({
      bookingId,
      status,
    }: {
      bookingId: string;
      status: string;
    }) => BookingService.updateBookingStatus(bookingId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider-job-requests"] });
      queryClient.invalidateQueries({ queryKey: ["provider-upcoming-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["provider-stats"] });
      toast({
        title: "Success",
        description: "Job status updated successfully",
      });
    },
    onError: (error) => {
      console.error("Failed to update status:", error);
      toast({
        title: "Error",
        description: "Failed to update job status. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAcceptJob = (bookingId: string) => {
    updateStatusMutation.mutate({ bookingId, status: "confirmed" });
  };

  const handleDeclineJob = (bookingId: string) => {
    updateStatusMutation.mutate({ bookingId, status: "cancelled" });
  };

  const handleUpdateAvailability = () => {
    console.log("Update availability");
    // TODO: Implement update availability logic
  };

  const statsData = [
    {
      label: "Total Earnings",
      value: `$${stats?.data?.totalEarnings?.toFixed(2) || "0.00"}`,
      change: "+12.5% this month",
      icon: DollarSign,
      showBadge: true,
    },
    {
      label: "Active Jobs",
      value: stats?.data?.activeJobs?.toString() || "0",
      change: `${jobRequests?.data?.length} new requests`,
      icon: Briefcase,
    },
    {
      label: "Rating",
      value: stats?.data?.rating?.toFixed(1) || "0.0",
      change: "Based on reviews",
      icon: Star,
    },
    {
      label: "Profile Views",
      value: stats?.data?.profileViews?.toString() || "0",
      change: "+22% this week",
      icon: TrendingUp,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHeader fullName={profile?.fullName} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">
              Recent Job Requests
            </h2>
            <Link
              href="/provider/jobs"
              className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {jobRequests?.data?.length > 0 ? (
              jobRequests?.data?.map((request: any) => (
                <JobRequestCard
                  key={request._id}
                  job={request}
                  onAccept={handleAcceptJob}
                  onDecline={handleDeclineJob}
                />
              ))
            ) : (
              <Card className="shadow-soft border-border">
                <CardContent className="p-6 text-center text-muted-foreground">
                  No pending job requests at the moment.
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-foreground">Upcoming</h2>
          <Card className="shadow-soft border-border">
            <CardHeader>
              <CardTitle className="text-base">Today&apos;s Schedule</CardTitle>
              <CardDescription>
                {upcomingJobs?.data?.length > 0
                  ? `You have ${upcomingJobs?.data?.length} job${upcomingJobs?.data?.length > 1 ? "s" : ""} scheduled.`
                  : "You have no jobs scheduled for today."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingJobs?.data?.length > 0 ? (
                <div className="space-y-3">
                  {upcomingJobs?.data?.map((job: any) => (
                    <UpcomingJobCard key={job._id} job={job} />
                  ))}
                </div>
              ) : (
                <EmptyState onUpdateAvailability={handleUpdateAvailability} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
