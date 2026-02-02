export interface EarningsStats {
  totalEarnings: number;
  pendingPayout: number;
  completedJobs: number;
  chartData: { month: string; earnings: number }[];
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending";
  description: string;
}
