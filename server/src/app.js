import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import flowerRouter from "./routes/flower.routes.js";
import prayerRouter from "./routes/prayer.routes.js";
import photoRouter from "./routes/photo.routes.js";
import documentRouter from "./routes/document.routes.js";
import memorabliaRouter from "./routes/memorablia.routes.js";
import legacyRouter from "./routes/legacy.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/flowers", flowerRouter);
app.use("/api/v1/prayers", prayerRouter);
app.use("/api/v1/photos", photoRouter);
app.use("/api/v1/documents", documentRouter);
app.use("/api/v1/memorablias", memorabliaRouter);
app.use("/api/v1/legacies", legacyRouter);
// https://api.lifebahnheaven.com/api/v1/users/register

app.use(errorHandler);
export { app };
