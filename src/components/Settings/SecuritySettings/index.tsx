import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Shield } from "lucide-react";

export function SecuritySettings() {
  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-border/60 stagger-3 animate-fade-up">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <CardTitle>Security</CardTitle>
        </div>
        <CardDescription>
          Manage your password and account security settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Two-Factor Authentication</Label>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account.
            </p>
          </div>
          <Button variant="outline" size="sm">
            Enable 2FA
          </Button>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Change Password</Label>
            <p className="text-sm text-muted-foreground">
              Update your password to keep your account safe.
            </p>
          </div>
          <Button variant="outline" size="sm">
            Update
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
