import cors from "cors";
import express from "express";
import linkRouter from "./routes/links.js";
import userRouter from "./routes/users.js";
import { errorHandler, unknownEndpoint } from "./utils/middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use("/links", linkRouter);
app.use("/", userRouter);

//custom middlewares
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
