import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import authRoutes from "./routes/users.js";
import itemsRoutes from "./routes/items.js";

console.log("Initalizing backend server...");
const PORT = process.env.PORT || 3000;
const app = express();

// Parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.static("frontend"));

app.use("/assets", express.static("assets"));

app.use("/api/auth", authRoutes);

app.use("/api/items", itemsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
