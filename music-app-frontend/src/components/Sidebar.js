import { FaMusic } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", icon: <MdDashboard />, label: "Dashboard" },
    { path: "/dashboard/songs", icon: <FaMusic />, label: "Songs" },
  ];

  return (
    <div className="dashboard-sidebar">
      <h2 className="sidebar-logo">AmineBeats</h2>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}