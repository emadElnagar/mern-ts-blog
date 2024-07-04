import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRouters";
import postRouter from "./routes/postRoutes";
import categoryRouter from "./routes/categoryRoutes";
import commentRouter from "./routes/commentRoutes";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/blog");

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/comments", commentRouter);

app.listen(port);
