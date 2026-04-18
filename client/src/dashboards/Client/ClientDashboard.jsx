import { useAuth } from "../../context/Authcontext";
const Client = ({ setView }) => {
  const { logout } = useAuth();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Client Dashboard</h2>

      <button onClick={() => setView("home")}>❌ Close</button>

      <br /><br />

      <button
        onClick={() => {
          logout();
          setView("home");
        }}
      >
        Logout
      </button>
    </div>
  );
};
export default Client;