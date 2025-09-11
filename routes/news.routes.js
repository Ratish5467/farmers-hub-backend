import express from "express";
import {getNews} from "../controllers/newscontroller.js"

const router = express.Router();

// GET /api/news
router.get("/", getNews);

export default router;
