import express from "express";
import dotenv from "dotenv";
import connectDb from "./DB/index.js";
import { app } from "./utils/app.js";
import cors from "cors";

dotenv.config({ path: "./.env" });


app.use(cors({
  origin: "http://localhost:5173",  // React app ka URL
  credentials: true                 // cookies/tokens ke liye
}));


app.use(express.json());


connectDb();


app.get("/", (req, res) => {
  res.send("API is running....");
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
