import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";
import "./DashboardLayout.css";


export default function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-area">
        <Topbar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}