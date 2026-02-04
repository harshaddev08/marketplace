"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProviderService } from "@/services/providerService";
import { toast } from "sonner";
import { ProfileInfoCard, ProfileEditForm } from "./components";
import { ProviderProfile, ProviderProfileResponse } from "./types";

export default function ProfilePage() {
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["provider-profile"],
    queryFn: async () => {
      const data = await ProviderService.getProfile();
      return data as ProviderProfileResponse;
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: ProviderProfile) => ProviderService.updateProfile(data),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["provider-profile"] });
    },
    onError: (error) => {
      console.error("Failed to update profile", error);
      toast.error("Failed to update profile");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !profile) return <div>Failed to load profile.</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">
          Manage your public profile and contact information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <ProfileInfoCard profile={profile} />
        <ProfileEditForm
          initialData={profile}
          onSave={async (data) => {
            await updateMutation.mutateAsync(data);
          }}
          isSaving={updateMutation.isPending}
        />
      </div>
    </div>
  );
}
