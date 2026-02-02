import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle } from "lucide-react";
import { Transaction } from "../types";

interface TransactionsListProps {
  transactions: Transaction[];
}

export function TransactionsList({ transactions }: TransactionsListProps) {
  return (
    <>
      <h2 className="text-xl font-bold mt-8 mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <Card
            key={transaction.id}
            className="hover:bg-muted/50 transition-all duration-300 shadow-soft hover:shadow-md border-border/50"
          >
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 rounded-full ${transaction.status === "paid" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}
                >
                  {transaction.status === "paid" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Clock className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.date}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">
                  +${transaction.amount}
                </p>
                <Badge
                  variant={
                    transaction.status === "paid" ? "outline" : "secondary"
                  }
                  className="capitalize mt-1"
                >
                  {transaction.status}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
