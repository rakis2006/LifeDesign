import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import PlanPage from "./pages/PlanPage";
import QuestionFlowPage from "./pages/QuestionFlowPage";
import Start from "./pages/Start";
import TodayPage from "./pages/TodayPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/values" element={<Navigate to="/values/vision" replace />} />
      <Route path="/values/:stepId" element={<QuestionFlowPage />} />
      <Route path="/plan" element={<PlanPage />} />
      <Route path="/today" element={<TodayPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
