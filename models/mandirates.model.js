import express from "express";
import { getMandiRates } from "../controllers/mandi.controller.js";

const router = express.Router();

router.get("/", getMandiRates);

export default router;
