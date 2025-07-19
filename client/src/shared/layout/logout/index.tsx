import { useAppDispatch } from "@shared/hooks/use-app-dispatch.ts";
import authService from "@modules/auth/services";
import { hideLogoutModal, resetAuth } from "@modules/auth/model/auth-slice.ts";
import { useSelector } from "react-redux";
import type { RootState } from "@app/store/store.ts";
import "./style.css";

export default function Logout() {
  const dispatch = useAppDispatch();
  const visible = useSelector(
    (state: RootState) => state.auth.logoutModalVisible,
  );

  const handleLogout = () => {
    authService.logout();
    dispatch(resetAuth());
    dispatch(hideLogoutModal());
  };

  const handleCancel = () => {
    dispatch(hideLogoutModal());
  };

  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Are you sure you want to log out?</h3>
        <div className="modal-actions">
          <button onClick={handleLogout} className="modal-buttons ">
            Yes
          </button>
          <button onClick={handleCancel} className="modal-buttons ">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
