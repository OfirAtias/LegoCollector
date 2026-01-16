import React, { useState } from "react";
import Login from "./Login";
import LegoList from "./LegoList";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);

  const handleLogin = (receivedToken) => {
    setToken(receivedToken);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="App">
      <header className="lego-header">
        <h1>Lego Collector 🧱</h1>
        {token && (
          <button className="lego-btn btn-red" onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>

      <main>
        {!token ? <Login onLogin={handleLogin} /> : <LegoList token={token} />}
      </main>
    </div>
  );
}

export default App;
