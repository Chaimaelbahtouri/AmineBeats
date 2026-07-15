import { MdLogout } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

export default function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const pageName = {
    "/dashboard": "Dashboard",
    "/dashboard/songs": "Songs",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="topbar">
      <h2 className="topbar-title">
        {pageName[location.pathname] || "Dashboard"}
      </h2>

      <button className="logout-btn" onClick={handleLogout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
}