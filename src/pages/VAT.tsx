import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Send, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function VAT() {
  const vatReturns = [
    {
      id: 1,
      period: "Q3 2025",
      due: "2025-10-31",
      owed: 8450,
      status: "pending",
    },
    {
      id: 2,
      period: "Q2 2025",
      due: "2025-07-31",
      owed: 7820,
      status: "submitted",
    },
    {
      id: 3,
      period: "Q1 2025",
      due: "2025-04-30",
      owed: 6950,
      status: "submitted",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-start animate-slide-up">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            VAT Returns
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage VAT submissions and filings
          </p>
        </div>
        <Button className="shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Create Draft
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Period
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">Q3 2025</div>
            <p className="text-xs text-muted-foreground mt-2">
              July - September
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Amount Due
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">£8,450.00</div>
            <p className="text-xs text-muted-foreground mt-2">
              For current period
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Submission Due
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">14 Days</div>
            <p className="text-xs text-muted-foreground mt-2">
              October 31, 2025
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Current VAT Return</CardTitle>
          <CardDescription>Q3 2025 (July - September)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="text-sm font-medium">VAT on Sales</span>
              <span className="font-semibold">£12,450.00</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="text-sm font-medium">VAT on Purchases</span>
              <span className="font-semibold">-£4,000.00</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border border-primary/20">
              <span className="font-medium">Total VAT Due</span>
              <span className="text-xl font-bold text-primary">£8,450.00</span>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button className="w-full sm:w-auto shadow-sm">
              <Send className="h-4 w-4 mr-2" />
              Submit VAT Return
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">VAT Return History</CardTitle>
          <CardDescription>Previous submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {vatReturns.map((vat) => (
              <div
                key={vat.id}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-all border border-border/50"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{vat.period}</p>
                    <p className="text-sm text-muted-foreground">
                      Due: {vat.due}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">£{vat.owed.toFixed(2)}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      vat.status === "pending"
                        ? "bg-muted text-muted-foreground"
                        : "bg-accent/10 text-accent border-accent/20"
                    }
                  >
                    {vat.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
