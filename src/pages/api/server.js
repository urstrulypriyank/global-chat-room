import { Server as ServerFromHttp } from "http";
import { Server as ServerIO } from "socket.io";
const ioHandler = (req, res) => {
  try {
    // if socket is not initialized
    if (!res.socket.server.io) {
      const path = "/api/server";
      const httpServer = res.socket.server;
      const io = new ServerIO(httpServer, {
        path,
        addTrailingSlash: false,
      });
      io.on("connection", (socket) => {
        console.log(`Socket ${socket.id} connected.`);

        // Listen for incoming messages and broadcast to all clients
        socket.on("message", (message) => {
          console.log(message);
          io.emit("message", message);
        });

        // Clean up the socket on disconnect
        socket.on("disconnect", () => {
          console.log(`Socket ${socket.id} disconnected.`);
        });
      });

      res.socket.server.io = io;
    }
    res.end();
  } catch (error) {
    console.log(error.message);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
export default ioHandler;