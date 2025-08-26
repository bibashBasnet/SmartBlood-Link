// import { Link } from "react-router-dom";

// export default function Sidebar() {
//   return (
//     <div className="sidebar">
//       <h2>BloodBank Admin</h2>
//       <nav>
//         <Link to="/dashboard">Dashboard</Link>
//         <Link to="/users">Users</Link>
//         <Link to="/donations">Donation Requests</Link>
//         <Link to="/requests">Blood Requests</Link>
//         <Link to="/map">Map</Link>
//       </nav>
//     </div>
//   );
// }
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Sun, Moon, Menu } from "lucide-react";


// // ===== Sidebar =====
// export default function Sidebar() {
// const [collapsed, setCollapsed] = useState(false);


// return (
// <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
// {/* Toggle Button */}
// <button
// className="collapse-btn"
// onClick={() => setCollapsed(!collapsed)}
// >
// <Menu size={20} />
// </button>


// {/* Sidebar Content */}
// {!collapsed && <h2>BloodBank Admin</h2>}
//       <nav>
//         <Link to="/dashboard">
//           <span>📊</span> <span>Dashboard</span>
//         </Link>
//         <Link to="/users">
//           <span>👥</span> <span>Users</span>
//         </Link>
//         <Link to="/donations">
//           <span>🩸</span> <span>Donation Requests</span>
//         </Link>
//         <Link to="/requests">
//           <span>📦</span> <span>Blood Requests</span>
//         </Link>
//         <Link to="/map">
//           <span>🗺</span> <span>Map</span>
//         </Link>
//       </nav>
//     </div>
//   );
// }
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Grid, Users, Droplet, Package, MapPin } from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <Grid size={18} /> },
    { to: "/users", label: "Users", icon: <Users size={18} /> },
    { to: "/donations", label: "Donation Requests", icon: <Droplet size={18} /> },
    { to: "/requests", label: "Blood Requests", icon: <Package size={18} /> },
    { to: "/map", label: "Map", icon: <MapPin size={18} /> },
  ];

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        <Menu size={20} />
      </button>

      {/* Sidebar Content */}
      {!collapsed && <h2>BloodBank Admin</h2>}

      <nav>
        {links.map((link) => (
          <Link key={link.to} to={link.to} title={link.label}>
            {link.icon} {!collapsed && <span style={{ marginLeft: '10px' }}>{link.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
