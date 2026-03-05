import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated, isValuesCompleted } from "../lib/storage";

export function ProtectedRoute({ children, allowValuesIncomplete = false }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (!allowValuesIncomplete && !isValuesCompleted()) {
    return <Navigate to="/values" replace />;
  }

  return children;
}
