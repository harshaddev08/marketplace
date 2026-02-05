interface Stat {
  value: string;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

export const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-2xl p-6 text-center shadow-soft border border-border"
        >
          <div className="text-3xl font-bold text-foreground mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};
