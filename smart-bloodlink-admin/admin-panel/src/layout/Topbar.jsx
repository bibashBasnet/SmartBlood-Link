// import { useNavigate } from "react-router-dom";

// export default function Topbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear auth data (if any)
//     localStorage.removeItem("token"); // example if you're storing token
//     // Redirect to login page
//     navigate("/");
//   };

//   return (
//     <div className="topbar">
//       <h1>Smart BloodLink Admin Panel</h1>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sun, Moon, Menu } from "lucide-react";

// ===== Topbar =====
export default function Topbar() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleDark = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="topbar">
      <h1>Smart BloodLink Admin Panel</h1>
      
        <button className="dark-mode-btn" onClick={toggleDark} title="Toggle Dark Mode">
          {dark ? <Sun /> : <Moon />}
        </button>
        <button onClick={handleLogout} className="logout-btn" title="Logout">
          Logout
        </button>
      </div>
    
  );
}

