import React, { useState } from "react";
import axios from "axios";

function App() {
  const [filters, setFilters] = useState({
    message: "",
    level: "",
    resourceId: "",
  });

  const [logs, setLogs] = useState([]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const searchLogs = async () => {
    let query = Object.keys(filters)
      .filter((key) => filters[key])
      .map((key) => `${key}=${filters[key]}`)
      .join("&");

    const res = await axios.get(
      `http://localhost:3000/api/search?${query}`
    );

    setLogs(res.data);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>📊 Log Dashboard</h1>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          justifyContent: "center",
        }}
      >
        <input
          name="message"
          placeholder="Search message..."
          value={filters.message}
          onChange={handleChange}
        />

        <select name="level" value={filters.level} onChange={handleChange}>
          <option value="">All Levels</option>
          <option value="error">Error</option>
          <option value="info">Info</option>
          <option value="warn">Warn</option>
        </select>

        <input
          name="resourceId"
          placeholder="Resource ID"
          value={filters.resourceId}
          onChange={handleChange}
        />

        <button onClick={searchLogs}>Search</button>
      </div>

      {/* Table */}
      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead style={{ background: "#f5f5f5" }}>
          <tr>
            <th>Level</th>
            <th>Message</th>
            <th>Resource</th>
            <th>Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {logs.length > 0 ? (
            logs.map((log, i) => (
              <tr key={i}>
                <td style={{ color: getColor(log.level) }}>
                  {log.level}
                </td>
                <td>{log.message}</td>
                <td>{log.resourceId}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No logs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const getColor = (level) => {
  if (level === "error") return "red";
  if (level === "warn") return "orange";
  return "green";
};

export default App;