"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { EarningsStats } from "../types";
import { TrendingUp } from "lucide-react";

interface EarningsChartProps {
  data: EarningsStats["chartData"] | undefined;
}

export function EarningsChart({ data }: EarningsChartProps) {
  return (
    <Card className="col-span-4 shadow-soft hover:shadow-md transition-shadow duration-300 border-border/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold">Revenue Overview</CardTitle>
          <CardDescription>
            Your monthly earnings performance for the last 6 months.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full border border-border">
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          <span className="font-medium text-foreground">Top performance</span>
        </div>
      </CardHeader>
      <CardContent className="pl-0 pr-2 pb-6">
        <ChartContainer
          config={{
            earnings: {
              label: "Earnings",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[350px] w-full"
        >
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            className="[&_.recharts-cartesian-grid-horizontal]:stroke-border/60"
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              className="text-muted-foreground font-medium"
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              className="text-muted-foreground font-medium"
            />
            <ChartTooltip
              cursor={{ fill: "hsl(var(--muted)/0.4)" }}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  className="bg-background/95 backdrop-blur-sm border-border shadow-xl p-3"
                  labelClassName="font-bold text-foreground mb-1"
                />
              }
            />
            <Bar
              dataKey="earnings"
              fill="hsl(var(--primary))"
              radius={[6, 6, 0, 0]}
              maxBarSize={50}
              className="hover:opacity-90 transition-opacity cursor-pointer"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
