"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JobsTabs } from "@/components/customer";
import { BookingService } from "@/services/bookingService";
import { CustomerJob } from "@/services/customerService";
import { toast } from "sonner";

export default function CustomerJobsPage() {
  const queryClient = useQueryClient();

  const { data: jobs = [], isLoading } = useQuery<CustomerJob[]>({
    queryKey: ["customer-bookings"],
    queryFn: () => BookingService.getMyBookings(),
  });

  const cancelMutation = useMutation({
    mutationFn: (id: string) => BookingService.cancelBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-bookings"] });
      toast.success("Booking cancelled successfully");
    },
    onError: (error: unknown) => {
      toast.error(
        (error as any).response?.data?.message || "Failed to cancel booking",
      );
    },
  });

  const handleCancel = async (id: string) => {
    cancelMutation.mutate(id);
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

          <JobsTabs jobs={jobs} loading={isLoading} onCancel={handleCancel} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
