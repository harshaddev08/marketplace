"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Pencil,
  Save,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Loader2,
} from "lucide-react";
import { ProviderProfile, ProviderProfileResponse } from "../../types";

interface ProfileEditFormProps {
  initialData: ProviderProfileResponse;
  onSave: (data: ProviderProfile) => Promise<void>;
  isSaving: boolean;
}

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  city: Yup.string().required("City is required"),
  service: Yup.string().required("Service category is required"),
  experience: Yup.string().required("Experience is required"),
  bio: Yup.string().nullable(),
});

export const ProfileEditForm = ({
  initialData,
  onSave,
  isSaving,
}: ProfileEditFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: initialData?.data?.fullName || "",
      email: initialData?.data?.email || "",
      phone: initialData?.data?.phone || "",
      city: initialData?.data?.city || "",
      service: initialData?.data?.service || "",
      experience: initialData?.data?.experience || "",
      bio: initialData?.data?.bio || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await onSave(values as ProviderProfile);
      setIsEditing(false);
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details here.</CardDescription>
        </div>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            size="sm"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={handleCancel}
              variant="ghost"
              size="sm"
              disabled={isSaving}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={() => formik.handleSubmit()}
              size="sm"
              disabled={isSaving || !formik.isValid}
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  name="fullName"
                  disabled={!isEditing}
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`pl-9 ${
                    formik.touched.fullName && formik.errors.fullName
                      ? "border-red-500"
                      : ""
                  }`}
                />
              </div>
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-sm text-red-500">{formik.errors.fullName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  disabled={!isEditing}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`pl-9 ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                  }`}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  disabled={!isEditing}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`pl-9 ${
                    formik.touched.phone && formik.errors.phone
                      ? "border-red-500"
                      : ""
                  }`}
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-sm text-red-500">{formik.errors.phone}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="city"
                  name="city"
                  disabled={!isEditing}
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`pl-9 ${
                    formik.touched.city && formik.errors.city
                      ? "border-red-500"
                      : ""
                  }`}
                />
              </div>
              {formik.touched.city && formik.errors.city && (
                <p className="text-sm text-red-500">{formik.errors.city}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">Service Category</Label>
              <Input
                id="service"
                name="service"
                disabled={!isEditing}
                value={formik.values.service}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.service && formik.errors.service
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.service && formik.errors.service && (
                <p className="text-sm text-red-500">{formik.errors.service}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                name="experience"
                disabled={!isEditing}
                value={formik.values.experience}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.experience && formik.errors.experience
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.experience && formik.errors.experience && (
                <p className="text-sm text-red-500">
                  {formik.errors.experience}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              disabled={!isEditing}
              rows={4}
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.bio && formik.errors.bio ? "border-red-500" : ""
              }
            />
            {formik.touched.bio && formik.errors.bio && (
              <p className="text-sm text-red-500">{formik.errors.bio}</p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
