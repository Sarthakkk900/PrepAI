import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  submitAnswer,
} from "../controllers/interviewResponse.controller.js";

const router = express.Router();

router.post(
  "/answer",
  authMiddleware,
  submitAnswer
);

export default router;