import express from "express";
import cors from "cors";
import cron from "node-cron";
import router from "./router";
import updateAllData from "./controllers/updateData.controller";

const app = express(); // npm i cors
const PORT = 3005;

// socket.io
// import { createServer } from "http";
// import { Server } from "socket.io";

// const httpServer = createServer();

// const io = new Server(httpServer, {});
// //end socket.io

cron.schedule("0 0 0 * * *", async () => {
  updateAllData(0, 2, updateAllData);
});
// runs everyday at midnight?
// --> timeline: uae tour (end of february) - il lombardia (beginning of october)
app.use(cors());
app.use(express.json()); // body parser

// app.use(auth(config));

app.use("/", router);

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

async function bootstrap() {
  try {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port: http://localhost:${PORT}`);
    });
  } catch (e) {
    throw new Error(`error: ${e}`);
  }
}

bootstrap();
