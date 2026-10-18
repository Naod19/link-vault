import cors from "cors";
import express from "express";
import linkRouter from "./routes/links.js";

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use("/links", linkRouter);

export default app;
