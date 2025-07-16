import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data (if any)
    localStorage.removeItem("token"); // example if you're storing token
    // Redirect to login page
    navigate("/");
  };

  return (
    <div className="topbar">
      <h1>Smart BloodLink Admin Panel</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
