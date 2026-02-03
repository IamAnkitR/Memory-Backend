import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";
import audioRoutes from "./routes/audio.routes";

config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
console.log("Registering audio routes...");
app.use("/audio", audioRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
