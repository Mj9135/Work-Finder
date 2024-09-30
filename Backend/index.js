import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import connectDB from "./utils/db.js";
import companyRouter from "./routes/company.route.js";
import jobRouter from "./routes/job.routes.js";
import applicationRouter from "./routes/application.route.js";
import path from "path";
dotenv.config({});
const app = express();

// const _dirname = path.resolve();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowedOrigins = [
  "https://work-finder-ten.vercel.app", // Production URL
  "http://localhost:5173", // Local development URL
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // If origin is allowed or no origin (for non-browser requests), allow the request
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));

//apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// app.use(express.static(path.join(_dirname, "/Frontend/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB();
  console.log(`App is listening on port ${PORT}`);
});
