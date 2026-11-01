// import express from 'express';
// import authRoutes from './routes/auth.routes.js';
// import interviewRoutes from './routes/interview.routes.js';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';

// const app = express();
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: process.env.VITE_BASE_URL,
//     credentials: true,
//   })
// );


// app.use(express.json());
// app.use('/api/auth',authRoutes);
// app.use('/api/interviews',interviewRoutes);

// export default app;



import express from "express";
import authRoutes from "./routes/auth.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.VITE_BASE_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/interviews", interviewRoutes);

export default app;
