import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";

config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
