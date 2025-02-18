import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../service/firebaseConnection";

export function ProtectedRoute() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p>Carregando...</p>; // Mostra um loading enquanto verifica o usuário
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
