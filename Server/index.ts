import express from "express";
import cors from "cors";
import cron from "node-cron";
import router from "./router";
import updateAllData from "./controllers/updateData.controller";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const PORT = 3005;

// socket.io

const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
//end socket.io

cron.schedule("0 0 0 * * *", async () => {
  updateAllData(0, 2, updateAllData);
});
// runs everyday at midnight?
// --> timeline: uae tour (end of february) - il lombardia (beginning of october)
app.use(cors());
app.use(express.json()); // body parser

// app.use(auth(config));

app.use("/", router);

io.on("connection", (socket) => {
  console.log("Connection to socket.io");
  socket.on("message", (message) => {
    console.log(`Message from ${socket.id}:${message}`);
  });
});

export { io };

async function bootstrap() {
  try {
    http.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port: http://localhost:${PORT}`);
    });
  } catch (e) {
    throw new Error(`error: ${e}`);
  }
}

bootstrap();
