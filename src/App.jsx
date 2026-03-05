import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicLoginRoute } from "./components/PublicLoginRoute";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import PlanPage from "./pages/PlanPage";
import TodayPage from "./pages/TodayPage";
import ValuesPage from "./pages/ValuesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLoginRoute><LoginPage /></PublicLoginRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/values" element={<ProtectedRoute allowValuesIncomplete><ValuesPage /></ProtectedRoute>} />
      <Route path="/plan" element={<ProtectedRoute><PlanPage /></ProtectedRoute>} />
      <Route path="/today" element={<ProtectedRoute><TodayPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
