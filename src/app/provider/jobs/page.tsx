"use client";

import { useEffect, useState } from "react";
import { ProviderService } from "@/services/providerService";
import { JobsTabs, Job } from "@/components/Jobs";

export default function MyJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await ProviderService.getJobs();
      setJobs(data as Job[]);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await ProviderService.updateJobStatus(id, newStatus);
      // Optimistically update local state or refetch
      setJobs((prev) =>
        prev.map((job) =>
          job.id === id ? { ...job, status: newStatus as Job["status"] } : job,
        ),
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  // JobCard component is now expected to be part of JobsTabs or handled within it.
  // Removing it from MyJobsPage as it's no longer directly used here.

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Jobs</h1>
        <p className="text-muted-foreground">
          Manage your job requests and ongoing work.
        </p>
      </div>

      <JobsTabs
        jobs={jobs}
        loading={loading}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}
