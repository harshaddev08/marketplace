import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";
import { SettingsNotificationState } from "../types";

interface NotificationSettingsProps {
  settings: SettingsNotificationState;
  onChange: (key: keyof SettingsNotificationState) => void;
}

export function NotificationSettings({
  settings,
  onChange,
}: NotificationSettingsProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-border/60 stagger-1 animate-fade-up">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          <CardTitle>Notifications</CardTitle>
        </div>
        <CardDescription>
          Choose how you want to be notified about new jobs and updates.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive emails about new job requests and payouts.
            </p>
          </div>
          <Switch
            checked={settings.email}
            onCheckedChange={() => onChange("email")}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Push Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive real-time alerts on your device.
            </p>
          </div>
          <Switch
            checked={settings.push}
            onCheckedChange={() => onChange("push")}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">SMS Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive text messages for urgent updates.
            </p>
          </div>
          <Switch
            checked={settings.sms}
            onCheckedChange={() => onChange("sms")}
          />
        </div>
      </CardContent>
    </Card>
  );
}
