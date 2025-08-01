import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import BloodRequests from "./pages/BloodRequests";
import MainLayout from "./layout/MainLayout";
import Map from "./pages/Map";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />
      <Route
        path="/users"
        element={
          <MainLayout>
            <Users />
          </MainLayout>
        }
      />
      <Route
        path="/requests"
        element={
          <MainLayout>
            <BloodRequests />
          </MainLayout>
        }
      />
      <Route path="/map" element={
        <MainLayout>
          <Map/>
        </MainLayout>
      }/>
    </Routes>
  );
}

export default App;
