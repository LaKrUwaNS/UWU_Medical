import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Register from "./pages/Register/Register";
import Apply_Medical from "./pages/ApplyMedical/ApplyMedical";
import Dashboard from "./pages/Dashboard/Dashboard";
import ViewReport from "./pages/ViewReport/ViewReport";
import Settings from './pages/Settings/Settings';
import Reminders from './pages/Reminders/Reminders';
import Updates from "./pages/Updates/Updates";
import ContactDoctor from "./pages/ContactDoctor/ContactDoctor";
import Sidebar from "./components/Sidebar/SideBar";

// Wrapper component to control sidebar visibility
function AppLayout() {
  const location = useLocation();
  
  // Pages that should NOT have the sidebar
  const hideSidebarPaths = ["/", "/login", "/register"];
  
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  return (
    <div style={{ display: "flex" }}>
      {!shouldHideSidebar && <Sidebar />}
     <div style={{ flex: 1, padding: "0px", marginLeft: shouldHideSidebar ? "0px" : "0px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contact-doctor" element={<ContactDoctor />} />
          <Route path="/apply-medical" element={<Apply_Medical />} />
          <Route path="/view-report" element={<ViewReport />} />
          <Route path="/reminders" element={<Reminders />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
