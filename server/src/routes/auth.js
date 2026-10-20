import express from "express";
import { createUser, getAllUsers, loginUser } from "../controllers/users.js";

const authRouter = express.Router();

authRouter.get("/allusers", getAllUsers);
authRouter.post("/signup", createUser);
authRouter.post("/login", loginUser);

export default authRouter;
