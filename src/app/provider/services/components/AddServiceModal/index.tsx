import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Service } from "@/services/providerService";
import { useFormik } from "formik";
import * as Yup from "yup";

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Partial<Service>) => void;
  editingService?: Service | null;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be non-negative"),
  duration: Yup.number()
    .required("Duration is required")
    .min(0, "Duration must be non-negative")
    .integer("Duration must be a whole number"),
  description: Yup.string().optional(),
});

export function AddServiceModal({
  isOpen,
  onClose,
  onSave,
  editingService,
}: AddServiceModalProps) {
  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      price: 0,
      duration: 60,
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSave(values);
      onClose();
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (editingService) {
        formik.setValues(editingService);
      } else {
        formik.resetForm();
      }
    }
  }, [isOpen, editingService, formik.resetForm, formik.setValues]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingService ? "Edit Service" : "Add New Service"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <div className="col-span-3">
              <Input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.name && formik.errors.name
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.name}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <div className="col-span-3">
              <Input
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.category && formik.errors.category
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.category && formik.errors.category && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.category}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price ($)
            </Label>
            <div className="col-span-3">
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.price && formik.errors.price
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.price && formik.errors.price && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.price}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration (min)
            </Label>
            <div className="col-span-3">
              <Input
                id="duration"
                name="duration"
                type="number"
                min="0"
                value={formik.values.duration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.duration && formik.errors.duration
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.duration && formik.errors.duration && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.duration}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <div className="col-span-3">
              <Textarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.description && formik.errors.description
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.description}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
