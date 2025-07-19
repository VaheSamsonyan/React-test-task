import { NavLink } from "react-router-dom";
import { routePath } from "@shared/constants/route";
import "./style.css";
import { useAppDispatch } from "@shared/hooks/use-app-dispatch.ts";
import { showLogoutModal } from "@modules/auth/model/auth-slice.ts";

export function DashboardSider() {
  const dispatch = useAppDispatch();

  const handleLogout = () => dispatch(showLogoutModal());

  return (
    <aside className="dashboard-sider">
      <div className="sider-header">Dashboard</div>
      <nav className="sider-nav">
        <NavLink
          to={routePath.getUser()}
          className={({ isActive }) =>
            isActive ? "sider-link active" : "sider-link"
          }
        >
          My profile
        </NavLink>
        <NavLink
          to={routePath.getProducts()}
          className={({ isActive }) =>
            isActive ? "sider-link active" : "sider-link"
          }
        >
          Products
        </NavLink>
        <a href="#" onClick={handleLogout} className="sider-link">
          Log out
        </a>
      </nav>
    </aside>
  );
}
