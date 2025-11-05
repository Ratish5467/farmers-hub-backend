import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// ✅ Allowed origins - add all your frontend URLs
const allowedOrigins = [
  "http://localhost:5173",
  "https://farmers-hub-frontend-code.vercel.app",
  "https://farmers-hub-frontend-code-8pjer8w8k-ratish5467s-projects.vercel.app"
];

// ✅ CORS middleware setup
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"],
    credentials: true
  })
);

// ✅ Preflight requests handle
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// ✅ Routes imports
import userRoutes from "../routes/user.routes.js";
import mandiTodayRoutes from "../routes/mandi.routes.js";
import newsRoutes from "../routes/news.routes.js";
import weatherRoutes from "../routes/weather.routes.js";

// ✅ Routes setup
app.use("/farmers/hub/user", userRoutes);
app.use("/api/mandi", mandiTodayRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/weather", weatherRoutes);

export { app };
