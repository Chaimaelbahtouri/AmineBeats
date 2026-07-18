import { FaMusic } from "react-icons/fa";
import { MdDashboard, MdLogout } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {

  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/dashboard", icon: <MdDashboard />, label: "Dashboard" },
    { path: "/dashboard/songs", icon: <FaMusic />, label: "Songs" },
  ];


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };


  return (
    <aside className="dashboard-sidebar">

      <h2 className="sidebar-logo">
        AmineBeats
      </h2>


      <nav className="sidebar-menu">

        {menuItems.map((item)=>(
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${
              location.pathname === item.path ? "active" : ""
            }`}
          >

            <span className="sidebar-icon">
              {item.icon}
            </span>

            {item.label}

          </Link>
        ))}


      </nav>


      <button 
        className="sidebar-logout"
        onClick={handleLogout}
      >
        <MdLogout />
        Logout
      </button>


    </aside>
  );
}