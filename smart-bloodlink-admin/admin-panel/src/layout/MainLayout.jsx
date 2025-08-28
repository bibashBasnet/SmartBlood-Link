// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";

// export default function MainLayout({ children }) {
//   return (
//     <div className="main-layout">
//       <Sidebar />
//       <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//         <Topbar />
//         <div className="page-content">{children}</div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function MainLayout({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.body.classList.toggle("dark-mode", !isDark);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`main-layout ${collapsed ? "collapsed" : ""}`}>
      <Sidebar collapsed={collapsed} />
      <div className="content-wrapper">
        <Topbar
          onToggleDark={toggleDarkMode}
          onToggleSidebar={toggleSidebar}
          isDark={isDark}
        />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}
