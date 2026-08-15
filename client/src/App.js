import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BookingPage from './pages/BookingPage';
import ServicesPage from './pages/ServicesPage';
import ClientDashboardPage from './pages/ClientDashboardPage';
import TaskerDashboardPage from './pages/TaskerDashboardPage';
import "./index.css";
const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('taskiva_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

function ProtectedRoute({ children, role }) {
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === 'tasker' ? '/tasker-dashboard' : '/client-dashboard'} replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/client-dashboard"
          element={
            <ProtectedRoute role="client">
              <ClientDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasker-dashboard"
          element={
            <ProtectedRoute role="tasker">
              <TaskerDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
