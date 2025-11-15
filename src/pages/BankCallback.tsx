import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, AlertCircle, Building2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Transaction {
  description: string;
  amount: number;
  currency: string;
  date: string;
}

interface Account {
  account_id: string;
  account_name: string;
  account_number: string;
  sort_code: string;
  iban: string;
  available_balance: number;
  current_balance: number;
  currency: string;
  transactions: Transaction[];
}

export default function BankCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchBankData = async () => {
      const token = searchParams.get("token"); // ✅ Get token from URL

      console.log("🔑 Token received from URL:", token);
      if (token) {
        // ✅ Save token in localStorage so app knows bank is connected
        localStorage.setItem("bank_token", token);
      }

      if (!token) {
        setError("No token received.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/fetch-data", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ REQUIRED
          },
        });

        console.log("📡 /fetch-data status:", response.status);

        if (!response.ok) {
          throw new Error("Backend error while fetching data.");
        }

        const data = await response.json();
        console.log("✅ Data received:", data);
        setAccounts(data.accounts || []);
      } catch (err) {
        setError("Failed to retrieve bank data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBankData();
  }, [searchParams]);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-fade-in p-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>
        <div className="grid gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8 animate-fade-in p-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/bank")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Bank
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => navigate("/bank")}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in p-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Connected Bank Accounts
          </h1>
          <p className="text-muted-foreground mt-2">
            Your bank accounts have been successfully connected
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/bank")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Bank
        </Button>
      </div>

      {accounts.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No bank accounts found. Please try connecting again.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-6">
          {accounts.map((account) => (
            <Card key={account.account_id} className="border-none shadow-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">
                        {account.account_name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Account ID: {account.account_id}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Account Details */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Account Number
                    </p>
                    <p className="font-medium">{account.account_number}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Sort Code</p>
                    <p className="font-medium">{account.sort_code}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">IBAN</p>
                    <p className="font-medium text-xs break-all">
                      {account.iban}
                    </p>
                  </div>
                </div>

                {/* Balances */}
                <div className="grid gap-4 md:grid-cols-2 pt-4 border-t">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Available Balance
                    </p>
                    <p className="text-2xl font-bold text-accent">
                      {formatCurrency(
                        account.available_balance,
                        account.currency
                      )}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Current Balance
                    </p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(
                        account.current_balance,
                        account.currency
                      )}
                    </p>
                  </div>
                </div>

                {/* Recent Transactions */}
                {account.transactions.length > 0 && (
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-3">Last 3 Transactions</h3>
                    <div className="space-y-3">
                      {account.transactions.map((transaction, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                        >
                          <div>
                            <p className="font-medium">
                              {transaction.description}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(transaction.date)}
                            </p>
                          </div>
                          <p
                            className={`font-semibold ${
                              transaction.amount > 0
                                ? "text-accent"
                                : "text-foreground"
                            }`}
                          >
                            {formatCurrency(
                              transaction.amount,
                              transaction.currency
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
