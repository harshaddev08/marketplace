"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JobsTabs } from "@/components/customer";
import { CustomerService, CustomerJob } from "@/services/customerService";

export default function CustomerJobsPage() {
  const [jobs, setJobs] = useState<CustomerJob[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await CustomerService.getJobs();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCancel = async (id: string) => {
    try {
      await CustomerService.cancelJob(id);
      // Update local state to show cancelled status
      setJobs(
        jobs.map((job) =>
          job.id === id ? { ...job, status: "cancelled" } : job,
        ),
      );
    } catch (error) {
      console.error("Error cancelling job:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              My Bookings
            </h1>
            <p className="text-muted-foreground">
              Manage your service requests and track their status.
            </p>
          </div>

          <JobsTabs jobs={jobs} loading={loading} onCancel={handleCancel} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
