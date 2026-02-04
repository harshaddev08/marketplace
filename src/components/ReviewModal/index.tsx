"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewService } from "@/services/reviewService";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import * as Yup from "yup";

interface ReviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
  providerName: string;
}

export const ReviewModal = ({
  isOpen,
  onOpenChange,
  bookingId,
  providerName,
}: ReviewModalProps) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const queryClient = useQueryClient();

  const reviewMutation = useMutation({
    mutationFn: (data: {
      bookingId: string;
      rating: number;
      comment: string;
    }) => ReviewService.submitReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-bookings"] });
      toast.success("Review submitted successfully!");
      onOpenChange(false);
      formik.resetForm();
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit review. Please try again.",
      );
    },
  });

  const validationSchema = Yup.object({
    rating: Yup.number()
      .min(1, "Please select a rating")
      .required("Rating is required"),
    comment: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      rating: 0,
      comment: "",
    },
    validationSchema,
    onSubmit: (values) => {
      reviewMutation.mutate({
        bookingId,
        rating: values.rating,
        comment: values.comment,
      });
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Leave a Review
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            How was your experience with{" "}
            <span className="font-semibold text-coral">{providerName}</span>?
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col items-center py-6">
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none transition-transform hover:scale-110"
                  onClick={() => formik.setFieldValue("rating", star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <Star
                    className={cn(
                      "w-10 h-10 transition-colors",
                      (hoveredRating || formik.values.rating) >= star
                        ? "fill-coral text-coral"
                        : "text-muted-foreground/30",
                    )}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm font-medium text-muted-foreground h-5">
              {hoveredRating === 1 && "Terrible"}
              {hoveredRating === 2 && "Poor"}
              {hoveredRating === 3 && "Average"}
              {hoveredRating === 4 && "Very Good"}
              {hoveredRating === 5 && "Excellent"}
              {hoveredRating === 0 &&
                formik.values.rating > 0 &&
                (formik.values.rating === 1
                  ? "Terrible"
                  : formik.values.rating === 2
                    ? "Poor"
                    : formik.values.rating === 3
                      ? "Average"
                      : formik.values.rating === 4
                        ? "Very Good"
                        : "Excellent")}
            </p>
            {formik.touched.rating && formik.errors.rating && (
              <p className="text-red-500 text-sm mt-2">
                {formik.errors.rating}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <Textarea
              name="comment"
              placeholder="Share your experience (optional)..."
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="min-h-[120px] resize-none border-border focus:ring-coral/20 focus:border-coral"
            />
          </div>

          <DialogFooter className="mt-6 flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="coral"
              disabled={
                !(formik.isValid && formik.dirty) || reviewMutation.isPending
              }
              className="flex-1"
            >
              {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
