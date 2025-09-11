import express from "express";
import { getTodayMandiRates } from "../controllers/mandiToday.controller.js";

const router = express.Router();

// ✅ Madhya Pradesh ka aaj ka data
router.get("/today", getTodayMandiRates);

export default router;
