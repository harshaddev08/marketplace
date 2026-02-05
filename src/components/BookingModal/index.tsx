"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog } from "@/components/ui";
import { Provider } from "@/components/ProviderCard";
import { toast } from "sonner";
import { BookingSuccessView, BookingForm } from "@/components";
import { BookingService } from "@/services/bookingService";

interface BookingModalProps {
  provider: Provider;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface BookingDetails {
  date: Date | undefined;
  time: string;
  notes: string;
  serviceId?: string;
  price: number;
}

export const BookingModal = ({
  provider,
  isOpen,
  onOpenChange,
}: BookingModalProps) => {
  const [lastBooking, setLastBooking] = useState<BookingDetails | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const bookingMutation = useMutation({
    mutationFn: (values: BookingDetails) => {
      if (!values.date) throw new Error("Date is required");

      const selectedService = provider.services?.find(
        (s) => s._id === values.serviceId,
      );

      return BookingService.createBooking({
        providerId: provider.id,
        serviceId: values.serviceId,
        service: selectedService ? selectedService.name : provider.category,
        date: values.date.toISOString(),
        time: values.time,
        location: provider.location,
        notes: values.notes,
        price: values.price,
      });
    },
    onSuccess: (_, values) => {
      setLastBooking(values);
      setIsSuccess(true);
      toast.success("Booking request sent successfully!");
    },
    onError: (error: unknown) => {
      toast.error(
        (error as any).response?.data?.message ||
          "Failed to send booking request. Please try again.",
      );
    },
  });

  const handleBookingSubmission = async (values: BookingDetails) => {
    bookingMutation.mutate(values);
  };

  const resetState = () => {
    setIsSuccess(false);
    bookingMutation.reset();
  };

  const handleClose = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      // Delay reset to allow transition to finish
      setTimeout(resetState, 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {isSuccess && lastBooking ? (
        <BookingSuccessView
          provider={provider}
          date={lastBooking.date}
          time={lastBooking.time}
          onClose={() => handleClose(false)}
        />
      ) : (
        <BookingForm
          provider={provider}
          isSubmitting={bookingMutation.isPending}
          onConfirm={handleBookingSubmission}
          onCancel={() => handleClose(false)}
          initialValues={{
            date: new Date(),
            time: "",
            notes: "",
          }}
        />
      )}
    </Dialog>
  );
};
