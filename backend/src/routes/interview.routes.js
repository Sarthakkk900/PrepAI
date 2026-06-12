import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  createInterview,
  getCurrentQuestion,
} from "../controllers/interview.controller.js";


const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createInterview
);

router.get(
  "/:id/current-question",
  authMiddleware,
  getCurrentQuestion
);

export default router;