// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Nav from "./components/Nav";
import { UserProvider } from "./context/UserContext";
import HomePage from "./pages/HomePage";
import AdminPanel from "./pages/admin/AdminPanel";
import UsersPage from "./pages/admin/UsersPage";
import EventsPage from "./pages/admin/EventsPage";
import AdminScanner from "./pages/admin/AdminScanner";
import Profile from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EventDetail from "./pages/admin/EventDetail";
import NotFound from "./pages/NotFound";
import { Helmet } from "react-helmet";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Helmet>
          <title>HackKU25</title>
        </Helmet>
        <MainLayout />
      </Router>
    </UserProvider>
  );
};

const MainLayout = () => {
  const location = useLocation();
  const hideNavRoutes = ["/login", "/register"];

  return (
    <div>
      {!hideNavRoutes.includes(location.pathname) && <Nav />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/events/:eventId" element={<EventDetail />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/events" element={<EventsPage />} />
        <Route path="/admin/scanner" element={<AdminScanner />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
