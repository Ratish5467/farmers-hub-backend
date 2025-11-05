import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

// Allowed origins - add all dev and prod frontend origins here
const allowedOrigins = [
  "http://localhost:5173",
  "https://farmers-hub-frontend-code.vercel.app",
  "https://farmers-hub-frontend-code-8pjer8w8k-ratish5467s-projects.vercel.app" // jo error mein aaya tha
];

app.use(
  cors({
    origin: function (origin, callback) {
      // origin can be undefined for non-browser clients (curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // otherwise block
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // if you use cookies/auth
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"]
  })
);

// handle preflight OPTIONS for all routes
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// import routes
import userRoutes from "../routes/user.routes.js";
// routes declaration
app.use("/farmers/hub/user", userRoutes);

import mandiTodayRoutes from "../routes/mandi.routes.js";
app.use("/api/mandi", mandiTodayRoutes);

import newsRoutes from "../routes/news.routes.js";
app.use("/api/news", newsRoutes);

import weatherRoutes from "../routes/weather.routes.js";
app.use("/api/weather", weatherRoutes);

export { app };
