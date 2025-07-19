import { Outlet } from "react-router-dom";
import { DashboardSider } from "@shared/layout/sider";
import Logout from "@shared/layout/logout";

export default function PageLayout() {
  return (
    <>
      <DashboardSider />
      <Logout />
      <Outlet />
    </>
  );
}
