import { Navigate } from "react-router-dom";
import { isAuthenticated, isValuesCompleted } from "../lib/storage";

export function PublicLoginRoute({ children }) {
  if (!isAuthenticated()) {
    return children;
  }

  return <Navigate to={isValuesCompleted() ? "/dashboard" : "/values"} replace />;
}
