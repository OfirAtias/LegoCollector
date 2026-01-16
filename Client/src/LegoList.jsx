import React, { useState, useEffect } from "react";

export default function LegoList({ token }) {
  const [legoSets, setLegoSets] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const authFetch = (url, options = {}) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };
    return fetch(url, { ...options, headers });
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await authFetch("http://localhost:5096/api/Lego");
      if (res.ok) {
        setLegoSets(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {
    if (!newName || !newPrice) return;
    try {
      const res = await authFetch("http://localhost:5096/api/Lego", {
        method: "POST",
        body: JSON.stringify({ name: newName, price: parseFloat(newPrice) }),
      });
      if (res.ok) {
        setNewName("");
        setNewPrice("");
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Disassemble this set?")) return;
    try {
      const res = await authFetch(`http://localhost:5096/api/Lego/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const colors = ["#DA291C", "#0055BF", "#237841", "#FFD700"];

  return (
    <div style={{ padding: "20px" }}>
      <div
        className="lego-card"
        style={{ maxWidth: "600px", borderColor: "#237841" }}
      >
        <h3 style={{ marginTop: 0, color: "#237841" }}>Add New Set</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            className="lego-input"
            placeholder="Set Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            className="lego-input"
            placeholder="Price"
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            style={{ width: "100px" }}
          />
        </div>
        <button
          onClick={handleAdd}
          className="lego-btn btn-green"
          style={{ width: "100%", marginTop: "15px" }}
        >
          Add to Collection
        </button>
      </div>

      <ul className="lego-list">
        {legoSets.map((set, index) => (
          <li
            key={set.id}
            className="lego-item"
            style={{ borderLeftColor: colors[index % colors.length] }}
          >
            <div>
              <strong>{set.name}</strong>
              <span style={{ marginLeft: "10px", color: "#666" }}>
                ${set.price}
              </span>
            </div>
            <button
              onClick={() => handleDelete(set.id)}
              className="lego-btn btn-red"
              style={{ fontSize: "0.8rem", padding: "5px 10px" }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
