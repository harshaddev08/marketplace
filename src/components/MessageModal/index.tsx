"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui";
import { Provider } from "@/components/ProviderCard";
import { toast } from "sonner";
import { MessageSuccessView, MessageForm } from "@/components";

interface MessageModalProps {
  provider: Provider;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MessageModal = ({
  provider,
  isOpen,
  onOpenChange,
}: MessageModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSendMessage = async (values: {
    subject: string;
    message: string;
  }) => {
    setIsSubmitting(true);
    console.log("Sending message with values:", values);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success("Message sent successfully!");
  };

  const resetState = () => {
    setIsSuccess(false);
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
        <MessageSuccessView
          provider={provider}
          onClose={() => handleClose(false)}
        />
      ) : (
        <MessageForm
          provider={provider}
          isSubmitting={isSubmitting}
          onConfirm={handleSendMessage}
          onCancel={() => handleClose(false)}
        />
      )}
    </Dialog>
  );
};
