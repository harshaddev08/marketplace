"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BookingService } from "@/services/bookingService";
import { JobsTabs, Job } from "@/components/Jobs";
import { toast } from "sonner";

export default function MyJobsPage() {
  const queryClient = useQueryClient();

  const { data: jobs = [], isLoading } = useQuery<Job[]>({
    queryKey: ["provider-bookings"],
    queryFn: () => BookingService.getProviderBookings(),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      BookingService.updateBookingStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider-bookings"] });
      toast.success("Job status updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update job status",
      );
    },
  });

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    statusMutation.mutate({ id, status: newStatus });
  };

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
        loading={isLoading}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}
