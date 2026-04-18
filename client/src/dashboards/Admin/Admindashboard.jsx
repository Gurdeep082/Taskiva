
const Admin = ({ setView }) => {
  return (
    <div style={{ padding: "20px" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Admin Dashboard</h2>
        <button onClick={() => setView("home")}>❌</button>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        <div className="serviceitem">👥 Total Users: 120</div>
        <div className="serviceitem">🟢 Active Users: 34</div>
        <div className="serviceitem">📋 Active Tasks: 56</div>
        <div className="serviceitem">✅ Completed Tasks: 230</div>
        <div className="serviceitem">🧑‍🔧 Providers: 18</div>
      </div>
    </div>
  );
};
export default Admin;