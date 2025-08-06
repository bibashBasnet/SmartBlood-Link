import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>BloodBank Admin</h2>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/donations">Donation Requests</Link>
        <Link to="/requests">Blood Requests</Link>
        <Link to="/map">Map</Link>
      </nav>
    </div>
  );
}
