import Login from "./pages/Login";
import Users from "./pages/Users";
import ForgetPass from "./pages/ForgetPass";
import LoginAdmin from "./pages/LoginAdmin";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./ui/protectedRoute";
import Dashboard from "./pages/Dashboard";
import DashboardAdmin from "./pages/admin/DashboardAdmin";

import CreateTicket from "./feature/submitTicket/CreateTicket";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/GlobalStyles.css";
import VerifyEmailForm from "./feature/authentication/VerifyEmailForm";
import TicketDetail from "./pages/TicketDetail";
import TicketDetailAdmin from "./pages/admin/TicketDetailAdmin";
import AppLayoutAdmin from "./ui/AppLayoutAdmin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="createticket" element={<CreateTicket />} />
            <Route path="dashboard/:ticketId" element={<TicketDetail />} />
          </Route>
          <Route
            element={
              <ProtectedRoute>
                <AppLayoutAdmin />
              </ProtectedRoute>
            }
          >
            <Route path="dashboardadmin" element={<DashboardAdmin />} />
            <Route
              path="dashboardadmin/:ticketId"
              element={<TicketDetailAdmin />}
            />
          </Route>
          <Route index element={<Navigate replace to="login" />} />
          <Route path="verify-email" element={<VerifyEmailForm />} />
          <Route path="login" element={<Login />} />
          <Route path="mamadDahanetServis" element={<LoginAdmin />} />
          <Route path="users" element={<Users />} />
          <Route path="forgetpass" element={<ForgetPass />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
