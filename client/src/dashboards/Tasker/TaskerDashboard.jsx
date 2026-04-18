const Tasker = ({ setView }) => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h2>Tasker Dashboard</h2>
    <button onClick={() => setView("home")}>❌ Close</button>
  </div>
);
export default Tasker;