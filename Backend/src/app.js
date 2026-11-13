// // import express from 'express';
// // import authRoutes from './routes/auth.routes.js';
// // import interviewRoutes from './routes/interview.routes.js';
// // import cookieParser from 'cookie-parser';
// // import cors from 'cors';

// // const app = express();
// // app.use(cookieParser());
// // app.use(
// //   cors({
// //     origin: process.env.VITE_BASE_URL,
// //     credentials: true, 
// //   })
// // );


// // app.use(express.json());
// // app.use('/api/auth',authRoutes);
// // app.use('/api/interviews',interviewRoutes);

// // export default app;



import express from "express";
import authRoutes from "./routes/auth.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://localhost:5174",
  ...(process.env.VITE_BASE_URL ?? "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean),
]);

app.use(
  cors({
    origin(origin, callback) {
      // Allow server-to-server and same-origin requests, plus explicitly configured
      // frontend origins. Credentialed requests cannot use a wildcard origin.
      if (!origin || allowedOrigins.has(origin.replace(/\/$/, ""))) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/interviews", interviewRoutes);

export default app;

