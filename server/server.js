import express from "express";
import http from "http";
import authRouter from "./routes/auth.routes.js";
import { initSocket } from "./socket/socket.js";
import connectDB from "./DATABASE/mongodb.js";
import { PORT } from "./config/env.js";
const app = express();
const server = http.createServer(app);
// Database Connection
await connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);

// Web Socket
await initSocket(server);

server.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`),
);
