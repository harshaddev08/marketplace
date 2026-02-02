import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function DangerZone() {
  return (
    <Card className="border-destructive/30 shadow-sm hover:shadow-md transition-all duration-300 stagger-4 animate-fade-up">
      <CardHeader>
        <div className="flex items-center gap-2 text-destructive">
          <LogOut className="w-5 h-5" />
          <CardTitle>Danger Zone</CardTitle>
        </div>
        <CardDescription>
          Irreversible actions related to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="destructive" className="w-full sm:w-auto">
          Delete Account
        </Button>
      </CardContent>
    </Card>
  );
}
