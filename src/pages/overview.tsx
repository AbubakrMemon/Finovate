import { Building2, TrendingUp, Users, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Overview() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="animate-slide-up">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Overview
        </h1>
        <p className="text-muted-foreground mt-2">
          Monitor your financial operations at a glance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="hover-lift animate-slide-up"
          style={{ animationDelay: "0.1s", boxShadow: "var(--shadow-md)" }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bank Balance
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">£124,350.00</div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-accent font-medium">+12.5%</span> from last
              month
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Payroll Status
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              45 Employees
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Next run in 5 days
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              VAT Return
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">£8,450.00</div>
            <p className="text-xs text-muted-foreground mt-2">Due in 14 days</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Revenue
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">£45,231.00</div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-accent font-medium">+8.2%</span> from last
              month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  date: "2025-10-17",
                  desc: "Client Payment - Invoice #1234",
                  amount: "+£5,200.00",
                },
                {
                  date: "2025-10-16",
                  desc: "Office Rent",
                  amount: "-£2,800.00",
                },
                {
                  date: "2025-10-15",
                  desc: "Software Subscription",
                  amount: "-£299.00",
                },
                {
                  date: "2025-10-14",
                  desc: "Client Payment - Invoice #1233",
                  amount: "+£3,500.00",
                },
              ].map((tx, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">{tx.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {tx.date}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      tx.amount.startsWith("+")
                        ? "text-accent"
                        : "text-foreground"
                    }`}
                  >
                    {tx.amount}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Upcoming Obligations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  task: "Payroll Processing",
                  due: "Due in 5 days",
                  status: "pending",
                },
                {
                  task: "VAT Return Submission",
                  due: "Due in 14 days",
                  status: "pending",
                },
                {
                  task: "Monthly Report",
                  due: "Due in 20 days",
                  status: "pending",
                },
                {
                  task: "Tax Payment",
                  due: "Due in 28 days",
                  status: "pending",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">{item.task}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.due}
                    </p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                    Pending
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
