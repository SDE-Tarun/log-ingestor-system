# 🚀 Log Ingestor and Query System

A scalable log ingestion and querying system capable of handling high-volume structured logs with efficient search and filtering.

---

# 📌 Features

* ⚡ High-throughput log ingestion via queue (BullMQ + Redis)
* 🧠 Asynchronous processing using worker architecture
* 🔍 Full-text + regex search support
* 🎯 Multiple filters (level, resourceId, timestamp, etc.)
* 📊 Indexed MongoDB queries for fast performance
* 🖥️ Simple React UI for searching logs
* 🐳 Docker support for easy setup

---

# 🏗️ Architecture

```
Client → API (Port 3000) → Queue (Redis/BullMQ)
        → Worker → MongoDB → Query API → Frontend UI
```

---

# 🛠️ Tech Stack

* Backend: Node.js + Express
* Database: MongoDB
* Queue: BullMQ + Redis
* Frontend: React.js
* Optional: Docker

---

# 📁 Project Structure

```
log-ingestor-system/
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── queue/
│   │   ├── workers/
│   │
│   ├── server.js
│
├── frontend/
│
├── docker-compose.yml
├── README.md
```

---

# ⚙️ Prerequisites

Make sure the following are installed:

* Node.js (v18+)
* MongoDB
* Redis

---

# 🚀 Running the Project (Step-by-Step)

## 1️⃣ Start MongoDB

```bash
mongod
```

---

## 2️⃣ Start Redis

```bash
redis-server
```

---

## 3️⃣ Start Backend Server

```bash
cd backend
npm install
node server.js
```

Server will run on:

```
http://localhost:3000
```

---

## 4️⃣ Start Worker (IMPORTANT)

Open a new terminal:

```bash
cd backend
node src/workers/logWorker.js
```

Worker processes logs from queue and saves them to MongoDB.

---

## 5️⃣ Start Frontend

```bash
cd frontend
npm install
npm start
```

Frontend will run on:

```
http://localhost:3001
```

---

# 🧪 Testing the System

## 🔹 Insert Log (POST)

Using curl:

```bash
curl -X POST http://localhost:3000/api/logs \
-H "Content-Type: application/json" \
-d '{
  "level":"error",
  "message":"Failed to connect to DB",
  "resourceId":"server-1234",
  "timestamp":"2023-09-15T08:00:00Z",
  "traceId":"abc-xyz-123",
  "spanId":"span-456",
  "commit":"5e5342f",
  "metadata":{"parentResourceId":"server-0987"}
}'
```

Expected response:

```json
{
  "message": "Log queued successfully"
}
```

---

## 🔹 Search Logs (GET)

Open in browser or Postman:

```
http://localhost:3000/api/search
```

---

## 🔹 Filter Examples

### By Level

```
/api/search?level=error
```

### By Message

```
/api/search?message=Failed
```

### By Resource ID

```
/api/search?resourceId=server-1234
```

### By Date Range

```
/api/search?startTime=2023-09-10T00:00:00Z&endTime=2023-09-20T00:00:00Z
```

---

# 🖥️ Frontend Usage

1. Open UI
2. Enter search keyword
3. Click "Search"
4. Logs will be displayed in list

---

# ⚡ Performance Optimizations

* Indexed fields: level, resourceId, timestamp
* Text index on message
* Queue-based ingestion avoids blocking
* Worker handles DB writes asynchronously

---

# 🔥 Bonus Features Implemented

* Regex-based search
* Date range filtering
* Scalable queue architecture
* Modular clean code structure

---

# 🐳 Docker Setup (Optional)

Run everything with Docker:

```bash
docker-compose up
```

---

# ❗ Troubleshooting

## Issue: Logs not appearing

* Ensure worker is running:

```bash
node src/workers/logWorker.js
```

---

## Issue: MongoDB connection error

```bash
mongod
```

---

## Issue: Redis not running

```bash
redis-server
```

---

## Issue: Port 3000 already in use

```bash
lsof -i :3000
kill -9 <PID>
```

---

# 📊 Evaluation Coverage

| Criteria    | Covered                  |
| ----------- | ------------------------ |
| Volume      | ✅ Queue-based ingestion  |
| Speed       | ✅ Indexed queries        |
| Scalability | ✅ Worker architecture    |
| Usability   | ✅ Simple UI              |
| Advanced    | ✅ Filters + regex + date |
| Readability | ✅ Clean modular code     |

---

# 🎯 Future Improvements

* ElasticSearch integration
* Real-time logs (WebSocket)
* Pagination & sorting
* Authentication & RBAC

---

# 👨‍💻 Author

Tarun Kumar
Full Stack Developer (MERN)

---

# ⭐ Conclusion

This system demonstrates a scalable, efficient, and production-ready approach to log ingestion and querying with modern backend architecture.

---
