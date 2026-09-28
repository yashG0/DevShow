import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AppLayout } from "./layouts/AppLayout";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";

function LoginPlaceholder() {
  return <div>Login</div>;
}

function RegisterPlaceholder() {
  return <div>Register</div>;
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<LoginPlaceholder />} />

          <Route path="/register" element={<RegisterPlaceholder />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
