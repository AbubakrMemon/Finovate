import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, ArrowUpRight, ArrowDownRight, Plus } from "lucide-react";

// ✅ Transaction Interface
interface Transaction {
  description: string;
  amount: number;
  currency: string;
  date: string;
}

export default function Bank() {
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalIn, setTotalIn] = useState(0);
  const [totalOut, setTotalOut] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("bank_token");
    if (token) {
      setConnected(true);

      fetch("http://localhost:8000/fetch-data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.accounts?.length > 0) {
            const account = data.accounts[0];
            setBalance(account.current_balance);

            const tx = account.transactions || [];
            setTransactions(tx);

            const totalCredits = tx
              .filter((t: Transaction) => t.amount > 0)
              .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

            const totalDebits = tx
              .filter((t: Transaction) => t.amount < 0)
              .reduce(
                (sum: number, t: Transaction) => sum + Math.abs(t.amount),
                0
              );

            setTotalIn(totalCredits);
            setTotalOut(totalDebits);
          }
        })
        .catch((err) => console.error("Error fetching bank data:", err));
    }
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold">Bank Accounts</h1>
          <p className="text-muted-foreground mt-2">
            {connected
              ? "Bank Connected Successfully"
              : "No bank connected yet"}
          </p>
        </div>
        <Button
          onClick={() => window.open("http://localhost:8000/login", "_self")}
        >
          <Plus className="h-4 w-4 mr-2" />
          {connected ? "Reconnect Bank" : "Connect Bank Account"}
        </Button>
      </div>

      {/* Balance Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Account */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex justify-between">
            <CardTitle>Main Account</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              £{connected ? balance.toLocaleString() : "0.00"}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <Badge
                variant="outline"
                className={connected ? "bg-accent/10 text-accent" : ""}
              >
                {connected ? "Connected" : "Not Connected"}
              </Badge>
            </p>
          </CardContent>
        </Card>

        {/* Total In */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex justify-between">
            <CardTitle>Total In</CardTitle>
            <ArrowDownRight className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              £{connected ? totalIn.toFixed(2) : "0.00"}
            </div>
            <p className="text-xs text-muted-foreground mt-2">This month</p>
          </CardContent>
        </Card>

        {/* Total Out */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex justify-between">
            <CardTitle>Total Out</CardTitle>
            <ArrowUpRight className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              £{connected ? totalOut.toFixed(2) : "0.00"}
            </div>
            <p className="text-xs text-muted-foreground mt-2">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* ✅ Recent Transactions */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Recent Transactions</CardTitle>
          <CardDescription>Your latest bank account activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {connected && transactions.length > 0 ? (
              transactions.slice(0, 5).map((tx, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-all"
                >
                  <div>
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-sm text-muted-foreground">{tx.date}</p>
                  </div>
                  <div>
                    <p
                      className={`font-semibold ${
                        tx.amount > 0 ? "text-accent" : "text-foreground"
                      }`}
                    >
                      {tx.amount > 0 ? "+" : "-"}£
                      {Math.abs(tx.amount).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">
                {connected
                  ? "No transactions available."
                  : "Connect your bank to view transactions."}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
