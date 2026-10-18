import { Router } from "express";
import { createInterviewReport,generateInterviewReportController } from "../controllers/interviewController.js";
import authmiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/file.middleware.js";

const interviewRouter = Router();
interviewRouter.post("/generate",authmiddleware,createInterviewReport);
interviewRouter.post("/generate-report",authmiddleware,upload.single("resume"),generateInterviewReportController);

export default interviewRouter;
