import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, ArrowUpRight, ArrowDownRight, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Bank() {
  const [connected, setConnected] = useState(true);

  const transactions = [
    {
      id: 1,
      date: "2025-10-17",
      description: "Client Payment - Invoice #1234",
      amount: 5200.0,
      type: "credit",
    },
    {
      id: 2,
      date: "2025-10-16",
      description: "Office Rent Payment",
      amount: -2800.0,
      type: "debit",
    },
    {
      id: 3,
      date: "2025-10-15",
      description: "Software Subscription - Monthly",
      amount: -299.0,
      type: "debit",
    },
    {
      id: 4,
      date: "2025-10-14",
      description: "Client Payment - Invoice #1233",
      amount: 3500.0,
      type: "credit",
    },
    {
      id: 5,
      date: "2025-10-13",
      description: "Utilities Bill",
      amount: -450.0,
      type: "debit",
    },
    {
      id: 6,
      date: "2025-10-12",
      description: "Consulting Services",
      amount: 8900.0,
      type: "credit",
    },
    {
      id: 7,
      date: "2025-10-11",
      description: "Marketing Campaign",
      amount: -1250.0,
      type: "debit",
    },
    {
      id: 8,
      date: "2025-10-10",
      description: "Product Sales",
      amount: 6750.0,
      type: "credit",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-start animate-slide-up">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Bank Accounts
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your connected bank accounts and transactions
          </p>
        </div>
        <Button className="shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Connect Bank
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Main Account
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">£124,350.00</div>
            <p className="text-xs text-muted-foreground">
              {connected ? (
                <Badge
                  variant="outline"
                  className="mt-2 bg-accent/10 text-accent border-accent/20"
                >
                  Connected
                </Badge>
              ) : (
                <Badge variant="outline" className="mt-2">
                  Not Connected
                </Badge>
              )}
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total In
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <ArrowDownRight className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">£24,350.00</div>
            <p className="text-xs text-muted-foreground mt-2">This month</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Out
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <ArrowUpRight className="h-5 w-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">£4,799.00</div>
            <p className="text-xs text-muted-foreground mt-2">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Recent Transactions</CardTitle>
          <CardDescription>Your latest bank account activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-all border border-border/50"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      transaction.type === "credit"
                        ? "bg-accent/10"
                        : "bg-muted"
                    }`}
                  >
                    {transaction.type === "credit" ? (
                      <ArrowDownRight className="h-4 w-4 text-accent" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.type === "credit"
                        ? "text-accent"
                        : "text-foreground"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}£
                    {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
