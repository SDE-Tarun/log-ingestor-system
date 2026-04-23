import React, { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [logs, setLogs] = useState([]);

  const searchLogs = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/search?message=${query}`
    );
    setLogs(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Log Search</h2>

      <input
        placeholder="Search logs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={searchLogs}>Search</button>

      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            {log.level} - {log.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;