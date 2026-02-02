"use client";

import { useEffect, useState } from "react";
import { ProviderService } from "@/services/providerService";
import { StatsCards } from "@/components/Earnings";
import { EarningsChart } from "@/components/Earnings";
import { TransactionsList } from "@/components/Earnings";
import { EarningsStats, Transaction } from "@/components/Earnings";

export default function EarningsPage() {
  const [stats, setStats] = useState<EarningsStats | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, transactionsData] = await Promise.all([
          ProviderService.getEarningsStats(),
          ProviderService.getTransactions(),
        ]);
        setStats(statsData as EarningsStats);
        setTransactions(transactionsData as Transaction[]);
      } catch (error) {
        console.error("Failed to fetch earnings data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Earnings</h1>
        <p className="text-muted-foreground">
          Track your revenue and payout history.
        </p>
      </div>

      <StatsCards stats={stats} />
      <EarningsChart data={stats?.chartData} />
      <TransactionsList transactions={transactions} />
    </div>
  );
}
