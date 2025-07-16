import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}
