import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5096/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        onLogin(data.token);
      } else {
        setError("Login failed!");
      }
    } catch (err) {
      console.error(err);
      setError("Server Error");
    }
  };

  return (
    <div className="lego-card">
      <h2 style={{ color: "#0055BF" }}>Member Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <input
            className="lego-input"
            type="text"
            placeholder="Username (admin)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            className="lego-input"
            type="password"
            placeholder="Password (1234)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div style={{ color: "#DA291C", fontWeight: "bold" }}>{error}</div>
        )}
        <button
          type="submit"
          className="lego-btn btn-blue"
          style={{ width: "100%" }}
        >
          Start Building!
        </button>
      </form>
    </div>
  );
}
