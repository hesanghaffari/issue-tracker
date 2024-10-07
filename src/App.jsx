import Login from "./pages/Login";
import Users from "./pages/Users";
import ForgetPass from "./pages/ForgetPass";
import LoginAdmin from "./pages/admin/LoginAdmin";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "./pages/Dashboard";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import MyTicket from "./pages/admin/MyTicket";

import CreateTicket from "./feature/submitTicket/CreateTicket";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/GlobalStyles.css";
import VerifyEmailForm from "./feature/authentication/VerifyEmailForm";
import TicketDetail from "./pages/TicketDetail";
import TicketDetailAdmin from "./pages/admin/TicketDetailAdmin";
import TicketDetailMyTicketAdmin from "./pages/admin/TicketDetailMyTicketAdmin";
import UsersList from "./pages/admin/UsersList";
import ChildList from "./pages/ChildList";

import AppLayoutAdmin from "./ui/AppLayoutAdmin";
import ProtectedRouteAdmin from "./ui/ProtectedRouteAdmin";
import ProtectedRouteUser from "./ui/protectedRouteUser";
import RedirectIfAuthenticated from "./ui/RedirectIfAuthenticated";
import PageNotFound from "./pages/PageNotFound";
import ForgetPassAccess from "./feature/authentication/ForgetPassAccess";
import Mom from "./pages/admin/Mom";

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
              <ProtectedRouteUser>
                <AppLayout />
              </ProtectedRouteUser>
            }
          >
            <Route path="childlist" element={<ChildList />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="createticket" element={<CreateTicket />} />
            <Route path="dashboard/:ticketId" element={<TicketDetail />} />
          </Route>

          <Route
            element={
              <ProtectedRouteAdmin>
                <AppLayoutAdmin />
              </ProtectedRouteAdmin>
            }
          >
            <Route path="dashboardadmin" element={<DashboardAdmin />} />
            <Route
              path="dashboardadmin/:ticketId"
              element={<TicketDetailAdmin />}
            />
            <Route path="myticket" element={<MyTicket />} />
            <Route
              path="myticket/:ticketId"
              element={<TicketDetailMyTicketAdmin />}
            />
            <Route path="mom" element={<Mom />} />
          </Route>

          <Route
            element={
              <ProtectedRouteAdmin accessToUsersList={true}>
                <AppLayoutAdmin />
              </ProtectedRouteAdmin>
            }
          >
            <Route path="userslist" element={<UsersList />} />
          </Route>

          <Route index element={<Navigate replace to="login" />} />
          <Route
            path="login"
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="csteam"
            element={
              <RedirectIfAuthenticated>
                <LoginAdmin />
              </RedirectIfAuthenticated>
            }
          />

          <Route path="verify-email" element={<VerifyEmailForm />} />
          <Route path="users" element={<Users />} />
          <Route path="forgetpass" element={<ForgetPass />} />
          <Route path="reset-password/:token" element={<ForgetPassAccess />} />

          <Route path="*" element={<PageNotFound />} />
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
