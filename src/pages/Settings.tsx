import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="animate-slide-up">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your company information and integrations
        </p>
      </div>

      <Card
        className="hover-lift animate-slide-up"
        style={{ animationDelay: "0.1s", boxShadow: "var(--shadow-md)" }}
      >
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Update your company details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                defaultValue="Finovative Ltd"
                className="transition-smooth focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-number">Company Number</Label>
              <Input
                id="company-number"
                defaultValue="12345678"
                className="transition-smooth focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <Input
              id="address"
              defaultValue="123 Finance Street, London, UK"
              className="transition-smooth focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="contact@finovative.com"
                className="transition-smooth focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                defaultValue="+44 20 1234 5678"
                className="transition-smooth focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button className="transition-smooth hover:scale-[1.02]">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card
        className="hover-lift animate-slide-up"
        style={{ animationDelay: "0.2s", boxShadow: "var(--shadow-md)" }}
      >
        <CardHeader>
          <CardTitle>API Integrations</CardTitle>
          <CardDescription>Manage your connected services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-smooth">
            <div>
              <p className="font-medium">TrueLayer (Banking)</p>
              <p className="text-sm text-muted-foreground">
                Connected to your bank accounts
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="transition-smooth hover:scale-[1.05]"
            >
              Configure
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-smooth">
            <div>
              <p className="font-medium">BrightPay (Payroll)</p>
              <p className="text-sm text-muted-foreground">
                Manage employee payroll
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="transition-smooth hover:scale-[1.05]"
            >
              Configure
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-smooth">
            <div>
              <p className="font-medium">HMRC (VAT)</p>
              <p className="text-sm text-muted-foreground">
                VAT return submissions
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="transition-smooth hover:scale-[1.05]"
            >
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card
        className="hover-lift animate-slide-up"
        style={{ animationDelay: "0.3s", boxShadow: "var(--shadow-md)" }}
      >
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage team access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-smooth">
            <div>
              <p className="font-medium">admin@finovative.com</p>
              <p className="text-sm text-muted-foreground">Administrator</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="transition-smooth hover:scale-[1.05]"
            >
              Edit
            </Button>
          </div>

          <Separator />

          <Button
            variant="outline"
            className="w-full transition-smooth hover:scale-[1.02]"
          >
            + Invite User
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
