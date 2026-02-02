"use client";

import { useEffect, useState } from "react";
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
  Job,
  DashboardStats,
} from "@/components/provider";

export default function ProviderDashboard() {
  const [profile, setProfile] = useState<{ fullName: string } | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [jobRequests, setJobRequests] = useState<Job[]>([]);
  const [upcomingJobs, setUpcomingJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [profileData, statsData, requestsData, upcomingData] =
          await Promise.all([
            ProviderService.getProfile(),
            ProviderService.getDashboardStats(),
            ProviderService.getJobRequests(),
            ProviderService.getUpcomingJobs(),
          ]);

        setProfile(profileData);
        setStats(statsData);
        setJobRequests(requestsData);
        setUpcomingJobs(upcomingData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleAcceptJob = (jobId: string) => {
    console.log("Accept job:", jobId);
    // TODO: Implement accept job logic
  };

  const handleDeclineJob = (jobId: string) => {
    console.log("Decline job:", jobId);
    // TODO: Implement decline job logic
  };

  const handleUpdateAvailability = () => {
    console.log("Update availability");
    // TODO: Implement update availability logic
  };

  const statsData = [
    {
      label: "Total Earnings",
      value: `$${stats?.totalEarnings?.toFixed(2) || "0.00"}`,
      change: "+12.5% this month",
      icon: DollarSign,
      showBadge: true,
    },
    {
      label: "Active Jobs",
      value: stats?.activeJobs?.toString() || "0",
      change: `${jobRequests.length} new requests`,
      icon: Briefcase,
    },
    {
      label: "Rating",
      value: stats?.rating?.toFixed(1) || "0.0",
      change: "Based on reviews",
      icon: Star,
    },
    {
      label: "Profile Views",
      value: stats?.profileViews?.toString() || "0",
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

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Requests Section */}
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
            {jobRequests.length > 0 ? (
              jobRequests.map((request) => (
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
                {upcomingJobs.length > 0
                  ? `You have ${upcomingJobs.length} job${upcomingJobs.length > 1 ? "s" : ""} scheduled.`
                  : "You have no jobs scheduled for today."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingJobs.length > 0 ? (
                <div className="space-y-3">
                  {upcomingJobs.map((job) => (
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
