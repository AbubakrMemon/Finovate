import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Payroll() {
  const employees = [
    {
      id: 1,
      name: "John Smith",
      position: "Senior Developer",
      salary: 65000,
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Product Manager",
      salary: 58000,
      status: "active",
    },
    {
      id: 3,
      name: "Mike Williams",
      position: "Designer",
      salary: 48000,
      status: "active",
    },
    {
      id: 4,
      name: "Emma Davis",
      position: "Marketing Manager",
      salary: 52000,
      status: "active",
    },
    {
      id: 5,
      name: "James Brown",
      position: "Developer",
      salary: 55000,
      status: "active",
    },
    {
      id: 6,
      name: "Lisa Wilson",
      position: "HR Manager",
      salary: 50000,
      status: "active",
    },
  ];

  const payrollRuns = [
    {
      id: 1,
      date: "2025-09-30",
      period: "September 2025",
      amount: 38250,
      status: "completed",
    },
    {
      id: 2,
      date: "2025-08-31",
      period: "August 2025",
      amount: 38250,
      status: "completed",
    },
    {
      id: 3,
      date: "2025-07-31",
      period: "July 2025",
      amount: 38250,
      status: "completed",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Payroll</h1>
          <p className="text-muted-foreground mt-2">
            Manage employees and payroll processing
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="shadow-sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
          <Button className="shadow-sm">
            <Play className="h-4 w-4 mr-2" />
            Run Payroll
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Employees
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {employees.length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Active staff members
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Payroll
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">£38,250</div>
            <p className="text-xs text-muted-foreground mt-2">
              Total monthly cost
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Next Run
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">5 Days</div>
            <p className="text-xs text-muted-foreground mt-2">
              October 31, 2025
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Employees</CardTitle>
          <CardDescription>Manage your team members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-all border border-border/50"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-medium text-primary">
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {employee.position}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">
                      £{(employee.salary / 12).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">Monthly</p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-accent/10 text-accent border-accent/20"
                  >
                    {employee.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Payroll History</CardTitle>
          <CardDescription>Previous payroll runs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {payrollRuns.map((run) => (
              <div
                key={run.id}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-all border border-border/50"
              >
                <div>
                  <p className="font-medium">{run.period}</p>
                  <p className="text-sm text-muted-foreground">
                    Processed on {run.date}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold">£{run.amount.toFixed(2)}</p>
                  <Badge
                    variant="outline"
                    className="bg-accent/10 text-accent border-accent/20"
                  >
                    {run.status}
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
