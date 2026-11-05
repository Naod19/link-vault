import cors from "cors";
import express from "express";
import authRouter from "./routes/auth.js";
import linkRouter from "./routes/links.js";
import { errorHandler, unknownEndpoint } from "./utils/middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use("/api/links", linkRouter);
app.use("/api/auth", authRouter);

//custom middlewares
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
