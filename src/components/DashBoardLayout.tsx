import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Bank", url: "/bank", icon: Building2 },
  { title: "Payroll", url: "/payroll", icon: Users },
  { title: "VAT", url: "/vat", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/auth");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-sidebar-border animate-slide-in">
          <SidebarContent>
            <div className="p-6 border-b border-sidebar-border">
              <h2 className="text-xl font-bold bg-gradient-to-r from-sidebar-primary to-info bg-clip-text text-transparent">
                Finovative
              </h2>
              <p className="text-xs text-sidebar-foreground/60 mt-1">
                Dashboard
              </p>
            </div>

            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs uppercase tracking-wider px-3">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent className="mt-2">
                <SidebarMenu className="space-y-1">
                  {menuItems.map((item, index) => (
                    <SidebarMenuItem
                      key={item.title}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end={item.url === "/"}
                          className={({ isActive }) =>
                            isActive
                              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium transition-smooth shadow-sm hover:shadow-md relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-sidebar-primary before:rounded-r"
                              : "hover:bg-sidebar-accent/50 transition-smooth hover:translate-x-1"
                          }
                        >
                          <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                          <span className="transition-all">{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col bg-background">
          <header
            className="h-20 border-b bg-card flex items-center justify-center px-6 relative animate-slide-up"
            style={{ boxShadow: "var(--shadow-sm)" }}
          >
            <div className="absolute left-6">
              <SidebarTrigger />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent tracking-tight">
                Finovative
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Financial Operations Platform
              </p>
            </div>
            <div className="absolute right-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="transition-smooth hover:bg-secondary"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </header>
          <div className="flex-1 p-8 animate-fade-in">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
