"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui";
import { Provider } from "@/components/ProviderCard";
import { toast } from "sonner";
import { BookingSuccessView, BookingForm } from "@/components";

interface BookingModalProps {
  provider: Provider;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface BookingDetails {
  date: Date | undefined;
  time: string;
  notes: string;
}

export const BookingModal = ({
  provider,
  isOpen,
  onOpenChange,
}: BookingModalProps) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    date: new Date(),
    time: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBookingSubmission = async (values: BookingDetails) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setBookingDetails(values);
    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success("Booking request sent successfully!");
  };

  const resetState = () => {
    setIsSuccess(false);
    setBookingDetails({
      date: new Date(),
      time: "",
      notes: "",
    });
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
      {isSuccess ? (
        <BookingSuccessView
          provider={provider}
          date={bookingDetails.date}
          time={bookingDetails.time}
          onClose={() => handleClose(false)}
        />
      ) : (
        <BookingForm
          provider={provider}
          isSubmitting={isSubmitting}
          onConfirm={handleBookingSubmission}
          onCancel={() => handleClose(false)}
          initialValues={bookingDetails}
        />
      )}
    </Dialog>
  );
};
