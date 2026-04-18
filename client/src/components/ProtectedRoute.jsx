import { useAuth } from "../context/Authcontext";
const ProtectedRoute = ({ role }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return <Outlet />;
};
export default ProtectedRoute;