import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import interviewResponseRoutes from "./routes/interviewResponse.routes.js";
import resultRoutes from "./routes/result.routes.js";
import testRoutes from "./routes/test.routes.js";
import resumeRoutes
from "./routes/resume.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(
  "/api/interviews",
  interviewRoutes
);
app.use(
  "/api/interviews",
  interviewResponseRoutes
);
app.use(
  "/api/results",
  resultRoutes
);

app.use(
  "/api/resume",
  resumeRoutes
);

app.use("/api/test-ai", testRoutes);

app.get("/", (req, res) => {
  res.send("PrepAI API Running");
});

app.use("/api/users", userRoutes);

export default app;