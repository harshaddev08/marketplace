"use client";

import {
  Calendar as CalendarIcon,
  Clock,
  MessageSquare,
  AlertCircle,
  Briefcase,
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Calendar,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui";
import { Provider } from "@/components/ProviderCard";

interface BookingFormProps {
  provider: Provider;
  isSubmitting: boolean;
  onConfirm: (values: {
    date: Date | undefined;
    time: string;
    notes: string;
    serviceId?: string;
    price: number;
  }) => void;
  onCancel: () => void;
  initialValues?: {
    date: Date | undefined;
    time: string;
    notes: string;
    serviceId?: string;
  };
}

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const validationSchema = Yup.object().shape({
  date: Yup.date().required("Please select a date"),
  time: Yup.string().required("Please select a time slot"),
  notes: Yup.string().max(500, "Notes cannot exceed 500 characters"),
  serviceId: Yup.string().optional(),
});

export const BookingForm = ({
  provider,
  isSubmitting,
  onConfirm,
  onCancel,
  initialValues = {
    date: new Date(),
    time: "",
    notes: "",
    serviceId:
      provider.services && provider.services.length > 0
        ? provider.services.find((s) => s.isPrimary)?._id ||
          provider.services[0]._id
        : undefined,
  },
}: BookingFormProps) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const selectedService = provider.services?.find(
        (s) => s._id === values.serviceId,
      );
      const price = selectedService
        ? selectedService.price
        : provider.hourlyRate;
      onConfirm({ ...values, price });
    },
  });

  const selectedService = provider.services?.find(
    (s) => s._id === formik.values.serviceId,
  );
  const currentPrice = selectedService
    ? selectedService.price
    : provider.hourlyRate;

  return (
    <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden border-none glass-card max-h-[90vh] flex flex-col">
      <div className="p-6 border-b border-border/50 bg-muted/20">
        <DialogTitle className="text-2xl font-bold">Book Service</DialogTitle>
        <DialogDescription>
          Schedule a session with {provider.name} for {provider.category}{" "}
          services.
        </DialogDescription>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scroll-area">
        <form id="booking-form" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label className="text-base font-bold flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-coral" />
                Select Date
              </Label>
              <div className="border border-border/50 rounded-xl p-2 bg-background/50">
                <Calendar
                  mode="single"
                  selected={formik.values.date}
                  onSelect={(date) => formik.setFieldValue("date", date)}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  className="rounded-lg"
                />
              </div>
              {formik.touched.date && formik.errors.date && (
                <div className="flex items-center gap-2 text-destructive text-sm mt-1 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-4 h-4" />
                  {formik.errors.date as string}
                </div>
              )}

              {/* Service Selection for Mobile/Left Column */}
              {provider.services && provider.services.length > 0 && (
                <div className="space-y-4 mt-6">
                  <Label className="text-base font-bold flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-coral" />
                    Select Service
                  </Label>
                  <RadioGroup
                    value={formik.values.serviceId}
                    onValueChange={(val) =>
                      formik.setFieldValue("serviceId", val)
                    }
                    className="gap-3"
                  >
                    {provider.services.map((service) => (
                      <label
                        key={service._id}
                        htmlFor={service._id}
                        className={`flex items-center space-x-2 rounded-xl border p-3 cursor-pointer transition-all ${
                          formik.values.serviceId === service._id
                            ? "border-coral bg-coral/5"
                            : "border-border/50 bg-background/50 hover:bg-muted/50"
                        }`}
                      >
                        <RadioGroupItem
                          value={service._id}
                          id={service._id}
                          className="data-[state=checked]:border-coral data-[state=checked]:text-coral"
                        />
                        <div className="grow cursor-pointer">
                          <span className="font-bold block text-sm">
                            {service.name}
                          </span>
                          {service.description && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {service.description}
                            </p>
                          )}
                        </div>
                        <div className="font-bold text-coral text-sm">
                          ${service.price}
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-bold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-coral" />
                  Select Time
                </Label>
                <Select
                  value={formik.values.time}
                  onValueChange={(val) => formik.setFieldValue("time", val)}
                >
                  <SelectTrigger
                    className={`h-12 rounded-xl bg-background/50 border-border/50 focus:ring-coral/20 ${formik.touched.time && formik.errors.time ? "border-destructive" : ""}`}
                  >
                    <SelectValue placeholder="Choose a time slot" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem
                        key={slot}
                        value={slot}
                        className="focus:bg-coral/10 focus:text-coral"
                      >
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.time && formik.errors.time && (
                  <div className="flex items-center gap-2 text-destructive text-sm mt-1 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-4 h-4" />
                    {formik.errors.time}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Label className="text-base font-bold flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-coral" />
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  name="notes"
                  placeholder="Tell the provider more about your requirements..."
                  className="min-h-[120px] rounded-xl bg-background/50 border-border/50 focus:ring-coral/20 resize-none"
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.notes && formik.errors.notes && (
                  <div className="flex items-center gap-2 text-destructive text-sm mt-1 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-4 h-4" />
                    {formik.errors.notes}
                  </div>
                )}
              </div>

              <div className="bg-coral/5 p-4 rounded-xl border border-coral/10 space-y-2">
                <div className="flex justify-between items-center font-bold">
                  <span>
                    {selectedService ? "Service Price" : "Hourly Rate"}
                  </span>
                  <span className="text-coral">${currentPrice}</span>
                </div>
                {selectedService ? (
                  <p className="text-xs text-muted-foreground">
                    Selected: {selectedService.name} (
                    {selectedService.duration
                      ? `${selectedService.duration} mins`
                      : "Duration varies"}
                    )
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Final price may vary based on actual hours worked and
                    materials used.
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="p-6 border-t border-border/50 bg-muted/20">
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={onCancel}
            className="rounded-xl h-12 font-medium"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="booking-form"
            variant="coral"
            className="rounded-xl h-12 px-8 text-lg font-bold shadow-lg shadow-coral/20"
            disabled={isSubmitting || !formik.isValid}
          >
            {isSubmitting ? "Processing..." : "Confirm Booking"}
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
  );
};
