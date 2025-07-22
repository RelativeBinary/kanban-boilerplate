import { Navigate } from "react-router"

export const ProtectedRoute = ({ children, session }: {children: any, session: any}) => {
  if (!session) {
    return <Navigate to="/" replace />;
  }
  return children;
}