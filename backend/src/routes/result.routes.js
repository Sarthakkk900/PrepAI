import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  getResult,
  getHistory,
  getDetailedResult,
} from "../controllers/result.controller.js";

const router = express.Router();


router.get(
  "/history",
  authMiddleware,
  getHistory
);

router.get(
  "/details/:interviewId",
  authMiddleware,
  getDetailedResult
);

router.get(
  "/:interviewId",
  authMiddleware,
  getResult
);

export default router;