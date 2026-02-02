import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  showBadge?: boolean;
  badgeText?: string;
}

export default function StatsCard({
  label,
  value,
  change,
  icon: Icon,
  showBadge = false,
  badgeText = "+12.5%",
}: StatsCardProps) {
  return (
    <Card className="shadow-soft border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-primary/10 p-3 rounded-xl">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          {showBadge && (
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              {badgeText}
            </span>
          )}
        </div>
        <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-xs text-muted-foreground mt-2">{change}</div>
      </CardContent>
    </Card>
  );
}
