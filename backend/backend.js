import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/users.js";
import itemsRoutes from "./routes/items.js";

console.log("Initalizing backend server...");
const PORT = process.env.PORT || 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "../frontend/dist");

// Parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.static(distPath));

app.use("/api/auth", authRoutes);

app.use("/api/items", itemsRoutes);

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.join(distPath, "index.html"));
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
