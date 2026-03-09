import { Server } from "socket.io";

export async function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", async (socket) => {
    // When socket disconnects
    socket.on("disconnect", () => {
      console.log(`socket disconnected: ${socket.id}`);
    });
  });
  return io;
}
