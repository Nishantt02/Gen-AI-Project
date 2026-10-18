import { Router } from "express";
import { createInterviewReport } from "../controllers/interviewController.js";
import authmiddleware from "../middlewares/auth.middleware.js";

const interviewRouter = Router();
interviewRouter.post("/generate",authmiddleware,createInterviewReport);
interviewRouter.post("/")

export default interviewRouter;
