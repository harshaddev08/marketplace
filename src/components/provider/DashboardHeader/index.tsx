interface DashboardHeaderProps {
  fullName?: string;
}

export default function DashboardHeader({ fullName }: DashboardHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground">
        Welcome back, {fullName || "Provider"}!
      </h1>
      <p className="text-muted-foreground mt-2">
        Here&apos;s what&apos;s happening with your business today.
      </p>
    </div>
  );
}
