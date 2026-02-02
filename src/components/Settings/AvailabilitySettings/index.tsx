import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { SettingsAvailabilityState } from "../types";

interface AvailabilitySettingsProps {
  settings: SettingsAvailabilityState;
  onChange: (day: string) => void;
}

export function AvailabilitySettings({
  settings,
  onChange,
}: AvailabilitySettingsProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-border/60 stagger-2 animate-fade-up">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <CardTitle>Availability</CardTitle>
        </div>
        <CardDescription>
          Set the days you are available to accept new jobs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.keys(settings).map((day) => (
            <div
              key={day}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <Label className="capitalize cursor-pointer" htmlFor={day}>
                {day}
              </Label>
              <Switch
                id={day}
                checked={settings[day]}
                onCheckedChange={() => onChange(day)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
