"use client";

import { MessageSquare, AlertCircle } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
  Textarea,
  Label,
} from "@/components/ui";
import { Provider } from "@/components/ProviderCard";

interface MessageFormProps {
  provider: Provider;
  isSubmitting: boolean;
  onConfirm: (values: { subject: string; message: string }) => void;
  onCancel: () => void;
  initialValues?: {
    subject: string;
    message: string;
  };
}

const validationSchema = Yup.object().shape({
  subject: Yup.string()
    .required("Subject is required")
    .max(100, "Subject is too long"),
  message: Yup.string()
    .required("Message is required")
    .min(10, "Message is too short")
    .max(1000, "Message is too long"),
});

export const MessageForm = ({
  provider,
  isSubmitting,
  onConfirm,
  onCancel,
  initialValues = {
    subject: "",
    message: "",
  },
}: MessageFormProps) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onConfirm(values);
    },
  });

  return (
    <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none glass-card flex flex-col">
      <div className="p-6 border-b border-border/50 bg-muted/20">
        <DialogTitle className="text-2xl font-bold">Send Message</DialogTitle>
        <DialogDescription>
          Contact {provider.name} regarding their {provider.category} services.
        </DialogDescription>
      </div>

      <div className="p-6">
        <form
          id="message-form"
          onSubmit={formik.handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label
              htmlFor="subject"
              className="text-sm font-bold flex items-center gap-2"
            >
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              placeholder="e.g. Inquiry about pricing"
              className={`rounded-xl bg-background/50 border-border/50 focus:ring-coral/20 ${formik.touched.subject && formik.errors.subject ? "border-destructive" : ""}`}
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.subject && formik.errors.subject && (
              <div className="flex items-center gap-2 text-destructive text-sm mt-1">
                <AlertCircle className="w-4 h-4" />
                {formik.errors.subject}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="message"
              className="text-sm font-bold flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-coral" />
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              className={`min-h-[150px] rounded-xl bg-background/50 border-border/50 focus:ring-coral/20 resize-none ${formik.touched.message && formik.errors.message ? "border-destructive" : ""}`}
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.message && formik.errors.message && (
              <div className="flex items-center gap-2 text-destructive text-sm mt-1">
                <AlertCircle className="w-4 h-4" />
                {formik.errors.message}
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="p-6 border-t border-border/50 bg-muted/20">
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={onCancel}
            className="rounded-xl h-11 font-medium"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="message-form"
            variant="coral"
            className="rounded-xl h-11 px-8 font-bold shadow-lg shadow-coral/20"
            disabled={isSubmitting || !formik.isValid}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
  );
};
