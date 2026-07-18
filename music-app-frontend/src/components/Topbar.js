import { useLocation } from "react-router-dom";

export default function Topbar() {

  const location = useLocation();

  const pageName = {
    "/dashboard": "Dashboard",
    "/dashboard/songs": "Songs",
  };

  return (
    <div className="topbar">

      <h2 className="topbar-title">
        {pageName[location.pathname] || "Dashboard"}
      </h2>

    </div>
  );
}