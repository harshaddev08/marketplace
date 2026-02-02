"use client";

import { useEffect, useState } from "react";
import { ProviderService } from "@/services/providerService";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { NotificationSettings } from "@/components/Settings";
import { AvailabilitySettings } from "@/components/Settings";
import { SecuritySettings } from "@/components/Settings";
import { DangerZone } from "@/components/Settings";
import { SettingsState } from "@/components/Settings";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await ProviderService.getSettings();
      setSettings(data as SettingsState);
    } catch (error) {
      console.error("Failed to fetch settings", error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationChange = (
    key: keyof SettingsState["notifications"],
  ) => {
    if (!settings) return;
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    });
  };

  const handleAvailabilityChange = (day: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      availability: {
        ...settings.availability,
        [day]: !settings.availability[day],
      },
    });
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      await ProviderService.updateSettings(settings);
      toast.success("Settings updated successfully");
    } catch (error) {
      console.error("Failed to update settings", error);
      toast.error("Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!settings) return <div>Failed to load settings.</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and availability.
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
          ) : (
            <Check className="w-4 h-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>

      <NotificationSettings
        settings={settings.notifications}
        onChange={handleNotificationChange}
      />

      <AvailabilitySettings
        settings={settings.availability}
        onChange={handleAvailabilityChange}
      />

      <SecuritySettings />

      <DangerZone />
    </div>
  );
}
