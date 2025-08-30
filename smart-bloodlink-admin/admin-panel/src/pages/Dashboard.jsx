import { useEffect, useState } from "react";
import { getRequest } from "../api/axios";
import "../styles/Dashboard.css";
import { data } from "react-router-dom";
export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    verifiedDonors: 0,
    totalRequests: 0,
    totalDonationRequest: 0,
  });

  useEffect(() => {
    getRequest("/dashboard/stats").then((data) => {
      setStats(data);
    });
  }, []);

  return (
    <div className="dashboard-cards">
      <div className="card">
        <h3>Total Users</h3>
        <p>{stats.totalUsers}</p>
      </div>
      <div className="card">
        <h3>Verified Users</h3>
        <p>{stats.verifiedUsers}</p>
      </div>
      <div className="card">
        <h3>Total Blood Requests</h3>
        <p>{stats.totalRequests}</p>
      </div>
      <div className="card">
        <h3>Total Donation Requests</h3>
        <p>{stats.totalDonationRequest}</p>
      </div>
    </div>
  );
}
