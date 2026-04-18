import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import TaskerRegister from "./pages/TaskerRegister";
import { AuthProvider } from "./context/Authcontext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Admin  from "./dashboards/Admin/Admindashboard";
import Client from "./dashboards/Client/ClientDashboard";
import Tasker from "./dashboards/Tasker/TaskerDashboard";

import AIAssistant from "./components/aiassistant";

function App() {
  const [view, setView] = useState("home");
  const [fade, setFade] = useState(true);

  const changeView = (newView) => {
    setFade(false);
    setTimeout(() => {
      setView(newView);
      setFade(true);
    }, 200);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className={fade ? "fade-in" : "fade-out"}>
                {view === "login" ? (
                  <Login setView={changeView} />
                ) : view === "register" ? (
                  <Register setView={changeView} />
                ) : view === "admin" ? (
                  <Admin  setView={changeView} />
                ) : view === "client" ? (
                  <Client setView={changeView} />
                ) : view === "tasker" ? (
                  <Tasker setView={changeView} />
                ) : view === "tasker-register" ? (   
                  <TaskerRegister setView={changeView} />
                ): (
                  <Home setView={changeView} />
                )}
              </div>
            }
          />
        </Routes>

        <AIAssistant />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;