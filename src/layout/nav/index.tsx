import { Outlet } from "react-router-dom";
import { Navigate } from "../../components/header/navgation";

export function Nav() {
  return (
    <>
      <Navigate />
      <Outlet />
    </>
  );
}
