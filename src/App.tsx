import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashBoardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Overview from "./pages/overview";
import Bank from "./pages/Bank";
import BankCallback from "./pages/BankCallback";
import Payroll from "./pages/Payroll";
import VAT from "./pages/VAT";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Overview />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/bank"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Bank />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/bank/callback"
            element={
              <DashboardLayout>
                <BankCallback />
              </DashboardLayout>
            }
          />

          <Route
            path="/payroll"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Payroll />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/vat"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <VAT />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
